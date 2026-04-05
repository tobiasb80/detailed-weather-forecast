import { BaseAnimation } from './base';

interface FogParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  phase: number;
  phaseSpeed: number;
}

/**
 * Foggy weather animation
 */
export class FoggyAnimation extends BaseAnimation {
  private particles: FogParticle[] = [];
  private lastTime: number = 0;

  /**
   * Draw foggy weather
   * @param time - Animation time (unused, for interface compatibility)
   * @param width - Canvas width
   * @param height - Canvas height
   */
  draw(time: number, width: number, height: number): void {
    // dynamic count of fog particles based on canvas size for better performance
    const targetCount = Math.max(12, Math.floor((width * height) / 15000));

    if (this.particles.length !== targetCount) {
      this.particles = [];
      for (let i = 0; i < targetCount; i++) {
        this.particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 120 + Math.random() * 150, // Große weiche Kreise
          vx: 5 + Math.random() * 15, // Langsame Bewegung nach rechts
          vy: (Math.random() - 0.5) * 10, // Leichte vertikale Schwankung
          baseOpacity: 0.15 + Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.2 + Math.random() * 0.5,
        });
      }
    }

    const currentTime = Date.now() * 0.001;
    const deltaTime = this.lastTime > 0 ? Math.min(currentTime - this.lastTime, 0.1) : 1 / 60;
    this.lastTime = currentTime;

    this.ctx.globalCompositeOperation = 'screen';

    for (const p of this.particles) {
      // Move particle
      p.x += p.vx * deltaTime;
      p.y += p.vy * deltaTime;

      // Wrap around screen edges
      if (p.x - p.radius > width) p.x = -p.radius;
      else if (p.x + p.radius < 0) p.x = width + p.radius;

      if (p.y - p.radius > height) p.y = -p.radius;
      else if (p.y + p.radius < 0) p.y = height + p.radius;

      // pulsate opacity for a more dynamic effect
      const currentOpacity = p.baseOpacity * (0.8 + 0.2 * Math.sin(currentTime * p.phaseSpeed + p.phase));

      // radial gradient for soft edges
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, `rgba(190, 195, 200, ${currentOpacity})`);
      gradient.addColorStop(1, `rgba(190, 195, 200, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalCompositeOperation = 'source-over';
  }
}
