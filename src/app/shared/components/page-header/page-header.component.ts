import { Component, input } from '@angular/core';

/** Shared editorial header for inner pages: mono eyebrow, display title with serif accent word, lead. */
@Component({
  selector: 'app-page-header',
  template: `
    <header class="relative isolate grain overflow-hidden border-b border-[var(--border)]">
      <div class="absolute inset-0 -z-10 ph-bg"></div>
      <div class="grid-lines -z-10"></div>
      <div class="glow drift-a -z-10" style="width:40vw;height:40vw;right:-10vw;top:-22vw;background:var(--accent-deep);opacity:.55"></div>
      <div class="container-x pt-40 md:pt-48 pb-16 md:pb-24">
        <p class="eyebrow mb-8 fade-in">{{ eyebrow() }}</p>
        <h1 class="h-display max-w-[18ch] text-balance">
          {{ title() }}@if (accent()) { <em class="serif-em">{{ accent() }}</em>}
        </h1>
        @if (lead()) {
          <p class="lead max-w-2xl mt-8 fade-in" style="--d:300ms">{{ lead() }}</p>
        }
        <ng-content />
      </div>
    </header>
  `,
  styles: [`
    .ph-bg { background: radial-gradient(90% 80% at 100% 0%, rgba(120,13,39,.38), transparent 60%); }
    .text-balance { text-wrap: balance; }
  `]
})
export class PageHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly accent = input<string>('');
  readonly lead = input<string>('');
}
