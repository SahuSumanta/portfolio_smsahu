import { Component, input } from '@angular/core';
import { JourneyMilestone } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-journey-timeline',
  template: `
    <div class="relative border-l-2 border-[#242428] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
      @for (item of milestones(); track item.id; let isLast = $last) {
        <div class="relative group">
          <!-- Timeline Node Dot -->
          <span class="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#131316] border-2 border-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:scale-125 transition-all duration-300"></span>

          <!-- Content Box -->
          <div class="bg-[#131316] border border-[#242428] rounded-2xl p-6 sm:p-8 hover:border-[#3B82F6]/40 hover:bg-[#1C1C21] transition-all duration-300 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#242428]/80 pb-4">
              <span class="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-mono font-bold border border-[#3B82F6]/20">
                {{ item.year }}
              </span>
              <span class="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Phase: {{ item.category }}
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] group-hover:text-[#3B82F6] transition-colors">
              {{ item.title }}
            </h3>

            <p class="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              {{ item.description }}
            </p>

            @if (item.tech && item.tech.length > 0) {
              <div class="flex flex-wrap gap-1.5 pt-2">
                @for (t of item.tech; track t) {
                  <span class="px-2.5 py-1 rounded bg-[#0B0B0C] text-[11px] font-mono text-[#A1A1AA] border border-[#242428]">
                    {{ t }}
                  </span>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class JourneyTimelineComponent {
  readonly milestones = input.required<JourneyMilestone[]>();
}
