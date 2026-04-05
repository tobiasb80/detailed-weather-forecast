import type { TemplateResult } from 'lit';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import * as customStyles from '../detailed-weather-forecast.css';

export class DwfHeader extends LitElement {
  static styles = css`
    ${unsafeCSS(customStyles.default || customStyles)}
  `;

  @property({ attribute: false })
  public headerClassMap: Record<string, boolean> = {};

  @property({ attribute: false })
  public headerStyles: Record<string, string> = {};

  @property({ attribute: false })
  public headerLayoutTemplate?: TemplateResult;

  @property({ type: Boolean })
  public showInlineNowcast = false;

  @property({ attribute: false })
  public nowcastPanelTemplate?: TemplateResult;

  render() {
    return html`
      <div class=${classMap(this.headerClassMap)} style=${styleMap(this.headerStyles)}>
        <slot name="background"></slot>
        <div class="header-content" style="position: relative; z-index: 1;">
          ${html` ${this.headerLayoutTemplate} ${this.showInlineNowcast ? this.nowcastPanelTemplate : nothing} `}
        </div>
      </div>
    `;
  }
}

customElements.define('dwf-header', DwfHeader);
