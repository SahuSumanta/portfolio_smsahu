import { Component, signal, inject, PLATFORM_ID, HostListener, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary"
        class="pill pointer-events-auto flex items-center gap-1 pl-4 pr-2 py-2 rounded-full border transition-all duration-500"
        [class.pill-scrolled]="scrolled()"
      >
        <a routerLink="/" class="flex items-center gap-2 pr-3 mr-1 md:border-r md:border-[var(--border)]" aria-label="Sumanta Sahu — home" (click)="closeMenu()">
          <span class="logo-mark" aria-hidden="true">S</span>
          <span class="hidden sm:inline font-display font-medium text-[15px] tracking-tight">Sumanta Sahu</span>
        </a>

        <ul class="hidden md:flex items-center gap-0.5">
          @for (item of navItems; track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: false }"
                class="nav-link"
              >{{ item.label }}</a>
            </li>
          }
        </ul>

        <a routerLink="/contact" class="hidden md:inline-flex nav-cta ml-2" routerLinkActive="is-active">
          Contact <span aria-hidden="true">↗</span>
        </a>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="md:hidden ml-auto w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span class="burger" [class.open]="menuOpen()"><i></i><i></i></span>
        </button>
      </nav>
    </header>

    @if (menuOpen()) {
      <div id="mobile-menu" class="mobile-panel fixed inset-0 z-40 px-6 pt-28 pb-10 flex flex-col" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="glow drift-a" style="width:60vw;height:60vw;right:-20vw;top:10vh;background:var(--accent-deep);opacity:.55"></div>
        <ul class="relative flex flex-col gap-1">
          @for (item of mobileItems; track item.path; let i = $index) {
            <li class="mobile-item" [style.animation-delay.ms]="60 + i * 55">
              <a
                [routerLink]="item.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                (click)="closeMenu()"
                class="mobile-link"
              >
                <span class="font-mono text-[11px] text-[var(--text-tertiary)] w-8">0{{ i + 1 }}</span>
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
        <div class="relative mt-auto flex flex-col gap-3">
          <a routerLink="/contact" (click)="closeMenu()" class="btn btn-primary w-full">Get in touch <span class="arrow">→</span></a>
          <a href="https://github.com/SahuSumanta" target="_blank" rel="noopener noreferrer" class="btn btn-ghost w-full">GitHub ↗</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .pill {
      background: rgba(18, 16, 18, 0.55);
      border-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(16px) saturate(140%);
      -webkit-backdrop-filter: blur(16px) saturate(140%);
      box-shadow: 0 10px 40px -12px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06);
      width: min(100%, 44rem);
    }
    @media (min-width: 768px) { .pill { width: auto; } }
    .pill-scrolled { background: rgba(10, 9, 10, 0.82); border-color: rgba(255,255,255,.14); }
    .logo-mark {
      width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center;
      font-family: var(--font-serif); font-style: italic; font-size: 17px; line-height: 1;
      background: radial-gradient(circle at 30% 25%, var(--accent-hover), var(--accent) 55%, var(--accent-deep));
      color: #fff; box-shadow: 0 0 18px -2px rgba(244,38,80,.7);
    }
    .nav-link {
      display: inline-block; padding: .5rem .9rem; border-radius: 999px; font-size: .85rem;
      color: var(--text-secondary); transition: color .2s, background .2s;
    }
    .nav-link:hover { color: var(--text-primary); background: rgba(255,255,255,.06); }
    .nav-link.is-active { color: var(--text-primary); background: rgba(255,255,255,.09); }
    .nav-cta {
      align-items: center; gap: .35rem; padding: .5rem 1.05rem; border-radius: 999px; font-size: .85rem; font-weight: 500;
      background: var(--accent); color: #fff; transition: background .2s, transform .3s var(--ease-out);
    }
    .nav-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
    .nav-cta.is-active { box-shadow: 0 0 0 2px rgba(255,255,255,.25); }
    .burger { position: relative; width: 18px; height: 10px; display: block; }
    .burger i { position: absolute; left: 0; right: 0; height: 1.5px; background: var(--text-primary); transition: transform .35s var(--ease-out), top .35s var(--ease-out); }
    .burger i:first-child { top: 0; } .burger i:last-child { top: 8.5px; }
    .burger.open i:first-child { top: 4.25px; transform: rotate(45deg); }
    .burger.open i:last-child { top: 4.25px; transform: rotate(-45deg); }
    .mobile-panel { background: rgba(8,8,8,.97); overflow: hidden; animation: panel-in .35s var(--ease-out); }
    @keyframes panel-in { from { opacity: 0; } to { opacity: 1; } }
    .mobile-link { display: flex; align-items: baseline; padding: .7rem 0; font-family: var(--font-display); font-size: clamp(2rem, 9vw, 3rem); letter-spacing: -.03em; color: var(--text-secondary); border-bottom: 1px solid var(--border-subtle); transition: color .2s; }
    .mobile-link:hover, .mobile-link.is-active { color: var(--text-primary); }
    .mobile-link.is-active { color: var(--accent); }
    .mobile-item { opacity: 0; transform: translateY(14px); animation: item-in .6s var(--ease-out) forwards; }
    @keyframes item-in { to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) { .mobile-item { opacity: 1; transform: none; animation: none; } }
  `]
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly navItems = [
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Skills', path: '/skills' },
    { label: 'Writing', path: '/blog' }
  ];

  readonly mobileItems = [
    { label: 'Home', path: '/' },
    ...this.navItems
  ];

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.closeMenu();
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    });

    // Lock page scroll while the mobile menu is open.
    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
