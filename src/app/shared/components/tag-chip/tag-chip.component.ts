import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tag-chip',
  template: `
    <button
      type="button"
      (click)="tagClick.emit(tag())"
      class="px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer border flex items-center gap-1.5"
      [class]="active() ? 'bg-[var(--accent)] text-[var(--text-primary)] border-[var(--accent)] shadow-md scale-105' : 'bg-[var(--bg-primary)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border)]'"
    >
      <span>{{ tag() }}</span>
      @if (count() !== undefined) {
        <span class="text-[10px] opacity-75">({{ count() }})</span>
      }
    </button>
  `
})
export class TagChipComponent {
  readonly tag = input.required<string>();
  readonly count = input<number>();
  readonly active = input<boolean>(false);
  readonly tagClick = output<string>();
}
