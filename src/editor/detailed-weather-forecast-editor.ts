import { css, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import {
  WEATHER_CONDITIONS,
  type HeaderAttribute,
  type WeatherCondition,
  type DetailedWeatherForecastConfig,
  ForecastEvent,
  WeatherEntity,
} from '../types';
import './entity-info-editor';
import './forecast-attribute-editor';
import { formatWeatherAttributeName } from '../weather';
import * as editorStyles from './detailed-weather-forecast-editor.css';
import memoizeOne from 'memoize-one';

const SOLAR_FORECAST_OPTION = 'solar_forecast';
const FORECAST_OPTIONS_CACHE = new Map<string, { hourly: string[]; daily: string[] }>();

const ICON_MAP_LABELS: Record<WeatherCondition, string> = {
  'clear-night': localize('editor.weather_condition.clear-night', '', ''),
  cloudy: localize('editor.weather_condition.cloudy', '', ''),
  fog: localize('editor.weather_condition.fog', '', ''),
  hail: localize('editor.weather_condition.hail', '', ''),
  lightning: localize('editor.weather_condition.lightning', '', ''),
  'lightning-rainy': localize('editor.weather_condition.lightning-rainy', '', ''),
  partlycloudy: localize('editor.weather_condition.partlycloudy', '', ''),
  'partlycloudy-night': localize('editor.weather_condition.partlycloudy-night', '', ''),
  pouring: localize('editor.weather_condition.pouring', '', ''),
  rainy: localize('editor.weather_condition.rainy', '', ''),
  snowy: localize('editor.weather_condition.snowy', '', ''),
  'snowy-rainy': localize('editor.weather_condition.snowy-rainy', '', ''),
  sunny: localize('editor.weather_condition.sunny', '', ''),
  windy: localize('editor.weather_condition.windy', '', ''),
  'windy-variant': localize('editor.weather_condition.windy-variant', '', ''),
  exceptional: localize('editor.weather_condition.exceptional', '', ''),
};

type HaFormSelector =
  | { entity: { domain?: string; device_class?: string | string[] } }
  | { boolean: Record<string, never> }
  | { text: Record<string, never> }
  | { number: Record<number, never> }
  | { icon: Record<string, never> }
  | { ui_action: { default_action?: string; actions?: Array<'tap' | 'hold' | 'double_tap'> } }
  | { select: { options: Array<{ value: string; label: string }>; custom_value?: boolean; multiple?: boolean } };

type HaFormSchema = {
  name: string;
  selector?: HaFormSelector;
  type?: string;
  flatten?: boolean;
  schema?: HaFormSchema[];
  optional?: boolean;
  disabled?: boolean;
  icon?: string;
  iconPath?: string;
};

type ToggleName = 'show_header' | 'hourly_forecast' | 'daily_forecast';

type EnergyPreferences = {
  energy_sources?: Array<{
    type?: string;
    config_entry_solar_forecast?: string[] | null;
  }>;
};

type ConfigEntryFragment = {
  entry_id: string;
  title?: string;
  domain?: string;
};

const fireEvent = (node: HTMLElement, type: string, detail?: unknown) => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

type ModernForecastType = 'hourly' | 'daily' | 'twice_daily';
const WeatherEntityFeature = {
  FORECAST_DAILY: 1,
  FORECAST_HOURLY: 2,
  FORECAST_TWICE_DAILY: 4,
} as const;

@customElement('detailed-weather-forecast-editor')
export class DetailedWeatherForecastEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: DetailedWeatherForecastConfig;

  @state() private _hourlyExtraOptions: string[] = [];

  @state() private _dailyExtraOptions: string[] = [];

  @state() private _forecastOptionsLoading: Record<ModernForecastType, boolean> = {
    hourly: false,
    daily: false,
    twice_daily: false,
  };

  @state() private _solarForecastOptions: Array<{ value: string; label: string }> = [];

  @state() private _solarForecastEntryIds: string[] = [];

  @state() private _expandedSections: Record<string, boolean> = {};

  @state() private _subElementEditorConfig?: {
    type: 'header_chips' | 'header_info' | 'daily_info' | 'hourly_info';
    index: number;
  };

  @state() private _draggedIndex = -1;
  @state() private _draggedListType?: 'header_chips' | 'header_info' | 'daily_info' | 'hourly_info';
  @state() private _dragOverIndex = -1;
  @state() private _dragOverListType?: 'header_chips' | 'header_info' | 'daily_info' | 'hourly_info';

  private _forecastOptionSubscriptions: Partial<Record<ModernForecastType, Promise<() => void> | undefined>> = {};

  private _forecastOptionsEntity?: string;

  private _solarForecastOptionsLoaded = false;

  private _solarForecastOptionsPromise?: Promise<void>;

  static styles = css`
    ${unsafeCSS(editorStyles.default || editorStyles)}
    .sub-element-editor {
      margin-top: 8px;
    }
    .sub-element-editor .header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    .sub-element-editor .header .title {
      font-size: 18px;
      font-weight: 500;
      margin-left: 8px;
    }
    .info-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      margin-bottom: 8px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }
    .info-list-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
    }
    .info-list-label {
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-list-secondary {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .info-list-item.dragging {
      opacity: 0.4;
    }
    .info-list-item.drag-over {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .info-list-item .handle {
      cursor: grab;
      padding-right: 12px;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
    }
    .info-list-item .handle:active {
      cursor: grabbing;
    }
    .info-list-item > * {
      pointer-events: none;
    }
    .info-list-item .info-list-content,
    .info-list-item ha-icon-button,
    .info-list-item .handle {
      pointer-events: auto;
    }
  `;

  public setConfig(config: DetailedWeatherForecastConfig): void {
    const normalizedChips = this._normalizeHeaderChips(config);

    this._config = {
      type: 'custom:detailed-weather-forecast-card',
      ...config,
      header_info: config.header_info ?? [],
      daily_info: config.daily_info ?? [],
      hourly_info: config.hourly_info ?? [],
      nowcast_entity: config.nowcast_entity,
      moon_phase_entity: config.moon_phase_entity,
      nowcast_always_show: config.nowcast_always_show ?? false,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? 'vertical',
      compact_header: config.compact_header ?? false,
      show_animation: config.show_animation ?? true,
      header_chips: normalizedChips,
      header_attributes: normalizedChips.filter((chip) => chip.type === 'attribute').map((chip) => chip.attribute),
    };

    this._refreshForecastOptions();
    this._refreshSolarForecastOptions(true);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && this._config?.entity && !this._forecastOptionsEntity) {
      this._refreshForecastOptions();
    }
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    if (this._subElementEditorConfig) {
      return this._renderSubElementEditor();
    }

    const {
      general: generalSchema,
      header: headerSchema,
      hourly: hourlySchema,
      daily: dailySchema,
    } = this._buildSchemas();
    const formData = this._config;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${generalSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="editor-section">
        ${this._renderExpander(
          'gps-coordinates',
          localize('editor.section.gps_coordinates', '', ''),
          html`
            <p class="location-description">${localize('editor.section.gps_coordinates_description', '', '')}</p>
            <div class="forecast-switch">
              <span>${localize('editor.section.use_home_assistant_location', '', '')}</span>
              <ha-switch
                name="sun_use_home_coordinates"
                .checked=${this._config.sun_use_home_coordinates ?? true}
                @change=${this._handleSunToggleChange}
              ></ha-switch>
            </div>
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${localize('editor.section.latitude', '', '')}</span>
                <input
                  type="text"
                  name="sun_latitude"
                  placeholder="e.g. 48.137"
                  .value=${String(this._config.sun_latitude ?? '')}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
              <label class="coordinate-field">
                <span>${localize('editor.section.longitude', '', '')}</span>
                <input
                  type="text"
                  name="sun_longitude"
                  placeholder="e.g. 11.575"
                  .value=${String(this._config.sun_longitude ?? '')}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
            </div>
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderExpander(
          'solar-forecast',
          localize('editor.section.solar_forecast', '', ''),
          html`
            <p class="location-description">${localize('editor.section.solar_forecast_description', '', '')}</p>
            <ha-selector
              .hass=${this.hass}
              .selector=${{ select: { options: this._solarForecastOptions, multiple: true } }}
              .value=${this._getSolarForecastSelection()}
              .label=${localize('editor.section.energy_solar_forecasts', '', '')}
              .required=${false}
              .disabled=${!this._solarForecastEntryIds.length}
              @value-changed=${this._handleSolarForecastSelectionChange}
            ></ha-selector>
            ${this._solarForecastOptionsLoaded && !this._solarForecastEntryIds.length
              ? html`<p class="location-description">
                  ${localize('editor.section.no_energy_solar_forecasts_configured', '', '')}
                </p>`
              : nothing}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderExpander(
          'custom-icons',
          localize('editor.section.custom_icons', '', ''),
          html`
            <p class="location-description">${localize('editor.section.custom_icons_description', '', '')}</p>
            <div class="icon-map-list">
              ${WEATHER_CONDITIONS.map((condition) => {
                const value = this._getIconMapValue(condition);
                return html`
                  <div class="icon-map-row">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ icon: {} }}
                      .value=${value}
                      .label=${ICON_MAP_LABELS[condition]}
                      .required=${false}
                      @value-changed=${(event: CustomEvent) => this._handleIconMapChange(condition, event)}
                    ></ha-selector>
                  </div>
                `;
              })}
            </div>
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'header',
          localize('editor.section.header', '', ''),
          'show_header',
          html`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${headerSchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._renderExpander(
              'header-chips',
              localize('editor.section.chips', '', ''),
              html`
                <p class="chips-hint">${localize('editor.section.chips_description', '', '')}</p>
                ${this._config.header_chips?.map((chip, index) =>
                  this._renderHeaderAttributeItem(chip, index, 'header_chips'),
                )}
                ${(this._config.header_chips?.length || 0) < 3
                  ? html`
                      <ha-button @click=${this._addHeaderChip}>
                        ${localize('editor.section.add_attribute', '', '')}
                      </ha-button>
                    `
                  : nothing}
              `,
              { nested: true },
            )}
            ${this._renderExpander(
              'header-info',
              localize('editor.section.header_info', '', ''),
              html`
                <p class="chips-hint">${localize('editor.section.header_info_description', '', '')}</p>
                ${this._config.header_info?.map((info, index) =>
                  this._renderHeaderAttributeItem(info, index, 'header_info'),
                )}
                <ha-button @click=${this._addHeaderInfo}>
                  ${localize('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              { nested: true },
            )}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'daily-forecast',
          localize('editor.section.daily_forecast', '', ''),
          'daily_forecast',
          html`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${dailySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._forecastOptionsLoading.daily && !this._dailyExtraOptions.length
              ? html`<p class="location-description">${localize('editor.main.loading_forecast_attributes')}</p>`
              : nothing}
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${localize('editor.section.extra_attribute_color', '', '')}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="daily_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.daily_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="daily_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.daily_extra_attribute_color ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${() => this._clearOptionalField('daily_extra_attribute_color')}
                  >
                    ${localize('editor.section.clear', '', '')}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${localize('editor.section.dim_values_smaller_than', '', '')}</span>
                <input
                  type="number"
                  name="daily_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${localize('editor.section.no_threshold', '', '')}
                  .value=${String(this._config.daily_extra_attribute_dim_below ?? '')}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${localize('editor.section.forecast_spacing', '', '')}</h5>
              <p class="location-description">${localize('editor.section.forecast_spacing_description', '', '')}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${localize('editor.section.daily_min_gap', '', '')}</span>
                  <input
                    type="number"
                    name="daily_min_gap"
                    min="10"
                    step="1"
                    placeholder=${localize('editor.section.default_30', '', '')}
                    .value=${String(this._config.daily_min_gap ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander(
              'daily-info',
              localize('editor.section.daily_forecast_info', '', ''),
              html`
                <p class="chips-hint">${localize('editor.section.daily_forecast_info_description', '', '')}</p>
                ${this._config.daily_info?.map((info, index) =>
                  this._renderForecastInfoItem(info, index, 'daily_info'),
                )}
                <ha-button @click=${this._addDailyInfo}>
                  ${localize('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              { nested: true },
            )}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'hourly-forecast',
          localize('editor.section.hourly_forecast', '', ''),
          'hourly_forecast',
          html`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${hourlySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._forecastOptionsLoading.hourly && !this._hourlyExtraOptions.length
              ? html`<p class="location-description">${localize('editor.main.loading_forecast_attributes')}</p>`
              : nothing}
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${localize('editor.section.extra_attribute_color', '', '')}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="hourly_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.hourly_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="hourly_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.hourly_extra_attribute_color ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${() => this._clearOptionalField('hourly_extra_attribute_color')}
                  >
                    ${localize('editor.section.clear', '', '')}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${localize('editor.section.dim_values_smaller_than', '', '')}</span>
                <input
                  type="number"
                  name="hourly_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${localize('editor.section.no_threshold', '', '')}
                  .value=${String(this._config.hourly_extra_attribute_dim_below ?? '')}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${localize('editor.section.sunrise_sunset', '', '')}</h5>
              <div class="forecast-switch">
                <span>${localize('editor.section.show_sunrise_sunset', '', '')}</span>
                <ha-switch
                  name="show_sun_times"
                  .checked=${this._config.show_sun_times ?? false}
                  @change=${this._handleSunToggleChange}
                ></ha-switch>
              </div>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${localize('editor.section.forecast_spacing', '', '')}</h5>
              <p class="location-description">${localize('editor.section.forecast_spacing_description', '', '')}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${localize('editor.section.hourly_min_gap', '', '')}</span>
                  <input
                    type="number"
                    name="hourly_min_gap"
                    min="10"
                    step="1"
                    placeholder=${localize('editor.section.default_16', '', '')}
                    .value=${String(this._config.hourly_min_gap ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander(
              'hourly-info',
              localize('editor.section.hourly_forecast_info', '', ''),
              html`
                <p class="chips-hint">${localize('editor.section.hourly_forecast_info_description', '', '')}</p>
                ${this._config.hourly_info?.map((info, index) =>
                  this._renderForecastInfoItem(info, index, 'hourly_info'),
                )}
                <ha-button @click=${this._addHourlyInfo}>
                  ${localize('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              { nested: true },
            )}
          `,
        )}
      </div>
    `;
  }

  private _headerChipChanged(e: CustomEvent, index: number) {
    if (!this._config) {
      return;
    }
    const newChips = [...(this._config.header_chips ?? [])];
    while (newChips.length <= index) {
      newChips.push({ type: 'attribute', attribute: '', name: '' });
    }
    const newChip = { ...e.detail };

    if (newChip.type === 'entity') {
      delete (newChip as any).attribute;
      delete (newChip as any).unit;
      delete (newChip as any).divisor;
    } else {
      delete (newChip as any).entity;
    }
    newChips[index] = newChip;

    this._updateConfig({ header_chips: newChips });
  }

  private _handleValueChanged(event: CustomEvent<{ value: DetailedWeatherForecastConfig }>) {
    event.stopPropagation();
    const config = { ...event.detail.value };

    const actionKeys: (keyof DetailedWeatherForecastConfig)[] = [
      'header_hold_action_temperature',
      'header_double_tap_action_temperature',
      'header_hold_action_condition',
      'header_double_tap_action_condition',
    ];

    for (const key of actionKeys) {
      if ((config[key] as any)?.action === 'none') {
        config[key] = undefined;
      }
    }

    this._updateConfig(config);
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return schema.name;
    }

    const haTranslation = this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);

    if (haTranslation) {
      return haTranslation;
    }

    const sectionKey = `editor.section.${schema.name}`;
    let localized = localize(sectionKey);
    if (localized !== sectionKey) {
      return localized;
    }

    const customKey = `editor.main.${schema.name}`;
    localized = localize(customKey);
    if (localized !== customKey) {
      return localized;
    }

    return schema.name;
  };

  private _handleSunToggleChange(event: Event) {
    const target = event.currentTarget as (HTMLElement & { name?: string; checked?: boolean }) | null;
    if (!target) {
      return;
    }
    const name = target.getAttribute('name') ?? target.name;
    if (!name) {
      return;
    }
    const key = name as keyof DetailedWeatherForecastConfig;
    const isChecked = typeof target.checked === 'boolean' ? target.checked : false;
    this._updateConfig({ [key]: isChecked } as Partial<DetailedWeatherForecastConfig>);
  }

  private _handleSunInputChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement | null;
    if (!target) {
      return;
    }
    const key = target.name as keyof DetailedWeatherForecastConfig;
    const value = target.value.trim();
    const update: Partial<DetailedWeatherForecastConfig> = {};
    (update as any)[key] = value === '' ? undefined : value;
    this._updateConfig(update);
  }

  private _handleExpanderToggle(event: Event, id: string) {
    const target = event.currentTarget as HTMLDetailsElement | null;
    if (!target) {
      return;
    }
    this._expandedSections = { ...this._expandedSections, [id]: target.open };
  }

  private _handleExpanderSummaryClick(event: Event, disabled: boolean) {
    if (!disabled) {
      return;
    }
    event.preventDefault();
  }

  private _isToggleDisabled(name: ToggleName, config: DetailedWeatherForecastConfig): boolean {
    const toggleNames: ToggleName[] = ['show_header', 'daily_forecast', 'hourly_forecast'];
    const enabledCount = toggleNames.reduce(
      (count, key) => (this._isSectionEnabled(key, config) ? count + 1 : count),
      0,
    );
    return enabledCount <= 1 && this._isSectionEnabled(name, config);
  }

  private _handleOptionalNumberInputChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement | null;
    if (!target) {
      return;
    }
    const key = target.name as keyof DetailedWeatherForecastConfig;
    const raw = target.value.trim();
    const update: Partial<DetailedWeatherForecastConfig> = {};
    if (raw === '') {
      (update as any)[key] = undefined;
    } else {
      const numericValue = Number(raw);
      (update as any)[key] = Number.isFinite(numericValue) ? numericValue : undefined;
    }
    this._updateConfig(update);
  }

  private _handleColorPickerChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement | null;
    if (!target) {
      return;
    }
    const key = target.name as keyof DetailedWeatherForecastConfig;
    const value = target.value.trim();
    const update: Partial<DetailedWeatherForecastConfig> = {};
    (update as any)[key] = value === '' ? undefined : value;
    this._updateConfig(update);
  }

  private _clearOptionalField(field: keyof DetailedWeatherForecastConfig) {
    this._updateConfig({ [field]: undefined } as Partial<DetailedWeatherForecastConfig>);
  }

  private _headerInfoChanged(e: CustomEvent, index: number) {
    if (!this._config?.header_info) {
      return;
    }

    const newInfo = [...this._config.header_info];
    newInfo[index] = e.detail;

    this._updateConfig({ header_info: newInfo });
  }

  private _deleteHeaderChip(index: number) {
    if (!this._config?.header_chips) {
      return;
    }
    const newChips = [...this._config.header_chips];
    newChips.splice(index, 1);
    this._updateConfig({ header_chips: newChips });
  }

  private _addHeaderChip() {
    const newChips = this._config?.header_chips ? [...this._config.header_chips] : [];
    if (newChips.length >= 3) return;
    newChips.push({ type: 'attribute', attribute: '', name: '' } as any);
    this._updateConfig({ header_chips: newChips });
    this._editHeaderChip(newChips.length - 1);
  }

  private _deleteHeaderInfo(index: number) {
    if (!this._config?.header_info) {
      return;
    }
    const newInfo = [...this._config.header_info];
    newInfo.splice(index, 1);
    this._updateConfig({ header_info: newInfo });
  }

  private _addHeaderInfo() {
    const newInfo = this._config?.header_info ? [...this._config.header_info] : [];
    newInfo.push({
      type: 'attribute',
      attribute: '',
      name: '',
    });
    this._updateConfig({ header_info: newInfo });
    this._editHeaderInfo(newInfo.length - 1);
  }

  private _dailyInfoChanged(e: CustomEvent, index: number) {
    if (!this._config?.daily_info) {
      return;
    }

    const newInfo = [...this._config.daily_info];
    newInfo[index] = e.detail;

    this._updateConfig({ daily_info: newInfo });
  }

  private _deleteDailyInfo(index: number) {
    if (!this._config?.daily_info) {
      return;
    }
    const newInfo = [...this._config.daily_info];
    newInfo.splice(index, 1);
    this._updateConfig({ daily_info: newInfo });
  }

  private _addDailyInfo() {
    const newInfo = this._config?.daily_info ? [...this._config.daily_info] : [];
    newInfo.push({
      attribute: '',
      name: '',
    });
    this._updateConfig({ daily_info: newInfo });
    this._editDailyInfo(newInfo.length - 1);
  }

  private _hourlyInfoChanged(e: CustomEvent, index: number) {
    if (!this._config?.hourly_info) {
      return;
    }

    const newInfo = [...this._config.hourly_info];
    newInfo[index] = e.detail;

    this._updateConfig({ hourly_info: newInfo });
  }

  private _deleteHourlyInfo(index: number) {
    if (!this._config?.hourly_info) {
      return;
    }
    const newInfo = [...this._config.hourly_info];
    newInfo.splice(index, 1);
    this._updateConfig({ hourly_info: newInfo });
  }

  private _addHourlyInfo() {
    const newInfo = this._config?.hourly_info ? [...this._config.hourly_info] : [];
    newInfo.push({
      attribute: '',
      name: '',
    });
    this._updateConfig({ hourly_info: newInfo });
    this._editHourlyInfo(newInfo.length - 1);
  }

  private _editHeaderChip(index: number) {
    this._subElementEditorConfig = { type: 'header_chips', index };
  }

  private _editHeaderInfo(index: number) {
    this._subElementEditorConfig = { type: 'header_info', index };
  }

  private _editDailyInfo(index: number) {
    this._subElementEditorConfig = { type: 'daily_info', index };
  }

  private _editHourlyInfo(index: number) {
    this._subElementEditorConfig = { type: 'hourly_info', index };
  }

  private _goBack(ev?: Event) {
    if (ev) {
      ev.stopPropagation();
    }

    // Rekursiv das wirklich aktive Element finden (auch durch Shadow DOMs wie bei ha-form)
    let active = this.shadowRoot?.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    if (active && typeof (active as HTMLElement).blur === 'function') {
      (active as HTMLElement).blur();
    }

    const editorConfig = this._subElementEditorConfig;

    // Erhöhe den Timeout (150ms), damit HA-Dropdowns ihre Schließ-Animation beenden können
    window.setTimeout(async () => {
      this._subElementEditorConfig = undefined;
      if (editorConfig) {
        await this.updateComplete;
        // Noch einen Frame warten, bis das DOM fertig gezeichnet und berechnet ist, bevor gescrollt wird
        requestAnimationFrame(() => {
          const el = this.shadowRoot?.querySelector(`#info-item-${editorConfig.type}-${editorConfig.index}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    }, 150);
  }

  private _renderSubElementEditor() {
    if (!this._subElementEditorConfig || !this._config) {
      return nothing;
    }

    const { type, index } = this._subElementEditorConfig;

    let editorTemplate;
    let title = '';

    if (type === 'header_info' || type === 'header_chips') {
      title =
        type === 'header_info'
          ? localize('editor.section.header_info', '', '')
          : localize('editor.section.chips', '', '');
      const config = type === 'header_info' ? this._config.header_info[index] : this._config.header_chips![index];
      editorTemplate = html`
        <header-info-editor
          .hass=${this.hass}
          .weatherEntity=${this._config.entity}
          .config=${config}
          @header-info-config-changed=${(e: CustomEvent) =>
            type === 'header_info' ? this._headerInfoChanged(e, index) : this._headerChipChanged(e, index)}
        ></header-info-editor>
      `;
    } else if (type === 'daily_info') {
      title = localize('editor.section.daily_forecast_info', '', '');
      const config = this._config.daily_info[index];
      editorTemplate = html`
        <forecast-attribute-editor
          .hass=${this.hass}
          .config=${config}
          .extraAttributeOptions=${this._buildDailyExtraAttributeOptions(true)}
          @forecast-info-config-changed=${(e: CustomEvent) => this._dailyInfoChanged(e, index)}
        ></forecast-attribute-editor>
      `;
    } else if (type === 'hourly_info') {
      title = localize('editor.section.hourly_forecast_info', '', '');
      const config = this._config.hourly_info[index];
      editorTemplate = html`
        <forecast-attribute-editor
          .hass=${this.hass}
          .config=${config}
          .extraAttributeOptions=${this._buildHourlyExtraAttributeOptions(true)}
          @forecast-info-config-changed=${(e: CustomEvent) => this._hourlyInfoChanged(e, index)}
        ></forecast-attribute-editor>
      `;
    }

    return html`
      <div class="sub-element-editor">
        <div class="header">
          <ha-icon-button @click=${this._goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </ha-icon-button>
          <span class="title">${title}</span>
        </div>
        ${editorTemplate}
      </div>
    `;
  }

  private _renderHeaderAttributeItem(info: any, index: number, type: 'header_info' | 'header_chips') {
    const label = info.type === 'entity' ? info.entity : info.attribute;
    const typeLabel =
      info.type === 'entity' ? localize('editor.chip.entity', '', '') : localize('editor.chip.attribute', '', '');
    const displayLabel = info.name
      ? `${info.name} (${label || localize('editor.common.none', '', '')})`
      : label || localize('editor.common.none', '', '');

    const isDragging = this._draggedIndex === index && this._draggedListType === type;
    const isDragOver = this._dragOverIndex === index && this._dragOverListType === type;
    const classes = `info-list-item ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`;

    return html`
      <div
        class="${classes}"
        id="info-item-${type}-${index}"
        draggable="true"
        @dragstart=${(e: DragEvent) => this._handleDragStart(e, type, index)}
        @dragend=${() => this._handleDragEnd()}
        @dragover=${(e: DragEvent) => this._handleDragOver(e, type, index)}
        @drop=${(e: DragEvent) => this._handleDrop(e, type, index)}
      >
        <div class="handle">
          <ha-icon icon="mdi:drag"></ha-icon>
        </div>
        <div class="info-list-content">
          <span class="info-list-label">${displayLabel}</span>
          <span class="info-list-secondary">${typeLabel}</span>
        </div>
        <ha-icon-button
          @click=${() => (type === 'header_info' ? this._editHeaderInfo(index) : this._editHeaderChip(index))}
        >
          <ha-icon icon="mdi:pencil"></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          @click=${() => (type === 'header_info' ? this._deleteHeaderInfo(index) : this._deleteHeaderChip(index))}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </div>
    `;
  }

  private _renderForecastInfoItem(info: any, index: number, type: 'daily_info' | 'hourly_info') {
    const label = info.attribute || localize('editor.common.none', '', '');
    const displayLabel = info.name ? `${info.name} (${label})` : label;

    const isDragging = this._draggedIndex === index && this._draggedListType === type;
    const isDragOver = this._dragOverIndex === index && this._dragOverListType === type;
    const classes = `info-list-item ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`;

    return html`
      <div
        class="${classes}"
        id="info-item-${type}-${index}"
        draggable="true"
        @dragstart=${(e: DragEvent) => this._handleDragStart(e, type, index)}
        @dragend=${() => this._handleDragEnd()}
        @dragover=${(e: DragEvent) => this._handleDragOver(e, type, index)}
        @drop=${(e: DragEvent) => this._handleDrop(e, type, index)}
      >
        <div class="handle">
          <ha-icon icon="mdi:drag"></ha-icon>
        </div>
        <div class="info-list-content">
          <span class="info-list-label">${displayLabel}</span>
        </div>
        <ha-icon-button
          @click=${() => (type === 'daily_info' ? this._editDailyInfo(index) : this._editHourlyInfo(index))}
        >
          <ha-icon icon="mdi:pencil"></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          @click=${() => (type === 'daily_info' ? this._deleteDailyInfo(index) : this._deleteHourlyInfo(index))}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </div>
    `;
  }

  private _handleDragStart(
    ev: DragEvent,
    type: 'header_chips' | 'header_info' | 'daily_info' | 'hourly_info',
    index: number,
  ) {
    this._draggedIndex = index;
    this._draggedListType = type;
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      ev.dataTransfer.setData('text/plain', index.toString());
    }
  }

  private _handleDragEnd() {
    this._draggedIndex = -1;
    this._draggedListType = undefined;
    this._dragOverIndex = -1;
    this._dragOverListType = undefined;
  }

  private _handleDragOver(
    ev: DragEvent,
    type: 'header_chips' | 'header_info' | 'daily_info' | 'hourly_info',
    index: number,
  ) {
    ev.preventDefault(); // Wird benötigt, um das Fallenlassen (Drop) zu erlauben
    if (this._draggedListType === type && this._draggedIndex !== index) {
      if (ev.dataTransfer) {
        ev.dataTransfer.dropEffect = 'move';
      }
      if (this._dragOverIndex !== index) {
        this._dragOverIndex = index;
        this._dragOverListType = type;
      }
    }
  }

  private _handleDrop(
    ev: DragEvent,
    type: 'header_chips' | 'header_info' | 'daily_info' | 'hourly_info',
    targetIndex: number,
  ) {
    ev.preventDefault();
    const sourceIndex = this._draggedIndex;
    const sourceType = this._draggedListType;

    this._handleDragEnd(); // Reset Drag-Zustände

    if (sourceType !== type || sourceIndex === -1 || sourceIndex === targetIndex) {
      return;
    }

    const list = [...(this._config![type] || [])];
    const movedItem = list.splice(sourceIndex, 1)[0];
    list.splice(targetIndex, 0, movedItem);

    this._updateConfig({ [type]: list });
  }

  private _getIconMapValue(condition: WeatherCondition): string {
    const iconMap = this._config?.icon_map;
    if (!iconMap) {
      return '';
    }
    const value = iconMap[condition];
    return typeof value === 'string' ? value : '';
  }

  private _handleIconMapChange(condition: WeatherCondition, event: CustomEvent<{ value?: unknown }>) {
    event.stopPropagation();
    if (!this._config) {
      return;
    }
    const raw = event.detail?.value;
    const value = typeof raw === 'string' ? raw.trim() : '';
    const nextMap = { ...(this._config.icon_map ?? {}) };

    if (!value) {
      delete (nextMap as Partial<Record<WeatherCondition, string>>)[condition];
    } else {
      (nextMap as Partial<Record<WeatherCondition, string>>)[condition] = value;
    }

    this._updateConfig({ icon_map: Object.keys(nextMap).length ? nextMap : undefined });
  }

  private _getColorPickerValue(value?: string): string {
    if (!value) {
      return '#000000';
    }
    const trimmed = value.trim();
    const hexMatch = /^#([0-9a-fA-F]{3}){1,2}$/.test(trimmed);
    if (!hexMatch) {
      return '#000000';
    }
    if (trimmed.length === 4) {
      const [r, g, b] = trimmed.slice(1).split('');
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return trimmed;
  }

  private _handleSolarForecastSelectionChange(event: CustomEvent<{ value?: unknown }>) {
    event.stopPropagation();
    const raw = event.detail?.value;
    const selection = Array.isArray(raw) ? raw.filter((item) => typeof item === 'string') : [];
    const available = this._solarForecastEntryIds;
    const normalized = selection.filter((entryId) => available.includes(entryId));
    const update: Partial<DetailedWeatherForecastConfig> = {};

    if (!normalized.length) {
      update.solar_forecast_entries = [];
    } else if (normalized.length === available.length) {
      update.solar_forecast_entries = undefined;
    } else {
      update.solar_forecast_entries = normalized;
    }

    this._updateConfig(update);
  }

  private _getSolarForecastSelection(): string[] {
    if (this._config?.solar_forecast_entries) {
      return this._config.solar_forecast_entries;
    }

    return this._solarForecastEntryIds;
  }

  private _renderExpander(
    id: string,
    title: string,
    content: TemplateResult,
    options: { open?: boolean; nested?: boolean } = {},
  ): TemplateResult {
    const className = options.nested ? 'editor-expander nested' : 'editor-expander';
    const isOpen = this._expandedSections[id] ?? options.open ?? false;
    return html`
      <details class=${className} ?open=${isOpen} @toggle=${(event: Event) => this._handleExpanderToggle(event, id)}>
        <summary>
          <span>${title}</span>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="expander-content">${isOpen ? content : nothing}</div>
      </details>
    `;
  }

  private _renderToggleExpander(
    id: string,
    title: string,
    toggleName: ToggleName,
    content: TemplateResult,
    options: { open?: boolean } = {},
  ): TemplateResult | typeof nothing {
    const config = this._config;
    if (!config) {
      return nothing;
    }
    const isEnabled = this._isSectionEnabled(toggleName, config);
    const toggleDisabled = this._isToggleDisabled(toggleName, config);
    const isOpen = isEnabled && (this._expandedSections[id] ?? options.open ?? false);
    const className = `editor-expander${isEnabled ? '' : ' disabled'}`;

    return html`
      <details class=${className} ?open=${isOpen} @toggle=${(event: Event) => this._handleExpanderToggle(event, id)}>
        <summary @click=${(event: Event) => this._handleExpanderSummaryClick(event, !isEnabled)}>
          <span>${title}</span>
          <span class="summary-actions">
            <ha-switch
              class="expander-toggle"
              name=${toggleName}
              .checked=${isEnabled}
              ?disabled=${toggleDisabled}
              @click=${(event: Event) => event.stopPropagation()}
              @change=${this._handleSunToggleChange}
            ></ha-switch>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </span>
        </summary>
        <div class="expander-content">${isOpen ? content : nothing}</div>
      </details>
    `;
  }

  private _ensureSolarForecastOptions() {
    this._refreshSolarForecastOptions(false);
  }

  private _refreshSolarForecastOptions(force: boolean) {
    if (!this.hass || this._solarForecastOptionsPromise) {
      return;
    }
    if (!force && this._solarForecastOptionsLoaded) {
      return;
    }

    this._solarForecastOptionsPromise = this._fetchSolarForecastOptions().finally(() => {
      this._solarForecastOptionsPromise = undefined;
    });
  }

  private async _fetchSolarForecastOptions() {
    try {
      const prefs = await this.hass.callWS<EnergyPreferences>({ type: 'energy/get_prefs' });
      const entryIds = this._extractSolarForecastEntries(prefs);
      const entries = await this.hass.callWS<ConfigEntryFragment[]>({ type: 'config_entries/get' });
      const entryMap = new Map(entries.map((entry) => [entry.entry_id, entry]));
      const options = entryIds.map((entryId) => {
        const entry = entryMap.get(entryId);
        const title = entry?.title?.trim();
        const domain = entry?.domain?.trim();
        const labelParts = [];
        if (title) {
          labelParts.push(title);
        }
        if (domain) {
          labelParts.push(domain);
        }
        const label = labelParts.length ? labelParts.join(' - ') : entryId;
        return { value: entryId, label };
      });

      this._solarForecastOptions = options;
      this._solarForecastEntryIds = entryIds;
    } catch {
      this._solarForecastOptions = [];
      this._solarForecastEntryIds = [];
    }

    this._solarForecastOptionsLoaded = true;
  }

  private _extractSolarForecastEntries(prefs?: EnergyPreferences): string[] {
    const energySources = prefs?.energy_sources ?? [];
    const entries = new Set<string>();

    energySources.forEach((source) => {
      if (source?.type !== 'solar') {
        return;
      }
      const configured = source.config_entry_solar_forecast;
      if (!Array.isArray(configured)) {
        return;
      }
      configured.forEach((entryId) => {
        if (typeof entryId === 'string' && entryId.trim().length) {
          entries.add(entryId);
        }
      });
    });

    return Array.from(entries);
  }

  private _generalSchema: HaFormSchema[] = [{ name: 'entity', selector: { entity: { domain: 'weather' } } }];

  private _buildHeaderSchema = memoizeOne((compactHeader?: boolean, nowcastEntity?: string): HaFormSchema[] => {
    const schema: HaFormSchema[] = [
      {
        name: 'header_temperature_entity',
        selector: { entity: { domain: 'sensor', device_class: 'temperature' } },
        optional: true,
      },
      { name: 'moon_phase_entity', selector: { entity: { domain: 'sensor' } }, optional: true },
      { name: 'compact_header', selector: { boolean: {} } },
    ];

    if (!compactHeader) {
      schema.push({ name: 'show_animation', selector: { boolean: {} } });
      schema.push({ name: 'use_night_header_backgrounds', selector: { boolean: {} } });
    }

    schema.push({
      name: 'nowcast',
      type: 'expandable',
      flatten: true,
      schema: [
        { name: 'nowcast_entity', selector: { entity: { domain: 'weather' } }, optional: true },
        { name: 'nowcast_always_show', selector: { boolean: {} }, optional: true, disabled: !nowcastEntity },
      ],
    });

    schema.push({
      name: 'interactions',
      type: 'expandable',
      flatten: true,
      icon: 'mdi:gesture-tap',
      schema: [
        { name: 'header_tap_action_temperature', selector: { ui_action: {} }, optional: true },
        {
          name: 'header_hold_action_temperature',
          selector: { ui_action: { default_action: 'none' } },
          optional: true,
        },
        {
          name: 'header_double_tap_action_temperature',
          selector: { ui_action: { default_action: 'none' } },
          optional: true,
        },
        { name: 'header_tap_action_condition', selector: { ui_action: {} }, optional: true },
        {
          name: 'header_hold_action_condition',
          selector: { ui_action: { default_action: 'none' } },
        },
        {
          name: 'header_double_tap_action_condition',
          selector: { ui_action: { default_action: 'none' } },
        },
      ],
    });

    return schema;
  });

  private _buildHourlySchema = memoizeOne((options: Array<{ value: string; label: string }>): HaFormSchema[] => [
    { name: 'hourly_extra_attribute', selector: { select: { options, custom_value: true } }, optional: true },
    { name: 'hourly_extra_attribute_unit', selector: { text: {} }, optional: true },
    { name: 'hourly_extra_attribute_divisor', selector: { text: {} }, optional: true },
  ]);

  private _buildDailySchema = memoizeOne(
    (options: Array<{ value: string; label: string }>, dailyExtraAttr?: string): HaFormSchema[] => [
      { name: 'daily_extra_attribute', selector: { select: { options, custom_value: true } }, optional: true },
      {
        name: 'daily_extra_attribute_unit',
        selector: { text: {} },
        optional: true,
        disabled: dailyExtraAttr === 'precipitation_probability',
      },
      { name: 'daily_extra_attribute_divisor', selector: { number: {} }, optional: true },
    ],
  );

  private _hourlyOptionsMemo = memoizeOne(
    (extraOptions: string[], solarIds: string[], weatherEntityId: string | undefined) => {
      return this._buildOptionsArray(extraOptions, solarIds, weatherEntityId, false);
    },
  );

  private _dailyOptionsMemo = memoizeOne(
    (extraOptions: string[], solarIds: string[], weatherEntityId: string | undefined) => {
      return this._buildOptionsArray(extraOptions, solarIds, weatherEntityId, false);
    },
  );

  private _buildOptionsArray(
    sourceOptions: string[],
    solarIds: string[],
    weatherEntityId: string | undefined,
    includeDisallowed: boolean,
  ): Array<{ value: string; label: string }> {
    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
    const options = sourceOptions.length
      ? sourceOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
      : [];

    const solarOption = solarIds.length
      ? [{ value: SOLAR_FORECAST_OPTION, label: localize('editor.common.solar_forecast', '', '') }]
      : [];

    const weather = weatherEntityId && this.hass ? (this.hass.states[weatherEntityId] as WeatherEntity) : undefined;

    const attributeOptions = options.map((attribute) => {
      const name = weather && this.hass ? formatWeatherAttributeName(this.hass, weather, attribute) : attribute;
      return { value: attribute, label: name };
    });

    return [{ value: '', label: localize('editor.common.none', '', '') }, ...solarOption, ...attributeOptions];
  }

  private _buildHourlyExtraAttributeOptions(includeDisallowed = false): Array<{ value: string; label: string }> {
    if (includeDisallowed) {
      return this._buildOptionsArray(
        this._hourlyExtraOptions,
        this._solarForecastEntryIds,
        this._config?.entity,
        includeDisallowed,
      );
    }
    return this._hourlyOptionsMemo(this._hourlyExtraOptions, this._solarForecastEntryIds, this._config?.entity);
  }

  private _buildDailyExtraAttributeOptions(includeDisallowed = false): Array<{ value: string; label: string }> {
    if (includeDisallowed) {
      return this._buildOptionsArray(
        this._dailyExtraOptions,
        this._solarForecastEntryIds,
        this._config?.entity,
        includeDisallowed,
      );
    }
    return this._dailyOptionsMemo(this._dailyExtraOptions, this._solarForecastEntryIds, this._config?.entity);
  }

  private _buildSchemas(): {
    general: HaFormSchema[];
    header: HaFormSchema[];
    hourly: HaFormSchema[];
    daily: HaFormSchema[];
  } {
    return {
      general: this._generalSchema,
      header: this._buildHeaderSchema(this._config?.compact_header, this._config?.nowcast_entity),
      hourly: this._buildHourlySchema(this._buildHourlyExtraAttributeOptions()),
      daily: this._buildDailySchema(this._buildDailyExtraAttributeOptions(), this._config?.daily_extra_attribute),
    };
  }

  private _isSectionEnabled(name: ToggleName, config: DetailedWeatherForecastConfig): boolean {
    const value = config[name];
    return value !== false;
  }

  private _normalizeHeaderChips(config: Partial<DetailedWeatherForecastConfig>): HeaderAttribute[] {
    const limit = 3;
    const normalized: HeaderAttribute[] = [];

    if (Array.isArray(config.header_chips)) {
      for (const chip of config.header_chips) {
        if (normalized.length >= limit || !chip || typeof chip !== 'object') {
          continue;
        }

        if (chip.type === 'attribute') {
          const attribute = typeof chip.attribute === 'string' ? chip.attribute.trim() : '';
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const unit = typeof chip.unit === 'string' ? chip.unit.trim() : undefined;
          const divisor = chip.divisor;
          const normalizedChip: any = {
            type: 'attribute',
            attribute,
            name: chip.name ?? '',
          };
          if (chip.tap_action !== undefined) normalizedChip.tap_action = chip.tap_action;
          if (chip.hold_action !== undefined) normalizedChip.hold_action = chip.hold_action;
          if (chip.double_tap_action !== undefined) normalizedChip.double_tap_action = chip.double_tap_action;
          if (icon !== undefined) normalizedChip.icon = icon;
          if (unit !== undefined) normalizedChip.unit = unit;
          if (divisor !== undefined) normalizedChip.divisor = divisor;
          normalized.push(normalizedChip);
          continue;
        }

        if (chip.type === 'entity') {
          const entity = typeof chip.entity === 'string' ? chip.entity.trim() : '';
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const normalizedChip: any = {
            type: 'entity',
            entity,
            name: chip.name ?? '',
          };
          if (chip.tap_action !== undefined) normalizedChip.tap_action = chip.tap_action;
          if (chip.hold_action !== undefined) normalizedChip.hold_action = chip.hold_action;
          if (chip.double_tap_action !== undefined) normalizedChip.double_tap_action = chip.double_tap_action;
          if (icon !== undefined) normalizedChip.icon = icon;
          normalized.push(normalizedChip);
        }
      }
    }

    if (normalized.length) {
      return normalized.slice(0, limit);
    }

    const attributeEntries = Array.isArray(config.header_attributes)
      ? config.header_attributes
          .filter((attr, index) => index < limit && typeof attr === 'string')
          .map((attr) => attr.trim())
          .filter((attr) => attr.length > 0)
      : [];

    return attributeEntries.map((attribute) => ({ type: 'attribute', attribute, name: attribute }));
  }

  private _updateConfig(changes: Partial<DetailedWeatherForecastConfig>) {
    if (!this._config) {
      return;
    }

    const updated: DetailedWeatherForecastConfig = {
      ...this._config,
      ...changes,
      type: 'custom:detailed-weather-forecast-card',
    };

    if ('solar_forecast_entries' in changes && changes.solar_forecast_entries === undefined) {
      delete (updated as Partial<DetailedWeatherForecastConfig>).solar_forecast_entries;
    }

    const normalizedChips = this._normalizeHeaderChips(updated);
    updated.header_chips = normalizedChips;
    updated.header_attributes = normalizedChips
      .filter((chip) => chip.type === 'attribute')
      .map((chip) => chip.attribute)
      .filter((attribute) => typeof attribute === 'string' && attribute.trim().length > 0);

    this._config = updated;
    fireEvent(this, 'config-changed', { config: updated });
  }

  private _refreshForecastOptions() {
    try {
      if (!this.hass || !this._config?.entity) {
        this._teardownForecastOptionSubscriptions();
        if (this._hourlyExtraOptions.length || this._dailyExtraOptions.length) {
          this._hourlyExtraOptions = [];
          this._dailyExtraOptions = [];
        }
        if (
          this._forecastOptionsLoading.hourly ||
          this._forecastOptionsLoading.daily ||
          this._forecastOptionsLoading.twice_daily
        ) {
          this._forecastOptionsLoading = { hourly: false, daily: false, twice_daily: false };
        }
        this._forecastOptionsEntity = undefined;
        return;
      }

      const entityId = this._config.entity;
      if (this._forecastOptionsEntity !== entityId) {
        this._teardownForecastOptionSubscriptions();
        const cached = FORECAST_OPTIONS_CACHE.get(entityId);
        if (cached) {
          this._hourlyExtraOptions = cached.hourly;
          this._dailyExtraOptions = cached.daily;
          this._forecastOptionsLoading = { hourly: false, daily: false, twice_daily: false };
        } else {
          this._forecastOptionsLoading = { hourly: false, daily: false, twice_daily: false };
        }
        this._forecastOptionsEntity = entityId;
      }

      const stateObj = this.hass.states[entityId];

      const supported = this._getSupportedForecastTypes(stateObj as any);
      const needed = new Set<ModernForecastType>();
      if (supported.includes('hourly')) {
        needed.add('hourly');
      }
      if (supported.includes('daily') || supported.includes('twice_daily')) {
        needed.add('daily');
      }
      if (!needed.size) {
        needed.add('daily');
      }

      const nextLoading = { ...this._forecastOptionsLoading };
      let loadingChanged = false;

      (['hourly', 'daily'] as ModernForecastType[]).forEach((type) => {
        if (!needed.has(type)) {
          this._teardownForecastOptionSubscriptions([type]);
          if (nextLoading[type]) {
            nextLoading[type] = false;
            loadingChanged = true;
          }
        } else if (!this._forecastOptionSubscriptions[type]) {
          try {
            this._forecastOptionSubscriptions[type] = this._subscribeForecast(entityId, type, (event) =>
              this._handleForecastOptionsEvent(type, event),
            );
            const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
            const isLoading = !hasOptions;
            if (nextLoading[type] !== isLoading) {
              nextLoading[type] = isLoading;
              loadingChanged = true;
            }
          } catch {
            // ignore subscription errors to avoid breaking the editor
          }
        } else {
          const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
          const isLoading = !hasOptions;
          if (nextLoading[type] !== isLoading) {
            nextLoading[type] = isLoading;
            loadingChanged = true;
          }
        }
      });

      if (loadingChanged) {
        this._forecastOptionsLoading = nextLoading;
      }
    } catch {
      // Fall back to attribute-based detection to keep the editor alive
      try {
        if (this.hass && this._config?.entity) {
          this._applyForecastOptionsFromAttributes(this.hass.states[this._config.entity] as any);
        }
      } catch {
        // ignore
      }
    }
  }

  private _handleForecastOptionsEvent(type: ModernForecastType, event: ForecastEvent) {
    const entries = Array.isArray(event?.forecast) ? event.forecast : [];
    if (!entries.length) {
      return;
    }

    const keys = new Set<string>();

    entries.forEach((entry) => {
      if (entry && typeof entry === 'object') {
        Object.keys(entry).forEach((key) => {
          keys.add(key);
        });
      }
    });

    const next = Array.from(keys).sort((a, b) => a.localeCompare(b));
    if (type === 'hourly') {
      if (next.join('|') !== this._hourlyExtraOptions.join('|')) {
        this._hourlyExtraOptions = next;
      }
      this._forecastOptionsLoading = { ...this._forecastOptionsLoading, hourly: false };
    } else {
      if (next.join('|') !== this._dailyExtraOptions.join('|')) {
        this._dailyExtraOptions = next;
      }
      this._forecastOptionsLoading = { ...this._forecastOptionsLoading, daily: false };
    }

    this._cacheForecastOptions();
  }

  private _applyForecastOptionsFromAttributes(stateObj: any) {
    if (!stateObj?.attributes?.forecast) {
      return;
    }
    const entries = Array.isArray(stateObj.attributes.forecast) ? stateObj.attributes.forecast : [];
    if (!entries.length) {
      return;
    }

    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
    const keys = new Set<string>();
    entries.forEach((entry) => {
      if (entry && typeof entry === 'object') {
        Object.keys(entry).forEach((key) => {
          if (!disallowed.has(key)) {
            keys.add(key);
          }
        });
      }
    });

    const options = Array.from(keys).sort((a, b) => a.localeCompare(b));
    if (options.join('|') !== this._hourlyExtraOptions.join('|')) {
      this._hourlyExtraOptions = options;
    }
    if (options.join('|') !== this._dailyExtraOptions.join('|')) {
      this._dailyExtraOptions = options;
    }
    this._forecastOptionsLoading = { ...this._forecastOptionsLoading, hourly: false, daily: false };

    this._cacheForecastOptions();
  }

  private _cacheForecastOptions() {
    if (!this._forecastOptionsEntity) {
      return;
    }
    if (!this._hourlyExtraOptions.length && !this._dailyExtraOptions.length) {
      return;
    }
    FORECAST_OPTIONS_CACHE.set(this._forecastOptionsEntity, {
      hourly: [...this._hourlyExtraOptions],
      daily: [...this._dailyExtraOptions],
    });
  }

  private _getSupportedForecastTypes(stateObj: any): ModernForecastType[] {
    if (!stateObj?.attributes) {
      return [];
    }
    const supported: ModernForecastType[] = [];
    const features = stateObj.attributes.supported_features ?? 0;
    if ((features & WeatherEntityFeature.FORECAST_DAILY) !== 0) {
      supported.push('daily');
    }
    if ((features & WeatherEntityFeature.FORECAST_TWICE_DAILY) !== 0) {
      supported.push('twice_daily');
    }
    if ((features & WeatherEntityFeature.FORECAST_HOURLY) !== 0) {
      supported.push('hourly');
    }
    return supported;
  }

  private _subscribeForecast(
    entityId: string,
    forecastType: ModernForecastType,
    callback: (event: ForecastEvent) => void,
  ): Promise<() => void> | undefined {
    if (!this.hass?.connection) {
      this._applyForecastOptionsFromAttributes(this.hass.states[entityId] as any);
      return undefined;
    }

    return this.hass.connection
      .subscribeMessage<ForecastEvent>(callback, {
        type: 'weather/subscribe_forecast',
        forecast_type: forecastType,
        entity_id: entityId,
      })
      .catch(() => undefined);
  }

  private _teardownForecastOptionSubscriptions(types?: ModernForecastType[]) {
    const targets = types ?? (['hourly', 'daily'] as ModernForecastType[]);
    const nextLoading = { ...this._forecastOptionsLoading };
    let loadingChanged = false;

    targets.forEach((type) => {
      const sub = this._forecastOptionSubscriptions[type];
      sub?.then((unsub) => unsub?.()).catch(() => undefined);
      delete this._forecastOptionSubscriptions[type];
      if (nextLoading[type]) {
        nextLoading[type] = false;
        loadingChanged = true;
      }
    });

    if (loadingChanged) {
      this._forecastOptionsLoading = nextLoading;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownForecastOptionSubscriptions();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'detailed-weather-forecast-editor': DetailedWeatherForecastEditor;
  }
}
