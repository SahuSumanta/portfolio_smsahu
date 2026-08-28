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
            <h3 class="text-xl md:text-2xl font-display font-medium text-[var(--accent)] flex flex-wrap items-center gap-3">
              {{ item().roleTitle }}
              @if (item().current) {
                <span class="px-2 py-0.5 rounded text-[10px] font-sans text-[var(--text-primary)]/40 border border-[var(--border)] uppercase tracking-widest">
                  Current
                </span>
              }
            </h3>
            <div class="text-[var(--text-primary)]/60 font-sans text-lg mt-1">{{ item().company }}</div>
          </div>
        </div>

        <div class="text-left md:text-right font-sans text-sm text-[var(--text-primary)]/40 space-y-1 mt-1">
          <div>{{ item().startDate }} — {{ item().endDate || 'Present' }}</div>
          <div>{{ item().location }}</div>
        </div>
      </div>

      <!-- Key Highlights -->
      <div class="space-y-3 pl-0 md:pl-16">
        @for (high of item().highlights; track high) {
          <p class="text-base text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
            {{ high }}
          </p>
        }
      </div>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-2 pt-6 pl-0 md:pl-16">
        @for (tech of item().techStack; track tech) {
          <span class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border border-[var(--border)] px-3 py-1 rounded-full">
            {{ tech }}
          </span>
        }
      </div>

    </div>
  `
})
export class ExperienceCardComponent {
  readonly item = input.required<ExperienceItem>();
}
