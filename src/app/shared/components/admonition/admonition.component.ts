import { Component, input } from '@angular/core';

@Component({
  selector: 'app-admonition',
  template: `
    <div class="my-6 p-5 rounded-lg border flex items-start gap-4 transition-all duration-200"
      [class]="getContainerClasses(type())"
    >
      <div class="text-xl shrink-0 mt-0.5">
        {{ getIcon(type()) }}
      </div>
      <div class="space-y-1">
        <div class="text-xs font-mono font-bold uppercase tracking-wider" [class]="getTitleClasses(type())">
          {{ title() || getDefaultTitle(type()) }}
        </div>
        <div class="text-sm text-[var(--text-primary)] leading-relaxed">
          <ng-content />
          {{ content() }}
        </div>
      </div>
    </div>
  `
})
export class AdmonitionComponent {
  readonly type = input<'info' | 'tip' | 'warning' | 'important' | 'danger'>('info');
  readonly title = input<string>('');
  readonly content = input<string>('');

  getContainerClasses(type: string): string {
    switch (type) {
      case 'tip':
        return 'bg-[var(--success)]/10 border-[var(--success)]/30';
      case 'warning':
        return 'bg-[var(--accent)]/10 border-[var(--accent)]/30';
      case 'important':
        return 'bg-[#A855F7]/10 border-[#A855F7]/30';
      case 'danger':
        return 'bg-[var(--accent)]/10 border-[var(--accent)]/30';
      default:
        return 'bg-[var(--accent)]/10 border-[var(--accent)]/30';
    }
  }

  getTitleClasses(type: string): string {
    switch (type) {
      case 'tip':
        return 'text-[var(--success)]';
      case 'warning':
        return 'text-[var(--accent)]';
      case 'important':
        return 'text-[#A855F7]';
      case 'danger':
        return 'text-[var(--accent)]';
      default:
        return 'text-[var(--accent)]';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'tip':
        return '💡';
      case 'warning':
        return '⚠️';
      case 'important':
        return '🔥';
      case 'danger':
        return '🚨';
      default:
        return 'ℹ️';
    }
  }

  getDefaultTitle(type: string): string {
    return type.toUpperCase();
  }
}
