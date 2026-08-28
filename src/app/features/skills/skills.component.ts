import { Component, inject, signal, computed } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { CertificationCardComponent } from '../../shared/components/certification-card/certification-card.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [SearchBoxComponent, SkillCardComponent, CertificationCardComponent, ScrollRevealDirective],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-24 overflow-x-hidden">
      <!-- Minimal Header -->
      <header class="space-y-6 max-w-4xl border-b border-[var(--border)] pb-16">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-[var(--accent)] tracking-tighter leading-[1.1]">
          Skills & Mastery
        </h1>

        <p class="text-lg md:text-2xl text-[var(--text-primary)]/60 font-sans font-light leading-relaxed max-w-3xl">
          An interactive map of core architectural domains, mapped directly to production case studies and real-world system architecture.
        </p>
      </header>

      <!-- Interactive Search & Filter HUD -->
      <section class="space-y-8">
        <div class="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div class="w-full md:max-w-md">
            <app-search-box
              [value]="searchQuery()"
              [placeholder]="'Search skills (e.g. Angular, Node.js)...'"
              (searchChange)="onSearchChange($event)"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              (click)="onCategorySelect('All')"
              [class]="getCategoryBtnClass('All')"
            >
              All Domains
            </button>
            @for (cat of categoryNames(); track cat) {
              <button
                type="button"
                (click)="onCategorySelect(cat)"
                [class]="getCategoryBtnClass(cat)"
              >
                {{ cat }}
              </button>
            }
          </div>
        </div>
      </section>

      <!-- Filtered Technology Constellation Grid -->
      <section appScrollReveal direction="up" class="space-y-24">
        @for (group of filteredCategories(); track group.id) {
          @if (group.skills.length > 0) {
            <div class="space-y-12">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
                <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">{{ group.name }}</h2>
                <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">{{ group.skills.length }} Skills</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                @for (skill of group.skills; track skill.name) {
                  <app-skill-card [skill]="skill" />
                }
              </div>
            </div>
          }
        }
      </section>

      <!-- Active Study Topics & Continuous Growth -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Currently Learning</h2>
          <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Active R&D Topics</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          @for (learn of currentlyLearning(); track learn.name) {
            <div class="space-y-4">
              <span class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4 block">{{ learn.progress }}</span>
              <h4 class="text-lg font-medium text-[var(--accent)] font-display">{{ learn.name }}</h4>
              <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">{{ learn.focusArea }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Credentials & Recognition -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Credentials</h2>
          <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Verified Certifications</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          @for (cert of certifications(); track cert.id) {
            <app-certification-card [item]="cert" />
          }
        </div>
      </section>
    </div>
  `
})
export class SkillsComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('All');

  readonly allCategories = this.portfolioService.skills;
  readonly currentlyLearning = this.portfolioService.currentlyLearning;
  readonly certifications = this.portfolioService.certifications;

  readonly categoryNames = computed(() => {
    return this.allCategories().map(c => c.name);
  });

  readonly filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const selCat = this.selectedCategory();

    return this.allCategories()
      .filter(c => selCat === 'All' || c.name === selCat)
      .map(c => ({
        ...c,
        skills: c.skills.filter(s => {
          if (!query) return true;
          return s.name.toLowerCase().includes(query) ||
            s.projectsUsedIn.some(p => p.toLowerCase().includes(query)) ||
            s.relatedTechnologies.some(r => r.toLowerCase().includes(query));
        })
      }))
      .filter(c => c.skills.length > 0);
  });

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  onCategorySelect(cat: string): void {
    this.selectedCategory.set(cat);
  }

  getCategoryBtnClass(cat: string): string {
    const base = 'px-4 py-2 text-xs font-sans uppercase tracking-widest transition-colors cursor-pointer';
    if (this.selectedCategory() === cat) {
      return `${base} text-[var(--text-primary)] border-b border-white`;
    }
    return `${base} text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] border-b border-transparent hover:border-[var(--border)]`;
  }
}
