import { Component, input } from '@angular/core';
import { SkillItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-skill-card',
  template: `
    <div class="py-6 border-b border-[var(--border)] group">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 class="text-xl md:text-2xl font-display font-medium text-white flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            {{ skill().name }}
            <span class="text-sm font-sans text-white/40 uppercase tracking-widest font-normal">
              {{ skill().category }}
            </span>
          </h3>
        </div>

        <span class="text-sm font-sans text-white/60 shrink-0">
          {{ skill().yearsExp }} yrs
        </span>
      </div>

      <!-- Confidence Level Gauge (Minimalist text) -->
      <div class="flex items-center gap-4 mb-6">
        <span class="text-xs font-sans text-white/40 uppercase tracking-widest">Mastery</span>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
          <span class="text-sm font-medium font-sans text-white">{{ skill().confidenceLevel }}%</span>
        </div>
      </div>

      <!-- Production Projects Used In -->
      @if (skill().projectsUsedIn && skill().projectsUsedIn.length > 0) {
        <div class="mb-4">
          <div class="text-xs font-sans text-white/40 uppercase tracking-widest mb-2">Projects</div>
          <div class="flex flex-wrap gap-2">
            @for (proj of skill().projectsUsedIn; track proj) {
              <span class="px-2 py-1 rounded bg-white/5 text-white/80 border border-white/10 text-[10px] font-sans uppercase tracking-widest">
                {{ proj }}
              </span>
            }
          </div>
        </div>
      }

      <!-- Related Stack -->
      @if (skill().relatedTechnologies && skill().relatedTechnologies.length > 0) {
        <div class="pt-4 border-t border-transparent">
          <div class="text-xs font-sans text-white/40 uppercase tracking-widest mb-2">Related</div>
          <div class="flex flex-wrap gap-2">
            @for (rel of skill().relatedTechnologies; track rel) {
              <span class="px-2 py-1 rounded border border-[var(--border)] text-white/60 text-[10px] font-sans uppercase tracking-widest">
                {{ rel }}
              </span>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class SkillCardComponent {
  readonly skill = input.required<SkillItem>();
}
