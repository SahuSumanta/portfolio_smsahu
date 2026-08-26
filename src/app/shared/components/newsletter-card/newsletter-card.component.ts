import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-newsletter-card',
  template: `
    <div class="bg-gradient-to-br from-[#131316] via-[#1C1C21] to-[#131316] border border-[#242428] rounded-3xl p-8 sm:p-12 space-y-6 text-center max-w-4xl mx-auto shadow-2xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 text-xs font-mono font-bold">
        <span>📬 Antigravity Dispatch</span>
      </div>

      <h3 class="text-3xl sm:text-4xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] tracking-tight">
        Join 14,000+ Engineers Reading Deep Architectural Insights
      </h3>

      <p class="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
        Zero spam. Strictly verified technical deep dives on distributed Raft engines, sub-millisecond streaming pipelines, and declarative UI performance delivered directly to your inbox monthly.
      </p>

      @if (subscribed()) {
        <div class="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-sm font-mono font-bold">
          ✓ Welcome to the inner ring! Verify your inbox for confirmation.
        </div>
      } @else {
        <form (ngSubmit)="onSubscribe()" class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            [value]="email()"
            (input)="onEmailChange($event)"
            placeholder="enter.your@email.dev"
            required
            class="w-full px-5 py-3 rounded-xl bg-[#0B0B0C] border border-[#242428] text-sm text-[var(--text-primary)] placeholder-[#A1A1AA] focus:outline-none focus:border-[#3B82F6] font-mono"
          />
          <button
            type="submit"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[var(--text-primary)] text-sm font-bold font-mono transition-all duration-200 shrink-0 cursor-pointer shadow-lg"
          >
            Subscribe Free
          </button>
        </form>
      }

      <div class="text-[11px] font-mono text-[#A1A1AA]">
        Unsubscribe anytime with one click. No trackers.
      </div>
    </div>
  `
})
export class NewsletterCardComponent {
  readonly email = signal<string>('');
  readonly subscribed = signal<boolean>(false);

  onEmailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  onSubscribe(): void {
    if (this.email().includes('@')) {
      this.subscribed.set(true);
    }
  }
}
