import { hasAction } from 'custom-card-helpers';
import type { ActionHandlerDetail } from 'custom-card-helpers/dist/types';
import type { TemplateResult } from 'lit';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { actionHandler } from '../action-handler-directive';
import * as customStyles from '../detailed-weather-forecast.css';
import { localize } from '../localize/localize';
import type { DetailedWeatherForecastConfig, WeatherEntity } from '../types';
import type { ExtendedHomeAssistant } from '../weather';
import { getCurrentWeatherStateIcon } from '../weather';

export class DwfCompactHeader extends LitElement {
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

  private _handleTemperatureAction(ev: CustomEvent<ActionHandlerDetail>): void {
    this.dispatchEvent(new CustomEvent('dwf-temperature-action', { detail: { action: ev.detail.action } }));
  }

  private _handleConditionAction(ev: CustomEvent<ActionHandlerDetail>): void {
    this.dispatchEvent(new CustomEvent('dwf-condition-action', { detail: { action: ev.detail.action } }));
  }

  render() {
    if (!this.weatherEntity || !this.hass || !this.config) {
      return nothing;
    }

    let headerCondition: string | undefined = undefined;
    const hasTemperatureAction =
      hasAction(this.config.header_tap_action_temperature) ||
      hasAction(this.config.header_hold_action_temperature) ||
      hasAction(this.config.header_double_tap_action_temperature);
    const hasConditionAction =
      this.config.header_info.length > 0 ||
      hasAction(this.config.header_tap_action_condition) ||
      hasAction(this.config.header_hold_action_condition) ||
      hasAction(this.config.header_double_tap_action_condition);

    if (this.weatherEntity.attributes['pictocode'] !== undefined) {
      headerCondition = localize(`card.pictocode_hour.${this.weatherEntity.attributes['pictocode']}`);
    } else {
      headerCondition = this.hass?.formatEntityState?.(this.weatherEntity) || this.weatherEntity.state;
    }

    return html`
      <div class="compact-header" style="position: relative; overflow: hidden; border-radius: inherit;">
        <slot name="background"></slot>
        <div class="current-conditions" style="position: relative; z-index: 1;">
          <div
            class=${classMap({ 'weather-icon': true, 'has-action': hasConditionAction })}
            role=${hasConditionAction ? 'button' : nothing}
            tabindex=${hasConditionAction ? 0 : nothing}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this.config.header_hold_action_condition),
              hasDoubleClick: hasAction(this.config.header_double_tap_action_condition),
            })}
            @action=${hasConditionAction ? this._handleConditionAction : undefined}
          >
            ${hasConditionAction ? html`<mwc-ripple></mwc-ripple>` : nothing}
            ${getCurrentWeatherStateIcon(this.weatherEntity, this, !this.isDaytime, this.config.icon_map)}
          </div>
          <div
            class=${classMap({ condition: true, 'has-action': hasConditionAction })}
            role=${hasConditionAction ? 'button' : nothing}
            tabindex=${hasConditionAction ? 0 : nothing}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this.config.header_hold_action_condition),
              hasDoubleClick: hasAction(this.config.header_double_tap_action_condition),
            })}
            @action=${hasConditionAction ? this._handleConditionAction : undefined}
          >
            ${hasConditionAction ? html`<mwc-ripple></mwc-ripple>` : nothing} ${headerCondition}
          </div>
          <div
            class=${classMap({ temperature: true, 'has-action': hasTemperatureAction })}
            role=${hasTemperatureAction ? 'button' : nothing}
            tabindex=${hasTemperatureAction ? 0 : nothing}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this.config.header_hold_action_temperature),
              hasDoubleClick: hasAction(this.config.header_double_tap_action_temperature),
            })}
            @action=${hasTemperatureAction ? this._handleTemperatureAction : undefined}
          >
            ${hasTemperatureAction ? html`<mwc-ripple></mwc-ripple>` : nothing} ${this.headerTemperature}
          </div>
        </div>
        ${this.nowcastPanelTemplate
          ? html`<div class="nowcast" style="position: relative; z-index: 1;">${this.nowcastPanelTemplate}</div>`
          : nothing}
        <div class="attributes" style="position: relative; z-index: 1;">
          <dwf-current-weather-attributes
            .hass=${this.hass}
            .weatherEntity=${this.weatherEntity}
            .attributeConfigs=${this.config.header_chips ?? []}
          >
          </dwf-current-weather-attributes>
        </div>
      </div>
    `;
  }
}

customElements.define('dwf-compact-header', DwfCompactHeader);
