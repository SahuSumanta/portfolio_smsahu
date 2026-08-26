import { Component, inject, signal, computed } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { FilterBarComponent, ProjectSortOption } from '../../shared/components/filter-bar/filter-bar.component';
import { ProjectGridComponent } from '../../shared/components/project-grid/project-grid.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [FilterBarComponent, ProjectGridComponent, ProjectCardComponent, ScrollRevealDirective],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-24 overflow-x-hidden">
      <!-- Minimal Header -->
      <header appScrollReveal direction="up" class="space-y-6 max-w-4xl border-b border-[var(--border)] pb-16">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-[var(--text-primary)] tracking-tighter leading-[1.1]">
          Projects
        </h1>

        <p class="text-lg md:text-2xl text-[var(--text-primary)]/60 font-sans font-light leading-relaxed max-w-3xl">
          Deep architectural dives into distributed systems, event processing pipelines, and structured frontend applications.
        </p>
      </header>

      <!-- Highlighted Flagship Showcases Section -->
      @if (featuredProjects().length > 0 && selectedCategory() === 'All' && !searchQuery() && !selectedTech()) {
        <section appScrollReveal direction="up" class="space-y-12">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
            <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Flagship Work</h2>
            <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Selected Showcases</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            @for (project of featuredProjects(); track project.id) {
              <div class="h-full">
                <app-project-card [project]="project" />
              </div>
            }
          </div>
        </section>
      }

      <!-- Complete Repository -->
      <section appScrollReveal direction="up" class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">All Engineering Projects</h2>
          <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
            Showing {{ filteredProjects().length }} of {{ allProjects().length }}
          </span>
        </div>

        <app-filter-bar
          [searchQuery]="searchQuery()"
          [selectedCategory]="selectedCategory()"
          [selectedTech]="selectedTech()"
          [selectedSort]="selectedSort()"
          [categories]="categories()"
          [availableTechs]="availableTechs()"
          [totalCount]="allProjects().length"
          [categoryCounts]="categoryCounts()"
          (searchChange)="onSearchChange($event)"
          (categoryChange)="onCategoryChange($event)"
          (techChange)="onTechChange($event)"
          (sortChange)="onSortChange($event)"
        />

        <!-- Main Projects Grid -->
        <app-project-grid
          [projects]="filteredProjects()"
          [loading]="loading()"
          (resetFilters)="resetFilters()"
        />
      </section>
    </div>
  `
})
export class ProjectsComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('All');
  readonly selectedTech = signal<string>('');
  readonly selectedSort = signal<ProjectSortOption>('featured');
  readonly loading = signal<boolean>(false);

  readonly allProjects = this.portfolioService.projects;
  readonly featuredProjects = this.portfolioService.featuredProjects;

  readonly categories = computed(() => {
    const set = new Set<string>();
    this.allProjects().forEach(p => set.add(p.category));
    return Array.from(set);
  });

  readonly availableTechs = computed(() => {
    const set = new Set<string>();
    this.allProjects().forEach(p => p.techStack.forEach(t => set.add(t)));
    return Array.from(set).sort();
  });

  readonly categoryCounts = computed(() => {
    const counts: Record<string, number> = { All: this.allProjects().length };
    this.allProjects().forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  });

  readonly filteredProjects = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const tech = this.selectedTech();
    const sort = this.selectedSort();

    let list = this.allProjects().filter(p => {
      const matchCat = cat === 'All' || p.category === cat;
      const matchTech = !tech || p.techStack.includes(tech);
      const matchQuery = !query ||
        p.title.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.techStack.some(t => t.toLowerCase().includes(query)) ||
        (p.caseStudy?.problemStatement.toLowerCase().includes(query) ?? false);

      return matchCat && matchTech && matchQuery;
    });

    // Sort list
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'featured':
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return b.completionYear - a.completionYear;
        case 'newest':
          return b.completionYear - a.completionYear;
        case 'oldest':
          return a.completionYear - b.completionYear;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
      }
    });

    return list;
  });

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  onCategoryChange(cat: string): void {
    this.selectedCategory.set(cat);
  }

  onTechChange(tech: string): void {
    this.selectedTech.set(tech);
  }

  onSortChange(sort: ProjectSortOption): void {
    this.selectedSort.set(sort);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('All');
    this.selectedTech.set('');
    this.selectedSort.set('featured');
  }
}
