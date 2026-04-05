import { BaseAnimation } from './base';

/**
 * Windy weather animation
 */
export class WindyAnimation extends BaseAnimation {
  /**
   * Draw windy weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   * @param heavy - Heavy wind flag
   */
  draw(time: number, width: number, height: number, heavy: boolean = false, cloudCover?: number): void {
    const currentTime = Date.now() * 0.001;

    // Lighter, faster-moving clouds
    if (heavy) {
      this.drawClouds(currentTime * 3, width, height, cloudCover ?? 0.6, '180, 185, 190');
    }

    this.drawWind(width, height, currentTime);
  }
}
