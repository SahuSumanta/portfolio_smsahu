import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { JourneyTimelineComponent } from '../../shared/components/journey-timeline/journey-timeline.component';
import { ValueCardComponent } from '../../shared/components/value-card/value-card.component';
import { BuildingCardComponent } from '../../shared/components/building-card/building-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLink, JourneyTimelineComponent, ValueCardComponent, BuildingCardComponent, PageHeaderComponent, ScrollRevealDirective],
  template: `
    <app-page-header
      eyebrow="About"
      title="Engineering with scalability and "
      accent="craftsmanship."
    />

    <div class="container-x space-y-[var(--section-y)] py-16 md:py-28">

      <!-- Bio -->
      <section class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div class="lg:col-span-4" appScrollReveal direction="scale">
          <div class="frame relative">
            <img src="assets/profile-picture.png" alt="Portrait of Sumanta Sahu" width="800" height="1000" loading="lazy" decoding="async"
              class="w-full aspect-[4/5] object-cover" style="filter:grayscale(1) contrast(1.05) brightness(.92)" />
            <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(180deg,transparent 40%,rgba(120,13,39,.6));mix-blend-mode:multiply"></div>
          </div>
        </div>
        <div class="lg:col-span-8 space-y-8" appScrollReveal>
          <p class="statement-sm">
            I'm Sumanta Sahu — an engineer with four-plus years bridging scalable backend systems with declarative, component-driven web and mobile architectures in <span class="serif-em">Angular and Ionic.</span>
          </p>
          <p class="lead max-w-2xl">
            Based in Pune, India. I care about the parts of software people rarely see — state management, boundaries, accessibility, reliability — because they decide how a product feels long after launch.
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a routerLink="/contact" class="btn btn-primary">Get in touch <span class="arrow">→</span></a>
            <a routerLink="/resume" class="btn btn-ghost">View resume</a>
          </div>
        </div>
      </section>

      <!-- Journey -->
      <section class="grid lg:grid-cols-12 gap-x-10 gap-y-10" appScrollReveal>
        <header class="lg:col-span-4">
          <p class="eyebrow mb-6">Journey</p>
          <h2 class="h-section">Career <span class="serif-em">timeline.</span></h2>
        </header>
        <div class="lg:col-span-8"><app-journey-timeline [milestones]="milestones()" /></div>
      </section>

      <!-- Philosophy -->
      <section class="grid lg:grid-cols-12 gap-x-10 gap-y-10" appScrollReveal>
        <header class="lg:col-span-4">
          <p class="eyebrow mb-6">Philosophy</p>
          <h2 class="h-section">How I <span class="serif-em">think.</span></h2>
          <p class="text-[var(--text-secondary)] mt-6 max-w-xs leading-relaxed">How I approach technical ambiguity, architectural boundaries and product execution.</p>
        </header>
        <ol class="lg:col-span-8 border-t border-[var(--border)]">
          @for (p of philosophy; track p.n) {
            <li class="grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 border-b border-[var(--border)]">
              <span class="md:col-span-2 font-mono text-xs tracking-[0.14em] text-[var(--text-tertiary)] uppercase">{{ p.n }} / {{ p.tag }}</span>
              <div class="md:col-span-10 space-y-3">
                <h3 class="font-display text-xl font-medium tracking-tight">{{ p.title }}</h3>
                <p class="text-[var(--text-secondary)] leading-relaxed max-w-2xl">{{ p.body }}</p>
              </div>
            </li>
          }
        </ol>
      </section>

      <!-- Working style -->
      <section class="grid lg:grid-cols-12 gap-x-10 gap-y-10" appScrollReveal>
        <header class="lg:col-span-4">
          <p class="eyebrow mb-6">Working style</p>
          <h2 class="h-section">Standards I <span class="serif-em">hold.</span></h2>
        </header>
        <div class="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-12">
          @for (w of workingStyle; track w.tag) {
            <div class="border-t border-[var(--border)] pt-6 space-y-3">
              <p class="eyebrow eyebrow-plain text-[var(--accent)]">{{ w.tag }}</p>
              <h3 class="font-display text-xl font-medium tracking-tight">{{ w.title }}</h3>
              <p class="text-[var(--text-secondary)] text-sm leading-relaxed">{{ w.body }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Values -->
      <section class="space-y-12" appScrollReveal>
        <header class="max-w-2xl">
          <p class="eyebrow mb-6">Values</p>
          <h2 class="h-section">What I <span class="serif-em">optimize for.</span></h2>
        </header>
        <div class="grid sm:grid-cols-2 gap-x-10 gap-y-12">
          @for (val of values(); track val.id) { <app-value-card [value]="val" /> }
        </div>
      </section>

      <!-- Now -->
      <section class="grid lg:grid-cols-12 gap-x-10 gap-y-10" appScrollReveal>
        <header class="lg:col-span-4">
          <p class="eyebrow mb-6">Now</p>
          <h2 class="h-section">Currently <span class="serif-em">building.</span></h2>
        </header>
        <div class="lg:col-span-8 space-y-10">
          @for (cb of currentlyBuilding(); track cb.id) { <app-building-card [item]="cb" /> }
          <div class="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            @for (bc of beyondCode(); track bc.id) {
              <div class="border-t border-[var(--border)] pt-6 space-y-2">
                <p class="eyebrow eyebrow-plain">{{ bc.tag }}</p>
                <h3 class="font-display text-lg font-medium tracking-tight">{{ bc.title }}</h3>
                <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ bc.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .statement-sm { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.03em; line-height: 1.15; font-size: clamp(1.6rem, 1rem + 2.2vw, 2.6rem); text-wrap: pretty; }
  `]
})
export class AboutComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly milestones = this.portfolioService.journeyMilestones;
  readonly values = this.portfolioService.values;
  readonly currentlyBuilding = this.portfolioService.currentlyBuilding;
  readonly beyondCode = this.portfolioService.beyondCode;

  readonly philosophy = [
    { n: '01', tag: 'First principles', title: 'First-principles problem solving', body: "I believe in understanding the core constraints of a problem before writing code. Whether it's optimizing a slow API query or refining a complex UI flow, I start with the foundation." },
    { n: '02', tag: 'State discipline', title: 'Declarative & reactive state', body: 'Using reactive programming patterns like RxJS and NgRx, I keep complex frontend applications predictable, maintainable, and free of race conditions.' },
    { n: '03', tag: 'Product velocity', title: 'Product-minded engineering', body: 'Code is a means to an end. The goal is software that solves real user problems, improves business outcomes, and scales gracefully with demand.' }
  ];

  readonly workingStyle = [
    { tag: 'Communication', title: 'Asynchronous & RFC-driven', body: 'I prioritize written design documents and architectural RFCs over unnecessary synchronous meetings.' },
    { tag: 'Code reviews', title: 'Empathy & rigor', body: 'Reviews focus on architectural boundaries, security, and test coverage — never subjective stylistic trivia.' },
    { tag: 'Accessibility', title: 'Inclusive from day one', body: 'Accessibility is not a post-release patch. ARIA attributes, keyboard paths, and contrast are part of the build.' },
    { tag: 'Ownership', title: 'End-to-end accountability', body: 'From local development setup to production alerts, I own the lifecycle of my code.' }
  ];
}
