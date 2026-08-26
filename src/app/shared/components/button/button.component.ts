import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="getButtonClasses()"
      (click)="onClick($event)"
    >
      @if (loading()) {
        <span class="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      }
      <ng-content></ng-content>
    </button>
  `,
  host: {
    class: 'inline-block'
  }
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);

  readonly buttonClick = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.buttonClick.emit(event);
    }
  }

  getButtonClasses(): string {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';
    
    let variantClasses = '';
    switch (this.variant()) {
      case 'primary':
        variantClasses = 'bg-[#3B82F6] hover:bg-[#2563EB] text-[var(--text-primary)] shadow-sm';
        break;
      case 'secondary':
        variantClasses = 'bg-[#1C1C21] hover:bg-[#242428] text-[var(--text-primary)] border border-[#242428]';
        break;
      case 'outline':
        variantClasses = 'bg-transparent hover:bg-[#1C1C21] text-[var(--text-primary)] border border-[#242428]';
        break;
      case 'ghost':
        variantClasses = 'bg-transparent hover:bg-[#1C1C21] text-[#A1A1AA] hover:text-[var(--text-primary)]';
        break;
    }

    let sizeClasses = '';
    switch (this.size()) {
      case 'sm':
        sizeClasses = 'px-3 py-1.5 text-xs';
        break;
      case 'md':
        sizeClasses = 'px-4 py-2 text-sm';
        break;
      case 'lg':
        sizeClasses = 'px-6 py-3 text-base';
        break;
    }

    const widthClass = this.fullWidth() ? 'w-full' : '';

    return `${base} ${variantClasses} ${sizeClasses} ${widthClass}`;
  }
}
