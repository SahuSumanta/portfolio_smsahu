import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-blog-home',
  imports: [RouterLink, ArticleCardComponent],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-24 overflow-x-hidden">
      <!-- Header -->
      <header class="space-y-6 max-w-4xl border-b border-[var(--border)] pb-16">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-[var(--text-primary)] tracking-tighter leading-[1.1]">
          Blog
        </h1>
        <p class="text-lg md:text-2xl text-[var(--text-primary)]/60 font-sans font-light leading-relaxed max-w-3xl">
          Essays, architectural RFCs, and performance benchmarks exploring full stack development.
        </p>
      </header>

      <!-- Featured Article -->
      @if (featuredArticle(); as feat) {
        <section class="space-y-12">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
            <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Featured Post</h2>
            <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Editors' Choice</span>
          </div>

          <a [routerLink]="['/blog', feat.slug]" class="grid grid-cols-1 lg:grid-cols-2 gap-12 group">
            <div class="aspect-[4/3] bg-[var(--border)] overflow-hidden rounded-sm relative">
              <img
                [src]="feat.coverUrl"
                [alt]="feat.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="flex flex-col justify-center space-y-6">
              <div class="space-y-2 text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
                <span>{{ feat.categories[0] }}</span>
                <span class="px-2">•</span>
                <span>{{ feat.publishedAt }}</span>
              </div>
              <h3 class="text-3xl sm:text-5xl font-display font-medium text-[var(--text-primary)] group-hover:opacity-70 transition-opacity">
                {{ feat.title }}
              </h3>
              <p class="text-lg text-[var(--text-primary)]/60 font-sans font-light leading-relaxed max-w-lg">
                {{ feat.summary }}
              </p>
              <div class="pt-6 mt-6 border-t border-[var(--border)] text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
                Read Article ↗
              </div>
            </div>
          </a>
        </section>
      }

      <!-- All Articles -->
      <section class="space-y-12 border-t border-[var(--border)] pt-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">All Posts</h2>
          <span class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">{{ filteredArticles().length }} Articles</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          @for (art of filteredArticles(); track art.id) {
            <app-article-card [article]="art" />
          }
        </div>
      </section>
    </div>
  `
})
export class BlogHomeComponent {
  private readonly blogService = inject(BlogService);

  readonly featuredArticle = this.blogService.featuredArticle;
  
  readonly filteredArticles = computed(() => {
    let list = this.blogService.articles();
    list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    return list;
  });
}
