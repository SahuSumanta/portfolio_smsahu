import { Component, input } from '@angular/core';
import { CurrentlyBuildingItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-building-card',
  template: `
    <div class="h-full surface-elevated p-7 md:p-9 space-y-6">
      <div class="flex items-center justify-between gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
        <span class="inline-flex items-center gap-2 text-[var(--accent)]">
          <i class="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"></i>{{ item().status }}
        </span>
        <span class="text-[var(--text-tertiary)]">{{ item().estimatedCompletion }}</span>
      </div>
      <h3 class="font-display text-2xl font-medium tracking-tight">{{ item().name }}</h3>
      <p class="text-[var(--text-secondary)] leading-relaxed">{{ item().description }}</p>
      <div>
        <p class="eyebrow eyebrow-plain mb-2">Current focus</p>
        <p class="text-[var(--text-primary)]/90">{{ item().currentMilestone }}</p>
      </div>
      <ul class="flex flex-wrap gap-2">
        @for (tech of item().techStack; track tech) { <li class="tag">{{ tech }}</li> }
      </ul>
    </div>
  `
})
export class BuildingCardComponent {
  readonly item = input.required<CurrentlyBuildingItem>();
}
