import { hasAction } from 'custom-card-helpers';
import type { ActionHandlerDetail } from 'custom-card-helpers/dist/types';
import { HassEntity } from 'home-assistant-js-websocket';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { actionHandler } from '../action-handler-directive';
import { HeaderAttribute, WeatherEntity } from '../types';
import { executeAction, ExtendedHomeAssistant, formatWeatherAttribute } from '../weather';

@customElement('dwf-current-weather-attributes')
export class DwfCurrentWeatherAttributes extends LitElement {
  @property({ attribute: false }) hass!: ExtendedHomeAssistant;

  @property({ attribute: false }) weatherEntity!: WeatherEntity;

  @property({ attribute: false }) attributeConfigs: HeaderAttribute[] = [];

  protected createRenderRoot() {
    return this;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.weatherEntity || this.attributeConfigs.length === 0) {
      return nothing;
    }

    const attributeTemplates = this.attributeConfigs
      .map((attrConfig) => this._renderAttribute(attrConfig))
      .filter((template) => template !== nothing);

    if (attributeTemplates.length === 0) {
      return nothing;
    }

    return html` <div class="dwf-current-attributes">${attributeTemplates}</div> `;
  }

  private _renderAttribute(attrConfig: HeaderAttribute): TemplateResult | typeof nothing {
    let stateObj: HassEntity | undefined;
    let value: string | number | undefined | boolean;
    let icon: string | undefined;
    let attribute: string | undefined;
    let name: string | undefined;

    if (attrConfig.type == 'entity') {
      // HeaderEntity
      stateObj = this.hass.states[attrConfig.entity];
      if (!stateObj) {
        return nothing;
      }

      const formattedSensor = this.hass?.formatEntityState?.(stateObj);

      if (formattedSensor && typeof formattedSensor === 'string') {
        value = formattedSensor;
      } else {
        value = stateObj.attributes?.assumed_state ?? stateObj.state;
      }

      icon = stateObj.attributes.icon;
      attribute = undefined;
      name = attrConfig.name || stateObj.attributes.friendly_name || attrConfig.entity;
    } else {
      // HeaderWeatherAttribute
      const formatted = formatWeatherAttribute(
        this.hass,
        this.weatherEntity,
        attrConfig.attribute,
        attrConfig.name,
        attrConfig.unit,
        attrConfig.icon,
        attrConfig.divisor,
      );
      if (!formatted) {
        return nothing;
      }
      stateObj = this.weatherEntity;
      value = formatted.value;
      icon = formatted.icon;
      attribute = attrConfig.attribute;
      name = formatted.name;
    }

    const hasTapAction = hasAction(attrConfig.tap_action);
    const hasHoldAction = hasAction(attrConfig.hold_action);
    const hasDoubleTapAction = hasAction(attrConfig.double_tap_action);
    const hasAnyAction = hasTapAction || hasHoldAction || hasDoubleTapAction;
    const attributeClassMap = {
      'dwf-current-attribute': true,
      'has-action': hasAnyAction,
    };

    return html`
      <div
        class=${classMap(attributeClassMap)}
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

  private _handleAttributeAction(ev: CustomEvent<ActionHandlerDetail>, attrConfig: HeaderAttribute) {
    const action = ev.detail.action;
    const actionConfig =
      action === 'hold'
        ? attrConfig.hold_action
        : action === 'double_tap'
          ? attrConfig.double_tap_action
          : attrConfig.tap_action;

    if (!hasAction(actionConfig)) {
      return;
    }

    const entityFallback =
      attrConfig.type === 'entity' && attrConfig.entity ? attrConfig.entity : this.weatherEntity.entity_id;
    executeAction(this, this.hass, actionConfig, entityFallback, action);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dwf-current-weather-attributes': DwfCurrentWeatherAttributes;
  }
}
