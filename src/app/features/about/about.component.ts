import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { JourneyTimelineComponent } from '../../shared/components/journey-timeline/journey-timeline.component';
import { ValueCardComponent } from '../../shared/components/value-card/value-card.component';
import { RoadmapCardComponent } from '../../shared/components/roadmap-card/roadmap-card.component';
import { BuildingCardComponent } from '../../shared/components/building-card/building-card.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [
    JourneyTimelineComponent,
    ValueCardComponent,
    BuildingCardComponent,
    ScrollRevealDirective
  ],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-32 overflow-x-hidden">
      
      <!-- Minimalist Bio -->
      <section class="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-[var(--accent)] tracking-tighter leading-[1.1]">
          Engineering with Scalability & Craftsmanship.
        </h1>

        <p class="text-lg md:text-2xl text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
          I am Sumanta Sahu — an engineering professional with 4+ years bridging scalable backend systems with declarative, token-driven web and mobile architectures (Angular / Ionic). Based in Pune, India.
        </p>
      </section>

      <!-- Engineering Timeline -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Career Timeline</h2>
          <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">4+ Years of Systems Evolution</span>
        </div>
        <app-journey-timeline [milestones]="milestones()" />
      </section>

      <!-- Engineering Philosophy -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="max-w-3xl space-y-6">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Engineering Philosophy</h2>
          <p class="text-lg text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
            How I approach complex technical ambiguity, architectural boundaries, distributed consensus, and product execution.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">01 / First Principles</div>
            <h3 class="text-xl font-display font-medium text-[var(--accent)]">First-Principles Problem Solving</h3>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
              I believe in understanding the core constraints of a problem before writing code. Whether it's optimizing a slow API query or refining a complex UI flow, I start with the foundation.
            </p>
          </div>
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">02 / State Discipline</div>
            <h3 class="text-xl font-display font-medium text-[var(--accent)]">Declarative & Reactive State</h3>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
              Using reactive programming patterns (like RxJS and NgRx), I ensure that complex frontend applications remain predictable, maintainable, and free of race conditions.
            </p>
          </div>
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">03 / Product Velocity</div>
            <h3 class="text-xl font-display font-medium text-[var(--accent)]">Product-Minded Engineering</h3>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
              Code is a means to an end. My ultimate goal is to deliver software that solves real user problems, improves business metrics, and scales gracefully with demand.
            </p>
          </div>
        </div>
      </section>

      <!-- Working Style & Standards -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="max-w-3xl space-y-6">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Working Style</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-8">
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">01 / Communication</div>
            <h4 class="text-lg font-medium text-[var(--accent)] font-display">Asynchronous & RFC-Driven</h4>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">I prioritize written design documents and architectural RFCs over unnecessary synchronous meetings.</p>
          </div>
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">02 / Code Reviews</div>
            <h4 class="text-lg font-medium text-[var(--accent)] font-display">Empathy & Rigor</h4>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">Reviews focus on architectural boundaries, security, and test coverage, never subjective stylistic trivia.</p>
          </div>
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">03 / Accessibility</div>
            <h4 class="text-lg font-medium text-[var(--accent)] font-display">Inclusive Day One</h4>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">Accessibility is not a post-release patch. ARIA attributes, keyboard traps, and contrast are automated in CI.</p>
          </div>
          <div class="space-y-4">
            <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">04 / Ownership</div>
            <h4 class="text-lg font-medium text-[var(--accent)] font-display">End-to-End Accountability</h4>
            <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">From local development container setup to production pager alerts, I own the lifecycle of my code.</p>
          </div>
        </div>
      </section>

      <!-- Core Values -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Core Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          @for (val of values(); track val.id) {
            <app-value-card [value]="val" />
          }
        </div>
      </section>

      <!-- Active R&D / What's Next -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Currently Building</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          @for (cb of currentlyBuilding(); track cb.id) {
            <app-building-card [item]="cb" />
          }
        </div>
      </section>

      <!-- Beyond Code -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Beyond Code</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          @for (bc of beyondCode(); track bc.id) {
            <div class="space-y-4">
              <span class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4 block">{{ bc.tag }}</span>
              <h4 class="text-lg font-medium text-[var(--accent)] font-display">{{ bc.title }}</h4>
              <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">{{ bc.description }}</p>
            </div>
          }
        </div>
      </section>

    </div>
  `
})
export class AboutComponent {

  private readonly portfolioService = inject(PortfolioService);

  readonly milestones = this.portfolioService.journeyMilestones;
  readonly values = this.portfolioService.values;
  readonly roadmap = this.portfolioService.roadmapItems;
  readonly currentlyBuilding = this.portfolioService.currentlyBuilding;
  readonly beyondCode = this.portfolioService.beyondCode;
}
