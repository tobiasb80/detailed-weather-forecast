import type { HomeAssistant } from 'custom-card-helpers';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import { localize } from '../localize/localize';
import type { ExtraForecastAttributeConfig } from '../types';

const fireEvent = (node: HTMLElement, type: string, detail?: unknown) => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

type HaFormSelector =
  | { entity: { domain?: string; device_class?: string | string[] } }
  | { boolean: Record<string, never> }
  | { text: Record<string, never> }
  | { icon: Record<string, never> }
  | { number: { min?: number; max?: number; step?: number; mode?: 'box' | 'slider' } | Record<string, never> }
  | {
      select: {
        options: Array<{ value: string; label: string }>;
        custom_value?: boolean;
        multiple?: boolean;
        mode?: 'dropdown' | 'list';
      };
    }
  | { ui_color: Record<string, never> };

type HaFormSchema = {
  name: string;
  selector: HaFormSelector;
  optional?: boolean;
  disabled?: boolean;
};

const computeSchema = memoizeOne(
  (
    attributeOptions: Array<{ value: string; label: string }>,
    type: 'hourly' | 'daily',
    attribute?: string,
  ): HaFormSchema[] => {
    const schema: HaFormSchema[] = [
      {
        name: 'attribute',
        selector: {
          select: {
            options: attributeOptions,
          },
        },
        optional: true,
      },
      {
        name: 'unit',
        selector: { text: {} },
        optional: true,
        disabled: type === 'daily' && attribute === 'precipitation_probability',
      },
      { name: 'divisor', selector: { number: { mode: 'box' } }, optional: true },
      { name: 'color', selector: { ui_color: {} }, optional: true },
      { name: 'dim_below', selector: { number: { mode: 'box', step: 0.1 } }, optional: true },
    ];

    return schema;
  },
);

@customElement('extra-attribute-editor')
export class ExtraAttributeEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: ExtraForecastAttributeConfig;
  @property({ attribute: false }) public extraAttributeOptions?: Array<{ value: string; label: string }>;
  @property({ type: String }) public type: 'hourly' | 'daily' = 'hourly';

  private _computeLabel = (schema: HaFormSchema) => {
    if (schema.name === 'attribute') return localize('editor.chip.attribute', '', '');
    if (schema.name === 'divisor') return localize('editor.card.divisor', '', '');
    if (schema.name === 'color') return localize('editor.section.extra_attribute_color', '', '');
    if (schema.name === 'dim_below') return localize('editor.section.dim_values_smaller_than', '', '');

    if (!this.hass) {
      return schema.name;
    }

    const haTranslation = this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    if (haTranslation) {
      return haTranslation;
    }

    return schema.name;
  };

  protected render() {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const attributeOptions = this.extraAttributeOptions || [];
    const schema = computeSchema(attributeOptions, this.type, this.config.attribute);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._formValueChanged}
      ></ha-form>
    `;
  }

  private _formValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const newConfig = { ...this.config, ...ev.detail.value };
    fireEvent(this, 'extra-attribute-config-changed', newConfig);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'extra-attribute-editor': ExtraAttributeEditor;
  }
}
