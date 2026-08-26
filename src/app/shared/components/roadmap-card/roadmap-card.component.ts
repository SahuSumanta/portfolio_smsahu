import { Component, input } from '@angular/core';
import { RoadmapItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-roadmap-card',
  template: `
    <div class="h-full bg-[#131316] border border-[#242428] rounded-2xl p-6 sm:p-8 hover:border-[#3B82F6]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        <!-- Header Tags -->
        <div class="flex items-center justify-between gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold border"
            [class]="getStatusClasses(item().status)"
          >
            {{ item().status }}
          </span>
          <span class="text-xs font-mono text-[#A1A1AA]">
            Target: {{ item().targetQuarter }}
          </span>
        </div>

        <div class="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">
          Category: {{ item().category }}
        </div>

        <h3 class="text-xl sm:text-2xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)]">
          {{ item().title }}
        </h3>

        <p class="text-sm text-[#A1A1AA] leading-relaxed">
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
        return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30';
      case 'Planned':
        return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      default:
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30';
    }
  }
}
