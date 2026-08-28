import { Component, input } from '@angular/core';
import { AuthorProfile } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-author-card',
  template: `
    <div class="bg-[#131316] border border-[#242428] rounded-2xl p-6 sm:p-8 space-y-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img
          [src]="author().avatarUrl"
          [alt]="author().name"
          class="w-16 h-16 rounded-2xl object-cover border border-[#242428] shrink-0 shadow-md"
        />
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] text-[11px] font-mono font-bold mb-1">
            Author Profile
          </div>
          <h3 class="text-xl font-['Space_Grotesk'] font-bold text-[var(--accent)]">{{ author().name }}</h3>
          <p class="text-xs font-mono text-[#A1A1AA]">{{ author().title }}</p>
        </div>
      </div>

      <p class="text-sm text-[#E5E7EB] leading-relaxed">
        {{ author().bio }}
      </p>

      @if (author().topics && author().topics!.length > 0) {
        <div class="space-y-2 pt-2 border-t border-[#242428]/80">
          <div class="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider">Research Focus & Topics:</div>
          <div class="flex flex-wrap gap-1.5">
            @for (top of author().topics; track top) {
              <span class="px-2.5 py-1 rounded bg-[#0B0B0C] text-xs font-mono text-[#3B82F6] border border-[#242428]">
                #{{ top }}
              </span>
            }
          </div>
        </div>
      }

      <div class="pt-4 border-t border-[#242428] flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1AA]">
        @if (author().githubUrl) {
          <a [href]="author().githubUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] transition-colors">
            GitHub ↗
          </a>
        }
        @if (author().linkedinUrl) {
          <a [href]="author().linkedinUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[#3B82F6] transition-colors">
            LinkedIn ↗
          </a>
        }
        @if (author().twitterUrl) {
          <a [href]="author().twitterUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] transition-colors">
            Twitter/X ↗
          </a>
        }
        @if (author().websiteUrl) {
          <a [href]="author().websiteUrl" target="_blank" rel="noopener noreferrer" class="text-[#22C55E] hover:underline">
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
