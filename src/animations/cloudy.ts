import { BaseAnimation } from './base';
import { TimeOfDay } from '../types';

/**
 * Cloudy weather animation
 */
export class CloudyAnimation extends BaseAnimation {
  /**
   * Draw cloudy weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   * @param timeOfDay - Time of day info
   */
  draw(time: number, width: number, height: number, timeOfDay: TimeOfDay, cloudCover?: number): void {
    const currentTime = Date.now() * 0.001;
    const cloudColor = timeOfDay.type === 'night' ? '30, 35, 45' : '160, 165, 170';
    this.drawClouds(currentTime, width, height, cloudCover ?? 0.7, cloudColor);
  }
}
