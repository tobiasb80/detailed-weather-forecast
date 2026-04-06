import { BaseAnimation } from './base';
import { TimeOfDay } from '../types';

/**
 * Thunderstorm weather animation
 */
export class ThunderstormAnimation extends BaseAnimation {
  /**
   * Draw thunderstorm weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   * @param timeOfDay - Time of day info
   * @param withRain - Include rain flag
   */
  draw(
    time: number,
    width: number,
    height: number,
    timeOfDay: TimeOfDay,
    withRain: boolean = true,
    cloudCover?: number,
  ): void {
    const currentTime = Date.now() * 0.001;

    // Dark clouds (even darker at night)
    const cloudColor = timeOfDay.type === 'night' ? '20, 25, 35' : '100, 105, 115';
    this.drawClouds(currentTime, width, height, cloudCover ?? 1.0, cloudColor);

    // Rain if specified
    if (withRain) {
      this.drawRain(width, height, false);
    }

    // Lightning flash effect
    this.drawLightning(width, height, currentTime);
  }
}
