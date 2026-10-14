import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <a
      class="card group h-full flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
      [routerLink]="['/projects', project().slug]"
      [attr.aria-label]="project().title + ' — read case study'"
    >
      <div class="relative aspect-[16/10] overflow-hidden bg-[var(--ink-850)]">
        @if (project().thumbnailUrl && !project().thumbnailUrl.startsWith('http')) {
          <img
            [src]="project().thumbnailUrl"
            [alt]="project().title + ' interface'"
            loading="lazy" decoding="async" width="1200" height="750"
            class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        } @else {
          <div class="absolute inset-0 grid place-items-center ph">
            <span class="font-display text-2xl tracking-tight text-white/80 px-6 text-center">{{ project().title }}</span>
          </div>
        }
      </div>

      <div class="flex flex-col flex-1 p-6 md:p-7">
        <div class="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
          <span>{{ project().category }}</span>
          <span>{{ project().completionYear }}</span>
        </div>
        <h3 class="font-display text-2xl font-medium tracking-tight mt-4 group-hover:text-[var(--accent)] transition-colors">
          {{ project().title }}
        </h3>
        <p class="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mt-3">
          {{ project().tagline }}
        </p>
        <div class="mt-auto pt-6 flex flex-wrap items-center gap-2">
          @for (tech of project().techStack.slice(0, 4); track tech) {
            <span class="tag">{{ tech }}</span>
          }
          @if (project().techStack.length > 4) {
            <span class="tag">+{{ project().techStack.length - 4 }}</span>
          }
        </div>
      </div>
    </a>
  `,
  styles: [`
    .card { transition: border-color .4s, transform .5s var(--ease-out), box-shadow .5s; }
    .card:hover { border-color: rgba(244,38,80,.45); transform: translateY(-4px); box-shadow: 0 30px 60px -30px rgba(244,38,80,.35); }
    .ph { background: radial-gradient(80% 80% at 70% 0%, var(--accent-deep), var(--ink-900) 70%); }
  `],
  host: {
    class: 'block h-full'
  }
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
