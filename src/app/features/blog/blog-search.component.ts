import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-blog-search',
  imports: [RouterLink, SearchBoxComponent, ArticleCardComponent],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 space-y-20">
      <nav class="flex items-center justify-between border-b border-[var(--border)] pb-6">
        <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <span>← Back to Publications Hub</span>
        </a>
      </nav>

      <header class="space-y-6 max-w-3xl">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-wider font-bold">Unified Knowledge Base & Search Engine</span>
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight">Search & Knowledge Hub</h1>
        <p class="text-base text-[var(--text-secondary)]">Instantly search across all published articles, architecture notes, cheat sheets, and design patterns.</p>

        <div class="pt-2">
          <app-search-box
            [value]="query()"
            [placeholder]="'Search full-text markdown, code snippets, tags, or system design notes...'"
            (searchChange)="onQueryChange($event)"
          />
        </div>
      </header>

      <!-- Knowledge Resources Section -->
      <section class="space-y-8">
        <div class="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <h2 class="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">Engineering Cheat Sheets & Architecture Notes</h2>
          <span class="text-xs font-mono text-[var(--success)]">{{ filteredResources().length }} Resources</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (res of filteredResources(); track res.id) {
            <div class="p-6 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-mono font-bold">{{ res.category }}</span>
                  <span class="text-[10px] font-mono text-[var(--text-secondary)]">{{ res.updatedDate }}</span>
                </div>
                <h4 class="text-lg font-bold text-[var(--text-primary)] font-display">{{ res.title }}</h4>
                <p class="text-xs text-[var(--text-secondary)] leading-relaxed">{{ res.summary }}</p>
              </div>

              <div class="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-primary)] leading-relaxed">
                <span class="text-[var(--accent)] font-bold">Key Spec: </span>{{ res.contentSnippet }}
              </div>

              <div class="pt-2 flex items-center justify-between text-xs font-mono">
                <span class="text-[var(--text-secondary)]">{{ res.format }}</span>
                <span class="text-[var(--success)] font-bold">Verified Spec ✓</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Matching Articles Grid -->
      <section class="space-y-8">
        <div class="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <h2 class="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">Matching Technical Essays</h2>
          <span class="text-xs font-mono text-[var(--text-secondary)]">{{ filteredArticles().length }} Articles</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (art of filteredArticles(); track art.id) {
            <app-article-card [article]="art" />
          }
        </div>
      </section>
    </div>
  `
})
export class BlogSearchComponent {
  private readonly blogService = inject(BlogService);

  readonly query = signal<string>('');
  readonly allArticles = this.blogService.articles;
  readonly allResources = this.blogService.knowledgeResources;

  readonly filteredArticles = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.allArticles();
    return this.allArticles().filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.contentMarkdown.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  readonly filteredResources = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.allResources();
    return this.allResources().filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.contentSnippet.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  onQueryChange(val: string): void {
    this.query.set(val);
  }
}
