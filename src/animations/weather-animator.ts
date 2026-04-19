import type { TimeOfDay } from '../types';

export interface Position {
  x: number;
  y: number;
}

const getSunPosition = (timeOfDay: TimeOfDay, width: number, height: number): Position => {
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
      x: width * 0.5,
      y: height * 0.3,
    };
  }
};

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

export interface Snowflake {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  swayPhase: number;
  swaySpeed: number;
}

export interface HailStone {
  startX: number;
  startY: number;
  speed: number;
  windOffset: number;
  size: number;
  alpha: number;
  phase: number;
}

export interface FogParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  phase: number;
  phaseSpeed: number;
}

export class WeatherAnimator {
  protected ctx: CanvasRenderingContext2D;

  // State tracking for all particles
  protected streaks: WindStreak[] = [];
  protected leaves: Leaf[] = [];
  protected rainDrops: RainDrop[] = [];
  protected rainLastTime: number = 0;
  protected snowflakes: Snowflake[] = [];
  protected snowLastTime: number = 0;
  protected hailStones: HailStone[] = [];
  protected fogParticles: FogParticle[] = [];
  protected fogLastTime: number = 0;

  // Effects state
  protected isFlashing: boolean = false;
  protected flashX: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public draw(
    condition: string,
    width: number,
    height: number,
    timeOfDayInput: TimeOfDay,
    cloudCover?: number,
    moonPhase?: string,
  ): void {
    const currentTime = Date.now() * 0.001;
    const conditionLower = condition.toLowerCase();

    // 'clear-night' alias
    const timeOfDay = conditionLower === 'clear-night' ? { type: 'night' as const, progress: 0 } : timeOfDayInput;
    const isNight = timeOfDay.type === 'night';

    // State Flags
    let hasSunMoon = false;
    let hasClouds = false;
    let cloudDensity = cloudCover ?? 0.5;
    let cloudColor = isNight ? '40, 45, 55' : '180, 185, 190';
    let cloudSpeed = 1.0;

    let hasRain = false;
    let heavyRain = false;
    let hasSnow = false;
    let hasHail = false;
    let hasFog = false;
    let hasWind = false;
    let hasLightning = false;

    switch (conditionLower) {
      case 'sunny':
      case 'clear-night':
        hasSunMoon = true;
        break;
      case 'partlycloudy':
        hasSunMoon = true;
        hasClouds = true;
        cloudDensity = cloudCover ?? 0.3;
        cloudColor = isNight ? '40, 45, 55' : '190, 195, 200';
        break;
      case 'cloudy':
        hasClouds = true;
        cloudDensity = cloudCover ?? 0.7;
        cloudColor = isNight ? '30, 35, 45' : '160, 165, 170';
        break;
      case 'rainy':
        hasClouds = true;
        hasRain = true;
        cloudDensity = cloudCover ?? 0.8;
        cloudColor = isNight ? '35, 40, 50' : '150, 155, 165';
        break;
      case 'pouring':
        hasClouds = true;
        hasRain = true;
        heavyRain = true;
        cloudDensity = cloudCover ?? 1.0;
        cloudColor = isNight ? '25, 30, 40' : '130, 135, 145';
        break;
      case 'snowy':
        hasClouds = true;
        hasSnow = true;
        cloudDensity = cloudCover ?? 0.8;
        cloudColor = isNight ? '35, 40, 50' : '170, 175, 185';
        break;
      case 'snowy-rainy':
        hasClouds = true;
        hasSnow = true;
        hasRain = true;
        cloudDensity = cloudCover ?? 0.8;
        cloudColor = isNight ? '35, 40, 50' : '160, 165, 175';
        break;
      case 'hail':
        hasClouds = true;
        hasHail = true;
        cloudDensity = cloudCover ?? 1.0;
        cloudColor = isNight ? '25, 30, 40' : '140, 145, 155';
        break;
      case 'fog':
        hasFog = true;
        break;
      case 'lightning':
        hasClouds = true;
        hasLightning = true;
        cloudDensity = cloudCover ?? 1.0;
        cloudColor = isNight ? '20, 25, 35' : '100, 105, 115';
        break;
      case 'lightning-rainy':
        hasClouds = true;
        hasLightning = true;
        hasRain = true;
        cloudDensity = cloudCover ?? 1.0;
        cloudColor = isNight ? '20, 25, 35' : '100, 105, 115';
        break;
      case 'windy':
        hasSunMoon = true;
        hasWind = true;
        hasClouds = false;
        break;
      case 'windy-variant':
        hasClouds = true;
        hasWind = true;
        cloudDensity = cloudCover ?? 0.6;
        cloudColor = isNight ? '40, 45, 55' : '180, 185, 190';
        cloudSpeed = 3.0;
        break;
      case 'exceptional':
        hasClouds = true;
        hasRain = true;
        heavyRain = true;
        hasWind = true;
        hasLightning = true;
        cloudDensity = cloudCover ?? 1.2;
        cloudColor = isNight ? '15, 20, 25' : '70, 75, 85';
        cloudSpeed = 4.0;
        break;
      default:
        hasClouds = true;
        cloudDensity = cloudCover ?? 0.7;
        cloudColor = isNight ? '30, 35, 45' : '160, 165, 170';
        break;
    }

    // 1. Sun & Moon Layer
    if (hasSunMoon) {
      this.drawSunAndMoon(width, height, timeOfDay, currentTime, moonPhase);
    }

    // 2. Clouds Layer
    if (hasClouds) {
      this.drawClouds(currentTime * cloudSpeed, width, height, cloudDensity, cloudColor);
    }

    // 3. Precipitation Layer
    if (hasRain) {
      this.drawRain(width, height, heavyRain);
    }
    if (hasSnow) {
      this.drawSnowflakes(width, height);
    }
    if (hasHail) {
      this.drawHailStones(width, height);
    }

    // 4. Fog Layer
    if (hasFog) {
      this.drawFog(width, height, timeOfDay);
    }

    // 5. Wind Layer
    if (hasWind) {
      this.drawWind(width, height, currentTime);
    }

    // 6. Lightning Overlay
    if (hasLightning) {
      this.drawLightning(width, height, currentTime);
    }
  }

