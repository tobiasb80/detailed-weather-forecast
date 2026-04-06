import { BaseAnimation } from './base';
import { TimeOfDay } from '../types';

/**
 * Windy weather animation
 */
export class WindyAnimation extends BaseAnimation {
  /**
   * Draw windy weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   * @param timeOfDay - Time of day info
   * @param heavy - Heavy wind flag
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

    // Lighter, faster-moving clouds
    if (heavy) {
      const cloudColor = timeOfDay.type === 'night' ? '40, 45, 55' : '180, 185, 190';
      this.drawClouds(currentTime * 3, width, height, cloudCover ?? 0.6, cloudColor);
    }

    this.drawWind(width, height, currentTime);
  }
}
