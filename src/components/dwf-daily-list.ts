import { LitElement, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { formatDateDayTwoDigit, formatDateWeekdayShort, isNewDay } from '../date-time';
import { formatForecastAttribute, getWeatherStateIcon } from '../weather';
import type { HomeAssistant } from 'custom-card-helpers';
import type { ExtraForecastAttributeConfig, ForecastAttribute, WeatherEntity, WeatherIconMap } from '../types';

const PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const DAILY_PRECIPITATION_MIN_SCALE = 4;
const DAILY_PRECIPITATION_MAX_SCALE = 20;

@customElement('dwf-daily-list')
export class DWFDailyList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) weatherEntity!: WeatherEntity;
  @property({ attribute: false }) forecast: ForecastAttribute[] = [];
  @property({ attribute: false }) precipitationUnit?: string;
  @property({ attribute: false }) extraConfig?: ExtraForecastAttributeConfig;
  @property({ attribute: false }) iconMap?: WeatherIconMap;
  @state() private _selectedForecast?: ForecastAttribute;
  @state() private _showForecastAttribute?: ForecastAttribute;

  protected createRenderRoot() {
    // Render in light DOM so parent CSS applies
    return this;
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('forecast')) {
      if (this.forecast?.length && !this._selectedForecast) {
        this._selectedForecast = this.forecast[0];
      }
    }
  }

  render() {
    if (!this.forecast?.length) return nothing;
    const precipitationScale = this._computePrecipitationScale(
      DAILY_PRECIPITATION_MIN_SCALE,
      DAILY_PRECIPITATION_MAX_SCALE,
    );
    return html` ${this.forecast.map((item) => this._renderDailyItem(item, precipitationScale))} `;
  }

  private _hasValidValue(item?: any): boolean {
    return typeof item !== 'undefined' && item !== null;
  }

  private _renderDailyItem(item: ForecastAttribute, precipitationScale?: number): TemplateResult | typeof nothing {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) {
      return nothing;
    }
    const date = new Date(item.datetime);
    const newDay = isNewDay(date, this.hass.config as any);

    const tempColor = this._getTemperatureColor(item.temperature);
    const tempLowColor = this._hasValidValue(item.templow) ? this._getTemperatureColor(item.templow!) : undefined;

    const isSelected = this._selectedForecast?.datetime === item.datetime;

    return html`
      <div class="forecast-item" @click=${() => this._handleSelect(item)}>
        <mwc-ripple></mwc-ripple>
        <div class="date ${isSelected ? 'selected' : ''}">
          ${formatDateWeekdayShort(date, this.hass.locale as any, this.hass.config as any)}
        </div>
        <div class="day-of-month ${isSelected ? 'selected' : ''}">
          ${!newDay ? formatDateDayTwoDigit(date, this.hass.locale as any, this.hass.config as any) : ''}
        </div>
        <div class="forecast-image-icon">${getWeatherStateIcon(item, this, false, this.iconMap)}</div>
        <div class="temp" style=${styleMap({ color: tempColor })}>${Math.round(item.temperature)}°</div>
        <div class="templow" style=${tempLowColor ? styleMap({ color: tempLowColor }) : nothing}>
          ${this._hasValidValue(item.templow) ? html`${Math.round(item.templow!)}°` : '—'}
        </div>
        ${this._renderPrecipitationInfo(item, precipitationScale)} ${this._renderExtraAttribute(item)}
      </div>
    `;
  }

  private _handleSelect(item: ForecastAttribute) {
    if (!item?.datetime) return;

    let detailShow: ForecastAttribute | null = null;

    if (this._showForecastAttribute && this._selectedForecast?.datetime !== item.datetime) {
      detailShow = item;
    } else if (!this._showForecastAttribute && this._selectedForecast?.datetime === item.datetime) {
      detailShow = item;
    } else {
      detailShow = undefined;
    }

    if (detailShow?.datetime !== this._showForecastAttribute?.datetime) {
      this._showForecastAttribute = detailShow;

      this.dispatchEvent(
        new CustomEvent('dwf-daily-list-item-show-attributes', {
          detail: detailShow,
          bubbles: true,
          composed: true,
        }),
      );
    }

    // Select the new item
    if (item.datetime !== this._selectedForecast?.datetime) {
      this._selectedForecast = item;

      this.dispatchEvent(
        new CustomEvent('dwf-daily-list-item-selected', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  public selectDate(date: Date) {
    const targetDay = date.getDate();
    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();

    const forecastItemIndex = this.forecast.findIndex((item) => {
      const itemDate = new Date(item.datetime);
      return (
        itemDate.getDate() === targetDay && itemDate.getMonth() === targetMonth && itemDate.getFullYear() === targetYear
      );
    });

    if (forecastItemIndex > -1) {
      this._selectedForecast = this.forecast[forecastItemIndex];

      // Wait for the update to complete, so we can get the correct element
      this.updateComplete.then(() => {
        const forecastElements = this.querySelectorAll('.forecast-item');
        const selectedElement = forecastElements[forecastItemIndex] as HTMLElement;

        if (selectedElement) {
          const scrollContainer = this.closest('.forecast');
          if (!scrollContainer) return;

          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = selectedElement.getBoundingClientRect();

          // Check if the element is fully visible horizontally
          const isVisible = elementRect.left >= containerRect.left && elementRect.right <= containerRect.right;

          if (!isVisible) {
            const scrollLeft = scrollContainer.scrollLeft;
            const elementLeftInContainer = elementRect.left - containerRect.left;
            const containerWidth = containerRect.width;
            const elementWidth = elementRect.width;

            // Calculate the desired scroll position to center the element
            const targetScrollLeft = scrollLeft + elementLeftInContainer - containerWidth / 2 + elementWidth / 2;

            if ('scrollBehavior' in document.documentElement.style) {
              scrollContainer.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth',
              });
            } else {
              scrollContainer.scrollLeft = targetScrollLeft; // Fallback for older iPads
            }
          }
        }
      });
    }
  }

  private _getTemperatureColor(temperature: number): string {
    const isFahrenheit =
      this.weatherEntity?.attributes?.temperature_unit === '°F' || this.hass?.config?.unit_system?.temperature === '°F';

    const threshold0 = isFahrenheit ? 32 : 0;
    const threshold10 = isFahrenheit ? 50 : 10;
    const threshold20 = isFahrenheit ? 68 : 20;
    const threshold30 = isFahrenheit ? 86 : 30;

    if (temperature < threshold0) {
      return 'var(--blue-color, #2196f3)';
    }
    if (temperature < threshold10) {
      return 'var(--light-blue-color, #03a9f4)';
    }
    if (temperature < threshold20) {
      return 'var(--green-color, #4caf50)';
    }
    if (temperature < threshold30) {
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
    let precipitationStyle: string | typeof nothing = nothing;

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
    const key = this.extraConfig?.attribute?.trim();
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
      this.extraConfig?.unit,
      undefined,
      this.extraConfig?.divisor,
    );

    if (!formatted) {
      return nothing;
    }

    const dimBelow = this._normalizeDimBelow(this.extraConfig?.dim_below);
    const numericValue = this._parseNumericValue(rawValue);
    const isDimmed = dimBelow !== undefined && numericValue !== undefined && numericValue < dimBelow;
    const classes = ['daily-extra'];
    if (isDimmed) {
      classes.push('dimmed');
    }
    const color = this._resolveColor(this.extraConfig?.color?.trim());
    const style = color
      ? styleMap({
          color,
          opacity: isDimmed ? '0.3' : '1',
        })
      : nothing;

    return html`<div class=${classes.join(' ')} style=${style}>${formatted?.value}</div>`;
  }

  private _resolveColor(color?: string): string | undefined {
    if (!color) return undefined;
    if (
      color.startsWith('#') ||
      color.startsWith('var(') ||
      color.startsWith('rgb') ||
      color.startsWith('hsl') ||
      color.includes(' ')
    ) {
      return color;
    }
    return `var(--${color}-color, ${color})`;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'dwf-daily-list': DWFDailyList;
  }
}
