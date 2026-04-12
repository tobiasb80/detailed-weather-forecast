import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HeaderAttribute, WeatherEntity } from '../types';
import { localize } from '../localize/localize';
import { formatWeatherAttributeName } from '../weather';

const fireEvent = (node: HTMLElement, type: string, detail?: unknown) => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

type HaFormSelector =
  | { entity: { domain?: string; device_class?: string | string[] } }
  | { boolean: Record<string, never> }
  | { text: Record<string, never> }
  | { number: Record<number, never> }
  | { icon: Record<string, never> }
  | { ui_action: { default_action?: string; actions?: Array<'tap' | 'hold' | 'double_tap'> } }
  | { select: { options: Array<{ value: string; label: string }>; custom_value?: boolean; multiple?: boolean } };

type HaFormSchema = {
  name: string;
  selector?: HaFormSelector;
  type?: string;
  flatten?: boolean;
  schema?: HaFormSchema[];
  optional?: boolean;
  disabled?: boolean;
};

const computeSchema = (
  type: 'attribute' | 'entity',
  attributeOptions: Array<{ value: string; label: string }>,
): HaFormSchema[] => {
  const schema: HaFormSchema[] = [
    {
      name: 'type',
      selector: {
        select: {
          options: [
            { value: 'attribute', label: localize('editor.selector.weather_attribute') },
            { value: 'entity', label: localize('editor.selector.entity') },
          ],
        },
      },
    },
  ];

  if (type === 'entity') {
    schema.push({ name: 'entity', selector: { entity: {} } });
  } else {
    // attribute
    schema.push({
      name: 'attribute',
      selector: {
        select: {
          options: attributeOptions,
          custom_value: true,
        },
      },
    });
  }

  schema.push({ name: 'name', selector: { text: {} } });
  schema.push({ name: 'icon', selector: { icon: {} } });
  schema.push({ name: 'tap_action', selector: { ui_action: {} } });

  schema.push({
    name: '',
    type: 'optional_actions',
    flatten: true,
    schema: [
      { name: 'hold_action', selector: { ui_action: { default_action: 'none' } }, optional: true },
      { name: 'double_tap_action', selector: { ui_action: { default_action: 'none' } }, optional: true },
    ],
  });

  if (type === 'attribute') {
    schema.push({ name: 'unit', selector: { text: {} } });
    schema.push({ name: 'divisor', selector: { number: {} } });
  }

  return schema;
};

@customElement('header-info-editor')
export class HeaderInfoEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public weatherEntity?: string;
  @property({ attribute: false }) public config?: HeaderAttribute;
  @state() private _type: 'attribute' | 'entity' = 'attribute';

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('config')) {
      this._type = this.config?.type ?? 'attribute';
    }
  }

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
    const schema = computeSchema(this._type, attributeOptions);

    const data = { ...this.config };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = { ...ev.detail.value };

    // Wenn die Aktion auf "Keine" gesetzt wird, entfernen wir sie
    if (config.hold_action?.action === 'none') {
      delete config.hold_action;
    }
    if (config.double_tap_action?.action === 'none') {
      delete config.double_tap_action;
    }

    this._type = config.type;
    fireEvent(this, 'header-info-config-changed', config);
  }

  private _buildAttributeOptions(): Array<{ value: string; label: string }> {
    if (!this.hass || !this.weatherEntity) {
      return [{ value: '', label: 'None' }];
    }

    const entityState = this.hass.states[this.weatherEntity];
    if (!entityState) {
      return [{ value: '', label: 'None' }];
    }

    const weather = entityState as WeatherEntity;

    const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));

    return [
      { value: '', label: 'None' },
      ...attributeNames.map((attribute) => ({
        value: attribute,
        label: formatWeatherAttributeName(this.hass!, weather, attribute),
      })),
    ];
  }
}
