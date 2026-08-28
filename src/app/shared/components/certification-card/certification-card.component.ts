import { Component, input } from '@angular/core';
import { CertificationItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-certification-card',
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
        <span class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
          {{ item().type }}
        </span>
        <span class="text-xs font-sans text-[var(--text-primary)]/40">{{ item().date }}</span>
      </div>

      <h3 class="text-xl font-display font-medium text-[var(--accent)]">
        {{ item().title }}
      </h3>

      <div class="text-sm font-sans font-light text-[var(--text-primary)]/60">
        {{ item().issuer }}
      </div>

      <div class="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-sans uppercase tracking-widest">
        <span class="text-[var(--text-primary)]">{{ item().badgeText }}</span>
        @if (item().credentialUrl) {
          <a [href]="item().credentialUrl" target="_blank" rel="noopener noreferrer" class="text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">
            Verify ↗
          </a>
        }
      </div>
    </div>
  `
})
export class CertificationCardComponent {
  readonly item = input.required<CertificationItem>();
}
