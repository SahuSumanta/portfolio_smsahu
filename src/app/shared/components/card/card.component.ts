import { Component, input } from '@angular/core';
import { ThreeCardTiltDirective } from '../three-card-tilt/three-card-tilt.directive';

@Component({
  selector: 'app-card',
  imports: [ThreeCardTiltDirective],
  template: `
    <div
      [class]="getCardClasses()"
      appCardTilt
      [tiltEnabled]="hoverEffect() && enable3dTilt()"
      [maxTilt]="maxTilt()"
    >
      <!-- Top Subtle Neon Border Glow on Hover -->
      <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <!-- Ambient Glow Corner Mesh -->
      @if (glowEffect()) {
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#2563EB]/20 transition-all duration-500"></div>
      }

      <div class="relative z-10 h-full flex flex-col">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  host: {
    class: 'block h-full group'
  }
})
export class CardComponent {
  readonly hoverEffect = input<boolean>(true);
  readonly enable3dTilt = input<boolean>(true);
  readonly glowEffect = input<boolean>(true);
  readonly maxTilt = input<number>(6);
  readonly padding = input<'none' | 'sm' | 'md' | 'lg' | 'xl'>('lg');
  readonly customClasses = input<string>('');

  getCardClasses(): string {
    const base = 'bg-[#131316] border border-[#242428] rounded-3xl transition-all duration-500 relative overflow-hidden shadow-xl';
    const hover = this.hoverEffect()
      ? 'hover:bg-[#18181B] hover:border-[#2563EB]/50 hover:shadow-2xl hover:shadow-[#2563EB]/15 hover:-translate-y-1'
      : '';

    let padClass = '';
    switch (this.padding()) {
      case 'none':
        padClass = 'p-0';
        break;
      case 'sm':
        padClass = 'p-4 sm:p-5';
        break;
      case 'md':
        padClass = 'p-6 sm:p-7';
        break;
      case 'lg':
        padClass = 'p-8 sm:p-10';
        break;
      case 'xl':
        padClass = 'p-10 sm:p-12';
        break;
    }

    return `${base} ${hover} ${padClass} ${this.customClasses()}`;
  }
}
