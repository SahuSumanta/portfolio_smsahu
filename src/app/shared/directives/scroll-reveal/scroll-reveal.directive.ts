import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  input,
  inject,
  PLATFORM_ID,
  NgZone,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  readonly direction = input<RevealDirection>('up');
  readonly delay = input<number>(0);
  readonly threshold = input<number>(0.15);
  readonly once = input<boolean>(true);

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    const dir = this.direction();

    // Set initial hidden classes for IntersectionObserver fallback
    this.renderer.addClass(element, 'scroll-reveal-base');
    this.renderer.addClass(element, `reveal-${dir}`);

    if (this.delay() > 0) {
      this.renderer.setStyle(element, 'transition-delay', `${this.delay()}ms`);
    }

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(element, 'is-revealed');
              if (this.once()) {
                this.observer.unobserve(element);
              }
            } else if (!this.once()) {
              this.renderer.removeClass(element, 'is-revealed');
            }
          });
        },
        {
          root: null,
          threshold: this.threshold(),
          rootMargin: '0px 0px -50px 0px'
        }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    if (this.observer && isPlatformBrowser(this.platformId)) {
      this.observer.disconnect();
    }
  }
}
