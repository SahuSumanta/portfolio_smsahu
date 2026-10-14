import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LocalBrand {
  name: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  badge: string;
  highlights: string[];
  accentColor: string;
}

@Component({
  selector: 'app-vocal-local-spotlight',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="vocal-local-section relative isolate rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-7 sm:p-9 md:p-12 overflow-hidden shadow-2xl" aria-labelledby="vocal-local-title">
      <!-- Ambient decorative glow -->
      <div class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-[var(--accent)]/15 via-transparent to-transparent blur-3xl -z-10" aria-hidden="true"></div>

      <!-- Section Header -->
      <div class="max-w-3xl mb-8 md:mb-12">
        <div class="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-zinc-700/80 bg-zinc-900/80 font-mono text-xs text-zinc-300 tracking-wider uppercase mb-4">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Vocal for Local · Community Spotlight</span>
        </div>

        <h2 id="vocal-local-title" class="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tight text-white">
          Backing homegrown <span class="serif-em">craft &amp; creators.</span>
        </h2>

        <p class="text-zinc-400 text-sm md:text-base leading-relaxed mt-3.5 font-sans max-w-2xl">
          Proudly championing businesses founded by close friends. If you appreciate quality craftsmanship, homegrown Indian design, and independent brands, explore their stores:
        </p>
      </div>

      <!-- Brand Showcase Cards Grid -->
      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">

        <!-- 1. Sevenfold — Clothing & Streetwear -->
        <article class="brand-card group relative flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-6 sm:p-7 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300">
          <div>
            <!-- Top bar: Category badge + External Arrow -->
            <div class="flex items-center justify-between gap-3 mb-5">
              <span class="font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                Clothing &amp; Streetwear
              </span>
              <a
                href="https://sevenfolds.in/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-full border border-zinc-700/80 bg-zinc-800/60 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white transition-colors"
                aria-label="Visit Sevenfold website"
              >
                <span class="text-sm font-mono group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>

            <!-- Brand Identity -->
            <div class="flex items-center gap-3.5 mb-3.5">
              <div class="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-white font-display font-bold text-lg tracking-wider group-hover:border-[var(--accent)] transition-colors">
                SF
              </div>
              <div>
                <h3 class="text-xl font-display font-medium text-white group-hover:text-white">Sevenfold</h3>
                <p class="font-mono text-xs text-zinc-400">sevenfolds.in</p>
              </div>
            </div>

            <p class="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
              Premium oversized boxy-fit t-shirts &amp; contemporary streetwear crafted in India. Heavyweight combed cotton, relaxed silhouettes, and drop collections made for everyday statement wear.
            </p>

            <ul class="flex flex-wrap gap-2 mb-6">
              <li class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/60">Boxy Fit</li>
              <li class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/60">Heavyweight Cotton</li>
              <li class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/60">Homegrown in India</li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div class="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span class="text-xs text-zinc-500 font-sans">Friends' Brand</span>
            <a
              href="https://sevenfolds.in/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Shop Collection <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <!-- 2. Srivaya — Imitation & Handcrafted Jewellery -->
        <article class="brand-card group relative flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-6 sm:p-7 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300">
          <div>
            <!-- Top bar: Category badge + External Arrow -->
            <div class="flex items-center justify-between gap-3 mb-5">
              <span class="font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                Imitation Jewellery
              </span>
              <a
                href="https://srivaya.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-full border border-zinc-700/80 bg-zinc-800/60 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white transition-colors"
                aria-label="Visit Srivaya website"
              >
                <span class="text-sm font-mono group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>

            <!-- Brand Identity -->
            <div class="flex items-center gap-3.5 mb-3.5">
              <div class="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-300 font-display font-bold text-lg tracking-wider group-hover:border-amber-400/60 transition-colors">
                SV
              </div>
              <div>
                <h3 class="text-xl font-display font-medium text-white group-hover:text-white">Srivaya</h3>
                <p class="font-mono text-xs text-zinc-400">srivaya.com</p>
              </div>
            </div>

            <p class="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
              Curated designer fashion jewellery &amp; handcrafted statement ornaments. Beautiful necklaces, earrings, and festive sets designed to complement personal style with timeless elegance.
            </p>

            <ul class="flex flex-wrap gap-2 mb-6">
              <li class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/60">Fashion Jewellery</li>
              <li class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/60">Necklaces &amp; Earrings</li>
              <li class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/60">Festive &amp; Daily Wear</li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div class="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span class="text-xs text-zinc-500 font-sans">Friends' Brand</span>
            <a
              href="https://srivaya.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400/90 text-zinc-950 font-medium text-xs hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Explore Srivaya <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .brand-card {
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .brand-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.7);
    }
  `]
})
export class VocalLocalSpotlightComponent {}
