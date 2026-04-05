import * as SunCalc from 'suncalc';
import { TIME_THRESHOLDS } from './constants';
import type { Position, TimeOfDay } from './types';
/**
 * Determine time of day and its progress (internal fallback)
 */
export function getTimeOfDay(latitude?: number, longitude?: number): TimeOfDay {
  const now = new Date();

  if (latitude !== undefined && longitude !== undefined) {
    const times = SunCalc.getTimes(now, latitude, longitude);

    if (times.sunrise && times.sunset) {
      const currentTime = now.getTime();
      const sunriseTime = times.sunrise.getTime();
      const sunsetTime = times.sunset.getTime();

      // Time ranges with 30-minute transitions for sunrise and sunset
      const sunriseStart = sunriseTime - 30 * 60 * 1000;
      const sunriseEnd = sunriseTime + 30 * 60 * 1000;
      const sunsetStart = sunsetTime - 30 * 60 * 1000;
      const sunsetEnd = sunsetTime + 30 * 60 * 1000;

      if (currentTime >= sunriseStart && currentTime < sunriseEnd) {
        return { type: 'sunrise', progress: (currentTime - sunriseStart) / (60 * 60 * 1000) };
      }

      if (currentTime >= sunriseEnd && currentTime < sunsetStart) {
        return { type: 'day', progress: (currentTime - sunriseEnd) / (sunsetStart - sunriseEnd) };
      }

      if (currentTime >= sunsetStart && currentTime < sunsetEnd) {
        return { type: 'sunset', progress: (currentTime - sunsetStart) / (60 * 60 * 1000) };
      }

      return { type: 'night', progress: 0 };
    }
  }

  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  // Sunrise: 6:00 - 8:00 (120 minutes)
  if (totalMinutes >= TIME_THRESHOLDS.SUNRISE_START && totalMinutes < TIME_THRESHOLDS.SUNRISE_END) {
    const progress = (totalMinutes - TIME_THRESHOLDS.SUNRISE_START) / 120;
    return { type: 'sunrise', progress };
  }

  // Day: 8:00 - 18:00
  if (totalMinutes >= TIME_THRESHOLDS.SUNRISE_END && totalMinutes < TIME_THRESHOLDS.DAY_END) {
    const progress = (totalMinutes - TIME_THRESHOLDS.SUNRISE_END) / 600;
    return { type: 'day', progress };
  }

  // Sunset: 18:00 - 20:00 (120 minutes)
  if (totalMinutes >= TIME_THRESHOLDS.DAY_END && totalMinutes < TIME_THRESHOLDS.SUNSET_END) {
    const progress = (totalMinutes - TIME_THRESHOLDS.DAY_END) / 120;
    return { type: 'sunset', progress };
  }

  // Night
  return { type: 'night', progress: 0 };
}

/**
 * Get sun/moon position based on time of day
 */
export function getSunPosition(timeOfDay: TimeOfDay, width: number, height: number): Position {
  if (timeOfDay.type === 'sunrise') {
    const progress = timeOfDay.progress;
    return {
      x: width * (0.3 + progress * 0.4),
      y: height * (0.85 - progress * 0.55),
    };
  } else if (timeOfDay.type === 'sunset') {
    const progress = timeOfDay.progress;
    return {
      x: width * (0.5 + progress * 0.3),
      y: height * (0.3 + progress * 0.55),
    };
  } else if (timeOfDay.type === 'day') {
    const progress = timeOfDay.progress;
    const angle = progress * Math.PI;
    return {
      x: width * (0.5 + Math.sin(angle) * 0.25),
      y: height * (0.25 - Math.sin(angle) * 0.1),
    };
  } else {
    // Night: moon position
    return {
      x: width * 0.75,
      y: height * 0.3,
    };
  }
}
