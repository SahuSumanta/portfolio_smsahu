import {
  Directive,
  ElementRef,
  HostListener,
  input,
  inject,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticHoverDirective {
  readonly magneticStrength = input<number>(0.35);

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private isReducedMotion = false;

  constructor() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isReducedMotion || !isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = Math.floor((event.clientX - centerX) * this.magneticStrength());
    const deltaY = Math.floor((event.clientY - centerY) * this.magneticStrength());

    this.renderer.setStyle(
      element,
      'transform',
      `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.03)`
    );
    this.renderer.setStyle(element, 'transition', 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isReducedMotion || !isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    this.renderer.setStyle(element, 'transform', 'translate3d(0px, 0px, 0px) scale(1)');
    this.renderer.setStyle(element, 'transition', 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'); // Spring bounce
  }
}
