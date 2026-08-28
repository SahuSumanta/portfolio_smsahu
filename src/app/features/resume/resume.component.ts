import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-resume',
  imports: [ScrollRevealDirective],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-12 overflow-x-hidden">
      <!-- Header / Action Bar -->
      <header appScrollReveal direction="up" class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border)] pb-12">
        <div>
          <h1 class="text-4xl sm:text-5xl font-display font-medium text-[var(--accent)] tracking-tighter">
            Resume
          </h1>
          <p class="text-lg text-[var(--text-primary)]/60 font-sans font-light mt-4">
            {{ profile().version }}
          </p>
        </div>
        
        <div class="flex items-center gap-4">
          <a [href]="profile().pdfUrl" download="Sumanta_Sahu_Resume.pdf" class="px-6 py-3 bg-white text-black font-medium tracking-wide text-sm hover:bg-[var(--text-primary)]/90 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download PDF
          </a>
        </div>
      </header>

      <!-- PDF Viewer -->
      <section appScrollReveal direction="up" class="w-full h-[80vh] bg-white rounded overflow-hidden">
        <object [data]="safePdfUrl" type="application/pdf" class="w-full h-full">
          <!-- Fallback if PDF plugin isn't available -->
          <div class="flex flex-col items-center justify-center h-full text-black/60 p-8 text-center space-y-4">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p>Your browser doesn't support embedded PDFs.</p>
            <a [href]="profile().pdfUrl" download="Sumanta_Sahu_Resume.pdf" class="text-black font-medium border-b border-black">
              Download the PDF instead
            </a>
          </div>
        </object>
      </section>
    </div>
  `
})
export class ResumeComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly profile = this.portfolioService.resumeProfile;
  readonly safePdfUrl: SafeResourceUrl;

  constructor() {
    // Sanitize the URL to prevent Angular from blocking it in the object tag
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.profile().pdfUrl);
  }
}
