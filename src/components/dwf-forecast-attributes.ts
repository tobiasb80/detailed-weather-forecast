import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatDateWeekdayShort, formatTime } from '../date-time';
import { DetailedWeatherForecastConfig, ForecastAttribute, ForecastAttributeConfig, WeatherEntity } from '../types';
import { ExtendedHomeAssistant, formatForecastAttribute } from '../weather';

@customElement('dwf-forecast-attributes')
export class DwfForecastAttributes extends LitElement {
  @property({ attribute: false }) hass!: ExtendedHomeAssistant;
  @property({ attribute: false }) weatherEntity!: WeatherEntity;
  @property({ attribute: false }) forecastAttribute!: ForecastAttribute;
  @property({ attribute: false }) attributeConfigs: ForecastAttributeConfig[] = [];
  @property({ attribute: false }) dailyForecast = false;
  @property({ attribute: false }) config?: DetailedWeatherForecastConfig;

  protected createRenderRoot() {
    return this;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.forecastAttribute) {
      return nothing;
    }

    const date = new Date(this.forecastAttribute.datetime);
    const dateFormatted = this.dailyForecast
      ? `${formatDateWeekdayShort(date, this.hass.locale as any, this.hass.config as any)}`
      : `${formatDateWeekdayShort(date, this.hass.locale as any, this.hass.config as any)}, ${formatTime(
          date,
          this.hass.locale as any,
          this.hass.config as any,
        )}`;

    let headerCondition: string | undefined = undefined;

    const customCondAttr = this.config?.custom_condition_attribute;
    const customTransKeyAttr = this.config?.custom_translation_key_attribute;
    const customTransPrefix = this.config?.custom_translation_prefix;

    if (
      customCondAttr &&
      customTransKeyAttr &&
      customTransPrefix &&
      (this.forecastAttribute as any)[customCondAttr] !== undefined &&
      (this.forecastAttribute as any)[customTransKeyAttr] !== undefined
    ) {
      const condValue = (this.forecastAttribute as any)[customCondAttr];
      const transKey = (this.forecastAttribute as any)[customTransKeyAttr];
      const translationPath = `${customTransPrefix}.${transKey}.state.${condValue}`;
      headerCondition =
        this.hass.localize(translationPath) ||
        this.hass.formatEntityState?.({ ...this.weatherEntity, state: this.forecastAttribute.condition }) ||
        this.forecastAttribute.condition;
    } else {
      headerCondition =
        this.hass.formatEntityState?.({ ...this.weatherEntity, state: this.forecastAttribute.condition }) ||
        this.forecastAttribute.condition;
    }

    const attributeTemplates = (this.attributeConfigs || [])
      .map((attrConfig) => this._renderAttribute(attrConfig))
      .filter((template) => template !== nothing);

    let heading = dateFormatted;
    if (headerCondition) {
      heading += ` - ${headerCondition}`;
    }

    if (attributeTemplates.length === 0 && !heading) {
      return nothing;
    }

    return html`
      <div class="forecast-condition">${heading}</div>
      ${attributeTemplates.length > 0 ? html`<div class="dwf-current-attributes">${attributeTemplates}</div>` : nothing}
    `;
  }

  private _renderAttribute(attrConfig: ForecastAttributeConfig): TemplateResult | typeof nothing {
    const stateObj = this.weatherEntity;
    const forecast = this.forecastAttribute;
    const formatted = formatForecastAttribute(
      this.hass,
      stateObj,
      forecast,
      attrConfig.attribute,
      attrConfig.name,
      attrConfig.unit,
      attrConfig.icon,
      attrConfig.divisor,
    );

    if (!formatted) {
      return nothing;
    }

    const value = formatted.value;
    const icon = formatted.icon;
    const attribute = attrConfig.attribute;
    const name = formatted.name;

    return html`
      <div class="dwf-current-attribute">
        <ha-attribute-icon
          class="dwf-current-attribute-icon"
          .hass=${this.hass}
          .stateObj=${stateObj}
          .attribute=${attribute}
          .icon=${icon}
        ></ha-attribute-icon>
        <span class="dwf-current-attribute-name"> ${name} </span>
        <span class="dwf-current-attribute-value">${value}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dwf-forecast-attributes': DwfForecastAttributes;
  }
}
