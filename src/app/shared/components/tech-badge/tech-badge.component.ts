import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-badge',
  template: `
    <span
      [class]="getClasses()"
      [title]="tooltip() || name()"
      [style.border-color]="color() + '40'"
      [style.background-color]="color() + '15'"
      [style.color]="color() || '#A1A1AA'"
    >
      <span class="w-1.5 h-1.5 rounded-full" [style.background-color]="color() || '#3B82F6'"></span>
      <span>{{ name() }}</span>
    </span>
  `,
  host: {
    class: 'inline-block'
  }
})
export class TechBadgeComponent {
  readonly name = input.required<string>();
  readonly color = input<string>('#3B82F6');
  readonly tooltip = input<string>('');
  readonly size = input<'sm' | 'md'>('sm');

  getClasses(): string {
    const base = 'inline-flex items-center gap-1.5 font-mono rounded-md border font-medium transition-all duration-200 hover:scale-105 cursor-default select-none';
    const sizeClasses = this.size() === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
    return `${base} ${sizeClasses}`;
  }
}
