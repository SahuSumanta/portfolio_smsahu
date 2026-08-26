import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-categories-hub',
  imports: [RouterLink, ArticleCardComponent],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <nav class="flex items-center justify-between border-b border-[#242428] pb-6">
        <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-[var(--text-primary)] transition-colors">
          <span>← Back to Publications Hub</span>
        </a>
      </nav>

      <header class="space-y-4 max-w-3xl">
        <span class="text-xs font-mono text-[#3B82F6] uppercase tracking-wider font-bold">Taxonomy & Domains</span>
        <h1 class="text-4xl sm:text-5xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] tracking-tight">Engineering Categories</h1>
        <p class="text-base text-[#A1A1AA]">Browse verified technical publications categorized by core engineering domains.</p>
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
        <h2 class="text-2xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] border-b border-[#242428] pb-4">
          Publications in <span class="text-[#3B82F6]">{{ activeCategory() }}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      return `${base} bg-[#3B82F6] text-[var(--text-primary)] border-[#3B82F6] shadow-md`;
    }
    return `${base} bg-[#131316] hover:bg-[#1C1C21] text-[#A1A1AA] hover:text-[var(--text-primary)] border-[#242428]`;
  }
}
