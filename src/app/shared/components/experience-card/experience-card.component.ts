import { Component, input, signal } from '@angular/core';
import { ExperienceItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-experience-card',
  template: `
    <div class="py-8 border-b border-[var(--border)] group">
      <!-- Header Row -->
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div class="flex items-start gap-4">
          @if (item().companyLogo) {
            <div class="w-12 h-12 rounded bg-white shrink-0 p-1.5 flex items-center justify-center">
              <img [src]="item().companyLogo" [alt]="item().company" class="w-full h-full object-contain" />
            </div>
          }
          <div>
            <h3 class="text-xl md:text-2xl font-display font-medium text-white flex flex-wrap items-center gap-3">
              {{ item().roleTitle }}
              @if (item().current) {
                <span class="px-2 py-0.5 rounded text-[10px] font-sans text-white/40 border border-white/10 uppercase tracking-widest">
                  Current
                </span>
              }
            </h3>
            <div class="text-white/60 font-sans text-lg mt-1">{{ item().company }}</div>
          </div>
        </div>

        <div class="text-left md:text-right font-sans text-sm text-white/40 space-y-1 mt-1">
          <div>{{ item().startDate }} — {{ item().endDate || 'Present' }}</div>
          <div>{{ item().location }}</div>
        </div>
      </div>

      <!-- Key Highlights -->
      <div class="space-y-3 pl-0 md:pl-16">
        @for (high of item().highlights; track high) {
          <p class="text-base text-white/60 font-sans font-light leading-relaxed">
            {{ high }}
          </p>
        }
      </div>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-2 pt-6 pl-0 md:pl-16">
        @for (tech of item().techStack; track tech) {
          <span class="text-xs font-sans text-white/40 uppercase tracking-widest border border-[var(--border)] px-3 py-1 rounded-full">
            {{ tech }}
          </span>
        }
      </div>

      <!-- Project Timeline -->
      @if (item().projectTimeline) {
        <div class="mt-8 pt-8 border-t border-[var(--border)] pl-0 md:pl-16">
          <h4 class="text-sm font-sans text-white/40 uppercase tracking-widest mb-6">Major Projects Progression</h4>
          <div class="flex flex-col md:flex-row gap-6 md:items-start relative">
            <!-- Visual Connection Line -->
            <div class="hidden md:block absolute top-6 left-0 right-0 h-px bg-[var(--border)] -z-10"></div>
            
            @for (proj of item().projectTimeline; track proj.name) {
              <div class="flex-1 space-y-3">
                <div class="w-2 h-2 rounded-full bg-white hidden md:block mt-5"></div>
                <div class="space-y-1">
                  <h5 class="text-base font-medium text-white font-display">{{ proj.name }}</h5>
                  <div class="text-xs font-sans text-white/60 font-light leading-relaxed">{{ proj.subtitle }}</div>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ExperienceCardComponent {
  readonly item = input.required<ExperienceItem>();
}
