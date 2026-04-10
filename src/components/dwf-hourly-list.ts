import { LitElement, html, nothing, TemplateResult, PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import * as SunCalc from 'suncalc';
import type {
  ForecastAttribute,
  SunCoordinates,
  SunEventType,
  SunTimesByDay,
  WeatherEntity,
  WeatherIconMap,
} from '../types';
import { formatDayPeriod, formatDateWeekdayShort, formatHourMinute, useAmPm } from '../date-time';
import { formatForecastAttribute, getWeatherStateIcon } from '../weather';
import type { HomeAssistant } from 'custom-card-helpers';

const PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const HOURLY_PRECIPITATION_MIN_SCALE = 1;
const HOURLY_PRECIPITATION_MAX_SCALE = 5;

@customElement('dwf-hourly-list')
export class DWFHourlyList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) weatherEntity!: WeatherEntity;
  @property({ attribute: false }) forecast: ForecastAttribute[] = [];
  @property({ attribute: false }) showSunTimes = false;
  @property({ attribute: false }) sunCoordinates?: SunCoordinates;
  @property({ attribute: false }) precipitationUnit?: string;
  @property({ attribute: false }) extraAttribute?: string;
  @property({ attribute: false }) extraAttributeUnit?: string;
  @property({ attribute: false }) extraAttributeDivisor?: number;
  @property({ attribute: false }) extraAttributeColor?: string;
  @property({ attribute: false }) extraAttributeDimBelow?: number;
  @property({ attribute: false }) iconMap?: WeatherIconMap;
  @state() private selectedItem?: ForecastAttribute;
  private _resizeObserver?: ResizeObserver;
  private _sunTimesByDay: SunTimesByDay = {};
  private _currentDayKey?: string;
  private _boundHandleScroll = this._handleScroll.bind(this);

  protected createRenderRoot() {
    // Render in light DOM so parent CSS applies
    return this;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.closest('.forecast.hourly')?.addEventListener('scroll', this._boundHandleScroll, { passive: true });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.closest('.forecast.hourly')?.removeEventListener('scroll', this._boundHandleScroll);
  }

  protected willUpdate(changedProps: PropertyValues<this>): void {
    if (changedProps.has('forecast') || changedProps.has('sunCoordinates') || changedProps.has('showSunTimes')) {
      this._calculateSunTimes();
    }
  }

  render() {
    if (!this.forecast?.length) return nothing;

    const parts: TemplateResult[] = [];
    let currentDay: string | undefined;
    const precipitationScale = this._computePrecipitationScale(
      HOURLY_PRECIPITATION_MIN_SCALE,
      HOURLY_PRECIPITATION_MAX_SCALE,
    );

    if (this.forecast.length > 0 && !this._currentDayKey) {
      const firstDate = new Date(this.forecast[0].datetime);
      this._currentDayKey = this._formatDayKey(firstDate);
    }

    this.forecast.forEach((item, index) => {
      if (!item?.datetime) {
        return;
      }

      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) {
        return;
      }

      const dayKey = this._formatDayKey(date);
      if (dayKey !== currentDay) {
        currentDay = dayKey;
        parts.push(this._renderDayMarker(date));
      }

      const hourlyItem = this._renderHourlyItem(item, index, precipitationScale);
      if (hourlyItem !== nothing) {
        parts.push(hourlyItem);
      }
    });

    return html`${parts}`;
  }

  private _handleScroll(event: Event) {
    const container = event.target as HTMLElement;
    const containerRect = container.getBoundingClientRect();

    const items = this.querySelectorAll('.forecast-item');
    let firstVisibleItem: HTMLElement | undefined;
    for (const item of Array.from(items)) {
      const itemRect = (item as HTMLElement).getBoundingClientRect();
      if (itemRect.left >= containerRect.left) {
        firstVisibleItem = item as HTMLElement;
        break;
      }
    }

    if (firstVisibleItem) {
      const datetime = firstVisibleItem.dataset.datetime;
      if (datetime) {
        const date = new Date(datetime);
        const dayKey = this._formatDayKey(date);

        if (this._currentDayKey !== dayKey) {
          this._currentDayKey = dayKey;
          this.dispatchEvent(
            new CustomEvent('dwf-hourly-scrolled-to-new-day', {
              detail: { date: date },
              bubbles: true,
              composed: true,
            }),
          );
        }
      }
    }
  }

  private _handleItemClick(item: ForecastAttribute) {
    let detail: ForecastAttribute | null;

    if (this.selectedItem?.datetime === item.datetime) {
      this.selectedItem = undefined;
      detail = null;
    } else {
      this.selectedItem = item;
      detail = item;
    }

    this.dispatchEvent(
      new CustomEvent('dwf-hourly-list-item-selected', {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _renderDayMarker(date: Date): TemplateResult {
    const label = formatDateWeekdayShort(date, this.hass?.locale as any, this.hass?.config as any);
    return html`<div class="day-marker">${label}</div>`;
  }

  private _hasValidValue(item?: any): boolean {
    return typeof item !== 'undefined' && item !== null;
  }

  private _renderHourlyItem(
    item: ForecastAttribute,
    index: number,
    precipitationScale?: number,
  ): TemplateResult | typeof nothing {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) {
      return nothing;
    }

    const date = new Date(item.datetime);
    const sunEvent = this._getSunEventForHour(date, index);
    const eventDate = sunEvent ? new Date(sunEvent.timestamp) : undefined;

    const isSelected = this.selectedItem?.datetime === item.datetime;

    const dateClasses = ['date'];
    if (sunEvent) {
      dateClasses.push(sunEvent.type);
    }
    if (isSelected) {
      dateClasses.push('selected');
    }

    const showAmPm = useAmPm(this.hass.locale as any);

    const itemClasses = ['forecast-item'];
    if (!showAmPm) {
      itemClasses.push('no-ampm');
    }
    if (isSelected) {
      itemClasses.push('selected');
    }

    const dateLabel = sunEvent
      ? formatHourMinute(eventDate!, this.hass.locale as any, this.hass.config as any)
      : formatHourMinute(date, this.hass.locale as any, this.hass.config as any);

    const amPmDate = eventDate ?? date;
    const amPmLabel = showAmPm
      ? formatDayPeriod(amPmDate, this.hass.locale as any, this.hass.config as any)
      : undefined;

    const tempColor = this._getTemperatureColor(item.temperature);

    return html`
      <div class="${itemClasses.join(' ')}" data-datetime=${item.datetime} @click=${() => this._handleItemClick(item)}>
        <div class="${dateClasses.join(' ')}">${dateLabel}</div>
        ${showAmPm ? html`<div class="ampm">${amPmLabel ?? ''}</div>` : ''}
        <div class="forecast-image-icon">
          ${getWeatherStateIcon(item, this, this._shouldUseNightIcon(item, date), false, this.iconMap)}
        </div>
        <div class="temp" style=${styleMap({ color: tempColor })}>${Math.round(item.temperature)}°</div>
        ${this._renderPrecipitationInfo(item, precipitationScale)} ${this._renderExtraAttribute(item)}
      </div>
    `;
  }

  private _getTemperatureColor(temperature: number): string {
    if (temperature < 0) {
      return 'var(--blue-color, #2196f3)';
    }
    if (temperature < 15) {
      return 'var(--green-color, #4caf50)';
    }
    if (temperature < 25) {
      return 'var(--orange-color, #ff9800)';
    }
    return 'var(--red-color, #f44336)';
  }

  private _renderPrecipitationInfo(
    item: ForecastAttribute,
    precipitationScale?: number,
  ): TemplateResult | typeof nothing {
    const hasPrecipitation = this._hasValidValue(item.precipitation);
    const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);

    if (!hasPrecipitation && !hasPrecipitationProbability) {
      return nothing;
    }

    const precipitationValue = hasPrecipitation ? (item.precipitation as number) : undefined;
    const precipitationClasses = ['precipitation'];
    if ((precipitationValue ?? 0) > PRECIPITATION_DISPLAY_THRESHOLD) {
      precipitationClasses.push('active');
    }

    let overflow = false;
    let precipitationStyle: string | undefined;

    if (
      precipitationScale !== undefined &&
      precipitationValue !== undefined &&
      precipitationValue >= PRECIPITATION_DISPLAY_THRESHOLD
    ) {
      const normalized = precipitationScale > 0 ? Math.min(precipitationValue / precipitationScale, 1) : 0;
      const percent = `${(normalized * 100).toFixed(2)}%`;
      precipitationStyle = `--precipitation-fill: ${percent};`;
      overflow = precipitationValue > precipitationScale;
    }

    if (overflow) {
      precipitationClasses.push('overflow');
    }

    return html`
      ${hasPrecipitation
        ? html`<div class="${precipitationClasses.join(' ')}" style=${precipitationStyle}>
            ${(item.precipitation as number).toFixed(1) + (this.precipitationUnit ?? '')}
          </div>`
        : nothing}
      ${hasPrecipitationProbability
        ? html`<div
            class="precipitationprobability ${((item.precipitation_probability ?? 0) as number) > 30 ? 'active' : ''}"
          >
            ${item.precipitation_probability >= 0 ? item.precipitation_probability + '%' : ''}
          </div>`
        : nothing}
    `;
  }

  private _renderExtraAttribute(item: ForecastAttribute): TemplateResult | typeof nothing {
    const key = this.extraAttribute?.trim();
    if (!key) {
      return nothing;
    }

    const rawValue = (item as any)?.[key];
    if (rawValue === undefined || rawValue === null) {
      return nothing;
    }

    const formatted = formatForecastAttribute(
      this.hass,
      this.weatherEntity,
      item,
      key,
      undefined,
      this.extraAttributeUnit,
      undefined,
      this.extraAttributeDivisor,
    );

    if (!formatted) {
      return nothing;
    }

    const dimBelow = this._normalizeDimBelow(this.extraAttributeDimBelow);
    const numericValue = this._parseNumericValue(rawValue);
    const isDimmed = dimBelow !== undefined && numericValue !== undefined && numericValue < dimBelow;
    const classes = ['hourly-extra'];
    if (isDimmed) {
      classes.push('dimmed');
    }
    const color = this.extraAttributeColor?.trim();
    const style = color
      ? styleMap({
          color,
          opacity: isDimmed ? '0.3' : '1',
        })
      : undefined;

    return html`<div class=${classes.join(' ')} style=${style}>${formatted.value}</div>`;
  }

  private _normalizeDimBelow(value?: number): number | undefined {
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
  }

  private _parseNumericValue(rawValue: unknown): number | undefined {
    const numericValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }

  private _computePrecipitationScale(minScale: number, maxScale: number): number | undefined {
    if (!this.forecast?.length) {
      return undefined;
    }

    const values = this.forecast
      .map((item) => (typeof item?.precipitation === 'number' ? item.precipitation : undefined))
      .filter((value): value is number => typeof value === 'number');

    if (!values.length) {
      return undefined;
    }

    const highestValue = Math.max(...values);
    const unconstrained = Math.max(minScale, highestValue);
    return Math.min(unconstrained, maxScale);
  }

  private _calculateSunTimes() {
    if (!this.sunCoordinates || !this.forecast?.length) {
      this._sunTimesByDay = {};
      return;
    }

    const { latitude, longitude } = this.sunCoordinates;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      this._sunTimesByDay = {};
      return;
    }

    const sunTimes: SunTimesByDay = {};

    for (const item of this.forecast) {
      if (!item?.datetime) {
        continue;
      }

      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) {
        continue;
      }

      const key = this._formatDayKey(date);
      if (sunTimes[key]) {
        continue;
      }

      const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      let times = SunCalc.getTimes(baseDate, latitude, longitude);
      let sunrise = this._toTimestamp(times.sunrise);
      let sunset = this._toTimestamp(times.sunset);
      // Keep rendered day aligned with the calendar day of the forecast even if
      // user and forecast locations sit in very different time zones.
      const dayShift = this._determineDayShift(key, sunrise, sunset);
      if (dayShift !== 0) {
        const shiftedDate = new Date(baseDate);
        shiftedDate.setDate(shiftedDate.getDate() + dayShift);
        times = SunCalc.getTimes(shiftedDate, latitude, longitude);
        sunrise = this._toTimestamp(times.sunrise);
        sunset = this._toTimestamp(times.sunset);
      }
      sunTimes[key] = {};
      if (sunrise !== undefined) {
        sunTimes[key].sunrise = sunrise;
      }
      if (sunset !== undefined) {
        sunTimes[key].sunset = sunset;
      }
    }

    this._sunTimesByDay = sunTimes;
  }

  private _shouldUseNightIcon(item: ForecastAttribute, date: Date): boolean {
    if (item.is_daytime === false) {
      return true;
    }
    if (item.is_daytime === true) {
      return false;
    }

    const derived = this._isNightFromSunTimes(date);
    return derived ?? false;
  }

  private _isNightFromSunTimes(date: Date): boolean | undefined {
    const times = this._sunTimesByDay?.[this._formatDayKey(date)];
    if (!times || times.sunrise === undefined || times.sunset === undefined) {
      return undefined;
    }

    const timestamp = date.getTime();
    if (!Number.isFinite(timestamp)) {
      return undefined;
    }

    if (times.sunrise <= times.sunset) {
      return timestamp < times.sunrise || timestamp >= times.sunset;
    }

    return !(timestamp >= times.sunrise && timestamp < times.sunset);
  }

  private _getSunEventForHour(date: Date, index: number): { type: SunEventType; timestamp: number } | undefined {
    if (!this.showSunTimes || !this._sunTimesByDay) {
      return undefined;
    }

    const key = this._formatDayKey(date);
    const times = this._sunTimesByDay[key];
    if (!times) {
      return undefined;
    }

    const start = date.getTime();
    if (!Number.isFinite(start)) {
      return undefined;
    }
    const end = this._getIntervalEnd(index, start);

    if (times.sunrise !== undefined && times.sunrise >= start && times.sunrise < end) {
      return { type: 'sunrise', timestamp: times.sunrise };
    }

    if (times.sunset !== undefined && times.sunset >= start && times.sunset < end) {
      return { type: 'sunset', timestamp: times.sunset };
    }

    return undefined;
  }

  private _getIntervalEnd(index: number, start: number): number {
    const next = this.forecast?.[index + 1];
    if (next?.datetime) {
      const nextDate = new Date(next.datetime);
      const nextTime = nextDate.getTime();
      if (Number.isFinite(nextTime) && nextTime > start) {
        return nextTime;
      }
    }
    // Fallback to one hour window if we can't determine the next step
    return start + 60 * 60 * 1000;
  }

  private _formatDayKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _toTimestamp(value?: Date): number | undefined {
    if (!value) {
      return undefined;
    }
    const time = value.getTime();
    return Number.isFinite(time) ? time : undefined;
  }

  private _determineDayShift(targetKey: string, sunrise?: number, sunset?: number): number {
    // Returns +1/-1 when sunrise/sunset fall on the previous/next day once
    // rendered in the user's local time zone. That happens when the forecast
    // location is many hours away from the viewer.
    const evaluate = (timestamp?: number): number => {
      if (timestamp === undefined) {
        return 0;
      }
      const eventKey = this._formatDayKey(new Date(timestamp));
      if (eventKey === targetKey) {
        return 0;
      }
      return eventKey < targetKey ? 1 : -1;
    };

    const sunriseShift = evaluate(sunrise);
    if (sunriseShift !== 0) {
      return sunriseShift;
    }

    return evaluate(sunset);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dwf-hourly-list': DWFHourlyList;
  }
}
