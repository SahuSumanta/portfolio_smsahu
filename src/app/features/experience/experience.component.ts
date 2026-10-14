import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ExperienceCardComponent } from '../../shared/components/experience-card/experience-card.component';
import { ResumeBannerComponent } from '../../shared/components/resume-banner/resume-banner.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [ExperienceCardComponent, ResumeBannerComponent, ScrollRevealDirective, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Experience"
      title="Four years of "
      accent="enterprise product work."
      lead="From HRTech and Industrial IoT at VisionWaves to building management systems at Softdel — a record of shipping and owning real software."
    />
    <div class="container-x py-8 md:py-16">
      <section>
        @for (exp of experience(); track exp.id) {
          <div appScrollReveal direction="up"><app-experience-card [item]="exp" /></div>
        }
      </section>
      <section appScrollReveal direction="up" class="pt-16 md:pt-24">
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
