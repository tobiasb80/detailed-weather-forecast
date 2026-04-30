import { hasAction, type HomeAssistant } from 'custom-card-helpers';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { PropertyValues } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import * as SunCalc from 'suncalc';
import './components/dwf-current-weather-attributes';
import './components/dwf-daily-list';
import './components/dwf-forecast-attributes';
import './components/dwf-header';
import './components/dwf-header-chips';
import './components/dwf-hourly-list';
import './components/dwf-nowcast';
import { version } from '../package.json';
import { styles } from './detailed-weather-forecast.styles';
import { localize, setHass } from './localize/localize';
import {
  DetailedWeatherForecastConfig,
  HeaderAttribute,
  SunCoordinates,
  WeatherIconMap,
  TimeOfDay,
  HeaderChipDisplay,
  ForecastAttribute,
  ForecastEvent,
  WeatherEntity,
} from './types';
import { AnimationManager } from './animations/animation-manager';
import { enableMomentumScroll } from './utils/momentum-scroll';
import type { ExtendedHomeAssistant } from './weather';
import { formatWeatherAttribute, getSupportedForecastTypes, subscribeForecast, getTimeOfDay } from './weather';
import { DEFAULT_WEATHER_IMAGE, WeatherImages } from './weather-images';

// Styled console banner so your card is easy to spot in the browser console.
// Stays visible in production — useful for version-mismatch debugging in HA.
console.info(
  `%c  DETAILED WEATHER FORECAST\n%c  ${localize('common.version')} ${version}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// Registering with window.customCards makes your card appear in the Lovelace
// "Add Card" UI picker with a name and description. This array is shared by all
// custom cards on the page, so we guard with `|| []` before pushing.
interface WindowWithCustomCards extends Window {
  customCards: Array<{ type: string; name: string; description: string }>;
}

(window as unknown as WindowWithCustomCards).customCards =
  (window as unknown as WindowWithCustomCards).customCards || [];
(window as unknown as WindowWithCustomCards).customCards.push({
  type: 'detailed-weather-forecast-card',
  name: 'Detailed Weather Forecast',
  description: 'Weather forecast similar to the default HA card, but with some additional information',
});

const MISSING_ATTRIBUTE_TEXT = 'missing';

// Private types
type ForecastType = 'hourly' | 'daily';
type SubscriptionMap = Record<ForecastType, Promise<() => void> | undefined>;

type EnergyPreferences = {
  energy_sources?: Array<{
    type?: string;
    config_entry_solar_forecast?: string[] | null;
  }>;
};

type EnergySolarForecast = {
  wh_hours?: Record<string, number | string>;
};

type NowcastForecastItem = {
  datetime: string;
  precipitation: number;
};

type NowcastServiceForecastItem = {
  datetime?: string;
  precipitation?: number | string;
};

type NowcastServiceEntityResponse = {
  forecast?: NowcastServiceForecastItem[];
};

type NowcastServiceResponse = {
  response?: Record<string, NowcastServiceEntityResponse>;
};

const SOLAR_FORECAST_ATTRIBUTE = 'solar_forecast';
const NOWCAST_SERVICE_NAME = 'get_minute_forecast';

export class DetailedWeatherForecast extends LitElement {
  // internal reactive states
  @state() private _config: DetailedWeatherForecastConfig;
  @state() private _entity: string;
  @state() private _name: string;
  @state() private _state: WeatherEntity;
  @state() private _status: string;
  @state() private _moonPhaseState?: HassEntity;
  @state() private _headerTemperatureState?: HassEntity;
  @state() private _forecastDailyEvent?: ForecastEvent;
  @state() private _forecastHourlyEvent?: ForecastEvent;
  @state() private _dailyGap?: number;
  @state() private _hourlyGap?: number;
  @state() private _solarForecastByHour: Record<string, number> = {};
  @state() private _solarForecastByDay: Record<string, number> = {};
  @state() private _nowcastForecast: NowcastForecastItem[] = [];
  @state() private _nowcastHasRain = false;
  @state() private _showAttributes = false;
  @state() private _selectedHourlyForecast?: ForecastAttribute;
  @state() private _selectedDailyForecast?: ForecastAttribute;
  @state() private _animationManagerMounted: Element | null = null;

  // private property
  private _subscriptions: SubscriptionMap = { hourly: undefined, daily: undefined };
  private _resizeObserver?: ResizeObserver;
  private _oldContainerWidth?: number;
  private _hass?: ExtendedHomeAssistant;
  private _momentumCleanup: Partial<Record<ForecastType, () => void>> = {};
  private _momentumElement: Partial<Record<ForecastType, HTMLElement>> = {};
  private _sunCoordinateCacheKey?: string;
  private _sunCoordinateCache?: SunCoordinates;
  private _solarForecastRequestId = 0;
  private _nowcastRequestId = 0;
  private _nowcastEntityId?: string;
  private _nowcastServiceDomain?: string;
  private _nowcastLastUpdated?: string;
  private _nowcastRefreshTimeout?: number;
  private _nowcastRefreshInterval?: number;
  private _isProgrammaticScroll = false;
  private _animationManager: AnimationManager;

  constructor() {
    super();
    this._animationManager = new AnimationManager(() => this._getDrawParams());
  }

  // Called by HA
  setConfig(config: DetailedWeatherForecastConfig) {
    const previousNowcastEntity = this._config?.nowcast_entity;
    const normalizedHeaderChips = this._normalizeHeaderChips(config);
    const normalizedDailyMinGap = this._normalizeMinGapValue(config.daily_min_gap);
    const normalizedHourlyMinGap = this._normalizeMinGapValue(config.hourly_min_gap);
    const normalizedIconMap = this._normalizeIconMap(config.icon_map);
    const normalizedMasonryRows = this._normalizeMasonryRows(config.masonry_rows);

    const defaults: DetailedWeatherForecastConfig = {
      type: 'custom:detailed-weather-forecast-card',
      ...config,
      nowcast_entity: config.nowcast_entity,
      nowcast_always_show: config.nowcast_always_show ?? false,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      show_sun_times: config.show_sun_times ?? false,
      sun_use_home_coordinates: config.sun_use_home_coordinates ?? true,
      use_night_header_backgrounds: config.use_night_header_backgrounds ?? true,
      moon_phase_entity: config.moon_phase_entity,
      header_temperature: config.header_temperature,
      header_condition: config.header_condition,
      header_chips: normalizedHeaderChips,
      icon_map: normalizedIconMap,
      daily_min_gap: normalizedDailyMinGap,
      hourly_min_gap: normalizedHourlyMinGap,
      hourly_extra_attribute: config.hourly_extra_attribute,
      daily_extra_attribute: config.daily_extra_attribute,
      solar_forecast_entries: Array.isArray(config.solar_forecast_entries) ? config.solar_forecast_entries : undefined,
      masonry_rows: normalizedMasonryRows,
      header_info: config.header_info ?? [],
      daily_info: config.daily_info ?? [],
      hourly_info: config.hourly_info ?? [],
      show_background: config.show_background ?? !(config.compact_header ?? false),
      compact_header_chips: config.compact_header_chips ?? false,
      show_animation: config.show_animation ?? true,
    };

    this._config = defaults;
    if (previousNowcastEntity !== defaults.nowcast_entity) {
      this._resetNowcastState();
    }

    this._entity = defaults.entity;
    // call set hass() to immediately adjust to a changed entity
    // while editing the entity in the card editor
    if (this._hass) {
      this.hass = this._hass;
    }

    this._setupNowcastRefreshTimer();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    setHass(hass);
    this._state = hass.states[this._entity] as WeatherEntity;

    if (this._state) {
      this._status = this._state.state;
      const fn = this._state.attributes.friendly_name;
      this._name = fn ? fn : this._entity;
    }

    const headerTemperatureEntity = this._config?.header_temperature?.entity;
    this._headerTemperatureState = headerTemperatureEntity
      ? (hass.states[headerTemperatureEntity] as HassEntity | undefined)
      : undefined;

    const moonPhaseEntity = this._config?.moon_phase_entity;
    this._moonPhaseState = moonPhaseEntity ? (hass.states[moonPhaseEntity] as HassEntity | undefined) : undefined;

    this._handleNowcastHassUpdate();
    this._setupNowcastRefreshTimer();
  }

  private _normalizeHeaderChips(config: DetailedWeatherForecastConfig): HeaderAttribute[] {
    const limit = 3;
    const normalized: HeaderAttribute[] = [];

    if (Array.isArray(config.header_chips)) {
      for (const chip of config.header_chips) {
        if (normalized.length >= limit || !chip || typeof chip !== 'object') {
          continue;
        }

        if (chip.type === 'attribute') {
          const attr = typeof chip.attribute === 'string' ? chip.attribute.trim() : '';
          const tap_action = typeof chip.tap_action === 'object' && chip.tap_action ? chip.tap_action : undefined;
          const hold_action = typeof chip.hold_action === 'object' && chip.hold_action ? chip.hold_action : undefined;
          const double_tap_action =
            typeof chip.double_tap_action === 'object' && chip.double_tap_action ? chip.double_tap_action : undefined;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const unit = typeof chip.unit === 'string' ? chip.unit.trim() : undefined;
          const divisor = typeof chip.divisor === 'number' ? chip.divisor : undefined;
          const name = typeof chip.name === 'string' ? chip.name.trim() : undefined;
          normalized.push({
            type: 'attribute',
            attribute: attr,
            tap_action,
            hold_action,
            double_tap_action,
            name,
            icon,
            unit,
            divisor,
          });
          continue;
        }

        if (chip.type === 'entity') {
          const entity = typeof chip.entity === 'string' ? chip.entity.trim() : '';
          const tap_action = typeof chip.tap_action === 'object' && chip.tap_action ? chip.tap_action : undefined;
          const hold_action = typeof chip.hold_action === 'object' && chip.hold_action ? chip.hold_action : undefined;
          const double_tap_action =
            typeof chip.double_tap_action === 'object' && chip.double_tap_action ? chip.double_tap_action : undefined;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const name = typeof chip.name === 'string' ? chip.name.trim() : undefined;
          normalized.push({ type: 'entity', entity, tap_action, hold_action, double_tap_action, name, icon });
        }
      }
    }

    if (normalized.length) {
      return normalized.slice(0, limit);
    }

    return [];
  }

  private _normalizeMinGapValue(value?: number | string): number | undefined {
    if (value === null || typeof value === 'undefined') {
      return undefined;
    }
    const numericValue = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }
    const clamped = Math.max(10, numericValue);
    return Math.round(clamped);
  }

  private _normalizeMasonryRows(value?: number | string): number | undefined {
    if (value === null || typeof value === 'undefined') {
      return undefined;
    }
    const numericValue = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }
    if (numericValue <= 0) {
      return undefined;
    }
    return Math.max(1, Math.round(numericValue));
  }

  private _normalizeIconMap(iconMap?: WeatherIconMap): WeatherIconMap | undefined {
    if (!iconMap || typeof iconMap !== 'object') {
      return undefined;
    }

    const normalized: WeatherIconMap = {};
    Object.entries(iconMap).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        return;
      }
      const trimmed = value.trim();
      if (trimmed.length) {
        (normalized as Record<string, string>)[key] = trimmed;
      }
    });

    return Object.keys(normalized).length ? normalized : undefined;
  }

  private _shouldApplyMasonryHeight(): boolean {
    if (!this._config?.masonry_rows) {
      return false;
    }
    if (!this.isConnected) {
      return true;
    }
    const rowHeight = getComputedStyle(this).getPropertyValue('--row-height').trim();
    if (rowHeight) {
      return false;
    }
    return !Boolean(
      this.closest('hui-sections-view') || this.closest('hui-section-view') || this.closest('hui-section'),
    );
  }

  private _getHeaderChips(): HeaderAttribute[] {
    if (!this._config) {
      return [];
    }

    if (Array.isArray(this._config.header_chips) && this._config.header_chips.length) {
      return this._config.header_chips.slice(0, 3);
    }

    return [];
  }

  // Load styles using LitElement
  static styles = styles;

  static async getConfigElement() {
    await import('./editor/detailed-weather-forecast-editor');
    return document.createElement('detailed-weather-forecast-editor');
  }

  static getStubConfig(hass: HomeAssistant): DetailedWeatherForecastConfig {
    const weatherEntity = Object.keys(hass?.states ?? {}).find((entityId) => entityId.startsWith('weather.'));
    return {
      type: 'custom:detailed-weather-forecast-card',
      entity: weatherEntity ?? 'weather.home',
      show_header: true,
      show_background: true,
      compact_header_chips: false,
      hourly_forecast: true,
      daily_forecast: true,
      use_night_header_backgrounds: true,
    };
  }

  // Forecast subscriptions
  private _needForecastSubscription() {
    return this._config.daily_forecast || this._config.hourly_forecast;
  }

  private _unsubscribeForecastEvents() {
    (Object.values(this._subscriptions) as Promise<() => void>[]).forEach((sub) => {
      sub?.then((unsub) => unsub());
    });
    this._subscriptions = { hourly: undefined, daily: undefined };
  }

  private async _subscribeForecast(type: ForecastType) {
    if (this._subscriptions[type]) return;

    this._subscriptions[type] = subscribeForecast(this._hass!, this._entity, type, (event) => {
      if (type === 'hourly') this._forecastHourlyEvent = event;
      if (type === 'daily') this._forecastDailyEvent = event;
    }).catch((e) => {
      this._subscriptions[type] = undefined;
      throw e;
    });
  }

  private async _subscribeForecastEvents() {
    this._unsubscribeForecastEvents();

    const shouldSubscribe =
      this.isConnected &&
      this._hass &&
      this._config &&
      this._needForecastSubscription() &&
      this._hass.config.components.includes('weather') &&
      this._state;

    if (!shouldSubscribe) return;

    const supportedForecastTypes = getSupportedForecastTypes(this._state);

    (['hourly', 'daily'] as ForecastType[]).forEach((type) => {
      const configKey = `${type}_forecast` as 'hourly_forecast' | 'daily_forecast';
      if (this._config[configKey] && supportedForecastTypes.includes(type)) {
        this._subscribeForecast(type);
      }
    });
  }

  // Lit callbacks
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && this._config && this._hass) {
      this._subscribeForecastEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeForecastEvents();
    this._clearNowcastRefreshTimer();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    Object.values(this._momentumCleanup).forEach((cleanup) => cleanup?.());
    this._momentumCleanup = {};
    this._momentumElement = {};

    this._animationManager.destroy();
    this._animationManagerMounted = null;
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    const forecastHourlyChanged = changedProps.has('_forecastHourlyEvent');
    const forecastDailyChanged = changedProps.has('_forecastDailyEvent');

    if (!this._config || !this._hass) {
      return;
    }

    if (changedProps.has('_config') || (!this._subscriptions.hourly && !this._subscriptions.daily)) {
      this._subscribeForecastEvents();
    }

    if (changedProps.has('_config') || forecastHourlyChanged || forecastDailyChanged) {
      this._refreshSolarForecastData();
    }

    if (changedProps.has('_config')) {
      this._refreshNowcastData();
    }

    const card = this.shadowRoot?.querySelector('ha-card') as HTMLElement | null;
    const daily = this.shadowRoot?.querySelector('.forecast.daily') as HTMLElement | null;
    const hourly = this.shadowRoot?.querySelector('.forecast.hourly') as HTMLElement | null;

    if (daily) {
      this._initDragScroll('daily', daily);
    } else {
      this._teardownDragScroll('daily');
    }

    if (hourly) {
      this._initDragScroll('hourly', hourly);
    } else {
      this._teardownDragScroll('hourly');
    }

    if (!this._resizeObserver) {
      if (!card || (!daily && !hourly)) return;

      this._resizeObserver = new ResizeObserver(() => {
        this._updateGap();
      });
      this._resizeObserver.observe(card);

      // Call once for the initial size
      this._updateGap();

      // Hourly translation heights are handled inside dwf-hourly-list
    }

    if (this._config?.show_animation !== false) {
      const animationContainer = this.shadowRoot?.querySelector('.animation-container');

      if (animationContainer && this._animationManagerMounted !== animationContainer) {
        if (this._animationManagerMounted) {
          this._animationManager.destroy();
          this._animationManagerMounted.innerHTML = '';
        }
        this._animationManager.setup(animationContainer);
        this._animationManagerMounted = animationContainer;
      }
    } else if (this._animationManagerMounted) {
      this._animationManager.destroy();
      this._animationManagerMounted.innerHTML = '';
      this._animationManagerMounted = null;
    }
  }

  // Render methods
  render() {
    if (!this._config || !this._hass) return nothing;

    if (!this._state) {
      return html` <hui-warning> ${this._name} not found. </hui-warning> `;
    }

    if (this._status === 'unavailable') {
      return html`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;
    }

    const dailyEnabled = this._config.daily_forecast !== false;
    const hourlyEnabled = this._config.hourly_forecast !== false;
    const showHeader = this._config.show_header !== false;
    const showForecasts = dailyEnabled || hourlyEnabled;
    const showForecastDivider = dailyEnabled && hourlyEnabled;
    const dailyForecastRaw = this._forecastDailyEvent?.forecast ?? [];
    const hourlyForecastRaw = this._forecastHourlyEvent?.forecast ?? [];
    const dailyForecast = this._applySolarForecastToForecast(dailyForecastRaw, 'daily');
    const hourlyForecast = this._applySolarForecastToForecast(hourlyForecastRaw, 'hourly');
    const sunCoordinates = this._getLocationCoordinates();
    const showSunTimes = Boolean(this._config.show_sun_times && sunCoordinates && hourlyEnabled);
    const headerTemperature = this._computeHeaderTemperature();

    const headerOnly = showHeader && !showForecasts;
    const nowcastEnabled = this._isNowcastEnabled();
    const showInlineNowcast =
      nowcastEnabled && (this._config.nowcast_always_show || this._nowcastHasRain || headerOnly);

    const hasContent = showHeader || dailyEnabled || hourlyEnabled;

    const dailyStyle = (() => {
      const styles: Record<string, string> = {};
      if (this._dailyGap !== undefined) {
        styles['--dynamic-gap'] = `${this._dailyGap}px`;
      }
      if (this._config?.daily_min_gap !== undefined) {
        styles['--min-gap'] = `${this._config.daily_min_gap}px`;
      }
      return Object.keys(styles).length ? styleMap(styles) : nothing;
    })();

    const hourlyStyle = (() => {
      const styles: Record<string, string> = {};
      if (this._hourlyGap !== undefined) {
        styles['--dynamic-gap'] = `${this._hourlyGap}px`;
      }
      if (this._config?.hourly_min_gap !== undefined) {
        styles['--min-gap'] = `${this._config.hourly_min_gap}px`;
      }
      return Object.keys(styles).length ? styleMap(styles) : nothing;
    })();

    const customColors: Record<string, string> = {};
    if (this._config?.animation_background_colors && typeof this._config.animation_background_colors === 'object') {
      Object.entries(this._config.animation_background_colors).forEach(([key, value]) => {
        if (value) {
          const cssVar = key.startsWith('--') ? key : `--${key}`;
          const colorVal = String(value).trim();
          if (
            colorVal.startsWith('#') ||
            colorVal.startsWith('var(') ||
            colorVal.startsWith('rgb') ||
            colorVal.startsWith('hsl') ||
            colorVal.includes(' ')
          ) {
            customColors[cssVar] = colorVal;
          } else {
            customColors[cssVar] = `var(--${colorVal}-color, ${colorVal})`;
          }
        }
      });
    }

    const customColorStyles = (() => {
      const cssVars = Object.entries(customColors)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
      if (!cssVars) return nothing;
      return html`
        <style>
          dwf-header, dwf-daily-list, dwf-hourly-list, dwf-nowcast, dwf-current-weather-attributes, dwf-forecast-attributes, dwf-header-chips {
            ${cssVars}
          }
        </style>
      `;
    })();

    const cardStyle = (() => {
      const styles: Record<string, string> = { position: 'relative' };
      if (this._shouldApplyMasonryHeight()) {
        const rowCount = this._config?.masonry_rows ?? 0;
        if (Number.isFinite(rowCount) && rowCount > 0) {
          styles['min-height'] = `${rowCount * 50}px`;
        }
      }

      Object.assign(styles, customColors);

      return styleMap(styles);
    })();

    if (!hasContent) {
      const cardLabel = this._name || this._entity;
      return html` <hui-warning> ${cardLabel} has no sections enabled. </hui-warning> `;
    }

    const headerChips = this._computeHeaderChipDisplays();
    const useSnowNowcastFill = this._shouldUseSnowNowcastFill();

    const useAnimation = this._config.show_animation !== false;
    const headerStyles: Record<string, string> = {};
    if (!useAnimation) {
      headerStyles['background-image'] = `url(${this._getWeatherBgImage(this._state.state)})`;
    }

    if (showInlineNowcast && !headerOnly) {
      headerStyles['--dwf-header-height'] = 'calc(4 * var(--row-height, 56px))';
    }

    const nowcastPanelTemplate = html`
      <div
        class="nowcast-panel"
        style=${useSnowNowcastFill ? styleMap({ '--dwf-nowcast-fill-color': 'rgba(255, 255, 255, 0.9)' }) : nothing}
      >
        <dwf-nowcast .forecast=${this._nowcastForecast}></dwf-nowcast>
      </div>
    `;

    let timeOfDay = this._getTimeOfDay();
    let currentCondition = this._config.fixed_condition || this._state.state;

    if (this._config.use_night_header_backgrounds === false) {
      if (timeOfDay.type !== 'day') {
        timeOfDay = { type: 'day', progress: 0.5 };
      }
      if (currentCondition === 'clear-night') {
        currentCondition = 'sunny';
      }
    }
    const animationClass = this._getAnimationContainerClass(timeOfDay.type, currentCondition);

    const getAnimationTemplate = (slotName?: string) =>
      useAnimation
        ? html`
            <div
              class="animation-container ${animationClass}"
              slot=${slotName || nothing}
              style="position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; border-radius: inherit;"
            ></div>
          `
        : nothing;

    return html`
      <ha-card class="weather-card" style=${cardStyle}>
        <style>
          /* Fixes a bug on older iPads/iOS where flex center alignment cuts off the left side of overflowing content */
          .forecast.daily,
          .forecast.hourly {
            justify-content: flex-start !important;
            -webkit-overflow-scrolling: touch;
          }
        </style>
        ${customColorStyles} ${!showHeader ? getAnimationTemplate() : nothing}
        ${showHeader
          ? html`
              <dwf-header
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .config=${this._config}
                .nowcastPanelTemplate=${showInlineNowcast ? nowcastPanelTemplate : undefined}
                .headerTemperature=${headerTemperature}
                .isDaytime=${this._isDaytimeNow()}
                .headerChipsDisplays=${headerChips}
                .headerOnly=${headerOnly}
                .headerStyles=${headerStyles}
                @dwf-toggle-attributes=${() => {
                  this._showAttributes = !this._showAttributes;
                }}
              >
                ${getAnimationTemplate('background')}
              </dwf-header>
            `
          : nothing}
        ${showHeader && showForecasts ? html`<div class="divider card-divider"></div>` : nothing}
        ${(this._config.header_info?.length ?? 0) > 0 && this._showAttributes
          ? html`<dwf-current-weather-attributes
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .attributeConfigs=${this._config.header_info ?? []}
              ></dwf-current-weather-attributes>
              <div class="divider card-divider"></div>`
          : nothing}
        ${showForecasts
          ? html`
              <div class="forecast-container">
                ${dailyEnabled
                  ? html`
                      <div class="forecast-daily-container">
                        <div class="forecast daily" style=${dailyStyle}>
                          <dwf-daily-list
                            .hass=${this._hass}
                            .weatherEntity=${this._state}
                            .forecast=${dailyForecast}
                            .precipitationUnit=${this._state.attributes.precipitation_unit}
                            .extraConfig=${this._config.daily_extra_attribute}
                            .iconMap=${this._config.icon_map}
                            @dwf-daily-list-item-selected=${this._handleDailySelected}
                            @dwf-daily-list-item-show-attributes=${this._handleDailyShowAttributes}
                          ></dwf-daily-list>
                        </div>
                      </div>
                    `
                  : nothing}
                ${this._selectedDailyForecast && (this._config.daily_info?.length ?? 0) > 0
                  ? html`<div class="divider card-divider"></div>
                      <dwf-forecast-attributes
                        .hass=${this._hass}
                        .weatherEntity=${this._state}
                        .forecastAttribute=${this._selectedDailyForecast}
                        .attributeConfigs=${this._config.daily_info ?? []}
                        .dailyForecast=${true}
                        .config=${this._config}
                      ></dwf-forecast-attributes>`
                  : nothing}
                ${showForecastDivider ? html`<div class="divider forecast-divider"></div>` : nothing}
                ${hourlyEnabled
                  ? html`
                      <div class="forecast-hourly-container">
                        <div class="forecast hourly" style=${hourlyStyle}>
                          <dwf-hourly-list
                            .hass=${this._hass}
                            .weatherEntity=${this._state}
                            .forecast=${hourlyForecast}
                            .showSunTimes=${showSunTimes}
                            .sunCoordinates=${sunCoordinates}
                            .precipitationUnit=${this._state.attributes.precipitation_unit}
                            .extraConfig=${this._config.hourly_extra_attribute}
                            .iconMap=${this._config.icon_map}
                            @dwf-hourly-scrolled-to-new-day=${this._handleHourlyNewDay}
                            @dwf-hourly-list-item-selected=${this._handleHourlySelected}
                          ></dwf-hourly-list>
                        </div>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
        ${this._selectedHourlyForecast && (this._config.hourly_info?.length ?? 0) > 0
          ? html`<div class="divider card-divider"></div>
              <dwf-forecast-attributes
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .forecastAttribute=${this._selectedHourlyForecast}
                .attributeConfigs=${this._config.hourly_info ?? []}
                .config=${this._config}
              ></dwf-forecast-attributes>`
          : nothing}
      </ha-card>
    `;
  }

  // Private methods

  private _handleHourlyNewDay(e: CustomEvent<{ date: Date }>) {
    if (this._isProgrammaticScroll) {
      return;
    }
    const date = e.detail.date;
    const dailyList = this.shadowRoot?.querySelector('dwf-daily-list') as any;
    if (dailyList) {
      dailyList.selectDate(date);
    }
  }

  private _getAnimationContainerClass(timeOfDayType: string, condition: string): string {
    const isNight = timeOfDayType === 'night';
    let baseTimeOfDay = timeOfDayType;

    const baseCondition = condition.replace(/-/g, '');

    if (['sunset', 'sunrise'].includes(timeOfDayType)) {
      if (!['sunny', 'clear', 'clearnight', 'partlycloudy', 'windy'].includes(baseCondition)) {
        baseTimeOfDay = 'day';
      }
    }

    if (['rainy', 'pouring', 'lightning', 'lightningrainy', 'hail'].includes(baseCondition)) {
      return isNight ? 'rainy-night' : 'rainy';
    }

    if (['snowy', 'snowyrainy'].includes(baseCondition)) {
      return isNight ? 'snowy-night' : 'snowy';
    }

    if (['fog'].includes(baseCondition)) {
      return isNight ? 'fog-night' : 'fog';
    }

    if (['cloudy', 'windyvariant'].includes(baseCondition)) {
      return isNight ? 'cloudy-night' : 'cloudy';
    }

    if (['partlycloudy'].includes(baseCondition)) {
      return isNight ? 'partlycloudy-night' : baseTimeOfDay === 'day' ? 'partlycloudy' : baseTimeOfDay;
    }

    if (['exceptional'].includes(baseCondition)) {
      return isNight ? 'exceptional-night' : 'exceptional';
    }

    return baseTimeOfDay === 'day' ? '' : baseTimeOfDay;
  }

  private _getCloudCover(): number | undefined {
    if (!this._state || this._state.state === 'unavailable') {
      return undefined;
    }
    const cloudCover = (this._state.attributes as Record<string, any>).cloud_coverage;
    return typeof cloudCover === 'number' ? cloudCover / 100 : undefined;
  }

  private _getTimeOfDay(): TimeOfDay {
    if (this._config.fixed_time_of_day) return { type: this._config.fixed_time_of_day, progress: 0 };

    const coordinates = this._getLocationCoordinates();
    return getTimeOfDay(coordinates?.latitude, coordinates?.longitude);
  }

  private _getDrawParams() {
    if (!this._state) return null;

    let timeOfDay = this._getTimeOfDay();
    let condition = this._config.fixed_condition || this._state.state;

    if (this._config?.use_night_header_backgrounds === false) {
      if (timeOfDay.type !== 'day') {
        timeOfDay = { type: 'day', progress: 0.5 };
      }
      if (condition === 'clear-night') {
        condition = 'sunny';
      }
    }

    return {
      condition,
      timeOfDay,
      cloudCover: this._getCloudCover(),
      moonPhase: this._moonPhaseState?.state,
    };
  }

  // Header temperature from configured sensor or weather entity attribute
  private _computeHeaderTemperature(): string {
    if (!this._hass || !this._state) {
      return '';
    }

    const sensorState = this._headerTemperatureState;
    if (sensorState && !this._isStateUnavailable(sensorState.state)) {
      const formattedSensor = this._hass?.formatEntityState?.(sensorState);
      if (formattedSensor && typeof formattedSensor === 'string') {
        return formattedSensor;
      }
      return sensorState.state;
    }

    const formattedWeather = this._hass?.formatEntityAttributeValue?.(this._state, 'temperature');
    if (formattedWeather && typeof formattedWeather === 'string') {
      return formattedWeather;
    }
    return this._state.state || '';
  }

  private _isStateUnavailable(state?: string): boolean {
    if (!state) {
      return true;
    }

    const normalized = state.toLowerCase();
    return normalized === 'unavailable' || normalized === 'unknown';
  }

  // Header chips (attribute / entity)
  private _computeHeaderChipDisplays(): HeaderChipDisplay[] {
    if (!this._config) {
      return [];
    }

    const chips = this._getHeaderChips();
    if (!chips.length) {
      return [];
    }

    const displays: HeaderChipDisplay[] = [];

    chips.forEach((chip) => {
      const tap_action = hasAction(chip.tap_action) ? chip.tap_action : undefined;
      const hold_action = hasAction(chip.hold_action) ? chip.hold_action : undefined;
      const double_tap_action = hasAction(chip.double_tap_action) ? chip.double_tap_action : undefined;
      const icon = typeof (chip as any).icon === 'string' ? (chip as any).icon.trim() : undefined;

      if (chip.type === 'entity') {
        const entity = chip.entity?.trim() ?? '';
        if (!entity) {
          return;
        }

        const formatted = this._formatHeaderEntity(entity);
        const tooltip = `${entity}: ${formatted.display}`;
        const label = entity;
        const entityIcon = icon || formatted.icon;

        displays.push({
          label,
          display: formatted.display,
          missing: formatted.missing,
          tooltip,
          type: chip.type,
          tap_action,
          hold_action,
          double_tap_action,
          icon: entityIcon,
          entity,
          entity_picture: formatted.entity_picture,
        });
        return;
      }

      const attribute = chip.attribute?.trim() ?? '';
      if (!attribute) {
        return;
      }

      const formatted = formatWeatherAttribute(
        this._hass,
        this._state,
        attribute,
        chip.name,
        chip.unit,
        icon,
        chip.divisor,
      );

      if (!formatted) {
        displays.push({
          label: attribute,
          display: MISSING_ATTRIBUTE_TEXT,
          missing: true,
          tooltip: attribute,
          type: chip.type,
          tap_action,
          hold_action,
          double_tap_action,
          icon,
        });
      } else {
        const tooltip = `${formatted.name}: ${formatted.value}`;

        displays.push({
          label: formatted.name,
          display: formatted.value,
          missing: false,
          tooltip,
          type: chip.type,
          tap_action,
          hold_action,
          double_tap_action,
          icon: formatted.icon,
        });
      }
    });

    return displays;
  }

  private _formatHeaderEntity(entity: string): {
    entity: string;
    display: string;
    missing: boolean;
    icon: string | undefined;
    entity_picture: string | undefined;
  } {
    if (!this._state || !this._hass) {
      return { entity, display: MISSING_ATTRIBUTE_TEXT, missing: true, icon: undefined, entity_picture: undefined };
    }

    const stateObj = this._hass.states[entity];
    if (!stateObj) {
      return { entity, display: MISSING_ATTRIBUTE_TEXT, missing: true, icon: undefined, entity_picture: undefined };
    }

    const display = this._hass?.formatEntityState?.(stateObj);

    if (display === undefined) {
      return { entity, display: MISSING_ATTRIBUTE_TEXT, missing: true, icon: undefined, entity_picture: undefined };
    }

    return {
      entity: stateObj.attributes.friendly_name || entity,
      display,
      missing: false,
      icon: stateObj.attributes.icon,
      entity_picture: stateObj.attributes.entity_picture,
    };
  }

  private _needsSolarForecast(): boolean {
    if (!this._config) {
      return false;
    }
    return (
      this._config.hourly_extra_attribute?.attribute === SOLAR_FORECAST_ATTRIBUTE ||
      this._config.daily_extra_attribute?.attribute === SOLAR_FORECAST_ATTRIBUTE ||
      (this._config.hourly_info ?? []).some((info) => info.attribute === SOLAR_FORECAST_ATTRIBUTE) ||
      (this._config.daily_info ?? []).some((info) => info.attribute === SOLAR_FORECAST_ATTRIBUTE)
    );
  }

  private _refreshSolarForecastData() {
    if (!this._needsSolarForecast()) {
      if (Object.keys(this._solarForecastByHour).length || Object.keys(this._solarForecastByDay).length) {
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
      }
      return;
    }

    if (!this._hass?.callWS) {
      return;
    }

    const requestId = ++this._solarForecastRequestId;
    this._loadSolarForecastData(requestId);
  }

  private async _loadSolarForecastData(requestId: number) {
    try {
      const prefs = await this._hass!.callWS<EnergyPreferences>({ type: 'energy/get_prefs' });
      if (requestId !== this._solarForecastRequestId) {
        return;
      }

      const availableEntries = this._extractSolarForecastEntries(prefs);
      const selectedEntries = this._selectSolarForecastEntries(availableEntries);

      if (!selectedEntries.length) {
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
        return;
      }

      const forecasts = await this._hass!.callWS<Record<string, EnergySolarForecast>>({
        type: 'energy/solar_forecast',
      });
      if (requestId !== this._solarForecastRequestId) {
        return;
      }

      const { hourly, daily } = this._buildSolarForecastMaps(forecasts, selectedEntries);
      this._solarForecastByHour = hourly;
      this._solarForecastByDay = daily;
    } catch {
      this._solarForecastByHour = {};
      this._solarForecastByDay = {};
    }
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

  private _selectSolarForecastEntries(availableEntries: string[]): string[] {
    if (!this._config) {
      return [];
    }

    if (this._config.solar_forecast_entries) {
      if (!this._config.solar_forecast_entries.length) {
        return [];
      }
      const selected = new Set(this._config.solar_forecast_entries);
      return availableEntries.filter((entryId) => selected.has(entryId));
    }

    return availableEntries;
  }

  private _buildSolarForecastMaps(
    forecasts: Record<string, EnergySolarForecast>,
    selectedEntries: string[],
  ): { hourly: Record<string, number>; daily: Record<string, number> } {
    const hourly: Record<string, number> = {};
    const daily: Record<string, number> = {};

    selectedEntries.forEach((entryId) => {
      const data = forecasts?.[entryId];
      const whHours = data?.wh_hours ?? {};
      Object.entries(whHours).forEach(([timestamp, rawValue]) => {
        const valueWh = typeof rawValue === 'number' ? rawValue : Number(rawValue);
        if (!Number.isFinite(valueWh)) {
          return;
        }

        const date = new Date(timestamp);
        if (!Number.isFinite(date.getTime())) {
          return;
        }

        const valueKwh = valueWh / 1000;
        const hourKey = this._formatSolarHourKey(date);
        const dayKey = this._formatSolarDayKey(date);

        hourly[hourKey] = (hourly[hourKey] ?? 0) + valueKwh;
        daily[dayKey] = (daily[dayKey] ?? 0) + valueKwh;
      });
    });

    return { hourly, daily };
  }

  private _applySolarForecastToForecast(forecast: ForecastAttribute[], type: ForecastType): ForecastAttribute[] {
    const source = type === 'hourly' ? this._solarForecastByHour : this._solarForecastByDay;
    if (!forecast?.length || !Object.keys(source).length) {
      return forecast;
    }

    return forecast.map((item) => {
      if (!item?.datetime) {
        return item;
      }
      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) {
        return item;
      }
      const key = type === 'hourly' ? this._formatSolarHourKey(date) : this._formatSolarDayKey(date);
      const value = source[key];
      if (value === undefined) {
        return item;
      }
      return { ...item, solar_forecast: value };
    });
  }

  private _resetNowcastState() {
    this._nowcastRequestId += 1;
    this._nowcastEntityId = undefined;
    this._nowcastServiceDomain = undefined;
    this._nowcastLastUpdated = undefined;
    this._nowcastForecast = [];
    this._nowcastHasRain = false;
    this._clearNowcastRefreshTimer();
  }

  private _clearNowcastForecast() {
    if (this._nowcastForecast.length || this._nowcastHasRain) {
      this._nowcastForecast = [];
      this._nowcastHasRain = false;
    }
  }

  private _refreshNowcastData() {
    if (!this._isNowcastEnabled() || !this._hass?.callWS) {
      this._clearNowcastForecast();
      return;
    }

    const entityId = this._config?.nowcast_entity;
    if (!entityId) {
      this._clearNowcastForecast();
      return;
    }

    const requestId = ++this._nowcastRequestId;
    this._loadNowcastData(requestId, entityId);
  }

  private async _loadNowcastData(requestId: number, entityId: string) {
    try {
      const serviceDomain = await this._resolveNowcastServiceDomain(entityId, requestId);
      if (!serviceDomain || requestId !== this._nowcastRequestId) {
        this._clearNowcastForecast();
        return;
      }

      const response = await this._hass!.callWS<NowcastServiceResponse>({
        type: 'call_service',
        domain: serviceDomain,
        service: NOWCAST_SERVICE_NAME,
        target: { entity_id: entityId },
        return_response: true,
      });

      if (requestId !== this._nowcastRequestId) {
        return;
      }

      const forecast = this._extractNowcastForecast(response, entityId);
      this._setNowcastForecast(forecast);
    } catch {
      this._clearNowcastForecast();
    }
  }

  private async _resolveNowcastServiceDomain(entityId: string, requestId: number): Promise<string | undefined> {
    if (this._nowcastEntityId === entityId && this._nowcastServiceDomain) {
      return this._nowcastServiceDomain;
    }

    try {
      const entry = await this._hass!.callWS<{ platform?: string }>({
        type: 'config/entity_registry/get',
        entity_id: entityId,
      });
      if (requestId !== this._nowcastRequestId) {
        return undefined;
      }
      const platform = entry?.platform;
      this._nowcastEntityId = entityId;
      this._nowcastServiceDomain = typeof platform === 'string' && platform.trim().length ? platform : undefined;
      return this._nowcastServiceDomain;
    } catch {
      this._nowcastEntityId = entityId;
      this._nowcastServiceDomain = undefined;
      return undefined;
    }
  }

  private _extractNowcastForecast(response: NowcastServiceResponse, entityId: string): NowcastForecastItem[] {
    const items: NowcastForecastItem[] = [];
    const entries = response?.response?.[entityId]?.forecast;
    if (!Array.isArray(entries)) {
      return items;
    }

    entries.forEach((entry) => {
      const datetime = typeof entry?.datetime === 'string' ? entry.datetime : undefined;
      if (!datetime) {
        return;
      }
      const timestamp = new Date(datetime).getTime();
      if (!Number.isFinite(timestamp)) {
        return;
      }

      const rawValue = entry?.precipitation;
      const precipitation = typeof rawValue === 'number' ? rawValue : Number(rawValue);
      if (!Number.isFinite(precipitation)) {
        return;
      }

      items.push({ datetime, precipitation: Math.max(0, precipitation) });
    });

    return items.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  }

  private _setNowcastForecast(forecast: NowcastForecastItem[]) {
    const hasRain = forecast.some((item) => item.precipitation > 0);

    this._nowcastForecast = forecast;
    this._nowcastHasRain = hasRain;
  }

  private _handleNowcastHassUpdate() {
    if (!this._isNowcastEnabled() || !this._hass) {
      return;
    }

    const entityId = this._config?.nowcast_entity;
    if (!entityId) {
      return;
    }

    const state = this._hass.states[entityId] as HassEntity | undefined;
    if (!state) {
      this._clearNowcastForecast();
      return;
    }

    const lastUpdated = state.last_updated ?? state.last_changed;
    if (!lastUpdated || lastUpdated === this._nowcastLastUpdated) {
      return;
    }

    this._nowcastLastUpdated = lastUpdated;
    this._refreshNowcastData();
  }

  private _isNowcastEnabled(): boolean {
    return Boolean(this._config?.nowcast_entity);
  }

  private _setupNowcastRefreshTimer() {
    if (!this._isNowcastEnabled() || !this._hass) {
      this._clearNowcastRefreshTimer();
      return;
    }

    this._clearNowcastRefreshTimer();

    const now = Date.now();
    const nextMinuteDelay = 60000 - (now % 60000);
    this._nowcastRefreshTimeout = window.setTimeout(() => {
      this._refreshNowcastData();
      this._nowcastRefreshInterval = window.setInterval(() => {
        this._refreshNowcastData();
      }, 60000);
    }, nextMinuteDelay);
  }

  private _clearNowcastRefreshTimer() {
    if (this._nowcastRefreshTimeout !== undefined) {
      window.clearTimeout(this._nowcastRefreshTimeout);
      this._nowcastRefreshTimeout = undefined;
    }
    if (this._nowcastRefreshInterval !== undefined) {
      window.clearInterval(this._nowcastRefreshInterval);
      this._nowcastRefreshInterval = undefined;
    }
  }

  private _formatSolarHourKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}`;
  }

  private _formatSolarDayKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _getLocationCoordinates(): SunCoordinates | undefined {
    if (!this._config) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }

    const useHome = this._config.sun_use_home_coordinates ?? true;
    const latitude = useHome
      ? this._parseCoordinate(this._hass?.config?.latitude, -90, 90)
      : this._parseCoordinate(this._config.sun_latitude, -90, 90);
    const longitude = useHome
      ? this._parseCoordinate(this._hass?.config?.longitude, -180, 180)
      : this._parseCoordinate(this._config.sun_longitude, -180, 180);

    if (latitude === undefined || longitude === undefined) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }

    const key = `${latitude},${longitude}`;
    if (this._sunCoordinateCacheKey === key && this._sunCoordinateCache) {
      return this._sunCoordinateCache;
    }

    const coords: SunCoordinates = { latitude, longitude };
    this._sunCoordinateCacheKey = key;
    this._sunCoordinateCache = coords;
    return coords;
  }

  private _parseCoordinate(value: number | string | undefined, min: number, max: number): number | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }

    if (numericValue < min || numericValue > max) {
      return undefined;
    }

    return numericValue;
  }

  private _getWeatherBgImage(state: string): string {
    const variants = WeatherImages[state.replace(/-/g, '')];
    const useNightBackgrounds = this._config?.use_night_header_backgrounds !== false;
    const isDaytime = useNightBackgrounds ? this._isDaytimeNow() : true;
    const fallback = useNightBackgrounds && !isDaytime ? DEFAULT_WEATHER_IMAGE.night : DEFAULT_WEATHER_IMAGE.day;

    if (!variants) {
      return fallback;
    }

    if (!useNightBackgrounds) {
      return variants.day;
    }

    return isDaytime ? variants.day : variants.night;
  }

  private _shouldUseSnowNowcastFill(): boolean {
    const condition = this._state?.state;
    return condition === 'snowy' || condition === 'snowy-rainy';
  }

  private _isDaytimeNow(): boolean {
    const attributeValue = this._state?.attributes?.is_daytime;
    if (typeof attributeValue === 'boolean') {
      return attributeValue;
    }

    const coordinates = this._getLocationCoordinates();
    if (!coordinates) {
      return true;
    }

    const now = new Date();
    const times = SunCalc.getTimes(now, coordinates.latitude, coordinates.longitude);
    const sunrise = times.sunrise?.getTime();
    const sunset = times.sunset?.getTime();

    if (typeof sunrise !== 'number' || Number.isNaN(sunrise) || typeof sunset !== 'number' || Number.isNaN(sunset)) {
      return true;
    }

    const nowTime = now.getTime();
    if (sunrise <= sunset) {
      return nowTime >= sunrise && nowTime < sunset;
    }

    return nowTime >= sunrise || nowTime < sunset;
  }

  private _updateGap() {
    const container = this.shadowRoot?.querySelector('ha-card') as HTMLElement | null;
    const daily = this.shadowRoot?.querySelector('.forecast.daily') as HTMLElement | null;
    const hourly = this.shadowRoot?.querySelector('.forecast.hourly') as HTMLElement | null;
    if (!container || (!daily && !hourly)) {
      return;
    }

    const containerWidth = container.clientWidth;
    if (containerWidth === this._oldContainerWidth) {
      return;
    }

    const computeGap = (elem: HTMLElement | null): number | undefined => {
      if (!elem) {
        return undefined;
      }
      const styles = getComputedStyle(elem);
      const itemWidth = parseInt(styles.getPropertyValue('--icon-container-width'));
      const minGap = parseInt(styles.getPropertyValue('--min-gap'));
      if (Number.isNaN(itemWidth) || Number.isNaN(minGap)) {
        return undefined;
      }
      const padding = 16;
      const maxItems = Math.floor((containerWidth + minGap - 2 * padding) / (itemWidth + minGap));
      if (maxItems < 2) {
        return undefined;
      }
      const totalItemWidth = maxItems * itemWidth;
      return Math.round((containerWidth - 2 * padding - totalItemWidth) / (maxItems - 1));
    };

    const dailyGap = computeGap(daily);
    if (dailyGap !== undefined && dailyGap !== this._dailyGap) {
      this._dailyGap = dailyGap;
    } else if (dailyGap === undefined && this._dailyGap !== undefined) {
      this._dailyGap = undefined;
    }

    const hourlyGap = computeGap(hourly);
    if (hourlyGap !== undefined && hourlyGap !== this._hourlyGap) {
      this._hourlyGap = hourlyGap;
    } else if (hourlyGap === undefined && this._hourlyGap !== undefined) {
      this._hourlyGap = undefined;
    }

    this._oldContainerWidth = containerWidth;
  }

  private _teardownDragScroll(type: ForecastType) {
    if (this._momentumCleanup[type]) {
      this._momentumCleanup[type]!();
      delete this._momentumCleanup[type];
      delete this._momentumElement[type];
    }
  }

  private _initDragScroll(type: ForecastType, container: HTMLElement) {
    if (this._momentumElement[type] === container) {
      return;
    }

    this._teardownDragScroll(type);

    this._momentumElement[type] = container;
    this._momentumCleanup[type] = enableMomentumScroll(container, {
      snapSelector: '.forecast-item',
    });
  }

  private _handleDailySelected(ev: CustomEvent<ForecastAttribute | null>) {
    const forecastItem = ev.detail;
    if (!forecastItem || !this._forecastHourlyEvent?.forecast?.length) {
      return;
    }

    const datetime = forecastItem.datetime;
    if (!datetime) {
      return;
    }

    const targetDate = new Date(datetime);
    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    const hourlyForecast = this._forecastHourlyEvent.forecast;
    const targetIndex = hourlyForecast.findIndex((entry) => {
      const entryDate = new Date(entry.datetime);
      return (
        entryDate.getDate() === targetDay &&
        entryDate.getMonth() === targetMonth &&
        entryDate.getFullYear() === targetYear
      );
    });

    if (targetIndex === -1) {
      return;
    }

    const hourlyContainer = this.shadowRoot?.querySelector<HTMLElement>('.forecast.hourly');
    if (!hourlyContainer) {
      return;
    }

    let offset = 0;
    if (targetIndex > 0) {
      const hourlyItems = Array.from(hourlyContainer.querySelectorAll<HTMLElement>('.forecast-item'));
      const targetItem = hourlyItems[targetIndex];
      if (targetItem) {
        const containerRect = hourlyContainer.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        offset = itemRect.left - containerRect.left + hourlyContainer.scrollLeft - 16; // account for padding
      }
    }

    this._isProgrammaticScroll = true;
    if ('scrollBehavior' in document.documentElement.style) {
      hourlyContainer.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
    } else {
      hourlyContainer.scrollLeft = Math.max(0, offset); // Fallback für alte iPads
    }
    window.setTimeout(() => {
      this._isProgrammaticScroll = false;
    }, 1000);
  }

  private _handleHourlySelected(e: CustomEvent<ForecastAttribute | null>) {
    this._selectedHourlyForecast = e.detail ?? undefined;
  }

  private _handleDailyShowAttributes(e: CustomEvent<ForecastAttribute | null>) {
    this._selectedDailyForecast = e.detail ?? undefined;
  }
}

customElements.define('detailed-weather-forecast-card', DetailedWeatherForecast);
