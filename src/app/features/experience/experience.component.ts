import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ExperienceCardComponent } from '../../shared/components/experience-card/experience-card.component';
import { ResumeBannerComponent } from '../../shared/components/resume-banner/resume-banner.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [ExperienceCardComponent, ResumeBannerComponent, ScrollRevealDirective],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-24 overflow-x-hidden">
      <!-- Minimal Header -->
      <header appScrollReveal direction="up" class="space-y-6 max-w-4xl border-b border-[var(--border)] pb-16">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-white tracking-tighter leading-[1.1]">
          Experience
        </h1>

        <p class="text-lg md:text-2xl text-white/60 font-sans font-light leading-relaxed max-w-3xl">
          A verifiable record of systems leadership, distributed cloud infrastructure scaling, and design-system-first web architecture across high-growth technology organizations.
        </p>
      </header>

      <!-- Experience Timeline -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-transparent">
        <div class="space-y-16">
          @for (exp of experience(); track exp.id) {
            <app-experience-card [item]="exp" />
          }
        </div>
      </section>

      <!-- Resume Banner -->
      <section appScrollReveal direction="up" class="pt-12 border-t border-[var(--border)]">
        <app-resume-banner [profile]="resumeProfile()" />
      </section>
    </div>
  `
})
export class ExperienceComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly experience = this.portfolioService.experience;
  readonly resumeProfile = this.portfolioService.resumeProfile;
}
