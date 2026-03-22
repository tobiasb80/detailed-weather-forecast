import type { ActionConfig } from 'custom-card-helpers';
import { hasAction } from 'custom-card-helpers';
import type { TemplateResult } from 'lit';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { DetailedWeatherForecastConfig } from '../types';
import type { ExtendedHomeAssistant, WeatherEntity } from '../weather';
import { getCurrentWeatherStateIcon } from '../weather';
import * as customStyles from 'bundle-text:../detailed-weather-forecast.css';
import { localize } from '../localize';

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

  private _handleTemperatureClick(): void {
    this.dispatchEvent(new CustomEvent('dwf-temperature-click'));
  }

  private _handleConditionClick(): void {
    this.dispatchEvent(new CustomEvent('dwf-condition-click'));
  }

  private _handleTemperatureKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' || ev.key === ' ') {
      this._handleTemperatureClick();
    }
  }

  private _handleConditionKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' || ev.key === ' ') {
      this._handleConditionClick();
    }
  }

  render() {
    if (!this.weatherEntity || !this.hass || !this.config) {
      return nothing;
    }

    let headerCondition: string | undefined = undefined;
    const hasTemperatureTapAction = hasAction(this.config.header_tap_action_temperature);
    const hasConditionTapAction = this.config.header_info.length > 0;

    if (this.weatherEntity.attributes['pictocode'] !== undefined) {
      headerCondition = localize(`card.pictocode_hour.${this.weatherEntity.attributes['pictocode']}`);
    } else {
      headerCondition = this.hass?.formatEntityState?.(this.weatherEntity) || this.weatherEntity.state;
    }

    return html`
      <div class="compact-header">
        <div class="current-conditions">
          <div
            class=${classMap({ 'weather-icon': true, 'has-action': hasConditionTapAction })}
            @click=${this._handleConditionClick}
            @keydown=${this._handleConditionKeydown}
            role=${hasConditionTapAction ? 'button' : nothing}
            tabindex=${hasConditionTapAction ? 0 : nothing}
          >
            ${getCurrentWeatherStateIcon(this.weatherEntity, this, !this.isDaytime, this.config.icon_map)}
          </div>
          <div
            class=${classMap({ condition: true, 'has-action': hasConditionTapAction })}
            @click=${this._handleConditionClick}
            @keydown=${this._handleConditionKeydown}
            role=${hasConditionTapAction ? 'button' : nothing}
            tabindex=${hasConditionTapAction ? 0 : nothing}
          >
            ${headerCondition}
          </div>
          <div
            class=${classMap({ temperature: true, 'has-action': hasTemperatureTapAction })}
            @click=${this._handleTemperatureClick}
            @keydown=${this._handleTemperatureKeydown}
            role=${hasTemperatureTapAction ? 'button' : nothing}
            tabindex=${hasTemperatureTapAction ? 0 : nothing}
          >
            ${this.headerTemperature}
          </div>
        </div>
        ${this.nowcastPanelTemplate ? html`<div class="nowcast">${this.nowcastPanelTemplate}</div>` : nothing}
        <div class="attributes">
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
