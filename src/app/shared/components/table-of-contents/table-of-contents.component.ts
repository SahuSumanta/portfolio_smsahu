import { Component, input, signal } from '@angular/core';
import { TableOfContentsItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-table-of-contents',
  template: `
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 space-y-4 sticky top-24">
      <div class="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-bold">Table of Contents</span>
        <span class="text-[11px] font-mono text-[var(--text-secondary)]">{{ items().length }} Sections</span>
      </div>

      <nav class="space-y-2">
        @for (item of items(); track item.id) {
          <a
            [href]="'#' + item.id"
            (click)="scrollToSection($event, item.id)"
            class="block text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-1 leading-snug"
            [class.pl-4]="item.level === 3"
            [class.font-medium]="activeId() === item.id"
            [class.text-[var(--text-primary)]]="activeId() === item.id"
          >
            {{ item.title }}
          </a>
        }
      </nav>
    </div>
  `
})
export class TableOfContentsComponent {
  readonly items = input.required<TableOfContentsItem[]>();
  readonly activeId = signal<string>('');

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    this.activeId.set(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
