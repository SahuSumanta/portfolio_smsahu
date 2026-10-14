import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { TagChipComponent } from '../../shared/components/tag-chip/tag-chip.component';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-tags-hub',
  imports: [RouterLink, TagChipComponent, ArticleCardComponent],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 space-y-20">
      <nav class="flex items-center justify-between border-b border-[var(--border)] pb-6">
        <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <span>← Back to Publications Hub</span>
        </a>
      </nav>

      <header class="space-y-4 max-w-3xl">
        <span class="text-xs font-mono text-[var(--success)] uppercase tracking-wider font-bold">Index Tags & Topics</span>
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight">Popular Tags</h1>
        <p class="text-base text-[var(--text-secondary)]">Explore publications indexed by granular architectural concepts, frameworks, and programming languages.</p>
      </header>

      <!-- Tag Chips Grid -->
      <div class="flex flex-wrap gap-2.5 p-6 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
        @for (tag of tags(); track tag) {
          <app-tag-chip
            [tag]="tag"
            [count]="getCount(tag)"
            [active]="activeTag() === tag"
            (tagClick)="selectTag($event)"
          />
        }
        @if (activeTag()) {
          <button
            type="button"
            (click)="selectTag('')"
            class="px-3 py-1.5 text-xs font-mono text-[var(--accent)] hover:underline cursor-pointer"
          >
            ✕ Reset Tag Selection
          </button>
        }
      </div>

      <!-- Articles Grid -->
      <section class="space-y-8">
        <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">
          @if (activeTag()) {
            Publications Tagged <span class="text-[var(--accent)]">{{ activeTag() }}</span>
          } @else {
            All Publications Index
          }
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
export class TagsHubComponent {
  private readonly blogService = inject(BlogService);

  readonly activeTag = signal<string>('');
  readonly tags = this.blogService.allTags;
  readonly allArticles = this.blogService.articles;

  readonly filteredArticles = computed(() => {
    const tag = this.activeTag();
    if (!tag) return this.allArticles();
    return this.allArticles().filter(a => a.tags.includes(tag));
  });

  selectTag(tag: string): void {
    if (this.activeTag() === tag) {
      this.activeTag.set('');
    } else {
      this.activeTag.set(tag);
    }
  }

  getCount(tag: string): number {
    return this.allArticles().filter(a => a.tags.includes(tag)).length;
  }
}
