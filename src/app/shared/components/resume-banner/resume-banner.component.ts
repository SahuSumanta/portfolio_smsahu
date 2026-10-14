import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResumeProfile } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-resume-banner',
  imports: [RouterLink],
  template: `
    <section class="relative isolate overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12" aria-labelledby="resume-title">
      <div class="glow -z-10" style="width:30rem;height:30rem;right:-10rem;top:-14rem;background:var(--accent-deep);opacity:.55"></div>
      <p class="eyebrow mb-6">Resume · {{ profile().lastUpdated }}</p>
      <h2 id="resume-title" class="h-section max-w-[18ch]">The full record, <span class="serif-em">in one page.</span></h2>
      <p class="text-[var(--text-secondary)] max-w-xl mt-6 leading-relaxed">{{ profile().previewText }}</p>
      <div class="flex flex-wrap items-center gap-4 mt-10">
        <a routerLink="/resume" class="btn btn-primary">View resume <span class="arrow">→</span></a>
        <a [href]="profile().pdfUrl" download="Sumanta_Sahu_Resume.pdf" class="btn btn-ghost">Download PDF</a>
        <button type="button" (click)="onPrint()" class="link-muted text-sm cursor-pointer ml-2">Print</button>
        <button type="button" (click)="onShare()" class="link-muted text-sm cursor-pointer">Share</button>
      </div>
    </section>
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
          title: 'Sumanta Sahu — Software Engineer',
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
