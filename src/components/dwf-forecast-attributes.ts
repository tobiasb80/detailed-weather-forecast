import { hasAction } from 'custom-card-helpers';
import type { ActionHandlerDetail } from 'custom-card-helpers/dist/types';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { actionHandler } from '../action-handler-directive';
import { formatDateWeekdayShort, formatTime } from '../date-time';
import { localize } from '../localize/localize';
import { ForecastAttribute, ForecastAttributeConfig, WeatherEntity } from '../types';
import { executeAction, ExtendedHomeAssistant, formatForecastAttribute } from '../weather';

@customElement('dwf-forecast-attributes')
export class DwfForecastAttributes extends LitElement {
  @property({ attribute: false }) hass!: ExtendedHomeAssistant;
  @property({ attribute: false }) weatherEntity!: WeatherEntity;
  @property({ attribute: false }) forecastAttribute!: ForecastAttribute;
  @property({ attribute: false }) attributeConfigs: ForecastAttributeConfig[] = [];
  @property({ attribute: false }) dailyForecast = false;

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

    if (this.forecastAttribute['pictocode'] !== undefined) {
      const key = this.dailyForecast ? 'card.pictocode_day' : 'card.pictocode_hour';
      headerCondition = localize(`${key}.${this.forecastAttribute['pictocode']}`);
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

    const isEntity = (attrConfig as any).type === 'entity';
    const hasTapAction = isEntity || hasAction(attrConfig.tap_action);
    const hasHoldAction = isEntity || hasAction(attrConfig.hold_action);
    const hasDoubleTapAction = hasAction(attrConfig.double_tap_action);
    const hasAnyAction = hasTapAction || hasHoldAction || hasDoubleTapAction;

    return html`
      <div
        class=${classMap({ 'dwf-current-attribute': true, 'has-action': hasAnyAction })}
        role=${hasAnyAction ? 'button' : nothing}
        tabindex=${hasAnyAction ? 0 : nothing}
        .actionHandler=${actionHandler({
          hasHold: hasHoldAction,
          hasDoubleClick: hasDoubleTapAction,
        })}
        @action=${hasAnyAction
          ? (ev: CustomEvent<ActionHandlerDetail>) => this._handleAttributeAction(ev, attrConfig)
          : undefined}
      >
        ${hasAnyAction ? html`<mwc-ripple></mwc-ripple>` : nothing}
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

  private _handleAttributeAction(ev: CustomEvent<ActionHandlerDetail>, attrConfig: ForecastAttributeConfig) {
    const action = ev.detail.action;
    const actionConfig =
      action === 'hold'
        ? attrConfig.hold_action
        : action === 'double_tap'
          ? attrConfig.double_tap_action
          : attrConfig.tap_action;

    executeAction(this, this.hass, actionConfig, this.weatherEntity.entity_id, action);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dwf-forecast-attributes': DwfForecastAttributes;
  }
}
