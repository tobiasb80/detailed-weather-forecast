export interface WindStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export interface Leaf {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export interface RainDrop {
  x: number;
  y: number;
  speed: number;
  windOffset: number;
  width: number;
  length: number;
  alpha: number;
  phase: number;
}

/**
 * Base class for weather animations
 */
export class BaseAnimation {
  protected ctx: CanvasRenderingContext2D;
  protected streaks: WindStreak[] = [];
  protected leaves: Leaf[] = [];
  protected rainDrops: RainDrop[] = [];
  protected rainLastTime: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * Draw a single cloud
   */
  drawCloud(x: number, y: number, size: number, opacity: number, color: string = '180, 185, 190'): void {
    const savedShadowBlur = this.ctx.shadowBlur;
    const savedShadowColor = this.ctx.shadowColor;
    const savedGlobalAlpha = this.ctx.globalAlpha;

    this.ctx.shadowBlur = size * 0.25;
    this.ctx.shadowColor = `rgba(${color}, ${opacity * 0.4})`;
    this.ctx.globalAlpha = opacity * 0.85;
    this.ctx.fillStyle = `rgba(${color}, 1)`;

    const parts = [
      // Bottom row
      { x: x, y: y, r: size * 0.4 },
      { x: x + size * 0.35, y: y, r: size * 0.5 },
      { x: x + size * 0.65, y: y, r: size * 0.48 },
      { x: x + size * 0.92, y: y, r: size * 0.38 },
      // Middle row
      { x: x + size * 0.18, y: y - size * 0.28, r: size * 0.38 },
      { x: x + size * 0.52, y: y - size * 0.32, r: size * 0.42 },
      { x: x + size * 0.78, y: y - size * 0.28, r: size * 0.38 },
      // Top row
      { x: x + size * 0.32, y: y - size * 0.42, r: size * 0.32 },
      { x: x + size * 0.62, y: y - size * 0.48, r: size * 0.36 },
      { x: x + size * 0.82, y: y - size * 0.42, r: size * 0.32 },
    ];

    parts.forEach((part) => {
      this.ctx.beginPath();
      this.ctx.arc(part.x, part.y, part.r, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.shadowBlur = savedShadowBlur;
    this.ctx.shadowColor = savedShadowColor;
    this.ctx.globalAlpha = savedGlobalAlpha;
  }

  /**
   * Draw multiple clouds
   */
  drawClouds(
    time: number,
    width: number,
    height: number,
    density: number = 0.5,
    color: string = '180, 185, 190',
  ): void {
    const cloudCount = Math.max(2, Math.floor((width / 30) * density));

    console.log(`[BaseAnimation] Drawing ${cloudCount} clouds with density ${density} at time ${time.toFixed(2)}`);

    for (let i = 0; i < cloudCount; i++) {
      const baseX = ((time * 3 + i * 150) % (width + 200)) - 100;
      const baseY = height * (0.2 + (i % 3) * 0.15) + Math.sin(time * 0.2 + i) * 8;
      const size = 40 + (i % 3) * 15;
      const opacity = 0.6 + (i % 2) * 0.2;

      this.drawCloud(baseX, baseY, size, opacity, color);
    }
  }

  /**
   * Draw rain drops
   */
  protected drawRain(width: number, height: number, heavy: boolean): void {
    const dropCount = heavy ? 130 : 90;

    // Initialize rain drops
    if (this.rainDrops.length !== dropCount) {
      this.rainDrops = [];
      for (let i = 0; i < dropCount; i++) {
        this.rainDrops.push({
          x: Math.random() * width,
          y: Math.random() * height - Math.random() * 200,
          speed: heavy ? 80 + Math.random() * 100 : 60 + Math.random() * 80,
          windOffset: (Math.random() - 0.5) * 30,
          width: heavy ? 1.2 + Math.random() * 1.0 : 0.8 + Math.random() * 0.7,
          length: heavy ? 8 + Math.random() * 10 : 6 + Math.random() * 8,
          alpha: heavy ? 0.75 + Math.random() * 0.15 : 0.65 + Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // Calculate real delta time for smooth animation
    const currentTime = Date.now() * 0.001;
    const deltaTime = this.rainLastTime > 0 ? Math.min(currentTime - this.rainLastTime, 0.1) : 1 / 60;
    this.rainLastTime = currentTime;

    const currentAnimTime = currentTime;

    for (let i = 0; i < this.rainDrops.length; i++) {
      const drop = this.rainDrops[i];

      // Update drop position
      drop.y += drop.speed * deltaTime;

      // Reset drop when it goes off screen (smooth loop)
      if (drop.y > height + 50) {
        drop.y = -50 - Math.random() * 100;
        drop.x = Math.random() * width;
      }

      // Wind effect
      const wind = drop.windOffset * (1 + Math.sin(currentAnimTime * 0.5 + drop.phase) * 0.2);
      const dropX = drop.x + wind;

      // Wrap around horizontally
      if (dropX < -10) {
        drop.x = width + 10;
      } else if (dropX > width + 10) {
        drop.x = -10;
      }

      this.drawRainDrop(dropX, drop.y, drop);
    }
  }

  /**
   * Draw a single rain drop
   */
  protected drawRainDrop(dropX: number, dropY: number, drop: RainDrop): void {
    this.ctx.save();
    this.ctx.globalAlpha = drop.alpha;

    const topY = dropY - drop.length * 0.5;
    const bottomY = dropY + drop.length * 0.5;

    const fillAlpha = drop.alpha;
    const strokeAlpha = drop.alpha * 0.5;

    this.ctx.fillStyle = 'rgba(220, 240, 255, ' + fillAlpha + ')';
    this.ctx.strokeStyle = 'rgba(240, 250, 255, ' + strokeAlpha + ')';
    this.ctx.lineWidth = 0.4;

    this.ctx.beginPath();
    this.ctx.moveTo(dropX, topY);
    this.ctx.quadraticCurveTo(dropX - drop.width * 0.3, dropY, dropX - drop.width, bottomY - drop.width * 0.3);
    this.ctx.arc(dropX, bottomY, drop.width, Math.PI, 0, false);
    this.ctx.quadraticCurveTo(dropX + drop.width * 0.3, dropY, dropX, topY);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * Draw lightning flash effect
   */
  protected drawLightning(width: number, height: number, time: number): void {
    const flashPattern = Math.sin(time * 2.5) * Math.sin(time * 5.3) * Math.sin(time * 7.1);
    const flashIntensity = Math.max(0, flashPattern);

    if (flashIntensity > 0.4) {
      const normalizedIntensity = (flashIntensity - 0.4) / 0.6;
      const alpha = normalizedIntensity * 0.6;
      const fadeAlpha = Math.min(alpha, Math.sin(normalizedIntensity * Math.PI) * 0.6);

      this.ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      this.ctx.fillRect(0, 0, width, height);
    }
  }

  /**
   * Draw wind streaks and flying leaves
   */
  protected drawWind(width: number, height: number, time: number): void {
    const streakCount = 20;
    const leafCount = 10;

    if (this.streaks.length !== streakCount) {
      this.streaks = Array.from({ length: streakCount }, () => ({
        x: Math.random() * 1000,
        y: Math.random() * height * 0.9,
        length: 60 + Math.random() * 80,
        speed: 400 + Math.random() * 300,
        opacity: 0.1 + Math.random() * 0.2,
      }));
    }

    if (this.leaves.length !== leafCount) {
      const colors = ['#8b9a46', '#a4933b', '#a46f3b', '#7c8034'];
      this.leaves = Array.from({ length: leafCount }, () => ({
        x: Math.random() * 1000,
        y: Math.random() * height,
        speedX: 200 + Math.random() * 150,
        speedY: -30 + Math.random() * 60,
        size: 4 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;

    this.streaks.forEach((streak) => {
      const currentX = ((streak.x + time * streak.speed) % (width + streak.length * 2)) - streak.length;
      const currentY = streak.y + Math.sin(time * 3 + streak.x) * 8;
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${streak.opacity})`;
      this.ctx.beginPath();
      this.ctx.moveTo(currentX, currentY);
      this.ctx.lineTo(currentX - streak.length, currentY);
      this.ctx.stroke();
    });

    this.leaves.forEach((leaf) => {
      const currentX = ((leaf.x + time * leaf.speedX) % (width + 100)) - 50;
      const currentY =
        ((((leaf.y + time * leaf.speedY + Math.sin((time + leaf.x) * 2.5) * 40) % (height + 100)) + (height + 100)) %
          (height + 100)) -
        50;
      this.ctx.save();
      this.ctx.translate(currentX, currentY);
      this.ctx.rotate(leaf.rotation + time * leaf.rotationSpeed);
      this.ctx.fillStyle = leaf.color;
      this.ctx.globalAlpha = 0.85;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, leaf.size, leaf.size * 0.4, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
    this.ctx.restore();
  }
}
