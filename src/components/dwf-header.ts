import { hasAction, type ActionConfig } from 'custom-card-helpers';
import type { ActionHandlerDetail } from 'custom-card-helpers/dist/types';
import type { TemplateResult } from 'lit';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { actionHandler } from '../action-handler-directive';
import * as customStyles from '../detailed-weather-forecast.css';
import { localize } from '../localize/localize';
import type { DetailedWeatherForecastConfig, WeatherEntity, HeaderChipDisplay } from '../types';
import type { ExtendedHomeAssistant } from '../weather';
import { getCurrentWeatherStateIcon, executeAction } from '../weather';

export class DwfHeader extends LitElement {
  static styles = css`
    ${unsafeCSS(customStyles.default || customStyles)}
  `;

  @property({ attribute: false })
  public hass?: ExtendedHomeAssistant;

  @property({ attribute: false })
  public weatherEntity?: WeatherEntity;

  @property({ attribute: false })
  public config?: DetailedWeatherForecastConfig;

  @property({ attribute: false })
  public nowcastPanelTemplate?: TemplateResult;

  @property()
  public headerTemperature?: string;

  @property({ type: Boolean })
  public isDaytime?: boolean;

  @property({ attribute: false })
  public headerChipsDisplays: HeaderChipDisplay[] = [];

  @property({ type: Boolean })
  public headerOnly = false;

  @property({ attribute: false })
  public headerStyles: Record<string, string> = {};

  private _handleTemperatureAction(ev: CustomEvent<ActionHandlerDetail>): void {
    const actionType = ev.detail.action;
    const actionConfig =
      actionType === 'hold'
        ? this.config?.header_temperature?.hold_action
        : actionType === 'double_tap'
          ? this.config?.header_temperature?.double_tap_action
          : this.config?.header_temperature?.tap_action;

    const temperatureActionEntity = this.config?.header_temperature?.entity || this.weatherEntity?.entity_id;

    if (this.hass && temperatureActionEntity) {
      executeAction(this, this.hass, actionConfig, temperatureActionEntity, actionType);
    }
  }

  private _handleConditionAction(ev: CustomEvent<ActionHandlerDetail>): void {
    const actionType = ev.detail.action;
    const actionConfig =
      actionType === 'hold'
        ? this.config?.header_condition?.hold_action
        : actionType === 'double_tap'
          ? this.config?.header_condition?.double_tap_action
          : this.config?.header_condition?.tap_action;

    if (actionConfig) {
      if (this.hass && this.weatherEntity) {
        executeAction(this, this.hass, actionConfig, this.weatherEntity.entity_id, actionType);
      }
    } else if (actionType === 'tap' && (this.config?.header_info?.length ?? 0) > 0) {
      this.dispatchEvent(new CustomEvent('dwf-toggle-attributes', { bubbles: true, composed: true }));
    }
  }

  private _handleHeaderChipAction(actionConfig?: ActionConfig, entity?: string, action: string = 'tap') {
    if (this.hass && this.weatherEntity) {
      executeAction(this, this.hass, actionConfig, entity || this.weatherEntity.entity_id, action);
    }
  }

