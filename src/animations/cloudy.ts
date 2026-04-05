import { BaseAnimation } from './base';

/**
 * Cloudy weather animation
 */
export class CloudyAnimation extends BaseAnimation {
  /**
   * Draw cloudy weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   */
  draw(time: number, width: number, height: number, cloudCover?: number): void {
    const currentTime = Date.now() * 0.001;
    this.drawClouds(currentTime, width, height, cloudCover ?? 0.7, '160, 165, 170');
  }
}
