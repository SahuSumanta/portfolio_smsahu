import { Component, input } from '@angular/core';
import { CurrentlyBuildingItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-building-card',
  template: `
    <div class="h-full bg-[#131316] border border-[#242428] rounded-2xl p-6 sm:p-8 hover:border-[#22C55E]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        <!-- Status Row -->
        <div class="flex items-center justify-between gap-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-xs font-mono text-[#22C55E]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>{{ item().status }}</span>
          </div>
          <span class="text-xs font-mono text-[#A1A1AA]">Updated: {{ item().lastUpdated }}</span>
        </div>

        <h3 class="text-2xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)]">
          {{ item().name }}
        </h3>

        <p class="text-sm text-[#A1A1AA] leading-relaxed">
          {{ item().description }}
        </p>

        <!-- Current Milestone Box -->
        <div class="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#242428] space-y-1">
          <div class="text-[11px] font-mono uppercase tracking-wider text-[#3B82F6]">Current Active Milestone</div>
          <div class="text-sm font-medium text-[var(--text-primary)]">{{ item().currentMilestone }}</div>
        </div>

        <!-- Tech Stack -->
        <div class="flex flex-wrap gap-1.5 pt-1">
          @for (tech of item().techStack; track tech) {
            <span class="px-2.5 py-1 rounded bg-[#1C1C21] text-xs font-mono text-[#A1A1AA] border border-[#242428]">
              {{ tech }}
            </span>
          }
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="space-y-2 pt-4 border-t border-[#242428]/80">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-[#A1A1AA]">Est. Completion: {{ item().estimatedCompletion }}</span>
          <span class="text-[#22C55E] font-bold">{{ item().progressPercent }}% Complete</span>
        </div>
        <div class="w-full h-2 rounded-full bg-[#0B0B0C] overflow-hidden border border-[#242428]">
          <div
            class="h-full bg-gradient-to-r from-[#3B82F6] to-[#22C55E] transition-all duration-1000"
            [style.width]="item().progressPercent + '%'"
          ></div>
        </div>
      </div>
    </div>
  `
})
export class BuildingCardComponent {
  readonly item = input.required<CurrentlyBuildingItem>();
}
