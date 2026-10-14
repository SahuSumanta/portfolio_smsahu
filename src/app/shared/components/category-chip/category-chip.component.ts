import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-chip',
  template: `
    <button
      type="button"
      [class]="getClasses()"
      (click)="chipClick.emit(label())"
    >
      <span>{{ label() }}</span>
      @if (count() !== undefined && count() !== null) {
        <span [class]="getCountClasses()">
          {{ count() }}
        </span>
      }
    </button>
  `,
  host: {
    class: 'inline-block'
  }
})
export class CategoryChipComponent {
  readonly label = input.required<string>();
  readonly active = input<boolean>(false);
  readonly count = input<number | undefined>();

  readonly chipClick = output<string>();

  getClasses(): string {
    const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer select-none border';
    if (this.active()) {
      return `${base} bg-[var(--accent)] text-[var(--text-primary)] border-[var(--accent)] shadow-sm`;
    }
    return `${base} bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border)]`;
  }

  getCountClasses(): string {
    const base = 'px-1.5 py-0.2 rounded-full text-[11px] font-mono font-bold';
    if (this.active()) {
      return `${base} bg-[var(--text-primary)]/20 text-[var(--text-primary)]`;
    }
    return `${base} bg-[var(--surface-hover)] text-[var(--text-secondary)]`;
  }
}
