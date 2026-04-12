import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HeaderAttribute, WeatherEntity } from '../types';
import { localize } from '../localize/localize';
import { formatWeatherAttributeName } from '../weather';
import memoizeOne from 'memoize-one';

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
  icon?: string;
  iconPath?: string;
};

const computeSchema = memoizeOne(
  (type: 'attribute' | 'entity', attributeOptions: Array<{ value: string; label: string }>): HaFormSchema[] => {
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

    if (type === 'attribute') {
      schema.push({ name: 'unit', selector: { text: {} } });
      schema.push({ name: 'divisor', selector: { number: {} } });
    }

    return schema;
  },
);

const computeInteractionsSchema = memoizeOne((): HaFormSchema[] => {
  return [
    { name: 'tap_action', selector: { ui_action: {} } },
    { name: 'hold_action', selector: { ui_action: { default_action: 'none' } } },
    { name: 'double_tap_action', selector: { ui_action: { default_action: 'none' } } },
  ];
});

@customElement('header-info-editor')
export class HeaderInfoEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public weatherEntity?: string;
  @property({ attribute: false }) public config?: HeaderAttribute;
  @state() private _type: 'attribute' | 'entity' = 'attribute';
  @state() private _interactionsExpanded = false;

  willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('config')) {
      this._type = this.config?.type ?? 'attribute';
    }
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return schema.name;
    }

    const haTranslation = this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    if (haTranslation) {
      return haTranslation;
    }

    const cardKey = `editor.card.${schema.name}`;
    let localized = localize(cardKey);
    if (localized !== cardKey) {
      return localized;
    }

    const mainKey = `editor.main.${schema.name}`;
    localized = localize(mainKey);
    if (localized !== mainKey) {
      return localized;
    }

    return schema.name;
  };

  static styles = css`
    .editor-expander {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 8px);
      margin-top: 16px;
    }
    .editor-expander summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      min-height: 48px;
      font-size: 16px;
      cursor: pointer;
      list-style: none;
    }
    .editor-expander summary::-webkit-details-marker {
      display: none;
    }
    .editor-expander .expander-content {
      padding: 0 16px 16px 16px;
    }
  `;

  protected render() {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const attributeOptions = this._attributeOptionsMemo(this.weatherEntity);
    const schema = computeSchema(this._type, attributeOptions);
    const interactionsSchema = computeInteractionsSchema();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <details
        class="editor-expander"
        ?open=${this._interactionsExpanded}
        @toggle=${(e: Event) => {
          this._interactionsExpanded = (e.target as HTMLDetailsElement).open;
        }}
      >
        <summary>
          <span>${localize('editor.main.interactions')}</span>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="expander-content">
          <ha-form
            .hass=${this.hass}
            .data=${this.config}
            .schema=${interactionsSchema}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </details>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = { ...ev.detail.value };

    // Wenn die Aktion auf "Keine" gesetzt wird, entfernen wir sie
    if (config.hold_action?.action === 'none') {
      config.hold_action = undefined;
    }
    if (config.double_tap_action?.action === 'none') {
      config.double_tap_action = undefined;
    }

    this._type = config.type;
    fireEvent(this, 'header-info-config-changed', config);
  }

  private _attributeOptionsMemo = memoizeOne(
    (entityId: string | undefined): Array<{ value: string; label: string }> => {
      if (!this.hass || !entityId) {
        return [{ value: '', label: 'None' }];
      }

      const entityState = this.hass.states[entityId];
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
    },
  );
}
