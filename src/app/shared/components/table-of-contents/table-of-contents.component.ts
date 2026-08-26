import { Component, input, signal } from '@angular/core';
import { TableOfContentsItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-table-of-contents',
  template: `
    <div class="bg-[#131316] border border-[#242428] rounded-2xl p-6 space-y-4 sticky top-24">
      <div class="flex items-center justify-between border-b border-[#242428] pb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-[#3B82F6] font-bold">Table of Contents</span>
        <span class="text-[11px] font-mono text-[#A1A1AA]">{{ items().length }} Sections</span>
      </div>

      <nav class="space-y-2">
        @for (item of items(); track item.id) {
          <a
            [href]="'#' + item.id"
            (click)="scrollToSection($event, item.id)"
            class="block text-xs sm:text-sm text-[#A1A1AA] hover:text-[#3B82F6] transition-colors py-1 leading-snug"
            [class.pl-4]="item.level === 3"
            [class.font-medium]="activeId() === item.id"
            [class.text-white]="activeId() === item.id"
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
