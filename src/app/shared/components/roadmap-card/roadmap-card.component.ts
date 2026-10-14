import { Component, input } from '@angular/core';
import { RoadmapItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-roadmap-card',
  template: `
    <div class="h-full bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 sm:p-8 hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        <!-- Header Tags -->
        <div class="flex items-center justify-between gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold border"
            [class]="getStatusClasses(item().status)"
          >
            {{ item().status }}
          </span>
          <span class="text-xs font-mono text-[var(--text-secondary)]">
            Target: {{ item().targetQuarter }}
          </span>
        </div>

        <div class="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
          Category: {{ item().category }}
        </div>

        <h3 class="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
          {{ item().title }}
        </h3>

        <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
          {{ item().description }}
        </p>
      </div>
    </div>
  `
})
export class RoadmapCardComponent {
  readonly item = input.required<RoadmapItem>();

  getStatusClasses(status: string): string {
    switch (status) {
      case 'In Progress':
        return 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30';
      case 'Planned':
        return 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30';
      default:
        return 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30';
    }
  }
}
