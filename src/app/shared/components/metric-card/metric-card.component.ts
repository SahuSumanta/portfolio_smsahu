import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  template: `
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)]/40 hover:bg-[var(--surface-hover)] transition-all duration-300 flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-2">
        <span>{{ label() }}</span>
        @if (badgeText()) {
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20">
            {{ badgeText() }}
          </span>
        }
      </div>

      <div class="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] my-1">
        {{ value() }}
      </div>

      @if (description()) {
        <p class="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
          {{ description() }}
        </p>
      }
    </div>
  `,
  host: {
    class: 'block'
  }
})
export class MetricCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly description = input<string>('');
  readonly badgeText = input<string>('');
}
