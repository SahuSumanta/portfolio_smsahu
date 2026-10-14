import { Component, input } from '@angular/core';
import { ValueCard } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-value-card',
  template: `
    <div class="h-full border-t border-[var(--border)] pt-6 space-y-3 group">
      <p class="eyebrow eyebrow-plain text-[var(--accent)]">{{ value().tagline }}</p>
      <h3 class="font-display text-2xl font-medium tracking-tight">{{ value().title }}</h3>
      <p class="text-[var(--text-secondary)] leading-relaxed">{{ value().description }}</p>
    </div>
  `
})
export class ValueCardComponent {
  readonly value = input.required<ValueCard>();
}
