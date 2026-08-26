import { Component, input } from '@angular/core';

@Component({
  selector: 'app-admonition',
  template: `
    <div class="my-6 p-5 rounded-2xl border flex items-start gap-4 transition-all duration-200"
      [class]="getContainerClasses(type())"
    >
      <div class="text-xl shrink-0 mt-0.5">
        {{ getIcon(type()) }}
      </div>
      <div class="space-y-1">
        <div class="text-xs font-mono font-bold uppercase tracking-wider" [class]="getTitleClasses(type())">
          {{ title() || getDefaultTitle(type()) }}
        </div>
        <div class="text-sm text-[#E5E7EB] leading-relaxed">
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
        return 'bg-[#22C55E]/10 border-[#22C55E]/30';
      case 'warning':
        return 'bg-[#F59E0B]/10 border-[#F59E0B]/30';
      case 'important':
        return 'bg-[#A855F7]/10 border-[#A855F7]/30';
      case 'danger':
        return 'bg-[#E6522C]/10 border-[#E6522C]/30';
      default:
        return 'bg-[#3B82F6]/10 border-[#3B82F6]/30';
    }
  }

  getTitleClasses(type: string): string {
    switch (type) {
      case 'tip':
        return 'text-[#22C55E]';
      case 'warning':
        return 'text-[#F59E0B]';
      case 'important':
        return 'text-[#A855F7]';
      case 'danger':
        return 'text-[#E6522C]';
      default:
        return 'text-[#3B82F6]';
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
