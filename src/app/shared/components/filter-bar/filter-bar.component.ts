import { Component, input, output } from '@angular/core';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { CategoryChipComponent } from '../category-chip/category-chip.component';

export type ProjectSortOption = 'featured' | 'newest' | 'oldest' | 'alphabetical';

@Component({
  selector: 'app-filter-bar',
  imports: [SearchBoxComponent, CategoryChipComponent],
  template: `
    <div class="space-y-6 bg-[#131316]/80 border border-[#242428] rounded-2xl p-6 backdrop-blur-sm">
      <!-- Search and Sort Row -->
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="w-full md:max-w-md">
          <app-search-box
            [value]="searchQuery()"
            [placeholder]="'Search projects, architecture, or stack...'"
            (searchChange)="searchChange.emit($event)"
          />
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end">
          <span class="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Sort by:</span>
          <select
            [value]="selectedSort()"
            (change)="onSortChange($event)"
            class="bg-[#0B0B0C] border border-[#242428] rounded-xl px-3.5 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="newest">Newest (2025 → 2024)</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Title (A → Z)</option>
          </select>
        </div>
      </div>

      <!-- Category Chips Row -->
      <div class="space-y-2">
        <div class="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Domain Categories</div>
        <div class="flex flex-wrap items-center gap-2">
          <app-category-chip
            label="All Domains"
            [active]="selectedCategory() === 'All'"
            [count]="totalCount()"
            (chipClick)="categoryChange.emit('All')"
          />
          @for (cat of categories(); track cat) {
            <app-category-chip
              [label]="cat"
              [active]="selectedCategory() === cat"
              [count]="getCategoryCount(cat)"
              (chipClick)="categoryChange.emit(cat)"
            />
          }
        </div>
      </div>

      <!-- Technology Chips Row -->
      @if (availableTechs().length > 0) {
        <div class="space-y-2 pt-2 border-t border-[#242428]">
          <div class="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Filter by Core Technology</div>
          <div class="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              (click)="techChange.emit('')"
              [class]="getTechChipClass('')"
            >
              All Tech
            </button>
            @for (tech of availableTechs(); track tech) {
              <button
                type="button"
                (click)="techChange.emit(selectedTech() === tech ? '' : tech)"
                [class]="getTechChipClass(tech)"
              >
                {{ tech }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class FilterBarComponent {
  readonly searchQuery = input<string>('');
  readonly selectedCategory = input<string>('All');
  readonly selectedTech = input<string>('');
  readonly selectedSort = input<ProjectSortOption>('featured');
  readonly categories = input.required<string[]>();
  readonly availableTechs = input<string[]>([]);
  readonly totalCount = input<number>(0);
  readonly categoryCounts = input<Record<string, number>>({});

  readonly searchChange = output<string>();
  readonly categoryChange = output<string>();
  readonly techChange = output<string>();
  readonly sortChange = output<ProjectSortOption>();

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortChange.emit(select.value as ProjectSortOption);
  }

  getCategoryCount(cat: string): number | undefined {
    return this.categoryCounts()[cat];
  }

  getTechChipClass(tech: string): string {
    const base = 'px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer border';
    if (this.selectedTech() === tech) {
      return `${base} bg-[#3B82F6] text-[var(--text-primary)] border-[#3B82F6]`;
    }
    return `${base} bg-[#0B0B0C] hover:bg-[#1C1C21] text-[#A1A1AA] hover:text-[var(--text-primary)] border-[#242428]`;
  }
}
