import { Component, signal, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between transition-all duration-300 bg-transparent mix-blend-difference">
      <!-- Left: Minimal Typography Logo -->
      <a routerLink="/" class="text-[var(--text-primary)] font-display font-bold text-lg tracking-tighter hover:opacity-70 transition-opacity">
        Sumanta Sahu
      </a>

      <!-- Center/Right: Desktop Navigation & Charm -->
      <nav class="hidden md:flex items-center gap-8">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="!text-[var(--accent)] !opacity-100 !font-medium"
            [routerLinkActiveOptions]="{ exact: item.exact }"
            class="text-sm font-sans tracking-wide text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-all duration-300"
          >
            {{ item.label }}
          </a>
        }
        <a
          routerLink="/contact"
          class="text-sm font-sans tracking-wide text-[var(--text-primary)] hover:opacity-70 transition-all duration-300 ml-4"
        >
          Contact
        </a>
        
        <!-- Nimbu Mirchi Charm -->
        <button
          class="nimbu-mirchi origin-top transition-all cursor-pointer ml-4 relative outline-none hover:brightness-110"
          [class.pulling]="isPulling()"
          (click)="triggerThemeToggle($event)"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          <svg width="24" height="60" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
            <!-- Thread -->
            <path d="M12 -10 L12 20" stroke="#FF9933" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.9" />
            <!-- Nimbu (Lemon) -->
            <circle cx="12" cy="26" r="5" stroke="#E5DA47" stroke-width="1" fill="#FFF44F" />
            <!-- Mirchi (Chilies) -->
            <path d="M12 31 Q 8 40 10 46" stroke="#366744" stroke-width="2" stroke-linecap="round" />
            <path d="M12 31 Q 16 42 14 48" stroke="#366744" stroke-width="2" stroke-linecap="round" />
            <path d="M12 31 Q 12 44 12 50" stroke="#366744" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Toggle -->
      <button
        type="button"
        (click)="toggleMobileMenu()"
        class="md:hidden text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          @if (!mobileMenuOpen()) {
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 6h18M3 18h18" />
          } @else {
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          }
        </svg>
      </button>
    </header>

    <!-- Mobile Fullscreen Menu -->
    @if (mobileMenuOpen()) {
      <div class="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-32 px-8 pb-12 flex flex-col animate-fadeIn">
        <div class="space-y-6 flex flex-col">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              (click)="closeMobileMenu()"
              routerLinkActive="!text-[var(--accent)] !opacity-100 !font-medium"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="text-4xl font-display font-light text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors"
            >
              {{ item.label }}
            </a>
          }
          <a
            routerLink="/contact"
            (click)="closeMobileMenu()"
            class="text-4xl font-display font-medium text-[var(--text-primary)] pt-8 mt-8 border-t border-[var(--border)] hover:opacity-70 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    }
  `,
  styles: [`
    .nimbu-mirchi {
      animation: sway 6s ease-in-out infinite alternate;
    }
    
    .nimbu-mirchi:hover {
      animation: sway-hover 2s ease-in-out infinite alternate;
    }
    
    .nimbu-mirchi.pulling {
      animation: pull-down 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }
    
    @keyframes sway {
      0% { transform: rotate(-4deg); }
      100% { transform: rotate(4deg); }
    }
    
    @keyframes sway-hover {
      0% { transform: rotate(-8deg); }
      100% { transform: rotate(8deg); }
    }
    
    @keyframes pull-down {
      0% { transform: scaleY(1) translateY(0); }
      50% { transform: scaleY(1.3) translateY(10px); }
      100% { transform: scaleY(1) translateY(0); }
    }
  `]
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly mobileMenuOpen = signal<boolean>(false);
  readonly isPulling = signal<boolean>(false);

  readonly navItems = [
    { label: 'Home', path: '/', exact: true },
    { label: 'About', path: '/about', exact: false },
    { label: 'Projects', path: '/projects', exact: false },
    { label: 'Experience', path: '/experience', exact: false },
    { label: 'Skills', path: '/skills', exact: false },
    { label: 'Blog', path: '/blog', exact: false }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  triggerThemeToggle(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || this.isPulling()) return;

    this.isPulling.set(true);

    // Calculate click coordinates for the circular reveal
    const x = event.clientX;
    const y = event.clientY;

    // Let the pull-down animation run to 50% before triggering the transition (200ms)
    setTimeout(() => {
      this.executeThemeTransition(x, y);
    }, 200);

    // Reset pulling state after animation completes
    setTimeout(() => {
      this.isPulling.set(false);
    }, 500);
  }

  private executeThemeTransition(x: number, y: number): void {
    const documentEl = document.documentElement;
    const isDark = !documentEl.classList.contains('light-theme');

    const applyTheme = () => {
      if (isDark) {
        documentEl.classList.add('light-theme');
      } else {
        documentEl.classList.remove('light-theme');
      }
    };

    // @ts-ignore - View Transitions API might not be in the TS lib yet
    if (!document.startViewTransition) {
      applyTheme();
      return;
    }

    // Set custom properties for the circular clip-path center
    documentEl.style.setProperty('--theme-x', `${x}px`);
    documentEl.style.setProperty('--theme-y', `${y}px`);
    documentEl.style.viewTransitionName = 'theme-toggle';

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      applyTheme();
    });

    transition.finished.then(() => {
      documentEl.style.viewTransitionName = '';
    });
  }
}
