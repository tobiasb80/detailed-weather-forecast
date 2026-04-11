import type { ActionConfig } from 'custom-card-helpers';
import { hasAction } from 'custom-card-helpers';
import type { ActionHandlerDetail } from 'custom-card-helpers/dist/types';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { actionHandler } from '../action-handler-directive';
import * as customStyles from '../detailed-weather-forecast.css';
import type { HeaderChipDisplay } from '../types';

export class DwfHeaderChips extends LitElement {
  static styles = css`
    ${unsafeCSS(customStyles.default || customStyles)}
  `;

  @property({ type: Array }) public headerChips: HeaderChipDisplay[] = [];

  private _handleAction(ev: CustomEvent<ActionHandlerDetail>, actionConfig?: ActionConfig, entity?: string) {
    this.dispatchEvent(
      new CustomEvent('dwf-chip-click', {
        detail: { actionConfig, entity, action: ev.detail.action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (!this.headerChips || !this.headerChips.length) {
      return nothing;
    }

    const headerChipsTemplate = this.headerChips.map((chip) => {
      const isEntity = chip.type === 'entity';
      const hasChipAction =
        isEntity || hasAction(chip.tap_action) || hasAction(chip.hold_action) || hasAction(chip.double_tap_action);
      const chipClassMap = {
        'attribute-chip': true,
        missing: chip.missing,
        'has-action': hasChipAction,
      };
      const chipTitle = chip.tooltip || `${chip.label}: ${chip.display}`;
      return html`
        <div
          class=${classMap(chipClassMap)}
          title=${chipTitle}
          role=${hasChipAction ? 'button' : undefined}
          tabindex=${hasChipAction ? 0 : undefined}
          .actionHandler=${actionHandler({
            hasHold: isEntity || hasAction(chip.hold_action),
            hasDoubleClick: hasAction(chip.double_tap_action),
          })}
          @action=${hasChipAction
            ? (ev: CustomEvent<ActionHandlerDetail>) => {
                const actionType = ev.detail.action;
                const actionConfig =
                  actionType === 'hold'
                    ? chip.hold_action
                    : actionType === 'double_tap'
                      ? chip.double_tap_action
                      : chip.tap_action;

                this._handleAction(ev, actionConfig, chip.type === 'entity' ? chip.entity : undefined);
              }
            : undefined}
        >
          ${hasChipAction ? html`<mwc-ripple></mwc-ripple>` : nothing}
          ${chip.icon ? html`<ha-icon class="chip-icon" .icon=${chip.icon}></ha-icon>` : nothing}
          <span class="header-pill-text">${chip.display}</span>
        </div>
      `;
    });

    return html`<div class="header-attributes">${headerChipsTemplate}</div>`;
  }
}

customElements.define('dwf-header-chips', DwfHeaderChips);
