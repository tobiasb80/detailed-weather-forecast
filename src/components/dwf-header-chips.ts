import type { ActionConfig } from 'custom-card-helpers';
import { hasAction } from 'custom-card-helpers';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import * as customStyles from '../detailed-weather-forecast.css';
import type { HeaderChipDisplay } from '../types';

export class DwfHeaderChips extends LitElement {
  static styles = css`
    ${unsafeCSS(customStyles.default || customStyles)}
  `;

  @property({ type: Array }) public headerChips: HeaderChipDisplay[] = [];

  private _handleHeaderChipTap(actionConfig?: ActionConfig, entity?: string) {
    this.dispatchEvent(
      new CustomEvent('dwf-chip-click', {
        detail: { actionConfig, entity },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleHeaderChipKeydown(event: KeyboardEvent, actionConfig?: ActionConfig, entity?: string) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    this._handleHeaderChipTap(actionConfig, entity);
  }

  render() {
    if (!this.headerChips || !this.headerChips.length) {
      return nothing;
    }

    const headerChipsTemplate = this.headerChips.map((chip) => {
      const hasChipAction = hasAction(chip.action);
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
          @click=${hasChipAction
            ? () => this._handleHeaderChipTap(chip.action, chip.type === 'entity' ? chip.entity : undefined)
            : undefined}
          @keydown=${hasChipAction
            ? (ev: KeyboardEvent) =>
                this._handleHeaderChipKeydown(ev, chip.action, chip.type === 'entity' ? chip.entity : undefined)
            : undefined}
        >
          ${chip.icon ? html`<ha-icon class="chip-icon" .icon=${chip.icon}></ha-icon>` : nothing}
          <span class="header-pill-text">${chip.display}</span>
        </div>
      `;
    });

    return html`<div class="header-attributes">${headerChipsTemplate}</div>`;
  }
}

customElements.define('dwf-header-chips', DwfHeaderChips);
