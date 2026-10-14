import { Component, inject, signal, computed } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { FilterBarComponent, ProjectSortOption } from '../../shared/components/filter-bar/filter-bar.component';
import { ProjectGridComponent } from '../../shared/components/project-grid/project-grid.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [FilterBarComponent, ProjectGridComponent, ScrollRevealDirective, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Projects"
      title="Work that ships, "
      accent="engineered carefully."
      lead="Enterprise platforms, IoT interfaces and AI-enabled products — each with the problem it solved and the engineering behind it."
    />

    <div class="container-x py-16 md:py-24">
      <section appScrollReveal direction="up" class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 class="h-section">All projects</h2>
          <span class="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
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
