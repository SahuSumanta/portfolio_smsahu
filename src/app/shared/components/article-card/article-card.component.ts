import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogArticle } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="['/blog', article().slug]"
      class="group h-full flex flex-col cursor-pointer"
    >
      <!-- Minimalist Thumbnail -->
      <div class="aspect-[4/3] bg-[var(--border)] overflow-hidden rounded-sm relative mb-6">
        <img
          [src]="article().thumbnailUrl"
          [alt]="article().title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <!-- Content -->
      <div class="flex flex-col flex-1 justify-between">
        <div class="space-y-4">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-xs font-sans text-white/40 uppercase tracking-widest">
              <span>{{ article().categories[0] }}</span>
              <span class="opacity-50">•</span>
              <span>{{ article().publishedAt }}</span>
            </div>
          </div>

          <h3 class="text-xl md:text-2xl font-display font-medium text-white group-hover:opacity-70 transition-opacity">
            {{ article().title }}
          </h3>

          <p class="text-sm text-white/60 font-sans font-light leading-relaxed line-clamp-3">
            {{ article().summary }}
          </p>
        </div>

        <!-- Footer Info -->
        <div class="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between text-xs font-sans text-white/40 uppercase tracking-widest">
          <span>{{ article().readingTimeMin }} min read</span>
          <span class="group-hover:text-white transition-colors">Read ↗</span>
        </div>
      </div>
    </a>
  `
})
export class ArticleCardComponent {
  readonly article = input.required<BlogArticle>();
}