  // --- SUN & MOON ---

  private drawSunAndMoon(
    width: number,
    height: number,
    timeOfDay: TimeOfDay,
    currentTime: number,
    moonPhase?: string,
  ): void {
    const sunPos: Position = getSunPosition(timeOfDay, width, height);
    const sunX = sunPos.x;
    const sunY = sunPos.y;

    if (timeOfDay.type === 'day' || timeOfDay.type === 'sunrise' || timeOfDay.type === 'sunset') {
      this.drawSun(sunX, sunY, currentTime);

      if (timeOfDay.type === 'sunrise' || timeOfDay.type === 'sunset') {
        this.drawHorizonReflection(sunX, sunY, height, currentTime);
      }
    } else if (timeOfDay.type === 'night') {
      this.drawNightSky(width, height, currentTime, moonPhase);
    }
  }

  private drawSun(sunX: number, sunY: number, time: number): void {
    const sunRadius = 48 + Math.sin(time * 0.15) * 1.5;

    const outerHalo = this.ctx.createRadialGradient(sunX, sunY, sunRadius * 0.3, sunX, sunY, sunRadius * 3.5);
    outerHalo.addColorStop(0, 'rgba(255, 248, 230, 0.25)');
    outerHalo.addColorStop(0.15, 'rgba(255, 240, 200, 0.2)');
    outerHalo.addColorStop(0.3, 'rgba(255, 230, 170, 0.15)');
    outerHalo.addColorStop(0.5, 'rgba(255, 220, 140, 0.1)');
    outerHalo.addColorStop(0.7, 'rgba(255, 210, 120, 0.06)');
    outerHalo.addColorStop(0.85, 'rgba(255, 200, 100, 0.03)');
    outerHalo.addColorStop(1, 'rgba(255, 190, 90, 0)');
    this.ctx.fillStyle = outerHalo;
    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, sunRadius * 3.5, 0, Math.PI * 2);
    this.ctx.fill();

