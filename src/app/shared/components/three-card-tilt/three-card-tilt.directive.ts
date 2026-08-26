import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCardTilt]',
  standalone: true
})
export class ThreeCardTiltDirective implements OnInit, OnDestroy {
  readonly tiltEnabled = input<boolean>(true);
  readonly maxTilt = input<number>(10);
  readonly perspective = input<number>(1000);
  readonly scale = input<number>(1.02);

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private isReducedMotion = false;
  private isTouchDevice = false;
  private glareElement: HTMLElement | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    this.isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0));

    if (this.tiltEnabled() && !this.isReducedMotion && !this.isTouchDevice) {
      this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.15s ease-out, box-shadow 0.3s ease');
      this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
      this.createGlareElement();
    }
  }

  ngOnDestroy(): void {
    if (this.glareElement && this.glareElement.parentNode) {
      this.glareElement.parentNode.removeChild(this.glareElement);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.tiltEnabled() || this.isReducedMotion || this.isTouchDevice) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    const rotateX = ((mouseY / (rect.height / 2)) * -this.maxTilt()).toFixed(2);
    const rotateY = ((mouseX / (rect.width / 2)) * this.maxTilt()).toFixed(2);

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(${this.perspective()}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.scale()}, ${this.scale()}, 1.02)`
    );

    if (this.glareElement) {
      const percentX = ((event.clientX - rect.left) / rect.width) * 100;
      const percentY = ((event.clientY - rect.top) / rect.height) * 100;
      this.renderer.setStyle(
        this.glareElement,
        'background',
        `radial-gradient(circle at ${percentX}% ${percentY}, rgba(59, 130, 246, 0.15) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 70%)`
      );
      this.renderer.setStyle(this.glareElement, 'opacity', '1');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.tiltEnabled() || this.isReducedMotion || this.isTouchDevice) return;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(${this.perspective()}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );

    if (this.glareElement) {
      this.renderer.setStyle(this.glareElement, 'opacity', '0');
    }
  }

  private createGlareElement(): void {
    this.glareElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.glareElement, 'position', 'absolute');
    this.renderer.setStyle(this.glareElement, 'inset', '0');
    this.renderer.setStyle(this.glareElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.glareElement, 'border-radius', 'inherit');
    this.renderer.setStyle(this.glareElement, 'opacity', '0');
    this.renderer.setStyle(this.glareElement, 'transition', 'opacity 0.3s ease');
    this.renderer.setStyle(this.glareElement, 'z-index', '10');

    const position = window.getComputedStyle(this.el.nativeElement).position;
    if (position === 'static') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }

    this.renderer.appendChild(this.el.nativeElement, this.glareElement);
  }
}
