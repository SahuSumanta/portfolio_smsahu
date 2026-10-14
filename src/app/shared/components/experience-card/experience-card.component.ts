import { Component, computed, input } from '@angular/core';
import { ExperienceItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-experience-card',
  template: `
    <article class="xp-card grid md:grid-cols-12 gap-x-10 gap-y-6 py-12 md:py-16 border-b border-[var(--border)]">
      <div class="md:col-span-3 space-y-3">
        @if (item().companyLogo) {
          <div class="w-12 h-12 rounded-md bg-white p-1.5 flex items-center justify-center">
            <img [src]="item().companyLogo" [alt]="item().company + ' logo'" class="w-full h-full object-contain" loading="lazy" />
          </div>
        }
        <p class="font-mono text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)]">{{ start() }} — {{ item().current ? 'Present' : end() }}</p>
        <p class="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--text-tertiary)]">{{ item().location }}</p>
      </div>

      <div class="md:col-span-9 space-y-8">
        <div>
          <h3 class="font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.5rem)] font-medium tracking-[-0.03em] leading-tight flex flex-wrap items-center gap-x-4 gap-y-2">
            {{ item().roleTitle }}
            @if (item().current) {
              <span class="tag !text-[var(--accent)] !border-[var(--accent)]/40">Current</span>
            }
          </h3>
          <p class="text-[var(--text-secondary)] text-lg mt-1">{{ item().company }}</p>
        </div>

        <ul class="space-y-3 max-w-2xl">
          @for (high of item().highlights; track high) {
            <li class="flex gap-4 text-[var(--text-primary)]/85 leading-relaxed">
              <span class="mt-[0.7em] w-3 h-px bg-[var(--accent)] shrink-0" aria-hidden="true"></span>{{ high }}
            </li>
          }
        </ul>

        @if (item().majorAchievements.length) {
          <div>
            <p class="eyebrow eyebrow-plain mb-3">Outcomes</p>
            <ul class="space-y-2 max-w-2xl text-sm text-[var(--text-secondary)] leading-relaxed">
              @for (a of item().majorAchievements; track a) { <li>{{ a }}</li> }
            </ul>
          </div>
        }

        @if (item().projectTimeline?.length) {
          <div>
            <p class="eyebrow eyebrow-plain mb-3">Platforms worked on</p>
            <ul class="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              @for (pt of item().projectTimeline; track pt.name) {
                <li><span class="text-[var(--text-primary)]">{{ pt.name }}</span> <span class="text-[var(--text-tertiary)]">— {{ pt.subtitle }}</span></li>
              }
            </ul>
          </div>
        }

        <ul class="flex flex-wrap gap-2" aria-label="Technologies">
          @for (tech of item().techStack; track tech) { <li class="tag">{{ tech }}</li> }
        </ul>
      </div>
    </article>
  `
})
export class ExperienceCardComponent {
  readonly item = input.required<ExperienceItem>();
  readonly start = computed(() => this.fmt(this.item().startDate));
  readonly end = computed(() => this.fmt(this.item().endDate));

  private fmt(date?: string): string {
    if (!date) return '';
    const d = new Date(`${date}-01T00:00:00`);
    return isNaN(d.getTime()) ? date : d.toLocaleDateString('en', { month: 'short', year: 'numeric' });
  }
}