    const midHalo = this.ctx.createRadialGradient(sunX, sunY, sunRadius * 0.5, sunX, sunY, sunRadius * 2.2);
    midHalo.addColorStop(0, 'rgba(255, 250, 220, 0.35)');
    midHalo.addColorStop(0.3, 'rgba(255, 240, 190, 0.25)');
    midHalo.addColorStop(0.6, 'rgba(255, 230, 160, 0.15)');
    midHalo.addColorStop(0.85, 'rgba(255, 220, 140, 0.08)');
    midHalo.addColorStop(1, 'rgba(255, 210, 120, 0)');
    this.ctx.fillStyle = midHalo;
    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, sunRadius * 2.2, 0, Math.PI * 2);
    this.ctx.fill();

    const innerHalo = this.ctx.createRadialGradient(sunX, sunY, sunRadius * 0.6, sunX, sunY, sunRadius * 1.6);
    innerHalo.addColorStop(0, 'rgba(255, 252, 240, 0.5)');
    innerHalo.addColorStop(0.4, 'rgba(255, 245, 210, 0.35)');
    innerHalo.addColorStop(0.7, 'rgba(255, 235, 180, 0.2)');
    innerHalo.addColorStop(1, 'rgba(255, 225, 150, 0)');
    this.ctx.fillStyle = innerHalo;
    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, sunRadius * 1.6, 0, Math.PI * 2);
    this.ctx.fill();

    const sunGradient = this.ctx.createRadialGradient(
      sunX - sunRadius * 0.1,
      sunY - sunRadius * 0.1,
      0,
      sunX,
      sunY,
      sunRadius,
    );
    sunGradient.addColorStop(0, '#FFFEF5');
    sunGradient.addColorStop(0.15, '#FFF9E6');
    sunGradient.addColorStop(0.3, '#FFF4D6');
    sunGradient.addColorStop(0.5, '#FFEDC0');
    sunGradient.addColorStop(0.7, '#FFE4A8');
    sunGradient.addColorStop(0.85, '#FFDC95');
    sunGradient.addColorStop(1, '#FFD37F');

    this.ctx.fillStyle = sunGradient;
    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawHorizonReflection(sunX: number, sunY: number, height: number, time: number): void {
    const sunRadius = 48 + Math.sin(time * 0.15) * 1.5;
    const horizonY = height * 0.85;

    if (sunY >= horizonY - 50) {
      const reflectionAlpha = Math.max(0, (horizonY - sunY) / 50) * 0.3;
      this.ctx.fillStyle = `rgba(255, 140, 0, ${reflectionAlpha})`;
      this.ctx.beginPath();
      this.ctx.ellipse(sunX, horizonY, sunRadius * 1.5, sunRadius * 0.5, 0, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawNightSky(width: number, height: number, time: number, moonPhase?: string): void {
    this.ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 20; i++) {
      const x = (width * 0.2 + i * 47) % width;
      const y = (height * 0.2 + i * 23) % (height * 0.6);
      const twinkle = Math.sin(time * 0.8 + i) * 0.5 + 0.5;
      this.ctx.globalAlpha = twinkle * 0.8;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    const moonX = width * 0.5;
    const moonY = height * 0.3;
    const r = 25;

    this.ctx.globalAlpha = 0.9;
    this.ctx.fillStyle = '#F0F0F0';
    this.ctx.beginPath();
    this.ctx.arc(moonX, moonY, r, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(moonX, moonY, r, 0, Math.PI * 2);
    this.ctx.clip();

    this.ctx.fillStyle = '#1a1a2e';

    if (!moonPhase) {
      this.ctx.beginPath();
      this.ctx.arc(moonX - 8, moonY - 5, 22, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      switch (moonPhase) {
        case 'new_moon':
          this.ctx.fillRect(moonX - r, moonY - r, r * 2, r * 2);
          break;
        case 'waxing_crescent':
          this.ctx.fillRect(moonX - r, moonY - r, r, r * 2);
          this.ctx.beginPath();
          this.ctx.ellipse(moonX, moonY, r * 0.5, r, 0, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 'first_quarter':
          this.ctx.fillRect(moonX - r, moonY - r, r, r * 2);
          break;
        case 'waxing_gibbous':
          this.ctx.fillRect(moonX - r, moonY - r, r, r * 2);
          this.ctx.fillStyle = '#F0F0F0';
          this.ctx.beginPath();
          this.ctx.ellipse(moonX, moonY, r * 0.5, r, 0, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 'full_moon':
          break;
        case 'waning_gibbous':
          this.ctx.fillRect(moonX, moonY - r, r, r * 2);
          this.ctx.fillStyle = '#F0F0F0';
          this.ctx.beginPath();
          this.ctx.ellipse(moonX, moonY, r * 0.5, r, 0, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 'last_quarter':
          this.ctx.fillRect(moonX, moonY - r, r, r * 2);
          break;
        case 'waning_crescent':
          this.ctx.fillRect(moonX, moonY - r, r, r * 2);
          this.ctx.beginPath();
          this.ctx.ellipse(moonX, moonY, r * 0.5, r, 0, 0, Math.PI * 2);
          this.ctx.fill();
          break;
      }
    }

    this.ctx.restore();
    this.ctx.globalAlpha = 1;
  }

  // --- CLOUDS ---

  private drawClouds(
    time: number,
    width: number,
    height: number,
    density: number = 0.5,
    color: string = '180, 185, 190',
  ): void {
    const cloudCount = Math.max(2, Math.floor((width / 30) * density));
    for (let i = 0; i < cloudCount; i++) {
      const baseX = ((time * 3 + i * 150) % (width + 200)) - 100;
      const baseY = height * (0.2 + (i % 3) * 0.15) + Math.sin(time * 0.2 + i) * 8;
      const size = 40 + (i % 3) * 15;
      const opacity = 0.6 + (i % 2) * 0.2;
      this.drawCloud(baseX, baseY, size, opacity, color);
    }
  }

  private drawCloud(x: number, y: number, size: number, opacity: number, color: string = '180, 185, 190'): void {
    const savedShadowBlur = this.ctx.shadowBlur;
    const savedShadowColor = this.ctx.shadowColor;
    const savedGlobalAlpha = this.ctx.globalAlpha;

    this.ctx.shadowBlur = size * 0.4;
    this.ctx.shadowColor = `rgba(${color}, ${opacity * 0.5})`;
    this.ctx.globalAlpha = opacity * 0.9;

    const parts = [
      { x: x, y: y, r: size * 0.4 },
      { x: x + size * 0.35, y: y, r: size * 0.5 },
      { x: x + size * 0.65, y: y, r: size * 0.48 },
      { x: x + size * 0.92, y: y, r: size * 0.38 },
      { x: x + size * 0.18, y: y - size * 0.28, r: size * 0.38 },
      { x: x + size * 0.52, y: y - size * 0.32, r: size * 0.42 },
      { x: x + size * 0.78, y: y - size * 0.28, r: size * 0.38 },
      { x: x + size * 0.32, y: y - size * 0.42, r: size * 0.32 },
      { x: x + size * 0.62, y: y - size * 0.48, r: size * 0.36 },
      { x: x + size * 0.82, y: y - size * 0.42, r: size * 0.32 },
    ];

    parts.forEach((part) => {
      const gradient = this.ctx.createRadialGradient(part.x, part.y, 0, part.x, part.y, part.r);
      gradient.addColorStop(0, `rgba(${color}, 1)`);
      gradient.addColorStop(0.5, `rgba(${color}, 0.9)`);
      gradient.addColorStop(0.8, `rgba(${color}, 0.4)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      this.ctx.fillStyle = gradient;

      this.ctx.beginPath();
      this.ctx.arc(part.x, part.y, part.r, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.shadowBlur = savedShadowBlur;
    this.ctx.shadowColor = savedShadowColor;
    this.ctx.globalAlpha = savedGlobalAlpha;
  }

  // --- RAIN ---

  private drawRain(width: number, height: number, heavy: boolean): void {
    const dropCount = heavy ? 130 : 90;

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

    const currentTime = Date.now() * 0.001;
    const deltaTime = this.rainLastTime > 0 ? Math.min(currentTime - this.rainLastTime, 0.1) : 1 / 60;
    this.rainLastTime = currentTime;

    for (let i = 0; i < this.rainDrops.length; i++) {
      const drop = this.rainDrops[i];
      drop.y += drop.speed * deltaTime;

      if (drop.y > height + 50) {
        drop.y = -50 - Math.random() * 100;
        drop.x = Math.random() * width;
      }

      const wind = drop.windOffset * (1 + Math.sin(currentTime * 0.5 + drop.phase) * 0.2);
      const dropX = drop.x + wind;

      if (dropX < -10) drop.x = width + 10;
      else if (dropX > width + 10) drop.x = -10;

      this.drawRainDrop(dropX, drop.y, drop);
    }
  }

  private drawRainDrop(dropX: number, dropY: number, drop: RainDrop): void {
    this.ctx.save();
    this.ctx.globalAlpha = drop.alpha;

    const topY = dropY - drop.length * 0.5;
    const bottomY = dropY + drop.length * 0.5;

    this.ctx.fillStyle = 'rgba(220, 240, 255, ' + drop.alpha + ')';
    this.ctx.strokeStyle = 'rgba(240, 250, 255, ' + drop.alpha * 0.5 + ')';
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

  // --- SNOW ---

  private drawSnowflakes(width: number, height: number): void {
    const snowflakeCount = Math.floor((width * height) / 5000);
    const targetCount = Math.max(30, Math.min(snowflakeCount, 80));

    if (this.snowflakes.length !== targetCount) {
      this.snowflakes = [];
      for (let i = 0; i < targetCount; i++) {
        this.snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height - Math.random() * 100,
          speedY: 15 + Math.random() * 10,
          speedX: (Math.random() - 0.5) * 8,
          size: 1.5 + Math.random() * 1.5,
          alpha: 0.6 + Math.random() * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.5 + Math.random() * 0.5,
        });
      }
    }

    const currentTime = Date.now() * 0.001;
    const deltaTime = this.snowLastTime > 0 ? Math.min(currentTime - this.snowLastTime, 0.1) : 1 / 60;
    this.snowLastTime = currentTime;

    this.ctx.lineCap = 'round';

    for (let i = 0; i < this.snowflakes.length; i++) {
      const flake = this.snowflakes[i];

      const sway = Math.sin(currentTime * flake.swaySpeed + flake.swayPhase) * 2;
      flake.y += flake.speedY * deltaTime;
      flake.x += (flake.speedX + sway) * deltaTime;
      flake.rotation += flake.rotationSpeed * deltaTime;

      if (flake.y > height + 20) {
        flake.y = -20 - Math.random() * 50;
        flake.x = Math.random() * width;
      }

      if (flake.x < -10) flake.x = width + 10;
      else if (flake.x > width + 10) flake.x = -10;

      this.drawSnowflake(flake.x, flake.y, flake.size, flake.alpha, flake.rotation);
    }
  }

  private drawSnowflake(x: number, y: number, size: number, alpha: number, rotation: number): void {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    for (let j = 0; j < 6; j++) {
      const angle = (Math.PI / 3) * j;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(sin * size * 2.5, cos * size * 2.5);

      const branch1X = sin * size * 1.5 + cos * size * 0.5;
      const branch1Y = cos * size * 1.5 - sin * size * 0.5;
      const branch1EndX = sin * size * 1.8 + cos * size * 1.2;
      const branch1EndY = cos * size * 1.8 - sin * size * 1.2;
      this.ctx.moveTo(branch1X, branch1Y);
      this.ctx.lineTo(branch1EndX, branch1EndY);

      const branch2X = sin * size * 1.5 - cos * size * 0.5;
      const branch2Y = cos * size * 1.5 + sin * size * 0.5;
      const branch2EndX = sin * size * 1.8 - cos * size * 1.2;
      const branch2EndY = cos * size * 1.8 + sin * size * 1.2;
      this.ctx.moveTo(branch2X, branch2Y);
      this.ctx.lineTo(branch2EndX, branch2EndY);
    }

    this.ctx.stroke();
    this.ctx.restore();
  }

  // --- HAIL ---

  private drawHailStones(width: number, height: number): void {
    const stoneCount = 60;

    if (this.hailStones.length !== stoneCount) {
      this.hailStones = [];
      for (let i = 0; i < stoneCount; i++) {
        this.hailStones.push({
          startX: Math.random() * width,
          startY: Math.random() * (height + 150) - 75,
          speed: 120 + Math.random() * 80,
          windOffset: (Math.random() - 0.5) * 20,
          size: 2 + Math.random() * 3,
          alpha: 0.8 + Math.random() * 0.15,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const time = Date.now() * 0.002;

    this.ctx.fillStyle = 'rgba(240, 250, 255, 1)';
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < this.hailStones.length; i++) {
      const hail = this.hailStones[i];
      const hailY = (hail.startY + time * hail.speed) % (height + 150);

      if (hailY > height + 30) {
        hail.startY = -30 - Math.random() * 30;
        hail.startX = Math.random() * width;
      }

      const wind = hail.windOffset * (1 + Math.sin(time * 0.6 + hail.phase) * 0.15);
      const hailX = (hail.startX + wind + ((time * 20) % width)) % width;

      if (hailX < -5) hail.startX = width + 5;
      else if (hailX > width + 5) hail.startX = -5;

      this.drawHailStone(hailX, hailY, hail);
    }
  }

  private drawHailStone(hailX: number, hailY: number, hail: HailStone): void {
    this.ctx.save();
    this.ctx.globalAlpha = hail.alpha;

    this.ctx.beginPath();
    this.ctx.ellipse(hailX, hailY, hail.size, hail.size * 0.9, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.beginPath();
    this.ctx.ellipse(
      hailX - hail.size * 0.3,
      hailY - hail.size * 0.3,
      hail.size * 0.3,
      hail.size * 0.25,
      0,
      0,
      Math.PI * 2,
    );
    this.ctx.fill();

    this.ctx.fillStyle = 'rgba(240, 250, 255, 1)';
    this.ctx.restore();
  }

  // --- FOG ---

  private drawFog(width: number, height: number, timeOfDay: TimeOfDay): void {
    const targetCount = Math.max(12, Math.floor((width * height) / 15000));

    if (this.fogParticles.length !== targetCount) {
      this.fogParticles = [];
      for (let i = 0; i < targetCount; i++) {
        this.fogParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 120 + Math.random() * 150,
          vx: 5 + Math.random() * 15,
          vy: (Math.random() - 0.5) * 10,
          baseOpacity: 0.15 + Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.2 + Math.random() * 0.5,
        });
      }
    }

    const currentTime = Date.now() * 0.001;
    const deltaTime = this.fogLastTime > 0 ? Math.min(currentTime - this.fogLastTime, 0.1) : 1 / 60;
    this.fogLastTime = currentTime;

    this.ctx.globalCompositeOperation = 'screen';

    for (const p of this.fogParticles) {
      p.x += p.vx * deltaTime;
      p.y += p.vy * deltaTime;

      if (p.x - p.radius > width) p.x = -p.radius;
      else if (p.x + p.radius < 0) p.x = width + p.radius;

      if (p.y - p.radius > height) p.y = -p.radius;
      else if (p.y + p.radius < 0) p.y = height + p.radius;

      const currentOpacity = p.baseOpacity * (0.8 + 0.2 * Math.sin(currentTime * p.phaseSpeed + p.phase));
      const color = timeOfDay.type === 'night' ? '50, 55, 65' : '190, 195, 200';

      const renderX = p.x + Math.sin(currentTime * p.phaseSpeed * 0.8 + p.phase) * 25;
      const renderY = p.y + Math.cos(currentTime * p.phaseSpeed * 0.6 + p.phase) * 15;
      const renderRadius = Math.max(
        1,
        p.radius * (1 + 0.15 * Math.sin(currentTime * p.phaseSpeed * 0.4 + p.phase * 2)),
      );

      const gradient = this.ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, renderRadius);
      gradient.addColorStop(0, `rgba(${color}, ${currentOpacity})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(renderX, renderY, renderRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalCompositeOperation = 'source-over';
  }

  // --- WIND ---

  private drawWind(width: number, height: number, time: number): void {
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

  // --- LIGHTNING ---

  private drawLightning(width: number, height: number, time: number): void {
    const flashPattern = Math.sin(time * 2.5) * Math.sin(time * 5.3) * Math.sin(time * 7.1);
    const flashIntensity = Math.max(0, flashPattern);

    if (flashIntensity > 0.4) {
      if (!this.isFlashing) {
        this.isFlashing = true;
        this.flashX = (Math.random() * 0.8 + 0.1) * width;
      }

      const normalizedIntensity = (flashIntensity - 0.4) / 0.6;
      const alpha = normalizedIntensity * 0.85;
      const fadeAlpha = Math.min(alpha, Math.sin(normalizedIntensity * Math.PI) * 0.85);

      const radius = Math.max(width, height) * 0.9;
      const gradient = this.ctx.createRadialGradient(this.flashX, -height * 0.1, 0, this.flashX, -height * 0.1, radius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, width, height);
    } else {
      this.isFlashing = false;
    }
  }
}
