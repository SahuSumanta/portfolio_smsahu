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
      return `${base} bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm`;
    }
    return `${base} bg-[#131316] hover:bg-[#1C1C21] text-[#A1A1AA] hover:text-white border-[#242428]`;
  }

  getCountClasses(): string {
    const base = 'px-1.5 py-0.2 rounded-full text-[11px] font-mono font-bold';
    if (this.active()) {
      return `${base} bg-white/20 text-white`;
    }
    return `${base} bg-[#1C1C21] text-[#A1A1AA]`;
  }
}
