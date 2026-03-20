import { DetailedWeatherForecast } from './detailed-weather-forecast';

declare global {
  interface Window {
    customCards: Array<unknown>;
  }
}

customElements.define('detailed-weather-forecast-card', DetailedWeatherForecast);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'detailed-weather-forecast-card',
  name: 'Detailed Weather Forecast',
  description: 'Weather forecast similar to the default HA card, but with some additional information',
});
