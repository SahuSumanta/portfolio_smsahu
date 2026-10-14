import { Component, input } from '@angular/core';
import { AuthorProfile } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-author-card',
  template: `
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 sm:p-8 space-y-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img
          [src]="author().avatarUrl"
          [alt]="author().name"
          class="w-16 h-16 rounded-lg object-cover border border-[var(--border)] shrink-0 shadow-md"
        />
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-mono font-bold mb-1">
            Author Profile
          </div>
          <h3 class="text-xl font-display font-bold text-[var(--text-primary)]">{{ author().name }}</h3>
          <p class="text-xs font-mono text-[var(--text-secondary)]">{{ author().title }}</p>
        </div>
      </div>

      <p class="text-sm text-[var(--text-primary)] leading-relaxed">
        {{ author().bio }}
      </p>

      @if (author().topics && author().topics!.length > 0) {
        <div class="space-y-2 pt-2 border-t border-[var(--border)]/80">
          <div class="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Research Focus & Topics:</div>
          <div class="flex flex-wrap gap-1.5">
            @for (top of author().topics; track top) {
              <span class="px-2.5 py-1 rounded bg-[var(--bg-primary)] text-xs font-mono text-[var(--accent)] border border-[var(--border)]">
                #{{ top }}
              </span>
            }
          </div>
        </div>
      }

      <div class="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
        @if (author().githubUrl) {
          <a [href]="author().githubUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] transition-colors">
            GitHub ↗
          </a>
        }
        @if (author().linkedinUrl) {
          <a [href]="author().linkedinUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--accent)] transition-colors">
            LinkedIn ↗
          </a>
        }
        @if (author().twitterUrl) {
          <a [href]="author().twitterUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] transition-colors">
            Twitter/X ↗
          </a>
        }
        @if (author().websiteUrl) {
          <a [href]="author().websiteUrl" target="_blank" rel="noopener noreferrer" class="text-[var(--success)] hover:underline">
            Personal Site ↗
          </a>
        }
      </div>
    </div>
  `
})
export class AuthorCardComponent {
  readonly author = input.required<AuthorProfile>();
}
