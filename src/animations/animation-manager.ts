import { WeatherAnimator } from './weather-animator.js';
import type { TimeOfDay } from '../types.js';

export class AnimationManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrame: number | null = null;
  private animator: WeatherAnimator | null = null;
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

    this.animator = new WeatherAnimator(this.ctx);
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

    this.animator?.draw(conditionLower, width, height, timeOfDay, cloudCover, moonPhase);
  }
}
