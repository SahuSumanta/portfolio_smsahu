import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface TechItem {
  name: string;
  rawSvg: string;
  safeSvg?: SafeHtml;
}

export interface SkillCategoryRow {
  number: number;
  title: string;
  description: string;
  technologies: TechItem[];
}

@Component({
  selector: 'app-skills-directory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skills-directory relative isolate bg-[#080808] text-white py-14 md:py-24 select-none">
      <div class="container-x max-w-7xl mx-auto">

        <!-- Section Header -->
        <header class="mb-16 md:mb-24">
          <div class="flex items-center gap-3 font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
            <span class="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <span>Technology Directory</span>
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-white max-w-3xl">
            Verified technical stack &amp; engineering toolkit.
          </h2>
          <p class="text-zinc-400 max-w-2xl mt-4 text-sm md:text-base leading-relaxed font-sans">
            A structured directory of frameworks, languages, APIs, runtime infrastructure, and engineering methodologies used across production applications.
          </p>
        </header>

        <!-- Categories Stack -->
        <div class="space-y-16 md:space-y-24">
          @for (cat of displayedCategories; track cat.number) {
            <div class="category-row grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              <!-- Left Column: Monospace label + Heading -->
              <div class="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28">
                <span class="font-mono text-xs tracking-widest text-zinc-500 block mb-2">
                  &#123; {{ cat.number }} &#125; _
                </span>
                <h3 class="text-xl md:text-2xl font-sans font-medium tracking-tight text-zinc-100">
                  {{ cat.title }}
                </h3>
                <p class="text-xs text-zinc-400 mt-2.5 font-sans leading-relaxed">
                  {{ cat.description }}
                </p>
                <div class="mt-4 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                  {{ cat.technologies.length }} Technologies
                </div>
              </div>

              <!-- Right Column: Structured Grid of Bordered Logo Cells -->
              <div class="lg:col-span-8 xl:col-span-9">
                <div
                  class="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l border-zinc-800/80 bg-[#09090b]"
                >
                  @for (tech of cat.technologies; track tech.name) {
                    <div
                      class="tech-cell border-r border-b border-zinc-800/80 h-28 sm:h-32 p-4 flex flex-col items-center justify-center text-center group transition-colors duration-200 relative bg-[#09090b] hover:bg-zinc-900/60"
                      [attr.aria-label]="tech.name"
                      tabindex="0"
                    >
                      <!-- Authentic Technology Vector Logo -->
                      <div
                        class="logo-wrapper flex items-center justify-center w-full h-12 mb-2 text-zinc-400 group-hover:text-white transition-all duration-200"
                        [innerHTML]="tech.safeSvg"
                      ></div>

                      <!-- Subtitle Label -->
                      <span class="font-mono text-[11px] tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors truncate max-w-full px-1">
                        {{ tech.name }}
                      </span>
                    </div>
                  }
                </div>
              </div>

            </div>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .tech-cell {
      outline: none;
    }
    .tech-cell:focus-visible {
      border-color: var(--accent);
      z-index: 10;
    }

    :host ::ng-deep .tech-svg {
      display: block;
      max-height: 2rem;
      max-width: 5.5rem;
      width: auto;
      height: auto;
      fill: currentColor;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
      opacity: 0.82;
    }

    :host ::ng-deep .tech-cell:hover .tech-svg {
      transform: scale(1.08);
      opacity: 1;
    }
  `]
})
export class SkillsDirectoryComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input() fullDirectory = false;

  readonly allCategories: SkillCategoryRow[] = [
    {
      number: 1,
      title: 'Frontend Engineering',
      description: 'Declarative component architectures, enterprise reactive state, signals, forms, and performant web UI.',
      technologies: [
        {
          name: 'Angular',
          rawSvg: `<svg viewBox="0 0 250 250" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="125,30 31.9,63.2 46.1,186.3 125,230 203.9,186.3 218.1,63.2" fill="none" stroke="currentColor" stroke-width="14"/><polygon points="125,52.1 66.8,182.6 88.5,182.6 100.2,153.4 149.6,153.4 161.3,182.6 183,182.6" fill="currentColor"/><polygon points="108,135.4 142,135.4 125,93" fill="#09090b"/></svg>`
        },
        {
          name: 'TypeScript',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect width="256" height="256" rx="28" fill="none" stroke="currentColor" stroke-width="16"/><path d="M150.7 159.2c3.4 5.9 8.6 10.7 15.3 14.3 6.8 3.6 14.5 5.4 23.3 5.4 7.6 0 14.2-1.3 19.8-4 5.6-2.7 9.8-6.5 12.7-11.4 2.9-4.9 4.3-10.6 4.3-17.1 0-5.7-1.3-10.6-3.8-14.7-2.6-4.1-6.2-7.5-11-10.2-4.7-2.7-11.5-5.3-20.2-7.8-11.1-3.2-19.4-6.4-24.9-9.6-5.5-3.2-9.4-7.3-11.7-12.2-2.3-4.9-3.5-10.9-3.5-17.9 0-7.7 2-14.5 6.1-20.4 4.1-5.9 9.8-10.5 17.2-13.8 7.4-3.3 16.2-4.9 26.2-4.9 10.3 0 19.3 1.9 26.8 5.6 7.6 3.7 13.4 9.1 17.5 16l-18.4 11.8c-2.9-4.7-6.7-8.3-11.5-10.7-4.7-2.4-10.2-3.6-16.5-3.6-5.9 0-11 1.1-15.3 3.3-4.3 2.2-7.6 5.2-9.8 9-2.2 3.8-3.3 8.1-3.3 13 0 5 1.1 9.2 3.4 12.8 2.2 3.5 5.5 6.5 9.8 8.8 4.3 2.3 10.8 4.7 19.5 7.2 11.2 3.2 19.8 6.4 25.8 9.7 6 3.3 10.4 7.5 13.2 12.7 2.8 5.2 4.2 11.5 4.2 19 0 8.6-2.3 16.2-6.8 22.9-4.5 6.7-10.9 11.9-19.1 15.6-8.2 3.7-17.9 5.6-29.1 5.6-13.6 0-25.2-2.8-34.9-8.4-9.6-5.6-16.8-13.6-21.4-24l20.4-11.8zM41.6 69.3h76.3v20.4H90.8V204H68.7V89.7H41.6V69.3z" fill="currentColor"/></svg>`
        },
        {
          name: 'JavaScript',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect width="256" height="256" rx="28" fill="none" stroke="currentColor" stroke-width="16"/><path d="M67.3 203.4c10.8 6.2 23.8 9.8 35.8 9.8 37.1 0 61.2-18.5 61.2-54.8v-72.3h-25.7v72.1c0 21.6-12.3 32.7-32.9 32.7-8.7 0-17.5-2.6-23.7-6.2l-14.7 18.7zm93.4-12.8c12.3 7.2 28.3 12.3 44.8 12.3 25.7 0 42.2-12.8 42.2-33.4 0-19.5-12.3-29.8-34.9-38.6-27.2-10.3-43.7-20.1-43.7-44.2 0-21.6 16.9-37.5 44.2-37.5 14.9 0 27.2 3.6 36.5 8.7l-7.7 20.6c-7.2-4.1-17.5-7.7-28.8-7.7-16.9 0-26.2 9.2-26.2 19 0 16.9 12.3 24.7 34.4 33.4 29.3 11.3 44.8 23.1 44.8 49.3 0 24.2-18.5 41.6-49.8 41.6-18.5 0-35.4-5.6-46.7-12.8l10.7-20.7z" fill="currentColor"/></svg>`
        },
        {
          name: 'RxJS',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M128 24C70.6 24 24 70.6 24 128s46.6 104 104 104 104-46.6 104-104S185.4 24 128 24zm42 144c-12 16-31 26-50 26s-38-10-50-26c-8-11-12-25-10-38 3-18 17-33 36-39 8-2 16-3 24-3s16 1 24 3c19 6 33 21 36 39 2 13-2 27-10 38z" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="24" fill="currentColor"/></svg>`
        },
        {
          name: 'NgRx',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="128,24 32,72 44,196 128,232 212,196 224,72" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="42" fill="currentColor"/></svg>`
        },
        {
          name: 'Reactive Forms',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="48" width="176" height="160" rx="20" fill="none" stroke="currentColor" stroke-width="16"/><line x1="72" y1="96" x2="184" y2="96" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><line x1="72" y1="140" x2="140" y2="140" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><circle cx="168" cy="140" r="12" fill="currentColor"/></svg>`
        },
        {
          name: 'Angular Material',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="128,32 40,84 40,188 128,240 216,188 216,84" fill="none" stroke="currentColor" stroke-width="16"/><line x1="40" y1="84" x2="128" y2="136" stroke="currentColor" stroke-width="14"/><line x1="216" y1="84" x2="128" y2="136" stroke="currentColor" stroke-width="14"/><line x1="128" y1="240" x2="128" y2="136" stroke="currentColor" stroke-width="14"/></svg>`
        },
        {
          name: 'Tailwind CSS',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M64 112c10.7-21.3 26.7-32 48-32 32 0 42.7 32 64 32 16 0 26.7-8 32-24-10.7 21.3-26.7 32-48 32-32 0-42.7-32-64-32-16 0-26.7 8-32 24zm-32 64c10.7-21.3 26.7-32 48-32 32 0 42.7 32 64 32 16 0 26.7-8 32-24-10.7 21.3-26.7 32-48 32-32 0-42.7-32-64-32-16 0-26.7 8-32 24z" fill="currentColor"/></svg>`
        }
      ]
    },
    {
      number: 2,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS & Android with native hardware integration and offline-first data sync.',
      technologies: [
        {
          name: 'Ionic',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="80" r="16" fill="currentColor"/><circle cx="86" cy="154" r="16" fill="currentColor"/><circle cx="170" cy="154" r="16" fill="currentColor"/></svg>`
        },
        {
          name: 'Capacitor',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M128 24L28 81.6v92.8L128 232l100-57.6V81.6L128 24zm60 126.8L128 186l-60-35.2V105L128 70l60 35v45.8z" fill="currentColor"/></svg>`
        },
        {
          name: 'Android',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M60.7 77.2l-19.1-33a6.1 6.1 0 0 1 2.2-8.3 6.1 6.1 0 0 1 8.3 2.2l19.6 34a106.6 106.6 0 0 1 112.6 0l19.6-34a6.1 6.1 0 0 1 8.3-2.2 6.1 6.1 0 0 1 2.2 8.3l-19.1 33a109.8 109.8 0 0 1 40.7 87.8H20C20 135.2 35.8 100 60.7 77.2zM75 128a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm106 0a11 11 0 1 0 0-22 11 11 0 0 0 0 22z" fill="currentColor"/></svg>`
        },
        {
          name: 'Apple / iOS',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M187.3 134.4c.3 32.2 28.3 43 28.6 43.1-.2.8-4.5 15.3-14.8 30.3-8.9 13-18.2 26-32.8 26.2-14.4.3-19-8.5-35.4-8.5-16.5 0-21.6 8.3-35.3 8.8-14.2.5-24.8-14.1-33.8-27.1-18.4-26.6-32.5-75.1-13.6-107.9 9.4-16.3 26.1-26.6 44.3-26.9 13.9-.3 27 9.4 35.5 9.4 8.5 0 24.3-11.6 41-9.9 7 .3 26.6 2.8 39.2 21.3-1 0.6-23.4 13.7-22.9 41.2zM157.9 59.9c7.7-9.3 12.9-22.2 11.5-35.2-11.1.4-24.6 7.4-32.5 16.7-7 8.1-13.1 21.2-11.5 33.8 12.4 1 24.8-6 32.5-15.3z" fill="currentColor"/></svg>`
        },
        {
          name: 'HTML5',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="36,28 220,28 204,212 128,232 52,212" fill="none" stroke="currentColor" stroke-width="16"/><path d="M128,88H88l3,32h37v22H93l2,22h33v34l28-9 4-31h-24v-22h26l6-48H128V88z" fill="currentColor"/></svg>`
        },
        {
          name: 'CSS3',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="36,28 220,28 204,212 128,232 52,212" fill="none" stroke="currentColor" stroke-width="16"/><path d="M88,88h80l-6,70-34,10-34-10-2-20h22l1,10 13,4 13-4 3-36H88V88z" fill="currentColor"/></svg>`
        }
      ]
    },
    {
      number: 3,
      title: 'Backend & Databases',
      description: 'Scalable service layers, relational and NoSQL databases, persistent WebSockets, and high-throughput microservices.',
      technologies: [
        {
          name: 'Node.js',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M128 16L24 76v120l104 60 104-60V76L128 16zm72 158.4l-72 41.6-72-41.6V91.6l72-41.6 72 41.6v82.8z" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="128" cy="128" r="30" fill="currentColor"/></svg>`
        },
        {
          name: 'Go (Golang)',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><path d="M112 168H88v-64h24v64zm56 0h-40v-64h40c13.3 0 24 10.7 24 24v16c0 13.3-10.7 24-24 24zm0-24v-16h-16v16h16z" fill="currentColor"/></svg>`
        },
        {
          name: 'Java',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M72 160c24 8 88 8 112 0-8 16-36 28-56 28s-48-12-56-28zM92 120c16 4 56 4 72 0-4 12-20 20-36 20s-32-8-36-20z" fill="currentColor"/><path d="M144 48c12 16 12 32-8 48 20-4 32-20 20-44-4-8-12-4" fill="none" stroke="currentColor" stroke-width="12"/></svg>`
        },
        {
          name: 'PostgreSQL',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><path d="M128 72c-28 0-48 18-48 44 0 32 40 40 48 56 6-12 16-24 16-36 0-14-10-24-24-24-6 0-12 2-16 6" fill="none" stroke="currentColor" stroke-width="14"/></svg>`
        },
        {
          name: 'MySQL',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><path d="M80 156l24-48 24 48 24-48 24 48" fill="none" stroke="currentColor" stroke-width="14"/></svg>`
        },
        {
          name: 'MongoDB',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M128 24c-3.7 0-7 2.3-8.3 5.8C104 71.8 68 127.2 68 167.5c0 41.4 30.8 72.5 60 72.5s60-31.1 60-72.5c0-40.3-36-95.7-51.7-137.7-1.3-3.5-4.6-5.8-8.3-5.8z" fill="none" stroke="currentColor" stroke-width="14"/><path d="M128 48v176c18 0 42-20 42-56 0-32-28-80-42-120z" fill="currentColor"/></svg>`
        },
        {
          name: 'WebSockets',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="52" width="184" height="152" rx="24" fill="none" stroke="currentColor" stroke-width="16"/><path d="M72 100h112v20H72v-20zm0 36h112v20H72v-20z" fill="currentColor"/></svg>`
        },
        {
          name: 'REST & APIs',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="56" width="176" height="144" rx="20" fill="none" stroke="currentColor" stroke-width="16"/><path d="M92 104l-24 24 24 24M164 104l24 24-24 24M140 96l-24 64" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg>`
        }
      ]
    },
    {
      number: 4,
      title: 'IoT, AI & Automation',
      description: 'Smart building management, industrial sensor telemetry, automated CDC/ETL pipelines, and LLM integrations.',
      technologies: [
        {
          name: 'BACnet & BMS',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="128,40 48,88 48,168 128,216 208,168 208,88" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="28" fill="currentColor"/></svg>`
        },
        {
          name: 'Industrial IoT',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="56" y="56" width="144" height="144" rx="20" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="128" cy="128" r="32" fill="currentColor"/><line x1="128" y1="24" x2="128" y2="56" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><line x1="128" y1="200" x2="128" y2="232" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg>`
        },
        {
          name: 'ETL / CDC Pipelines',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M48 80h110a30 30 0 0 1 30 30v0a30 30 0 0 1-30 30H98a30 30 0 0 0-30 30v0a30 30 0 0 0 30 30h110" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="188,180 212,200 188,220" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        },
        {
          name: 'OpenAI & LLMs',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="14"/><path d="M128 40a44 44 0 0 1 38 66l-20 34m-36-100a44 44 0 0 0-38 66l20 34" fill="none" stroke="currentColor" stroke-width="14"/></svg>`
        },
        {
          name: 'n8n Automation',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="80" cy="128" r="28" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="176" cy="88" r="28" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="176" cy="168" r="28" fill="none" stroke="currentColor" stroke-width="14"/><line x1="106" y1="116" x2="150" y2="98" stroke="currentColor" stroke-width="12"/><line x1="106" y1="140" x2="150" y2="158" stroke="currentColor" stroke-width="12"/></svg>`
        },
        {
          name: 'Apache NiFi',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="40" width="76" height="76" rx="14" fill="none" stroke="currentColor" stroke-width="14"/><rect x="140" y="140" width="76" height="76" rx="14" fill="none" stroke="currentColor" stroke-width="14"/><path d="M116 78h36a26 26 0 0 1 26 26v36" fill="none" stroke="currentColor" stroke-width="14"/></svg>`
        }
      ]
    },
    {
      number: 5,
      title: 'Cloud, DevOps & Tools',
      description: 'Distributed CI/CD automation, cloud infrastructure, containerization, and systems administration.',
      technologies: [
        {
          name: 'Docker',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><rect x="80" y="112" width="20" height="20" fill="currentColor"/><rect x="106" y="112" width="20" height="20" fill="currentColor"/><rect x="132" y="112" width="20" height="20" fill="currentColor"/><rect x="158" y="112" width="20" height="20" fill="currentColor"/><rect x="106" y="86" width="20" height="20" fill="currentColor"/><rect x="132" y="86" width="20" height="20" fill="currentColor"/></svg>`
        },
        {
          name: 'Kubernetes',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="128,28 42,77 42,179 128,228 214,179 214,77" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="32" fill="currentColor"/></svg>`
        },
        {
          name: 'AWS',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M152 164c-24 16-56 24-84 24-40 0-76-14-102-38 24 22 58 34 94 34 26 0 56-8 78-24 3-2 7 1 6 4z" fill="currentColor"/><path d="M68 96h24l18 64h-20l-4-16H66l-4 16H44l24-64zm8 16l-7 28h18l-7-28h-4z" fill="currentColor"/><path d="M136 128l-16-32h22l8 18 8-18h22l-16 32 18 32h-22l-10-20-10 20h-22l18-32z" fill="currentColor"/></svg>`
        },
        {
          name: 'Jenkins CI/CD',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="16"/><path d="M128 80v48l36 20" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`
        },
        {
          name: 'Git & GitHub',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M128 24C70.6 24 24 70.6 24 128c0 45.9 29.8 84.8 71.1 98.5 5.2 1 7.1-2.3 7.1-5 0-2.5-.1-10.8-.1-19.6-28.9 6.3-35-12.3-35-12.3-4.7-12-11.6-15.2-11.6-15.2-9.4-6.4.7-6.3.7-6.3 10.4.7 15.9 10.7 15.9 10.7 9.3 15.9 24.3 11.3 30.2 8.6 1-.6 6.7-5.8 7.3-8.8-23.1-2.6-47.3-11.5-47.3-51.4 0-11.4 4.1-20.7 10.7-27.9-1.1-2.6-4.6-13.2 1-27.5 0 0 8.7-2.8 28.6 10.7 8.3-2.3 17.2-3.5 26.1-3.5 8.9 0 17.8 1.2 26.1 3.5 19.9-13.5 28.5-10.7 28.5-10.7 5.7 14.3 2.1 24.9 1 27.5 6.7 7.2 10.7 16.5 10.7 27.9 0 39.9-24.3 48.7-47.5 51.3 3.8 3.3 7.1 9.7 7.1 19.6 0 14.1-.1 25.5-.1 29 0 2.8 1.9 6.1 7.2 5C202.2 212.7 232 173.9 232 128c0-57.4-46.6-104-104-104z" fill="currentColor"/></svg>`
        },
        {
          name: 'Linux',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><path d="M128 68c-24 0-42 18-42 42 0 16 8 30 20 38-6 10-10 22-10 34h64c0-12-4-24-10-34 12-8 20-22 20-38 0-24-18-42-42-42z" fill="currentColor"/></svg>`
        },
        {
          name: 'Postman',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><path d="M84 128l44-44v88l-44-44zm88 0l-44-44v88l44-44z" fill="currentColor"/></svg>`
        },
        {
          name: 'Helm',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="128" cy="128" r="28" fill="currentColor"/><line x1="128" y1="40" x2="128" y2="100" stroke="currentColor" stroke-width="12"/><line x1="128" y1="156" x2="128" y2="216" stroke="currentColor" stroke-width="12"/><line x1="40" y1="128" x2="100" y2="128" stroke="currentColor" stroke-width="12"/><line x1="156" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="12"/></svg>`
        }
      ]
    },
    {
      number: 6,
      title: 'AI-Assisted Engineering',
      description: 'Agentic workflows, intelligent code generation, automated review, and LLM orchestration tools.',
      technologies: [
        {
          name: 'Cursor',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="72,40 184,128 128,140 100,196" fill="currentColor"/></svg>`
        },
        {
          name: 'Claude Code',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="84" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="128" cy="128" r="36" fill="currentColor"/></svg>`
        },
        {
          name: 'GitHub Copilot',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="52" y="72" width="152" height="112" rx="28" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="96" cy="128" r="14" fill="currentColor"/><circle cx="160" cy="128" r="14" fill="currentColor"/></svg>`
        },
        {
          name: 'Google Gemini',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M128 32c0 53 43 96 96 96-53 0-96 43-96 96 0-53-43-96-96-96 53 0 96-43 96-96z" fill="currentColor"/></svg>`
        }
      ]
    },
    {
      number: 7,
      title: 'Architecture & Leadership',
      description: 'High-level system design (HLD/LLD), scalable architectures, rigorous code reviews, and stakeholder delivery.',
      technologies: [
        {
          name: 'System Design',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="48" width="64" height="64" rx="12" fill="none" stroke="currentColor" stroke-width="14"/><rect x="152" y="48" width="64" height="64" rx="12" fill="none" stroke="currentColor" stroke-width="14"/><rect x="96" y="144" width="64" height="64" rx="12" fill="none" stroke="currentColor" stroke-width="14"/><path d="M72 112v16h56m56-16v16h-56m0 0v16" fill="none" stroke="currentColor" stroke-width="12"/></svg>`
        },
        {
          name: 'Scalable Systems',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="128,32 44,80 44,176 128,224 212,176 212,80" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="128" cy="128" r="28" fill="currentColor"/></svg>`
        },
        {
          name: 'Agile & Reviews',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="16"/><polyline points="88,128 116,156 168,104" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        },
        {
          name: 'Client Delivery',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="92" cy="100" r="32" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="164" cy="100" r="32" fill="none" stroke="currentColor" stroke-width="14"/><path d="M48 200c0-32 32-48 64-48s64 16 64 48" fill="none" stroke="currentColor" stroke-width="14"/></svg>`
        }
      ]
    },
    {
      number: 8,
      title: 'Continuous Learning & R&D',
      description: 'Active research domains, high-concurrency event streaming, systems programming, and agentic AI architectures.',
      technologies: [
        {
          name: 'Agentic AI & RAG',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="14" stroke-dasharray="8 6"/><circle cx="128" cy="128" r="32" fill="currentColor"/><circle cx="70" cy="90" r="14" fill="currentColor"/><circle cx="186" cy="90" r="14" fill="currentColor"/><circle cx="128" cy="200" r="14" fill="currentColor"/></svg>`
        },
        {
          name: 'Rust Systems',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="16"/><path d="M104 88h40a24 24 0 0 1 24 24v0a24 24 0 0 1-24 24h-40V88zm0 48l44 44" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`
        },
        {
          name: 'Next.js Serverless',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><polygon points="88,80 88,176 168,176" fill="currentColor"/></svg>`
        },
        {
          name: 'Core Web Vitals',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><path d="M40 160a96 96 0 1 1 176 0" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="160" r="14" fill="currentColor"/><line x1="128" y1="160" x2="176" y2="112" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg>`
        }
      ]
    },
    {
      number: 9,
      title: 'Verified Credentials',
      description: 'Formally evaluated technical capabilities in enterprise architecture, full-stack systems, and industrial protocols.',
      technologies: [
        {
          name: 'Angular Arch.',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><polygon points="128,28 36,68 52,188 128,228 204,188 220,68" fill="none" stroke="currentColor" stroke-width="14"/><path d="M128 72l16 32 36 6-26 26 6 36-32-16-32 16 6-36-26-26 36-6z" fill="currentColor"/></svg>`
        },
        {
          name: 'Java Certificate',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-width="16"/><polyline points="88,128 116,156 168,104" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        },
        {
          name: 'Command Line',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="56" width="176" height="144" rx="20" fill="none" stroke="currentColor" stroke-width="16"/><polyline points="72,112 104,128 72,144" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><line x1="120" y1="144" x2="152" y2="144" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg>`
        },
        {
          name: 'Enterprise Eng.',
          rawSvg: `<svg viewBox="0 0 256 256" class="tech-svg" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="100" r="56" fill="none" stroke="currentColor" stroke-width="14"/><polyline points="100,100 120,120 156,84" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><polygon points="96,152 72,216 128,196 184,216 160,152" fill="currentColor"/></svg>`
        }
      ]
    }
  ];

  get displayedCategories(): SkillCategoryRow[] {
    return this.fullDirectory ? this.allCategories : this.allCategories.slice(0, 5);
  }

  constructor() {
    // Sanitize all SVGs so they render properly in Angular DOM
    for (const cat of this.allCategories) {
      for (const tech of cat.technologies) {
        tech.safeSvg = this.sanitizer.bypassSecurityTrustHtml(tech.rawSvg);
      }
    }
  }
}
