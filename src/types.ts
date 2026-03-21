// Collection of types from HA frontend

import type { ActionConfig, HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

export type HassConnection = HomeAssistant['connection'];
export type HassUnsubscribeFunc = ReturnType<HassConnection['subscribeMessage']> extends Promise<infer T> ? T : never;

// From frontend/src/panels/lovelace/types.ts
export interface LovelaceGridOptions {
  columns?: number | 'full';
  rows?: number | 'auto';
  max_columns?: number;
  min_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface DetailedWeatherForecastConfig extends LovelaceCardConfig {
  type: 'custom:detailed-weather-forecast-card';
  entity: string;
  name?: string;
  header_temperature_entity?: string;
  nowcast_entity?: string;
  nowcast_always_show?: boolean;
  header_chips?: HeaderAttribute[];
  icon_map?: WeatherIconMap;
  show_header?: boolean;
  hourly_forecast?: boolean;
  daily_forecast?: boolean;
  show_sun_times?: boolean;
  sun_use_home_coordinates?: boolean;
  sun_latitude?: number | string;
  sun_longitude?: number | string;
  use_night_header_backgrounds?: boolean;
  daily_min_gap?: number;
  hourly_min_gap?: number;
  header_tap_action_temperature?: ActionConfig;
  hourly_extra_attribute?: string;
  hourly_extra_attribute_unit?: string;
  hourly_extra_attribute_divisor?: number;
  hourly_extra_attribute_color?: string;
  hourly_extra_attribute_dim_below?: number;
  daily_extra_attribute?: string;
  daily_extra_attribute_unit?: string;
  daily_extra_attribute_divisor?: number;
  daily_extra_attribute_color?: string;
  daily_extra_attribute_dim_below?: number;
  solar_forecast_entries?: string[];
  masonry_rows?: number;
  header_info?: HeaderAttribute[];
  daily_info?: ForecastAttributeConfig[];
  hourly_info?: ForecastAttributeConfig[];
}

export const WEATHER_CONDITIONS = [
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
] as const;

export type WeatherCondition = (typeof WEATHER_CONDITIONS)[number];

export type WeatherIconMap = Partial<Record<WeatherCondition, string>>;

export interface SunCoordinates {
  latitude: number;
  longitude: number;
}

export type SunEventType = 'sunrise' | 'sunset';

export type SunTimesByDay = Record<string, Partial<Record<SunEventType, number>>>;

export type HeaderAttribute = HeaderWeatherAttribute | HeaderEntity;

export interface HeaderWeatherAttribute {
  type: 'attribute';
  attribute: string;
  tap_action?: ActionConfig;
  name: string;
  icon?: string;
  unit?: string;
  divisor?: number;
}

export interface HeaderEntity {
  type: 'entity';
  entity: string;
  tap_action?: ActionConfig;
  name: string;
  icon?: string;
}

export interface ForecastAttributeConfig {
  attribute: string;
  name: string;
  icon?: string;
  unit?: string;
  divisor?: number;
}
