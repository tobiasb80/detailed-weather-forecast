function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}

var $parcel$global = globalThis;
var parcelRequire = $parcel$global['parcelRequire94c2'];
var parcelRegister = parcelRequire.register;
parcelRegister('JMs79', function (module, exports) {
  $parcel$export(module.exports, 'DetailedWeatherForecastEditor', () => $112bd870a911c060$export$4f33cd896d7e371b);

  var $39J5i = parcelRequire('39J5i');

  var $j0ZcV = parcelRequire('j0ZcV');

  var $1ZxoT = parcelRequire('1ZxoT');

  var $b25jb = parcelRequire('b25jb');

  var $aGwLT = parcelRequire('aGwLT');
  parcelRequire('cHMHB');
  parcelRequire('eHWUT');

  var $7Yo7j = parcelRequire('7Yo7j');
  const $112bd870a911c060$var$SOLAR_FORECAST_OPTION = 'solar_forecast';
  const $112bd870a911c060$var$FORECAST_OPTIONS_CACHE = new Map();
  const $112bd870a911c060$var$ICON_MAP_LABELS = {
    'clear-night': (0, $b25jb.localize)('editor.weather_condition.clear-night', '', ''),
    cloudy: (0, $b25jb.localize)('editor.weather_condition.cloudy', '', ''),
    fog: (0, $b25jb.localize)('editor.weather_condition.fog', '', ''),
    hail: (0, $b25jb.localize)('editor.weather_condition.hail', '', ''),
    lightning: (0, $b25jb.localize)('editor.weather_condition.lightning', '', ''),
    'lightning-rainy': (0, $b25jb.localize)('editor.weather_condition.lightning-rainy', '', ''),
    partlycloudy: (0, $b25jb.localize)('editor.weather_condition.partlycloudy', '', ''),
    'partlycloudy-night': (0, $b25jb.localize)('editor.weather_condition.partlycloudy-night', '', ''),
    pouring: (0, $b25jb.localize)('editor.weather_condition.pouring', '', ''),
    rainy: (0, $b25jb.localize)('editor.weather_condition.rainy', '', ''),
    snowy: (0, $b25jb.localize)('editor.weather_condition.snowy', '', ''),
    'snowy-rainy': (0, $b25jb.localize)('editor.weather_condition.snowy-rainy', '', ''),
    sunny: (0, $b25jb.localize)('editor.weather_condition.sunny', '', ''),
    windy: (0, $b25jb.localize)('editor.weather_condition.windy', '', ''),
    'windy-variant': (0, $b25jb.localize)('editor.weather_condition.windy-variant', '', ''),
    exceptional: (0, $b25jb.localize)('editor.weather_condition.exceptional', '', ''),
  };
  const $112bd870a911c060$var$fireEvent = (node, type, detail) => {
    node.dispatchEvent(
      new CustomEvent(type, {
        detail: detail,
        bubbles: true,
        composed: true,
      }),
    );
  };
  const $112bd870a911c060$var$WeatherEntityFeature = {
    FORECAST_DAILY: 1,
    FORECAST_HOURLY: 2,
    FORECAST_TWICE_DAILY: 4,
  };
  class $112bd870a911c060$export$4f33cd896d7e371b extends (0, $j0ZcV.LitElement) {
    static {
      this.styles = (0, $j0ZcV.css)`
    .editor-section {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-section:first-of-type {
      margin-top: 16px;
    }

    .section-subtitle {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-subsection {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chips-hint {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .location-description {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .sun-coordinates {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .color-input-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .color-input-row input[type='color'] {
      padding: 0;
      width: 40px;
      height: 32px;
      border: none;
      background: none;
    }

    .color-input-row input[type='text'] {
      flex: 1 1 120px;
      min-width: 120px;
    }

    .icon-map-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .icon-map-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-map-row ha-selector {
      flex: 1 1 auto;
    }

    .clear-button {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));

      cursor: pointer;
      font: inherit;
      color: var(--primary-text-color);
    }

    .clear-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .coordinate-field {
      display: flex;
      flex: 1 1 120px;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .coordinate-field input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .coordinate-field input:disabled {
      opacity: 0.6;
    }

    .forecast-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .forecast-switch span {
      font-size: 14px;
    }

    .editor-expander {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
    }

    .editor-expander summary {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-expander summary::-webkit-details-marker {
      display: none;
    }

    .editor-expander > summary ha-icon {
      transition: transform 0.2s ease;
    }

    .editor-expander[open] > summary ha-icon {
      transform: rotate(180deg);
    }

    .editor-expander[open] summary {
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .editor-expander .summary-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .editor-expander.disabled summary {
      color: var(--secondary-text-color);
      cursor: default;
    }

    .editor-expander.disabled > summary ha-icon {
      opacity: 0.4;
    }

    .editor-expander .expander-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-expander.nested summary {
      padding: 10px 12px;
      font-size: 14px;
    }

    .editor-expander.nested .expander-content {
      padding: 12px;
    }

    .header-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .header-info-item > *:first-child {
      flex: 1;
    }

    .chip-editor {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 12px;
    }

    .forecast-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .forecast-info-item > *:first-child {
      flex: 1;
    }

    .editor-expander.nested .expander-content > ha-button {
      align-self: flex-start;
    }
  `;
    }
    setConfig(config) {
      const normalizedChips = this._normalizeHeaderChips(config);
      this._config = {
        type: 'custom:detailed-weather-forecast-card',
        ...config,
        header_info: config.header_info ?? [],
        daily_info: config.daily_info ?? [],
        hourly_info: config.hourly_info ?? [],
        nowcast_entity: config.nowcast_entity,
        nowcast_always_show: config.nowcast_always_show ?? false,
        show_header: config.show_header ?? true,
        hourly_forecast: config.hourly_forecast ?? true,
        daily_forecast: config.daily_forecast ?? true,
        orientation: config.orientation ?? 'vertical',
        header_chips: normalizedChips,
        header_attributes: normalizedChips.filter((chip) => chip.type === 'attribute').map((chip) => chip.attribute),
      };
      this._refreshForecastOptions();
      this._refreshSolarForecastOptions(true);
    }
    render() {
      if (!this.hass || !this._config) return (0, $j0ZcV.html)``;
      this._refreshForecastOptions();
      this._ensureSolarForecastOptions();
      const {
        general: generalSchema,
        header: headerSchema,
        nowcast: nowcastSchema,
        hourly: hourlySchema,
        daily: dailySchema,
      } = this._buildSchemas();
      const formData = this._config;
      return (0, $j0ZcV.html)`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${generalSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="editor-section">
        ${this._renderExpander(
          'gps-coordinates',
          (0, $b25jb.localize)('editor.section.gps_coordinates', '', ''),
          (0, $j0ZcV.html)`
            <p class="location-description">${(0, $b25jb.localize)(
              'editor.section.gps_coordinates_description',
              '',
              '',
            )}</p>
            <div class="forecast-switch">
              <span>${(0, $b25jb.localize)('editor.section.use_home_assistant_location', '', '')}</span>
              <ha-switch
                name="sun_use_home_coordinates"
                .checked=${this._config.sun_use_home_coordinates ?? true}
                @change=${this._handleSunToggleChange}
              ></ha-switch>
            </div>
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${(0, $b25jb.localize)('editor.section.latitude', '', '')}</span>
                <input
                  type="text"
                  name="sun_latitude"
                  placeholder="e.g. 48.137"
                  .value=${String(this._config.sun_latitude ?? '')}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
              <label class="coordinate-field">
                <span>${(0, $b25jb.localize)('editor.section.longitude', '', '')}</span>
                <input
                  type="text"
                  name="sun_longitude"
                  placeholder="e.g. 11.575"
                  .value=${String(this._config.sun_longitude ?? '')}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
            </div>
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderExpander(
          'solar-forecast',
          (0, $b25jb.localize)('editor.section.solar_forecast', '', ''),
          (0, $j0ZcV.html)`
            <p class="location-description">${(0, $b25jb.localize)(
              'editor.section.solar_forecast_description',
              '',
              '',
            )}</p>
            <ha-selector
              .hass=${this.hass}
              .selector=${{
                select: {
                  options: this._solarForecastOptions,
                  multiple: true,
                },
              }}
              .value=${this._getSolarForecastSelection()}
              .label=${(0, $b25jb.localize)('editor.section.energy_solar_forecasts', '', '')}
              .required=${false}
              .disabled=${!this._solarForecastEntryIds.length}
              @value-changed=${this._handleSolarForecastSelectionChange}
            ></ha-selector>
            ${
              this._solarForecastOptionsLoaded && !this._solarForecastEntryIds.length
                ? (0, $j0ZcV.html)`<p class="location-description">
                  ${(0, $b25jb.localize)('editor.section.no_energy_solar_forecasts_configured', '', '')}
                </p>`
                : (0, $j0ZcV.nothing)
            }
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderExpander(
          'custom-icons',
          (0, $b25jb.localize)('editor.section.custom_icons', '', ''),
          (0, $j0ZcV.html)`
            <p class="location-description">${(0, $b25jb.localize)(
              'editor.section.custom_icons_description',
              '',
              '',
            )}</p>
            <div class="icon-map-list">
              ${(0, $aGwLT.WEATHER_CONDITIONS).map((condition) => {
                const value = this._getIconMapValue(condition);
                return (0, $j0ZcV.html)`
                  <div class="icon-map-row">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{
                        icon: {},
                      }}
                      .value=${value}
                      .label=${$112bd870a911c060$var$ICON_MAP_LABELS[condition]}
                      .required=${false}
                      @value-changed=${(event) => this._handleIconMapChange(condition, event)}
                    ></ha-selector>
                  </div>
                `;
              })}
            </div>
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'header',
          (0, $b25jb.localize)('editor.section.header', '', ''),
          'show_header',
          (0, $j0ZcV.html)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${headerSchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._renderExpander(
              'header-chips',
              (0, $b25jb.localize)('editor.section.chips', '', ''),
              (0, $j0ZcV.html)`
                <p class="chips-hint">${(0, $b25jb.localize)('editor.section.chips_description', '', '')}</p>
                ${[0, 1, 2].map(
                  (index) => (0, $j0ZcV.html)`
                    <div class="chip-editor">
                      <header-entity-editor
                        .hass=${this.hass}
                        .weatherEntity=${this._config?.entity}
                        .config=${
                          this._config?.header_chips?.[index] || {
                            type: 'attribute',
                            attribute: '',
                            name: '',
                          }
                        }
                        @header-info-config-changed=${(e) => this._headerChipChanged(e, index)}
                      ></header-entity-editor>
                    </div>
                  `,
                )}
              `,
              {
                nested: true,
              },
            )}
            ${this._renderExpander(
              'header-nowcast',
              (0, $b25jb.localize)('editor.section.nowcast', '', ''),
              (0, $j0ZcV.html)`
                <p class="location-description">${(0, $b25jb.localize)(
                  'editor.section.nowcast_description',
                  '',
                  '',
                )}</p>
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${nowcastSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `,
              {
                nested: true,
              },
            )}
            ${this._renderExpander(
              'header-info',
              (0, $b25jb.localize)('editor.section.header_info', '', ''),
              (0, $j0ZcV.html)`
                <p class="chips-hint">${(0, $b25jb.localize)('editor.section.header_info_description', '', '')}</p>
                ${this._config.header_info?.map(
                  (info, index) => (0, $j0ZcV.html)`
                    <div class="header-info-item">
                      <header-entity-editor
                        .hass=${this.hass}
                        .weatherEntity=${this._config?.entity}
                        .config=${info}
                        @header-info-config-changed=${(e) => this._headerInfoChanged(e, index)}
                      ></header-entity-editor>
                      <ha-icon-button @click=${() => this._deleteHeaderInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `,
                )}
                <ha-button @click=${this._addHeaderInfo}>
                  ${(0, $b25jb.localize)('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              {
                nested: true,
              },
            )}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'daily-forecast',
          (0, $b25jb.localize)('editor.section.daily_forecast', '', ''),
          'daily_forecast',
          (0, $j0ZcV.html)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${dailySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${
              this._forecastOptionsLoading.daily && !this._dailyExtraOptions.length
                ? (0, $j0ZcV.html)`<p class="location-description">${(0, $b25jb.localize)(
                    'editor.main.loading_forecast_attributes',
                  )}</p>`
                : (0, $j0ZcV.nothing)
            }
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${(0, $b25jb.localize)('editor.section.extra_attribute_color', '', '')}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="daily_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.daily_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="daily_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.daily_extra_attribute_color ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${() => this._clearOptionalField('daily_extra_attribute_color')}
                  >
                    ${(0, $b25jb.localize)('editor.section.clear', '', '')}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${(0, $b25jb.localize)('editor.section.dim_values_smaller_than', '', '')}</span>
                <input
                  type="number"
                  name="daily_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${(0, $b25jb.localize)('editor.section.no_threshold', '', '')}
                  .value=${String(this._config.daily_extra_attribute_dim_below ?? '')}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${(0, $b25jb.localize)('editor.section.forecast_spacing', '', '')}</h5>
              <p class="location-description">${(0, $b25jb.localize)(
                'editor.section.forecast_spacing_description',
                '',
                '',
              )}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${(0, $b25jb.localize)('editor.section.daily_min_gap', '', '')}</span>
                  <input
                    type="number"
                    name="daily_min_gap"
                    min="10"
                    step="1"
                    placeholder=${(0, $b25jb.localize)('editor.section.default_30', '', '')}
                    .value=${String(this._config.daily_min_gap ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander(
              'daily-info',
              (0, $b25jb.localize)('editor.section.daily_forecast_info', '', ''),
              (0, $j0ZcV.html)`
                <p class="chips-hint">${(0, $b25jb.localize)(
                  'editor.section.daily_forecast_info_description',
                  '',
                  '',
                )}</p>
                ${this._config.daily_info?.map(
                  (info, index) => (0, $j0ZcV.html)`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${info}
                        .extraAttributeOptions=${this._buildDailyExtraAttributeOptions(true)}
                        @forecast-info-config-changed=${(e) => this._dailyInfoChanged(e, index)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${() => this._deleteDailyInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `,
                )}
                <ha-button @click=${this._addDailyInfo}>
                  ${(0, $b25jb.localize)('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              {
                nested: true,
              },
            )}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'hourly-forecast',
          (0, $b25jb.localize)('editor.section.hourly_forecast', '', ''),
          'hourly_forecast',
          (0, $j0ZcV.html)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${hourlySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${
              this._forecastOptionsLoading.hourly && !this._hourlyExtraOptions.length
                ? (0, $j0ZcV.html)`<p class="location-description">${(0, $b25jb.localize)(
                    'editor.main.loading_forecast_attributes',
                  )}</p>`
                : (0, $j0ZcV.nothing)
            }
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${(0, $b25jb.localize)('editor.section.extra_attribute_color', '', '')}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="hourly_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.hourly_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="hourly_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.hourly_extra_attribute_color ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${() => this._clearOptionalField('hourly_extra_attribute_color')}
                  >
                    ${(0, $b25jb.localize)('editor.section.clear', '', '')}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${(0, $b25jb.localize)('editor.section.dim_values_smaller_than', '', '')}</span>
                <input
                  type="number"
                  name="hourly_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${(0, $b25jb.localize)('editor.section.no_threshold', '', '')}
                  .value=${String(this._config.hourly_extra_attribute_dim_below ?? '')}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${(0, $b25jb.localize)('editor.section.sunrise_sunset', '', '')}</h5>
              <div class="forecast-switch">
                <span>${(0, $b25jb.localize)('editor.section.show_sunrise_sunset', '', '')}</span>
                <ha-switch
                  name="show_sun_times"
                  .checked=${this._config.show_sun_times ?? false}
                  @change=${this._handleSunToggleChange}
                ></ha-switch>
              </div>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${(0, $b25jb.localize)('editor.section.forecast_spacing', '', '')}</h5>
              <p class="location-description">${(0, $b25jb.localize)(
                'editor.section.forecast_spacing_description',
                '',
                '',
              )}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${(0, $b25jb.localize)('editor.section.hourly_min_gap', '', '')}</span>
                  <input
                    type="number"
                    name="hourly_min_gap"
                    min="10"
                    step="1"
                    placeholder=${(0, $b25jb.localize)('editor.section.default_16', '', '')}
                    .value=${String(this._config.hourly_min_gap ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander(
              'hourly-info',
              (0, $b25jb.localize)('editor.section.hourly_forecast_info', '', ''),
              (0, $j0ZcV.html)`
                <p class="chips-hint">${(0, $b25jb.localize)(
                  'editor.section.hourly_forecast_info_description',
                  '',
                  '',
                )}</p>
                ${this._config.hourly_info?.map(
                  (info, index) => (0, $j0ZcV.html)`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${info}
                        .extraAttributeOptions=${this._buildHourlyExtraAttributeOptions(true)}
                        @forecast-info-config-changed=${(e) => this._hourlyInfoChanged(e, index)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${() => this._deleteHourlyInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `,
                )}
                <ha-button @click=${this._addHourlyInfo}>
                  ${(0, $b25jb.localize)('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              {
                nested: true,
              },
            )}
          `,
        )}
      </div>
    `;
    }
    _headerChipChanged(e, index) {
      if (!this._config) return;
      const newChips = [...(this._config.header_chips ?? [])];
      while (newChips.length <= index)
        newChips.push({
          type: 'attribute',
          attribute: '',
          name: '',
        });
      newChips[index] = e.detail;
      while (newChips.length > 0) {
        const lastChip = newChips[newChips.length - 1];
        const isEmpty =
          (lastChip.type === 'attribute' && !lastChip.attribute && !lastChip.name) ||
          (lastChip.type === 'entity' && !lastChip.entity && !lastChip.name);
        if (isEmpty) newChips.pop();
        else break;
      }
      this._updateConfig({
        header_chips: newChips,
      });
    }
    _handleValueChanged(event) {
      event.stopPropagation();
      this._updateConfig(event.detail.value);
    }
    _handleSunToggleChange(event) {
      const target = event.currentTarget;
      if (!target) return;
      const name = target.getAttribute('name') ?? target.name;
      if (!name) return;
      const key = name;
      const isChecked = typeof target.checked === 'boolean' ? target.checked : false;
      this._updateConfig({
        [key]: isChecked,
      });
    }
    _handleSunInputChange(event) {
      const target = event.currentTarget;
      if (!target) return;
      const key = target.name;
      const value = target.value.trim();
      const update = {};
      update[key] = value === '' ? undefined : value;
      this._updateConfig(update);
    }
    _handleExpanderToggle(event, id) {
      const target = event.currentTarget;
      if (!target) return;
      this._expandedSections = {
        ...this._expandedSections,
        [id]: target.open,
      };
    }
    _handleExpanderSummaryClick(event, disabled) {
      if (!disabled) return;
      event.preventDefault();
    }
    _isToggleDisabled(name, config) {
      const toggleNames = ['show_header', 'daily_forecast', 'hourly_forecast'];
      const enabledCount = toggleNames.reduce(
        (count, key) => (this._isSectionEnabled(key, config) ? count + 1 : count),
        0,
      );
      return enabledCount <= 1 && this._isSectionEnabled(name, config);
    }
    _handleOptionalNumberInputChange(event) {
      const target = event.currentTarget;
      if (!target) return;
      const key = target.name;
      const raw = target.value.trim();
      const update = {};
      if (raw === '') update[key] = undefined;
      else {
        const numericValue = Number(raw);
        update[key] = Number.isFinite(numericValue) ? numericValue : undefined;
      }
      this._updateConfig(update);
    }
    _handleColorPickerChange(event) {
      const target = event.currentTarget;
      if (!target) return;
      const key = target.name;
      const value = target.value.trim();
      const update = {};
      update[key] = value === '' ? undefined : value;
      this._updateConfig(update);
    }
    _clearOptionalField(field) {
      this._updateConfig({
        [field]: undefined,
      });
    }
    _headerInfoChanged(e, index) {
      if (!this._config?.header_info) return;
      const newInfo = [...this._config.header_info];
      const oldItem = newInfo[index];
      newInfo[index] = {
        ...oldItem,
        ...e.detail,
      };
      this._updateConfig({
        header_info: newInfo,
      });
    }
    _deleteHeaderInfo(index) {
      if (!this._config?.header_info) return;
      const newInfo = [...this._config.header_info];
      newInfo.splice(index, 1);
      this._updateConfig({
        header_info: newInfo,
      });
    }
    _addHeaderInfo() {
      const newInfo = this._config?.header_info ? [...this._config.header_info] : [];
      newInfo.push({
        type: 'attribute',
        attribute: '',
        name: '',
      });
      this._updateConfig({
        header_info: newInfo,
      });
    }
    _dailyInfoChanged(e, index) {
      if (!this._config?.daily_info) return;
      const newInfo = [...this._config.daily_info];
      const oldItem = newInfo[index];
      newInfo[index] = {
        ...oldItem,
        ...e.detail,
      };
      this._updateConfig({
        daily_info: newInfo,
      });
    }
    _deleteDailyInfo(index) {
      if (!this._config?.daily_info) return;
      const newInfo = [...this._config.daily_info];
      newInfo.splice(index, 1);
      this._updateConfig({
        daily_info: newInfo,
      });
    }
    _addDailyInfo() {
      const newInfo = this._config?.daily_info ? [...this._config.daily_info] : [];
      newInfo.push({
        attribute: '',
        name: '',
      });
      this._updateConfig({
        daily_info: newInfo,
      });
    }
    _hourlyInfoChanged(e, index) {
      if (!this._config?.hourly_info) return;
      const newInfo = [...this._config.hourly_info];
      const oldItem = newInfo[index];
      newInfo[index] = {
        ...oldItem,
        ...e.detail,
      };
      this._updateConfig({
        hourly_info: newInfo,
      });
    }
    _deleteHourlyInfo(index) {
      if (!this._config?.hourly_info) return;
      const newInfo = [...this._config.hourly_info];
      newInfo.splice(index, 1);
      this._updateConfig({
        hourly_info: newInfo,
      });
    }
    _addHourlyInfo() {
      const newInfo = this._config?.hourly_info ? [...this._config.hourly_info] : [];
      newInfo.push({
        attribute: '',
        name: '',
      });
      this._updateConfig({
        hourly_info: newInfo,
      });
    }
    _getIconMapValue(condition) {
      const iconMap = this._config?.icon_map;
      if (!iconMap) return '';
      const value = iconMap[condition];
      return typeof value === 'string' ? value : '';
    }
    _handleIconMapChange(condition, event) {
      event.stopPropagation();
      if (!this._config) return;
      const raw = event.detail?.value;
      const value = typeof raw === 'string' ? raw.trim() : '';
      const nextMap = {
        ...(this._config.icon_map ?? {}),
      };
      if (!value) delete nextMap[condition];
      else nextMap[condition] = value;
      this._updateConfig({
        icon_map: Object.keys(nextMap).length ? nextMap : undefined,
      });
    }
    _getColorPickerValue(value) {
      if (!value) return '#000000';
      const trimmed = value.trim();
      const hexMatch = /^#([0-9a-fA-F]{3}){1,2}$/.test(trimmed);
      if (!hexMatch) return '#000000';
      if (trimmed.length === 4) {
        const [r, g, b] = trimmed.slice(1).split('');
        return `#${r}${r}${g}${g}${b}${b}`;
      }
      return trimmed;
    }
    _handleSolarForecastSelectionChange(event) {
      event.stopPropagation();
      const raw = event.detail?.value;
      const selection = Array.isArray(raw) ? raw.filter((item) => typeof item === 'string') : [];
      const available = this._solarForecastEntryIds;
      const normalized = selection.filter((entryId) => available.includes(entryId));
      const update = {};
      if (!normalized.length) update.solar_forecast_entries = [];
      else if (normalized.length === available.length) update.solar_forecast_entries = undefined;
      else update.solar_forecast_entries = normalized;
      this._updateConfig(update);
    }
    _getSolarForecastSelection() {
      if (this._config?.solar_forecast_entries) return this._config.solar_forecast_entries;
      return this._solarForecastEntryIds;
    }
    _renderExpander(id, title, content, options = {}) {
      const className = options.nested ? 'editor-expander nested' : 'editor-expander';
      const isOpen = this._expandedSections[id] ?? options.open ?? false;
      return (0, $j0ZcV.html)`
      <details class=${className} ?open=${isOpen} @toggle=${(event) => this._handleExpanderToggle(event, id)}>
        <summary>
          <span>${title}</span>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="expander-content">${content}</div>
      </details>
    `;
    }
    _renderToggleExpander(id, title, toggleName, content, options = {}) {
      const config = this._config;
      if (!config) return 0, $j0ZcV.nothing;
      const isEnabled = this._isSectionEnabled(toggleName, config);
      const toggleDisabled = this._isToggleDisabled(toggleName, config);
      const isOpen = isEnabled && (this._expandedSections[id] ?? options.open ?? false);
      const className = `editor-expander${isEnabled ? '' : ' disabled'}`;
      return (0, $j0ZcV.html)`
      <details class=${className} ?open=${isOpen} @toggle=${(event) => this._handleExpanderToggle(event, id)}>
        <summary @click=${(event) => this._handleExpanderSummaryClick(event, !isEnabled)}>
          <span>${title}</span>
          <span class="summary-actions">
            <ha-switch
              class="expander-toggle"
              name=${toggleName}
              .checked=${isEnabled}
              ?disabled=${toggleDisabled}
              @click=${(event) => event.stopPropagation()}
              @change=${this._handleSunToggleChange}
            ></ha-switch>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </span>
        </summary>
        <div class="expander-content">${content}</div>
      </details>
    `;
    }
    _ensureSolarForecastOptions() {
      this._refreshSolarForecastOptions(false);
    }
    _refreshSolarForecastOptions(force) {
      if (!this.hass || this._solarForecastOptionsPromise) return;
      if (!force && this._solarForecastOptionsLoaded) return;
      this._solarForecastOptionsPromise = this._fetchSolarForecastOptions().finally(() => {
        this._solarForecastOptionsPromise = undefined;
      });
    }
    async _fetchSolarForecastOptions() {
      try {
        const prefs = await this.hass.callWS({
          type: 'energy/get_prefs',
        });
        const entryIds = this._extractSolarForecastEntries(prefs);
        const entries = await this.hass.callWS({
          type: 'config_entries/get',
        });
        const entryMap = new Map(entries.map((entry) => [entry.entry_id, entry]));
        const options = entryIds.map((entryId) => {
          const entry = entryMap.get(entryId);
          const title = entry?.title?.trim();
          const domain = entry?.domain?.trim();
          const labelParts = [];
          if (title) labelParts.push(title);
          if (domain) labelParts.push(domain);
          const label = labelParts.length ? labelParts.join(' - ') : entryId;
          return {
            value: entryId,
            label: label,
          };
        });
        this._solarForecastOptions = options;
        this._solarForecastEntryIds = entryIds;
      } catch (_err) {
        this._solarForecastOptions = [];
        this._solarForecastEntryIds = [];
      }
      this._solarForecastOptionsLoaded = true;
    }
    _extractSolarForecastEntries(prefs) {
      const energySources = prefs?.energy_sources ?? [];
      const entries = new Set();
      energySources.forEach((source) => {
        if (source?.type !== 'solar') return;
        const configured = source.config_entry_solar_forecast;
        if (!Array.isArray(configured)) return;
        configured.forEach((entryId) => {
          if (typeof entryId === 'string' && entryId.trim().length) entries.add(entryId);
        });
      });
      return Array.from(entries);
    }
    _buildAttributeOptions() {
      if (!this.hass)
        return [
          {
            value: '',
            label: (0, $b25jb.localize)('editor.common.none', '', ''),
          },
        ];
      const entityId = this._config?.entity;
      if (!entityId)
        return [
          {
            value: '',
            label: (0, $b25jb.localize)('editor.common.none', '', ''),
          },
        ];
      const entityState = this.hass.states[entityId];
      if (!entityState)
        return [
          {
            value: '',
            label: (0, $b25jb.localize)('editor.common.none', '', ''),
          },
        ];
      const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));
      const weather = entityState;
      return [
        {
          value: '',
          label: (0, $b25jb.localize)('editor.common.none', '', ''),
        },
        ...attributeNames.map((attribute) => ({
          value: attribute,
          label: (0, $7Yo7j.formatWeatherAttributeName)(this.hass, weather, attribute),
        })),
      ];
    }
    _buildHourlyExtraAttributeOptions(includeDisallowed = false) {
      const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
      const options = this._hourlyExtraOptions.length
        ? this._hourlyExtraOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
        : [];
      const solarOption = this._solarForecastEntryIds.length
        ? [
            {
              value: $112bd870a911c060$var$SOLAR_FORECAST_OPTION,
              label: (0, $b25jb.localize)('editor.common.solar_forecast', '', ''),
            },
          ]
        : [];
      const weather = this._config?.entity ? this.hass.states[this._config.entity] : undefined;
      const attributeOptions = options.map((attribute) => {
        const name = weather ? (0, $7Yo7j.formatWeatherAttributeName)(this.hass, weather, attribute) : attribute;
        return {
          value: attribute,
          label: name,
        };
      });
      return [
        {
          value: '',
          label: (0, $b25jb.localize)('editor.common.none', '', ''),
        },
        ...solarOption,
        ...attributeOptions,
      ];
    }
    _buildDailyExtraAttributeOptions(includeDisallowed = false) {
      const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
      const options = this._dailyExtraOptions.length
        ? this._dailyExtraOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
        : [];
      const solarOption = this._solarForecastEntryIds.length
        ? [
            {
              value: $112bd870a911c060$var$SOLAR_FORECAST_OPTION,
              label: (0, $b25jb.localize)('editor.common.solar_forecast', '', ''),
            },
          ]
        : [];
      const weather = this._config?.entity ? this.hass.states[this._config.entity] : undefined;
      const attributeOptions = options.map((attribute) => {
        const name = weather ? (0, $7Yo7j.formatWeatherAttributeName)(this.hass, weather, attribute) : attribute;
        return {
          value: attribute,
          label: name,
        };
      });
      return [
        {
          value: '',
          label: (0, $b25jb.localize)('editor.common.none', '', ''),
        },
        ...solarOption,
        ...attributeOptions,
      ];
    }
    _buildSchemas() {
      const generalSchema = [
        {
          name: 'entity',
          selector: {
            entity: {
              domain: 'weather',
            },
          },
        },
      ];
      const headerSchema = [
        {
          name: 'header_temperature_entity',
          selector: {
            entity: {
              domain: 'sensor',
              device_class: 'temperature',
            },
          },
          optional: true,
        },
        {
          name: 'header_tap_action_temperature',
          selector: {
            ui_action: {},
          },
          optional: true,
        },
        {
          name: 'use_night_header_backgrounds',
          selector: {
            boolean: {},
          },
        },
      ];
      const nowcastSchema = [
        {
          name: 'nowcast_entity',
          selector: {
            entity: {
              domain: 'weather',
            },
          },
          optional: true,
        },
        {
          name: 'nowcast_always_show',
          selector: {
            boolean: {},
          },
          optional: true,
          disabled: !this._config?.nowcast_entity,
        },
      ];
      const hourlySchema = [
        {
          name: 'hourly_extra_attribute',
          selector: {
            select: {
              options: this._buildHourlyExtraAttributeOptions(),
              custom_value: true,
            },
          },
          optional: true,
        },
        {
          name: 'hourly_extra_attribute_unit',
          selector: {
            text: {},
          },
          optional: true,
        },
        {
          name: 'hourly_extra_attribute_divisor',
          selector: {
            text: {},
          },
          optional: true,
        },
      ];
      const dailySchema = [
        {
          name: 'daily_extra_attribute',
          selector: {
            select: {
              options: this._buildDailyExtraAttributeOptions(),
              custom_value: true,
            },
          },
          optional: true,
        },
        {
          name: 'daily_extra_attribute_unit',
          selector: {
            text: {},
          },
          optional: true,
          disabled: this._config?.daily_extra_attribute === 'precipitation_probability',
        },
        {
          name: 'daily_extra_attribute_divisor',
          selector: {
            number: {},
          },
          optional: true,
        },
      ];
      return {
        general: generalSchema,
        header: headerSchema,
        nowcast: nowcastSchema,
        hourly: hourlySchema,
        daily: dailySchema,
      };
    }
    _isSectionEnabled(name, config) {
      const value = config[name];
      return value !== false;
    }
    _normalizeHeaderChips(config) {
      const limit = 3;
      const normalized = [];
      if (Array.isArray(config.header_chips))
        for (const chip of config.header_chips) {
          if (normalized.length >= limit || !chip || typeof chip !== 'object') continue;
          if (chip.type === 'attribute') {
            const attribute = typeof chip.attribute === 'string' ? chip.attribute.trim() : '';
            const tap_action = chip.tap_action;
            const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
            const unit = typeof chip.unit === 'string' ? chip.unit.trim() : undefined;
            const divisor = chip.divisor;
            normalized.push({
              type: 'attribute',
              attribute: attribute,
              name: chip.name ?? '',
              tap_action: tap_action,
              icon: icon,
              unit: unit,
              divisor: divisor,
            });
            continue;
          }
          if (chip.type === 'entity') {
            const entity = typeof chip.entity === 'string' ? chip.entity.trim() : '';
            const tap_action = chip.tap_action;
            const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
            normalized.push({
              type: 'entity',
              entity: entity,
              name: chip.name ?? '',
              tap_action: tap_action,
              icon: icon,
            });
          }
        }
      if (normalized.length) return normalized.slice(0, limit);
      const attributeEntries = Array.isArray(config.header_attributes)
        ? config.header_attributes
            .filter((attr, index) => index < limit && typeof attr === 'string')
            .map((attr) => attr.trim())
            .filter((attr) => attr.length > 0)
        : [];
      return attributeEntries.map((attribute) => ({
        type: 'attribute',
        attribute: attribute,
        name: attribute,
      }));
    }
    _updateConfig(changes) {
      if (!this._config) return;
      const updated = {
        ...this._config,
        ...changes,
        type: 'custom:detailed-weather-forecast-card',
      };
      if ('solar_forecast_entries' in changes && changes.solar_forecast_entries === undefined)
        delete updated.solar_forecast_entries;
      const normalizedChips = this._normalizeHeaderChips(updated);
      updated.header_chips = normalizedChips;
      updated.header_attributes = normalizedChips
        .filter((chip) => chip.type === 'attribute')
        .map((chip) => chip.attribute)
        .filter((attribute) => typeof attribute === 'string' && attribute.trim().length > 0);
      this._config = updated;
      $112bd870a911c060$var$fireEvent(this, 'config-changed', {
        config: updated,
      });
    }
    _refreshForecastOptions() {
      try {
        if (!this.hass || !this._config?.entity) {
          this._teardownForecastOptionSubscriptions();
          if (this._hourlyExtraOptions.length || this._dailyExtraOptions.length) {
            this._hourlyExtraOptions = [];
            this._dailyExtraOptions = [];
          }
          this._forecastOptionsLoading = {
            hourly: false,
            daily: false,
            twice_daily: false,
          };
          this._forecastOptionsEntity = undefined;
          return;
        }
        const entityId = this._config.entity;
        if (this._forecastOptionsEntity !== entityId) {
          this._teardownForecastOptionSubscriptions();
          const cached = $112bd870a911c060$var$FORECAST_OPTIONS_CACHE.get(entityId);
          if (cached) {
            this._hourlyExtraOptions = cached.hourly;
            this._dailyExtraOptions = cached.daily;
            this._forecastOptionsLoading = {
              hourly: false,
              daily: false,
              twice_daily: false,
            };
          } else
            this._forecastOptionsLoading = {
              hourly: false,
              daily: false,
              twice_daily: false,
            };
          this._forecastOptionsEntity = entityId;
        }
        const stateObj = this.hass.states[entityId];
        const supported = this._getSupportedForecastTypes(stateObj);
        const needed = new Set();
        if (supported.includes('hourly')) needed.add('hourly');
        if (supported.includes('daily') || supported.includes('twice_daily')) needed.add('daily');
        if (!needed.size) needed.add('daily');
        ['hourly', 'daily'].forEach((type) => {
          if (!needed.has(type)) {
            this._teardownForecastOptionSubscriptions([type]);
            this._forecastOptionsLoading = {
              ...this._forecastOptionsLoading,
              [type]: false,
            };
          } else if (!this._forecastOptionSubscriptions[type])
            try {
              this._forecastOptionSubscriptions[type] = this._subscribeForecast(entityId, type, (event) =>
                this._handleForecastOptionsEvent(type, event),
              );
              const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
              if (!hasOptions)
                this._forecastOptionsLoading = {
                  ...this._forecastOptionsLoading,
                  [type]: true,
                };
            } catch (_err) {
              // ignore subscription errors to avoid breaking the editor
            }
          else {
            const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
            this._forecastOptionsLoading = {
              ...this._forecastOptionsLoading,
              [type]: !hasOptions,
            };
          }
        });
      } catch (_err) {
        // Fall back to attribute-based detection to keep the editor alive
        try {
          if (this.hass && this._config?.entity)
            this._applyForecastOptionsFromAttributes(this.hass.states[this._config.entity]);
        } catch (_e) {
          // ignore
        }
      }
    }
    _handleForecastOptionsEvent(type, event) {
      const entries = Array.isArray(event?.forecast) ? event.forecast : [];
      if (!entries.length) return;
      const keys = new Set();
      entries.forEach((entry) => {
        if (entry && typeof entry === 'object')
          Object.keys(entry).forEach((key) => {
            keys.add(key);
          });
      });
      const next = Array.from(keys).sort((a, b) => a.localeCompare(b));
      if (type === 'hourly') {
        if (next.join('|') !== this._hourlyExtraOptions.join('|')) this._hourlyExtraOptions = next;
        this._forecastOptionsLoading = {
          ...this._forecastOptionsLoading,
          hourly: false,
        };
      } else {
        if (next.join('|') !== this._dailyExtraOptions.join('|')) this._dailyExtraOptions = next;
        this._forecastOptionsLoading = {
          ...this._forecastOptionsLoading,
          daily: false,
        };
      }
      this._cacheForecastOptions();
    }
    _applyForecastOptionsFromAttributes(stateObj) {
      if (!stateObj?.attributes?.forecast) return;
      const entries = Array.isArray(stateObj.attributes.forecast) ? stateObj.attributes.forecast : [];
      if (!entries.length) return;
      const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
      const keys = new Set();
      entries.forEach((entry) => {
        if (entry && typeof entry === 'object')
          Object.keys(entry).forEach((key) => {
            if (!disallowed.has(key)) keys.add(key);
          });
      });
      const options = Array.from(keys).sort((a, b) => a.localeCompare(b));
      if (options.join('|') !== this._hourlyExtraOptions.join('|')) this._hourlyExtraOptions = options;
      if (options.join('|') !== this._dailyExtraOptions.join('|')) this._dailyExtraOptions = options;
      this._forecastOptionsLoading = {
        ...this._forecastOptionsLoading,
        hourly: false,
        daily: false,
      };
      this._cacheForecastOptions();
    }
    _cacheForecastOptions() {
      if (!this._forecastOptionsEntity) return;
      if (!this._hourlyExtraOptions.length && !this._dailyExtraOptions.length) return;
      $112bd870a911c060$var$FORECAST_OPTIONS_CACHE.set(this._forecastOptionsEntity, {
        hourly: [...this._hourlyExtraOptions],
        daily: [...this._dailyExtraOptions],
      });
    }
    _getSupportedForecastTypes(stateObj) {
      if (!stateObj?.attributes) return [];
      const supported = [];
      const features = stateObj.attributes.supported_features ?? 0;
      if ((features & $112bd870a911c060$var$WeatherEntityFeature.FORECAST_DAILY) !== 0) supported.push('daily');
      if ((features & $112bd870a911c060$var$WeatherEntityFeature.FORECAST_TWICE_DAILY) !== 0)
        supported.push('twice_daily');
      if ((features & $112bd870a911c060$var$WeatherEntityFeature.FORECAST_HOURLY) !== 0) supported.push('hourly');
      return supported;
    }
    _subscribeForecast(entityId, forecastType, callback) {
      if (!this.hass?.connection) {
        this._applyForecastOptionsFromAttributes(this.hass.states[entityId]);
        return undefined;
      }
      return this.hass.connection
        .subscribeMessage(callback, {
          type: 'weather/subscribe_forecast',
          forecast_type: forecastType,
          entity_id: entityId,
        })
        .catch(() => undefined);
    }
    _teardownForecastOptionSubscriptions(types) {
      const targets = types ?? ['hourly', 'daily'];
      targets.forEach((type) => {
        const sub = this._forecastOptionSubscriptions[type];
        sub?.then((unsub) => unsub?.()).catch(() => undefined);
        delete this._forecastOptionSubscriptions[type];
        this._forecastOptionsLoading = {
          ...this._forecastOptionsLoading,
          [type]: false,
        };
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this._teardownForecastOptionSubscriptions();
    }
    constructor(...args) {
      super(...args),
        (this._hourlyExtraOptions = []),
        (this._dailyExtraOptions = []),
        (this._forecastOptionsLoading = {
          hourly: false,
          daily: false,
          twice_daily: false,
        }),
        (this._solarForecastOptions = []),
        (this._solarForecastEntryIds = []),
        (this._expandedSections = {}),
        (this._forecastOptionSubscriptions = {}),
        (this._solarForecastOptionsLoaded = false),
        (this._computeLabel = (schema) => {
          if (!this.hass) return schema.name;
          const haTranslation = this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
          if (haTranslation) return haTranslation;
          const customKey = `editor.main.${schema.name}`;
          const localized = (0, $b25jb.localize)(customKey);
          if (localized !== customKey) return localized;
          return schema.name;
        });
    }
  }
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $112bd870a911c060$export$4f33cd896d7e371b.prototype,
    'hass',
    void 0,
  );
  (0, $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_config', void 0);
  (0,
  $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_hourlyExtraOptions', void 0);
  (0,
  $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_dailyExtraOptions', void 0);
  (0,
  $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_forecastOptionsLoading', void 0);
  (0,
  $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_solarForecastOptions', void 0);
  (0,
  $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_solarForecastEntryIds', void 0);
  (0,
  $39J5i.__decorate)([(0, $1ZxoT.state)()], $112bd870a911c060$export$4f33cd896d7e371b.prototype, '_expandedSections', void 0);
  $112bd870a911c060$export$4f33cd896d7e371b = (0, $39J5i.__decorate)(
    [(0, $1ZxoT.customElement)('detailed-weather-forecast-editor')],
    $112bd870a911c060$export$4f33cd896d7e371b,
  );
});
parcelRegister('aGwLT', function (module, exports) {
  $parcel$export(module.exports, 'WEATHER_CONDITIONS', () => $c0977d1f14d5c39b$export$7f18ae76d74a6de0);
  // Collection of types from HA frontend
  const $c0977d1f14d5c39b$export$7f18ae76d74a6de0 = [
    'clear-night',
    'cloudy',
    'fog',
    'hail',
    'lightning',
    'lightning-rainy',
    'partlycloudy',
    'partlycloudy-night',
    'pouring',
    'rainy',
    'snowy',
    'snowy-rainy',
    'sunny',
    'windy',
    'windy-variant',
    'exceptional',
  ];
});

parcelRegister('cHMHB', function (module, exports) {
  var $39J5i = parcelRequire('39J5i');

  var $j0ZcV = parcelRequire('j0ZcV');

  var $1ZxoT = parcelRequire('1ZxoT');

  var $b25jb = parcelRequire('b25jb');

  var $7Yo7j = parcelRequire('7Yo7j');
  const $45e8d840e7b2fd10$var$fireEvent = (node, type, detail) => {
    node.dispatchEvent(
      new CustomEvent(type, {
        detail: detail,
        bubbles: true,
        composed: true,
      }),
    );
  };
  const $45e8d840e7b2fd10$var$computeSchema = (type, attributeOptions) => {
    const schema = [
      {
        name: 'type',
        selector: {
          select: {
            options: [
              {
                value: 'attribute',
                label: (0, $b25jb.localize)('editor.selector.weather_attribute'),
              },
              {
                value: 'entity',
                label: (0, $b25jb.localize)('editor.selector.entity'),
              },
            ],
          },
        },
      },
    ];
    if (type === 'entity')
      schema.push({
        name: 'entity',
        selector: {
          entity: {},
        },
      });
    // attribute
    else
      schema.push({
        name: 'attribute',
        selector: {
          select: {
            options: attributeOptions,
            custom_value: true,
          },
        },
      });
    schema.push({
      name: 'name',
      selector: {
        text: {},
      },
    });
    schema.push({
      name: 'icon',
      selector: {
        icon: {},
      },
    });
    schema.push({
      name: 'tap_action',
      selector: {
        ui_action: {},
      },
      optional: true,
    });
    if (type === 'attribute') {
      schema.push({
        name: 'unit',
        selector: {
          text: {},
        },
      });
      schema.push({
        name: 'divisor',
        selector: {
          number: {},
        },
      });
    }
    return schema;
  };
  class $45e8d840e7b2fd10$export$36fcb699c9edd272 extends (0, $j0ZcV.LitElement) {
    updated(changedProperties) {
      super.updated(changedProperties);
      if (changedProperties.has('config')) this._type = this.config?.type ?? 'attribute';
    }
    render() {
      if (!this.hass || !this.config) return 0, $j0ZcV.nothing;
      const attributeOptions = this._buildAttributeOptions();
      const schema = $45e8d840e7b2fd10$var$computeSchema(this._type, attributeOptions);
      const data = {
        ...this.config,
      };
      return (0, $j0ZcV.html)`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
    _valueChanged(ev) {
      ev.stopPropagation();
      const config = ev.detail.value;
      this._type = config.type;
      $45e8d840e7b2fd10$var$fireEvent(this, 'header-info-config-changed', config);
    }
    _buildAttributeOptions() {
      if (!this.hass || !this.weatherEntity)
        return [
          {
            value: '',
            label: 'None',
          },
        ];
      const entityState = this.hass.states[this.weatherEntity];
      if (!entityState)
        return [
          {
            value: '',
            label: 'None',
          },
        ];
      const weather = entityState;
      const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));
      return [
        {
          value: '',
          label: 'None',
        },
        ...attributeNames.map((attribute) => ({
          value: attribute,
          label: (0, $7Yo7j.formatWeatherAttributeName)(this.hass, weather, attribute),
        })),
      ];
    }
    constructor(...args) {
      super(...args),
        (this._type = 'attribute'),
        (this._computeLabel = (schema) => {
          if (!this.hass) return schema.name;
          return (
            this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`) ||
            (0, $b25jb.localize)(`editor.card.${schema.name}`) ||
            schema.name
          );
        });
    }
  }
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $45e8d840e7b2fd10$export$36fcb699c9edd272.prototype,
    'hass',
    void 0,
  );
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $45e8d840e7b2fd10$export$36fcb699c9edd272.prototype,
    'weatherEntity',
    void 0,
  );
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $45e8d840e7b2fd10$export$36fcb699c9edd272.prototype,
    'config',
    void 0,
  );
  (0, $39J5i.__decorate)([(0, $1ZxoT.state)()], $45e8d840e7b2fd10$export$36fcb699c9edd272.prototype, '_type', void 0);
  $45e8d840e7b2fd10$export$36fcb699c9edd272 = (0, $39J5i.__decorate)(
    [(0, $1ZxoT.customElement)('header-entity-editor')],
    $45e8d840e7b2fd10$export$36fcb699c9edd272,
  );
});

parcelRegister('eHWUT', function (module, exports) {
  var $39J5i = parcelRequire('39J5i');

  var $j0ZcV = parcelRequire('j0ZcV');

  var $1ZxoT = parcelRequire('1ZxoT');

  var $b25jb = parcelRequire('b25jb');
  const $a457f49adfc911a0$var$fireEvent = (node, type, detail) => {
    node.dispatchEvent(
      new CustomEvent(type, {
        detail: detail,
        bubbles: true,
        composed: true,
      }),
    );
  };
  const $a457f49adfc911a0$var$computeSchema = (attributeOptions) => {
    const schema = [
      {
        name: 'attribute',
        selector: {
          select: {
            options: attributeOptions,
            custom_value: true,
          },
        },
      },
      {
        name: 'name',
        selector: {
          text: {},
        },
      },
      {
        name: 'icon',
        selector: {
          icon: {},
        },
      },
      {
        name: 'unit',
        selector: {
          text: {},
        },
      },
      {
        name: 'divisor',
        selector: {
          number: {},
        },
      },
    ];
    return schema;
  };
  class $a457f49adfc911a0$export$ae477bd7d152d363 extends (0, $j0ZcV.LitElement) {
    render() {
      if (!this.hass || !this.config) return 0, $j0ZcV.nothing;
      const attributeOptions = this._buildAttributeOptions();
      const schema = $a457f49adfc911a0$var$computeSchema(attributeOptions);
      const data = {
        ...this.config,
      };
      return (0, $j0ZcV.html)`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
    _valueChanged(ev) {
      ev.stopPropagation();
      $a457f49adfc911a0$var$fireEvent(this, 'forecast-info-config-changed', ev.detail.value);
    }
    _buildAttributeOptions() {
      if (this.extraAttributeOptions && this.extraAttributeOptions.length > 0) return this.extraAttributeOptions;
      return [
        {
          value: '',
          label: 'None',
        },
      ];
    }
    constructor(...args) {
      super(...args),
        (this._computeLabel = (schema) => {
          if (!this.hass) return schema.name;
          return (
            this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`) ||
            (0, $b25jb.localize)(`editor.card.${schema.name}`) ||
            schema.name
          );
        });
    }
  }
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $a457f49adfc911a0$export$ae477bd7d152d363.prototype,
    'hass',
    void 0,
  );
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $a457f49adfc911a0$export$ae477bd7d152d363.prototype,
    'config',
    void 0,
  );
  (0, $39J5i.__decorate)(
    [
      (0, $1ZxoT.property)({
        attribute: false,
      }),
    ],
    $a457f49adfc911a0$export$ae477bd7d152d363.prototype,
    'extraAttributeOptions',
    void 0,
  );
  $a457f49adfc911a0$export$ae477bd7d152d363 = (0, $39J5i.__decorate)(
    [(0, $1ZxoT.customElement)('forecast-attribute-editor')],
    $a457f49adfc911a0$export$ae477bd7d152d363,
  );
});

//# sourceMappingURL=detailed-weather-forecast-editor.3862545f.js.map
