import type { HomeAssistant } from 'custom-card-helpers';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localize } from '../localize/localize';
import type { ForecastAttributeConfig } from '../types';
import memoizeOne from 'memoize-one';

const fireEvent = (node: HTMLElement, type: string, detail?: unknown) => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

type HaFormSelector =
  | { entity: { domain?: string; device_class?: string | string[] } }
  | { boolean: Record<string, never> }
  | { text: Record<string, never> }
  | { icon: Record<string, never> }
  | { number: Record<number, never> }
  | { select: { options: Array<{ value: string; label: string }>; custom_value?: boolean; multiple?: boolean } };

type HaFormSchema = {
  name: string;
  selector: HaFormSelector;
  optional?: boolean;
  disabled?: boolean;
};

const computeSchema = memoizeOne((attributeOptions: Array<{ value: string; label: string }>): HaFormSchema[] => {
  const schema: HaFormSchema[] = [
    {
      name: 'attribute',
      selector: {
        select: {
          options: attributeOptions,
          custom_value: true,
        },
      },
    },
    { name: 'name', selector: { text: {} } },
    { name: 'icon', selector: { icon: {} } },
    { name: 'unit', selector: { text: {} } },
    { name: 'divisor', selector: { number: {} } },
  ];

  return schema;
});

@customElement('forecast-attribute-editor')
export class ForecastAttributeEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: ForecastAttributeConfig;
  @property({ attribute: false }) public extraAttributeOptions?: Array<{ value: string; label: string }>;

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return schema.name;
    }

    return (
      this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`) ||
      localize(`editor.card.${schema.name}`) ||
      schema.name
    );
  };

  protected render() {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const attributeOptions = this._buildAttributeOptions();
    const schema = computeSchema(attributeOptions);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    fireEvent(this, 'forecast-info-config-changed', ev.detail.value);
  }

  private _defaultOptions = [{ value: '', label: 'None' }];

  private _buildAttributeOptions(): Array<{ value: string; label: string }> {
    if (this.extraAttributeOptions && this.extraAttributeOptions.length > 0) {
      return this.extraAttributeOptions;
    }

    return this._defaultOptions;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forecast-attribute-editor': ForecastAttributeEditor;
  }
}
