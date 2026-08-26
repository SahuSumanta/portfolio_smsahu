import { Component, signal, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between transition-all duration-300 bg-transparent mix-blend-difference">
      <!-- Left: Minimal Typography Logo -->
      <a routerLink="/" class="text-white font-display font-bold text-lg tracking-tighter hover:opacity-70 transition-opacity">
        Sumanta Sahu
      </a>

      <!-- Center/Right: Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="!text-white !opacity-100 !font-medium"
            [routerLinkActiveOptions]="{ exact: item.exact }"
            class="text-sm font-sans tracking-wide text-white/60 hover:text-white transition-all duration-300"
          >
            {{ item.label }}
          </a>
        }
        <a
          routerLink="/contact"
          class="text-sm font-sans tracking-wide text-white hover:opacity-70 transition-all duration-300 ml-4"
        >
          Contact
        </a>
      </nav>

      <!-- Mobile Toggle -->
      <button
        type="button"
        (click)="toggleMobileMenu()"
        class="md:hidden text-white/80 hover:text-white cursor-pointer"
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
              routerLinkActive="!text-white !opacity-100 !font-medium"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="text-4xl font-display font-light text-white/40 hover:text-white transition-colors"
            >
              {{ item.label }}
            </a>
          }
          <a
            routerLink="/contact"
            (click)="closeMobileMenu()"
            class="text-4xl font-display font-medium text-white pt-8 mt-8 border-t border-white/10 hover:opacity-70 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    }
  `
})
export class NavbarComponent {
  readonly mobileMenuOpen = signal<boolean>(false);

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
}
