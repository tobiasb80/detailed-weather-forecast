import { SunnyAnimation } from '../animations/sunny.js';
import { RainyAnimation } from '../animations/rainy.js';
import { SnowyAnimation } from '../animations/snowy.js';
import { CloudyAnimation } from '../animations/cloudy.js';
import { FoggyAnimation } from '../animations/foggy.js';
import { HailAnimation } from '../animations/hail.js';
import { ThunderstormAnimation } from '../animations/thunderstorm.js';
import { WindyAnimation } from '../animations/windy.js';
import { ExceptionalAnimation } from '../animations/exceptional.js';
import type { TimeOfDay } from '../types.js';

interface Animations {
  sunny: SunnyAnimation;
  rainy: RainyAnimation;
  snowy: SnowyAnimation;
  cloudy: CloudyAnimation;
  foggy: FoggyAnimation;
  hail: HailAnimation;
  thunderstorm: ThunderstormAnimation;
  windy: WindyAnimation;
  exceptional: ExceptionalAnimation;
}

export class AnimationManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrame: number | null = null;
  private animations: Partial<Animations> = {};
  private resizeObserver: ResizeObserver | null = null;
  private width: number = 0;
  private height: number = 0;
  private container: Element | null = null;
  private getDrawParams: () => {
    condition: string;
    timeOfDay: TimeOfDay;
    cloudCover?: number;
    moonPhase?: string;
  } | null;
  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  };

  constructor(
    getDrawParams: () => { condition: string; timeOfDay: TimeOfDay; cloudCover?: number; moonPhase?: string } | null,
  ) {
    this.getDrawParams = getDrawParams;
  }

  setup(container: Element): void {
    this.container = container;
    this.setupCanvas();
    this.setupResizeObserver();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    if (this.canvas && this.ctx) {
      this.initializeAnimations();
    }
    this.startAnimation();
  }

  destroy(): void {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.stopAnimation();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.canvas = null;
    this.ctx = null;
    this.container = null;
  }

  resize(): void {
    if (this.canvas && this.ctx) {
      this.resizeCanvas();
    }
  }

  private setupCanvas(): void {
    if (!this.container) return;

    const oldCanvas = this.container.querySelector('canvas');
    if (oldCanvas) {
      oldCanvas.remove();
    }

    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    if (!this.canvas || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 2;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';

    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }

    this.width = rect.width;
    this.height = rect.height;

    this.initializeAnimations();
  }

  private setupResizeObserver(): void {
    if (!this.container) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });
    this.resizeObserver.observe(this.container);
  }

  private initializeAnimations(): void {
    if (!this.ctx) return;

    this.animations = {
      sunny: new SunnyAnimation(this.ctx),
      rainy: new RainyAnimation(this.ctx),
      snowy: new SnowyAnimation(this.ctx),
      cloudy: new CloudyAnimation(this.ctx),
      foggy: new FoggyAnimation(this.ctx),
      hail: new HailAnimation(this.ctx),
      thunderstorm: new ThunderstormAnimation(this.ctx),
      windy: new WindyAnimation(this.ctx),
      exceptional: new ExceptionalAnimation(this.ctx),
    };
  }

  private startAnimation(): void {
    if (this.animationFrame) return;
    console.log('[AnimationManager] startAnimation called');
    const animate = () => {
      this.draw();
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  private stopAnimation(): void {
    if (this.animationFrame) {
      console.log('[AnimationManager] stopAnimation called');
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private draw(): void {
    if (!this.ctx || !this.canvas) {
      // Uncomment below for verbose logging if needed
      // console.log('[AnimationManager] draw skipped: missing ctx or canvas');
      return;
    }
    if (!this.width || !this.height) {
      // console.log('[AnimationManager] draw resizing: missing width or height');
      this.resizeCanvas();
      if (!this.width || !this.height) return;
    }

    const params = this.getDrawParams();
    if (!params) {
      console.log('[AnimationManager] draw skipped: getDrawParams returned null');
      return;
    }

    const { condition, timeOfDay, cloudCover, moonPhase } = params;
    // Log once when condition changes
    if ((this as any)._lastLoggedCondition !== condition) {
      console.log(
        `[AnimationManager] drawing condition: ${condition}, timeOfDay: ${timeOfDay.type}, cloudCover: ${cloudCover}, moonPhase: ${moonPhase}`,
      );
      (this as any)._lastLoggedCondition = condition;
    }

    const width = this.width;
    const height = this.height;

    console.log('[AnimationManager] draw called with width:', width, 'height:', height);
    this.ctx.clearRect(0, 0, width, height);

    const conditionLower = condition.toLowerCase();

    switch (conditionLower) {
      case 'sunny':
        this.animations.sunny?.draw(Date.now(), width, height, timeOfDay, false, cloudCover, moonPhase);
        break;
      case 'clear-night':
        this.animations.sunny?.draw(
          Date.now(),
          width,
          height,
          { type: 'night', progress: 0 },
          false,
          cloudCover,
          moonPhase,
        );
        break;
      case 'partlycloudy':
        this.animations.sunny?.draw(Date.now(), width, height, timeOfDay, true, cloudCover, moonPhase);
        break;
      case 'rainy':
      case 'rain':
        this.animations.rainy?.draw(Date.now(), width, height, timeOfDay, false, cloudCover);
        break;
      case 'pouring':
        this.animations.rainy?.draw(Date.now(), width, height, timeOfDay, true, cloudCover);
        break;
      case 'snowy':
      case 'snow':
        this.animations.snowy?.draw(Date.now(), width, height, cloudCover);
        break;
      case 'snowy-rainy':
        this.animations.rainy?.draw(Date.now(), width, height, timeOfDay, false, cloudCover);
        this.animations.snowy?.draw(Date.now(), width, height, cloudCover);
        break;
      case 'hail':
        this.animations.hail?.draw(Date.now(), width, height, cloudCover);
        break;
      case 'fog':
        this.animations.foggy?.draw(Date.now(), width, height);
        break;
      case 'lightning':
        this.animations.thunderstorm?.draw(Date.now(), width, height, timeOfDay, false, cloudCover);
        break;
      case 'lightning-rainy':
        this.animations.thunderstorm?.draw(Date.now(), width, height, timeOfDay, true, cloudCover);
        break;
      case 'windy':
        this.animations.windy?.draw(Date.now(), width, height, false, cloudCover);
        break;
      case 'windy-variant':
        this.animations.windy?.draw(Date.now(), width, height, true, cloudCover);
        break;
      case 'exceptional':
        this.animations.exceptional?.draw(Date.now(), width, height, cloudCover);
        break;
      case 'cloudy':
      default:
        this.animations.cloudy?.draw(Date.now(), width, height, cloudCover);
        break;
    }
  }
}
