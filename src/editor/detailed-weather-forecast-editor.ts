import { css, html, LitElement, nothing, TemplateResult } from 'lit';
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
  | { ui_action: { actions?: Array<'tap' | 'hold' | 'double_tap'> } }
  | { select: { options: Array<{ value: string; label: string }>; custom_value?: boolean; multiple?: boolean } };

type HaFormSchema = {
  name: keyof DetailedWeatherForecastConfig | 'entity';
  selector: HaFormSelector;
  optional?: boolean;
  disabled?: boolean;
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

  private _forecastOptionSubscriptions: Partial<Record<ModernForecastType, Promise<() => void> | undefined>> = {};

  private _forecastOptionsEntity?: string;

  private _solarForecastOptionsLoaded = false;

  private _solarForecastOptionsPromise?: Promise<void>;

  static styles = css`
    .editor-section {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-section:first-of-type {
      margin-top: 16px;
    }

    .section-subtitle {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-subsection {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chips-hint {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .location-description {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .sun-coordinates {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .color-input-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .color-input-row input[type='color'] {
      padding: 0;
      width: 40px;
      height: 32px;
      border: none;
      background: none;
    }

    .color-input-row input[type='text'] {
      flex: 1 1 120px;
      min-width: 120px;
    }

    .icon-map-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .icon-map-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-map-row ha-selector {
      flex: 1 1 auto;
    }

    .clear-button {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));

      cursor: pointer;
      font: inherit;
      color: var(--primary-text-color);
    }

    .clear-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .coordinate-field {
      display: flex;
      flex: 1 1 120px;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .coordinate-field input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .coordinate-field input:disabled {
      opacity: 0.6;
    }

    .forecast-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .forecast-switch span {
      font-size: 14px;
    }

    .editor-expander {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
    }

    .editor-expander summary {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-expander summary::-webkit-details-marker {
      display: none;
    }

    .editor-expander > summary ha-icon {
      transition: transform 0.2s ease;
    }

    .editor-expander[open] > summary ha-icon {
      transform: rotate(180deg);
    }

    .editor-expander[open] summary {
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .editor-expander .summary-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .editor-expander.disabled summary {
      color: var(--secondary-text-color);
      cursor: default;
    }

    .editor-expander.disabled > summary ha-icon {
      opacity: 0.4;
    }

    .editor-expander .expander-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-expander.nested summary {
      padding: 10px 12px;
      font-size: 14px;
    }

    .editor-expander.nested .expander-content {
      padding: 12px;
    }

    .header-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .header-info-item > *:first-child {
      flex: 1;
    }

    .chip-editor {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 12px;
    }

    .forecast-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .forecast-info-item > *:first-child {
      flex: 1;
    }

    .editor-expander.nested .expander-content > ha-button {
      align-self: flex-start;
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

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    this._refreshForecastOptions();
    this._ensureSolarForecastOptions();

    const {
      general: generalSchema,
      header: headerSchema,
      nowcast: nowcastSchema,
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
                ${[0, 1, 2].map(
                  (index) => html`
                    <div class="chip-editor">
                      <header-entity-editor
                        .hass=${this.hass}
                        .weatherEntity=${this._config?.entity}
                        .config=${(this._config?.header_chips?.[index] as HeaderAttribute) ||
                        ({
                          type: 'attribute',
                          attribute: '',
                          name: '',
                        } as HeaderAttribute)}
                        @header-info-config-changed=${(e: CustomEvent) => this._headerChipChanged(e, index)}
                      ></header-entity-editor>
                    </div>
                  `,
                )}
              `,
              { nested: true },
            )}
            ${this._renderExpander(
              'header-nowcast',
              localize('editor.section.nowcast', '', ''),
              html`
                <p class="location-description">${localize('editor.section.nowcast_description', '', '')}</p>
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${nowcastSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `,
              { nested: true },
            )}
            ${this._renderExpander(
              'header-info',
              localize('editor.section.header_info', '', ''),
              html`
                <p class="chips-hint">${localize('editor.section.header_info_description', '', '')}</p>
                ${this._config.header_info?.map(
                  (info, index) => html`
                    <div class="header-info-item">
                      <header-entity-editor
                        .hass=${this.hass}
                        .weatherEntity=${this._config?.entity}
                        .config=${info}
                        @header-info-config-changed=${(e: CustomEvent) => this._headerInfoChanged(e, index)}
                      ></header-entity-editor>
                      <ha-icon-button @click=${() => this._deleteHeaderInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `,
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
                ${this._config.daily_info?.map(
                  (info, index) => html`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${info}
                        .extraAttributeOptions=${this._buildDailyExtraAttributeOptions(true)}
                        @forecast-info-config-changed=${(e: CustomEvent) => this._dailyInfoChanged(e, index)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${() => this._deleteDailyInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `,
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
                ${this._config.hourly_info?.map(
                  (info, index) => html`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${info}
                        .extraAttributeOptions=${this._buildHourlyExtraAttributeOptions(true)}
                        @forecast-info-config-changed=${(e: CustomEvent) => this._hourlyInfoChanged(e, index)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${() => this._deleteHourlyInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `,
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
    this._updateConfig(event.detail.value);
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return schema.name;
    }

    const haTranslation = this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);

    if (haTranslation) {
      return haTranslation;
    }

    const customKey = `editor.main.${schema.name}`;
    const localized = localize(customKey);
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
    const oldItem = newInfo[index];
    newInfo[index] = { ...oldItem, ...e.detail };

    this._updateConfig({ header_info: newInfo });
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
  }

  private _dailyInfoChanged(e: CustomEvent, index: number) {
    if (!this._config?.daily_info) {
      return;
    }

    const newInfo = [...this._config.daily_info];
    const oldItem = newInfo[index];
    newInfo[index] = { ...oldItem, ...e.detail };

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
  }

  private _hourlyInfoChanged(e: CustomEvent, index: number) {
    if (!this._config?.hourly_info) {
      return;
    }

    const newInfo = [...this._config.hourly_info];
    const oldItem = newInfo[index];
    newInfo[index] = { ...oldItem, ...e.detail };

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
        <div class="expander-content">${content}</div>
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
        <div class="expander-content">${content}</div>
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

  private _buildAttributeOptions(): Array<{ value: string; label: string }> {
    if (!this.hass) {
      return [{ value: '', label: localize('editor.common.none', '', '') }];
    }

    const entityId = this._config?.entity;
    if (!entityId) {
      return [{ value: '', label: localize('editor.common.none', '', '') }];
    }

    const entityState = this.hass.states[entityId];
    if (!entityState) {
      return [{ value: '', label: localize('editor.common.none', '', '') }];
    }

    const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));
    const weather = entityState as WeatherEntity;

    return [
      { value: '', label: localize('editor.common.none', '', '') },
      ...attributeNames.map((attribute) => ({
        value: attribute,
        label: formatWeatherAttributeName(this.hass, weather, attribute),
      })),
    ];
  }

  private _buildHourlyExtraAttributeOptions(includeDisallowed = false): Array<{ value: string; label: string }> {
    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);

    const options = this._hourlyExtraOptions.length
      ? this._hourlyExtraOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
      : [];

    const solarOption = this._solarForecastEntryIds.length
      ? [{ value: SOLAR_FORECAST_OPTION, label: localize('editor.common.solar_forecast', '', '') }]
      : [];

    const weather = this._config?.entity ? (this.hass.states[this._config.entity] as WeatherEntity) : undefined;

    const attributeOptions = options.map((attribute) => {
      const name = weather ? formatWeatherAttributeName(this.hass, weather, attribute) : attribute;
      return { value: attribute, label: name };
    });

    return [{ value: '', label: localize('editor.common.none', '', '') }, ...solarOption, ...attributeOptions];
  }

  private _buildDailyExtraAttributeOptions(includeDisallowed = false): Array<{ value: string; label: string }> {
    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);

    const options = this._dailyExtraOptions.length
      ? this._dailyExtraOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
      : [];

    const solarOption = this._solarForecastEntryIds.length
      ? [{ value: SOLAR_FORECAST_OPTION, label: localize('editor.common.solar_forecast', '', '') }]
      : [];

    const weather = this._config?.entity ? (this.hass.states[this._config.entity] as WeatherEntity) : undefined;

    const attributeOptions = options.map((attribute) => {
      const name = weather ? formatWeatherAttributeName(this.hass, weather, attribute) : attribute;
      return { value: attribute, label: name };
    });

    return [{ value: '', label: localize('editor.common.none', '', '') }, ...solarOption, ...attributeOptions];
  }

  private _buildSchemas(): {
    general: HaFormSchema[];
    header: HaFormSchema[];
    nowcast: HaFormSchema[];
    hourly: HaFormSchema[];
    daily: HaFormSchema[];
  } {
    const generalSchema: HaFormSchema[] = [{ name: 'entity', selector: { entity: { domain: 'weather' } } }];

    const headerSchema: HaFormSchema[] = [
      {
        name: 'header_temperature_entity',
        selector: { entity: { domain: 'sensor', device_class: 'temperature' } },
        optional: true,
      },
      {
        name: 'header_tap_action_temperature',
        selector: { ui_action: {} },
        optional: true,
      },
      {
        name: 'moon_phase_entity',
        selector: { entity: { domain: 'sensor' } },
        optional: true,
      },
      {
        name: 'compact_header',
        selector: { boolean: {} },
      },
    ];

    if (!this._config?.compact_header) {
      headerSchema.push({
        name: 'show_animation',
        selector: { boolean: {} },
      });
      headerSchema.push({
        name: 'use_night_header_backgrounds',
        selector: { boolean: {} },
      });
    }

    const nowcastSchema: HaFormSchema[] = [
      {
        name: 'nowcast_entity',
        selector: { entity: { domain: 'weather' } },
        optional: true,
      },
      {
        name: 'nowcast_always_show',
        selector: { boolean: {} },
        optional: true,
        disabled: !this._config?.nowcast_entity,
      },
    ];

    const hourlySchema: HaFormSchema[] = [
      {
        name: 'hourly_extra_attribute',
        selector: {
          select: {
            options: this._buildHourlyExtraAttributeOptions(),
            custom_value: true,
          },
        },
        optional: true,
      },
      {
        name: 'hourly_extra_attribute_unit',
        selector: { text: {} },
        optional: true,
      },
      {
        name: 'hourly_extra_attribute_divisor',
        selector: { text: {} },
        optional: true,
      },
    ];
    const dailySchema: HaFormSchema[] = [
      {
        name: 'daily_extra_attribute',
        selector: {
          select: {
            options: this._buildDailyExtraAttributeOptions(),
            custom_value: true,
          },
        },
        optional: true,
      },
      {
        name: 'daily_extra_attribute_unit',
        selector: { text: {} },
        optional: true,
        disabled: this._config?.daily_extra_attribute === 'precipitation_probability',
      },
      {
        name: 'daily_extra_attribute_divisor',
        selector: { number: {} },
        optional: true,
      },
    ];

    return {
      general: generalSchema,
      header: headerSchema,
      nowcast: nowcastSchema,
      hourly: hourlySchema,
      daily: dailySchema,
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
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const unit = typeof chip.unit === 'string' ? chip.unit.trim() : undefined;
          const divisor = chip.divisor;
          normalized.push({ type: 'attribute', attribute, name: chip.name ?? '', tap_action, icon, unit, divisor });
          continue;
        }

        if (chip.type === 'entity') {
          const entity = typeof chip.entity === 'string' ? chip.entity.trim() : '';
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          normalized.push({ type: 'entity', entity, name: chip.name ?? '', tap_action, icon });
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
        this._forecastOptionsLoading = { hourly: false, daily: false, twice_daily: false };
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

      (['hourly', 'daily'] as ModernForecastType[]).forEach((type) => {
        if (!needed.has(type)) {
          this._teardownForecastOptionSubscriptions([type]);
          this._forecastOptionsLoading = { ...this._forecastOptionsLoading, [type]: false };
        } else if (!this._forecastOptionSubscriptions[type]) {
          try {
            this._forecastOptionSubscriptions[type] = this._subscribeForecast(entityId, type, (event) =>
              this._handleForecastOptionsEvent(type, event),
            );
            const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
            if (!hasOptions) {
              this._forecastOptionsLoading = { ...this._forecastOptionsLoading, [type]: true };
            }
          } catch {
            // ignore subscription errors to avoid breaking the editor
          }
        } else {
          const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
          this._forecastOptionsLoading = { ...this._forecastOptionsLoading, [type]: !hasOptions };
        }
      });
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
    targets.forEach((type) => {
      const sub = this._forecastOptionSubscriptions[type];
      sub?.then((unsub) => unsub?.()).catch(() => undefined);
      delete this._forecastOptionSubscriptions[type];
      this._forecastOptionsLoading = { ...this._forecastOptionsLoading, [type]: false };
    });
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