  render() {
    if (!this.weatherEntity || !this.hass || !this.config) {
      return nothing;
    }

    const showBackground = this.config.show_background !== false;
    const compactChips = this.config.compact_header_chips === true;

    let headerCondition: string | undefined = undefined;
    const hasTemperatureAction =
      hasAction(this.config.header_temperature?.tap_action) ||
      hasAction(this.config.header_temperature?.hold_action) ||
      hasAction(this.config.header_temperature?.double_tap_action);
    const hasConditionAction =
      (this.config.header_info?.length ?? 0) > 0 ||
      hasAction(this.config.header_condition?.tap_action) ||
      hasAction(this.config.header_condition?.hold_action) ||
      hasAction(this.config.header_condition?.double_tap_action);

    const customCondAttr = this.config.custom_condition_attribute;
    const customTransKeyAttr = this.config.custom_translation_key_attribute;
    const customTransPrefix = this.config.custom_translation_prefix;

    if (
      customCondAttr &&
      customTransKeyAttr &&
      customTransPrefix &&
      this.weatherEntity.attributes[customCondAttr] !== undefined &&
      this.weatherEntity.attributes[customTransKeyAttr] !== undefined
    ) {
      const condValue = this.weatherEntity.attributes[customCondAttr];
      const transKey = this.weatherEntity.attributes[customTransKeyAttr];
      const translationPath = `${customTransPrefix}.${transKey}.${condValue}`;
      headerCondition =
        this.hass?.localize(translationPath) ||
        this.hass?.formatEntityState?.(this.weatherEntity) ||
        this.weatherEntity.state;
    } else if (this.weatherEntity.attributes['pictocode_old'] !== undefined) {
      headerCondition = localize(`card.pictocode_hour.${this.weatherEntity.attributes['pictocode_old']}`);
    } else {
      headerCondition = this.hass?.formatEntityState?.(this.weatherEntity) || this.weatherEntity.state;
    }

    const chipsTemplate =
      compactChips && this.headerChipsDisplays.length > 0
        ? html`<dwf-header-chips
            .headerChips=${this.headerChipsDisplays}
            @dwf-chip-click=${(e: CustomEvent) =>
              this._handleHeaderChipAction(e.detail.actionConfig, e.detail.entity, e.detail.action)}
          ></dwf-header-chips>`
        : !compactChips && (this.config.header_chips?.length ?? 0) > 0
          ? html`<dwf-current-weather-attributes
              .hass=${this.hass}
              .weatherEntity=${this.weatherEntity}
              .attributeConfigs=${this.config.header_chips ?? []}
            ></dwf-current-weather-attributes>`
          : nothing;

    const headerClasses = showBackground
      ? {
          weather: true,
          'header-only': this.headerOnly,
        }
      : {
          'compact-header': true,
          'header-only': this.headerOnly,
        };

    return html`
      <div class=${classMap(headerClasses)} style=${styleMap(this.headerStyles)}>
        ${showBackground ? html`<slot name="background"></slot>` : nothing}

        <div class=${showBackground ? 'header-content' : 'compact-content'} style="position: relative; z-index: 1;">
          <div class=${showBackground ? 'header-main' : 'current-conditions'}>
            ${!showBackground
              ? html`
                  <div
                    class=${classMap({ 'weather-icon': true, 'has-action': hasConditionAction })}
                    role=${hasConditionAction ? 'button' : nothing}
                    tabindex=${hasConditionAction ? 0 : nothing}
                    .actionHandler=${actionHandler({
                      hasHold: hasAction(this.config.header_condition?.hold_action),
                      hasDoubleClick: hasAction(this.config.header_condition?.double_tap_action),
                    })}
                    @action=${hasConditionAction ? this._handleConditionAction : undefined}
                  >
                    ${hasConditionAction ? html`<mwc-ripple></mwc-ripple>` : nothing}
                    ${getCurrentWeatherStateIcon(this.weatherEntity, this, !this.isDaytime, this.config.icon_map)}
                  </div>
                `
              : nothing}
            <div
              class=${classMap({ condition: true, 'has-action': hasConditionAction })}
              role=${hasConditionAction ? 'button' : nothing}
              tabindex=${hasConditionAction ? 0 : nothing}
              .actionHandler=${actionHandler({
                hasHold: hasAction(this.config.header_condition?.hold_action),
                hasDoubleClick: hasAction(this.config.header_condition?.double_tap_action),
              })}
              @action=${hasConditionAction ? this._handleConditionAction : undefined}
            >
              ${hasConditionAction ? html`<mwc-ripple></mwc-ripple>` : nothing}
              ${showBackground ? html`<span class="header-pill-text">${headerCondition}</span>` : headerCondition}
            </div>
            <div
              class=${classMap({ temp: true, 'has-action': hasTemperatureAction })}
              role=${hasTemperatureAction ? 'button' : nothing}
              tabindex=${hasTemperatureAction ? 0 : nothing}
              .actionHandler=${actionHandler({
                hasHold: hasAction(this.config.header_temperature?.hold_action),
                hasDoubleClick: hasAction(this.config.header_temperature?.double_tap_action),
              })}
              @action=${hasTemperatureAction ? this._handleTemperatureAction : undefined}
            >
              ${hasTemperatureAction ? html`<mwc-ripple></mwc-ripple>` : nothing}
              ${showBackground
                ? html`<span class="header-pill-text">${this.headerTemperature}</span>`
                : this.headerTemperature}
            </div>
          </div>

          ${!compactChips && (this.config.header_chips?.length ?? 0) > 0
            ? html` <div class="attributes">${chipsTemplate}</div> `
            : chipsTemplate}
          ${this.nowcastPanelTemplate
            ? html` <div class=${showBackground ? '' : 'nowcast'}>${this.nowcastPanelTemplate}</div> `
            : nothing}
        </div>
      </div>
    `;
  }
}

customElements.define('dwf-header', DwfHeader);
