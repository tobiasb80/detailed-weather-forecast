import { BaseAnimation } from './base';
import { TimeOfDay } from '../types';

/**
 * Rainy weather animation
 */
export class RainyAnimation extends BaseAnimation {
  /**
   * Draw rainy weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   * @param timeOfDay - Time of day info
   * @param heavy - Heavy rain flag
   */
  draw(
    time: number,
    width: number,
    height: number,
    timeOfDay: TimeOfDay,
    heavy: boolean = false,
    cloudCover?: number,
  ): void {
    const currentTime = Date.now() * 0.001;

    const isNight = timeOfDay.type === 'night';
    const cloudColor = isNight ? (heavy ? '25, 30, 40' : '35, 40, 50') : heavy ? '130, 135, 145' : '150, 155, 165';

    this.drawClouds(currentTime, width, height, cloudCover ?? (heavy ? 1.0 : 0.8), cloudColor);
    this.drawRain(width, height, heavy);
  }
}
