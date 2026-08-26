import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  template: `
    <div class="bg-[#131316] border border-[#242428] rounded-xl p-5 hover:border-[#3B82F6]/40 hover:bg-[#1C1C21] transition-all duration-300 flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
        <span>{{ label() }}</span>
        @if (badgeText()) {
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
            {{ badgeText() }}
          </span>
        }
      </div>

      <div class="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] my-1">
        {{ value() }}
      </div>

      @if (description()) {
        <p class="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
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
