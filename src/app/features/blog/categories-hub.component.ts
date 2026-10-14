import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-categories-hub',
  imports: [RouterLink, ArticleCardComponent],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 space-y-20">
      <nav class="flex items-center justify-between border-b border-[var(--border)] pb-6">
        <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <span>← Back to Publications Hub</span>
        </a>
      </nav>

      <header class="space-y-4 max-w-3xl">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-wider font-bold">Taxonomy & Domains</span>
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight">Engineering Categories</h1>
        <p class="text-base text-[var(--text-secondary)]">Browse verified technical publications categorized by core engineering domains.</p>
      </header>

      <!-- Category Selector Pills -->
      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          (click)="selectCategory('All')"
          [class]="getBtnClass('All')"
        >
          All Domains ({{ allArticles().length }})
        </button>
        @for (cat of categories(); track cat) {
          <button
            type="button"
            (click)="selectCategory(cat)"
            [class]="getBtnClass(cat)"
          >
            {{ cat }} ({{ getCount(cat) }})
          </button>
        }
      </div>

      <!-- Articles Grid -->
      <section class="space-y-8">
        <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">
          Publications in <span class="text-[var(--accent)]">{{ activeCategory() }}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (art of filteredArticles(); track art.id) {
            <app-article-card [article]="art" />
          }
        </div>
      </section>
    </div>
  `
})
export class CategoriesHubComponent {
  private readonly blogService = inject(BlogService);

  readonly activeCategory = signal<string>('All');
  readonly categories = this.blogService.allCategories;
  readonly allArticles = this.blogService.articles;

  readonly filteredArticles = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') return this.allArticles();
    return this.allArticles().filter(a => a.categories.includes(cat));
  });

  selectCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  getCount(cat: string): number {
    return this.allArticles().filter(a => a.categories.includes(cat)).length;
  }

  getBtnClass(cat: string): string {
    const base = 'px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border';
    if (this.activeCategory() === cat) {
      return `${base} bg-[var(--accent)] text-[var(--text-primary)] border-[var(--accent)] shadow-md`;
    }
    return `${base} bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border)]`;
  }
}
