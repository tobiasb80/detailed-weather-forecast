import { handleAction, hasAction, type ActionConfig } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { HeaderAttribute, WeatherEntity } from '../types';
import { ExtendedHomeAssistant, formatWeatherAttribute } from '../weather';

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
    const attributeClassMap = {
      'dwf-current-attribute': true,
      'has-action': hasTapAction,
    };

    return html`
      <div
        class=${classMap(attributeClassMap)}
        role=${hasTapAction ? 'button' : nothing}
        tabindex=${hasTapAction ? 0 : nothing}
        @click=${() => this._handleAttributeTap(attrConfig)}
        @keydown=${(ev: KeyboardEvent) => this._handleAttributeKeydown(ev, attrConfig)}
      >
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

  private _executeTapAction(actionConfig?: ActionConfig, entityOverride?: string) {
    if (!this.hass || !actionConfig || !hasAction(actionConfig)) {
      return;
    }

    // This part for 'perform-action' seems to be a custom implementation
    // before falling back to handleAction.
    const actionType = (actionConfig as any).action as string | undefined;
    const performAction = (actionConfig as any).perform_action as string | undefined;
    if (actionType === 'perform-action' && performAction) {
      const [domain, service] = performAction.split('.', 2);
      if (domain && service) {
        const data = (actionConfig as any).data ?? (actionConfig as any).service_data;
        const target = (actionConfig as any).target;
        this.hass.callService(domain, service, data, target);
        return;
      }
    }

    handleAction(
      this,
      this.hass,
      {
        entity: entityOverride || this.weatherEntity.entity_id,
        tap_action: actionConfig,
      },
      'tap',
    );
  }

  private _handleAttributeTap(attrConfig: HeaderAttribute) {
    if (!hasAction(attrConfig.tap_action)) {
      return;
    }
    const entity = attrConfig.type === 'entity' ? attrConfig.entity : undefined;
    this._executeTapAction(attrConfig.tap_action, entity);
  }

  private _handleAttributeKeydown(ev: KeyboardEvent, attrConfig: HeaderAttribute) {
    if (ev.key !== 'Enter' && ev.key !== ' ') {
      return;
    }
    ev.preventDefault();
    this._handleAttributeTap(attrConfig);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dwf-current-weather-attributes': DwfCurrentWeatherAttributes;
  }
}
