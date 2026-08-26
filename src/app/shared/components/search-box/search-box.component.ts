import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: `
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        [value]="value()"
        [placeholder]="placeholder()"
        (input)="onInput($event)"
        class="w-full pl-11 pr-10 py-2.5 rounded-xl bg-[#131316] border border-[#242428] text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#3B82F6] transition-all duration-200"
      />

      @if (value()) {
        <button
          type="button"
          (click)="clearSearch()"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#A1A1AA] hover:text-white cursor-pointer"
          aria-label="Clear search"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      }
    </div>
  `
})
export class SearchBoxComponent {
  readonly value = input<string>('');
  readonly placeholder = input<string>('Search engineering projects by keywords or stack...');

  readonly searchChange = output<string>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchChange.emit(inputElement.value);
  }

  clearSearch(): void {
    this.searchChange.emit('');
  }
}
