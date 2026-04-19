// Collection of types from HA frontend

import type { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';
import type { HassEntityAttributeBase, HassEntityBase } from 'home-assistant-js-websocket';

export type HeaderChipDisplay = {
  label: string;
  display: string;
  missing: boolean;
  tooltip: string;
  type: HeaderAttribute['type'];
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon?: string;
  entity?: string;
};

export interface HeaderTemperatureConfig {
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface HeaderConditionConfig {
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface DetailedWeatherForecastConfig extends LovelaceCardConfig {
  type: 'custom:detailed-weather-forecast-card';
  entity: string;
  name?: string;
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
  header_temperature?: HeaderTemperatureConfig;
  header_condition?: HeaderConditionConfig;
  hourly_extra_attribute?: ExtraForecastAttributeConfig;
  daily_extra_attribute?: ExtraForecastAttributeConfig;
  solar_forecast_entries?: string[];
  masonry_rows?: number;
  header_info?: HeaderAttribute[];
  daily_info?: ForecastAttributeConfig[];
  hourly_info?: ForecastAttributeConfig[];
  show_background?: boolean;
  compact_header_chips?: boolean;
  show_animation?: boolean;
  fixed_condition?: string;
  fixed_time_of_day?: TimeOfDay['type'];
  moon_phase_entity?: string;
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
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  name?: string;
  icon?: string;
  unit?: string;
  divisor?: number;
}

export interface HeaderEntity {
  type: 'entity';
  entity: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  name?: string;
  icon?: string;
}

export interface ExtraForecastAttributeConfig {
  attribute: string;
  unit?: string;
  divisor?: number;
  color?: string;
  dim_below?: number;
}

export interface ForecastAttributeConfig {
  attribute: string;
  name?: string;
  icon?: string;
  unit?: string;
  divisor?: number;
}

export interface ForecastAttribute {
  temperature: number;
  datetime: string;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  humidity?: number;
  condition?: string;
  is_daytime?: boolean;
  pressure?: number;
  wind_speed?: string | number;
  wind_gust_speed?: number;
  wind_bearing?: number | string;
  cloud_coverage?: number;
  dew_point?: number;
  uv_index?: number;
  solar_forecast?: number;
}

export interface WeatherEntityAttributes extends HassEntityAttributeBase {
  attribution?: string;
  humidity?: number;
  forecast?: ForecastAttribute[];
  is_daytime?: boolean;
  pressure?: number;
  temperature?: number;
  visibility?: number;
  wind_bearing?: number | string;
  wind_speed?: number;
  precipitation_unit: string;
  pressure_unit: string;
  temperature_unit: string;
  visibility_unit: string;
  wind_speed_unit: string;
}

export interface ForecastEvent {
  type: 'hourly' | 'daily' | 'twice_daily';
  forecast: [ForecastAttribute] | null;
}

export interface WeatherEntity extends HassEntityBase {
  attributes: WeatherEntityAttributes;
}

export interface DisplayAttribute {
  value: string;
  name: string;
  icon?: string;
}

// Time of Day
export interface TimeOfDay {
  type: 'sunrise' | 'day' | 'sunset' | 'night';
  progress: number;
}
