import { Component, input } from '@angular/core';
import { JourneyMilestone } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-journey-timeline',
  template: `
    <ol class="border-t border-[var(--border)]">
      @for (item of milestones(); track item.id) {
        <li class="group grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 border-b border-[var(--border)]">
          <div class="md:col-span-3 flex md:flex-col gap-x-4 gap-y-1 items-baseline md:items-start">
            <span class="font-display text-2xl tracking-tight group-hover:text-[var(--accent)] transition-colors">{{ item.year }}</span>
            <span class="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">{{ item.category }}</span>
          </div>
          <div class="md:col-span-9 space-y-3">
            <h3 class="font-display text-xl font-medium tracking-tight">{{ item.title }}</h3>
            <p class="text-[var(--text-secondary)] leading-relaxed max-w-2xl">{{ item.description }}</p>
            @if (item.tech && item.tech.length > 0) {
              <ul class="flex flex-wrap gap-2 pt-2">
                @for (t of item.tech; track t) { <li class="tag">{{ t }}</li> }
              </ul>
            }
          </div>
        </li>
      }
    </ol>
  `
})
export class JourneyTimelineComponent {
  readonly milestones = input.required<JourneyMilestone[]>();
}
