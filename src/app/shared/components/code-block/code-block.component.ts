import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  template: `
    <div class="my-6 rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#242428] shadow-2xl">
      <!-- Top Window Bar -->
      <div class="flex items-center justify-between px-4 py-2.5 bg-[#131316] border-b border-[#242428] text-xs font-mono">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#FF5F56]/80"></span>
          <span class="w-3 h-3 rounded-full bg-[#FFBD2E]/80"></span>
          <span class="w-3 h-3 rounded-full bg-[#27C93F]/80"></span>
          <span class="ml-2 text-[#A1A1AA] uppercase tracking-wider font-bold">{{ language() }}</span>
        </div>

        <button
          type="button"
          (click)="copyCode()"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1C21] hover:bg-[#242428] text-[#A1A1AA] hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer"
        >
          @if (copied()) {
            <span class="text-[#22C55E] font-bold">✓ Copied to Clipboard</span>
          } @else {
            <span>Copy Code</span>
          }
        </button>
      </div>

      <!-- Code Content -->
      <div class="p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#E5E7EB] overflow-x-auto whitespace-pre">
        <code>{{ code() }}</code>
      </div>
    </div>
  `
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');
  readonly copied = signal<boolean>(false);

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    } catch {
      // Fallback
    }
  }
}
