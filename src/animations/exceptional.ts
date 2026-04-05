import { BaseAnimation } from './base';

/**
 * Exceptional weather animation
 */
export class ExceptionalAnimation extends BaseAnimation {
  /**
   * Draw exceptional weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   */
  draw(time: number, width: number, height: number, cloudCover?: number): void {
    const currentTime = Date.now() * 0.001;

    // Dark fast-moving storm clouds
    this.drawClouds(currentTime * 4.0, width, height, cloudCover ?? 1.2, '70, 75, 85');

    // Heavy Rain
    this.drawRain(width, height, true);

    // Strong Wind & Leaves
    this.drawWind(width, height, currentTime);

    // Lightning Flashes
    this.drawLightning(width, height, currentTime);
  }
}
