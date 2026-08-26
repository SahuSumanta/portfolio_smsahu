import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResumeProfile } from '../../../core/models/portfolio.models';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-resume-banner',
  imports: [ButtonComponent, RouterLink],
  template: `
    <div class="bg-gradient-to-r from-[#131316] via-[#1C1C21] to-[#131316] border border-[#242428] rounded-2xl p-8 sm:p-10 space-y-8 shadow-xl">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#242428] pb-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 text-xs font-mono font-bold">
            <span>{{ profile().version }}</span>
          </div>
          <h2 class="text-3xl font-['Space_Grotesk'] font-bold text-white">Verified Engineering Curriculum Vitae</h2>
          <p class="text-sm text-[#A1A1AA] max-w-2xl">
            {{ profile().previewText }}
          </p>
        </div>

        <div class="text-left md:text-right font-mono text-xs text-[#A1A1AA]">
          <div>Last Updated: <span class="text-white">{{ profile().lastUpdated }}</span></div>
          <div class="text-[#22C55E] mt-1">✓ Cryptographically Signed PDF</div>
        </div>
      </div>

      <!-- Action Buttons Row -->
      <div class="flex flex-wrap items-center gap-4">
        <a routerLink="/resume">
          <app-button variant="primary" size="lg">
            View Official Resume
          </app-button>
        </a>
        <a [href]="profile().pdfUrl" download="Sumanta_Sahu_Resume.pdf">
          <app-button variant="secondary" size="lg">
            Download PDF
          </app-button>
        </a>

        <button type="button" (click)="onPrint()" class="inline-block">
          <app-button variant="secondary" size="lg">
            Print Format
          </app-button>
        </button>

        <button type="button" (click)="onShare()" class="inline-block">
          <app-button variant="outline" size="lg">
            Share Profile
          </app-button>
        </button>
      </div>
    </div>
  `
})
export class ResumeBannerComponent {
  readonly profile = input.required<ResumeProfile>();

  onPrint(): void {
    window.print();
  }

  async onShare(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sumanta Sahu — Principal Systems & Frontend Architect',
          url: window.location.origin
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Portfolio URL copied to clipboard!');
    }
  }
}
