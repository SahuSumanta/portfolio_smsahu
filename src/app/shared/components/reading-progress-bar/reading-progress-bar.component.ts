import { Component, signal, HostListener } from '@angular/core';

@Component({
  selector: 'app-reading-progress-bar',
  template: `
    <div class="fixed top-0 left-0 right-0 h-1 z-50 bg-[var(--surface)]">
      <div
        class="h-full bg-gradient-to-r from-[var(--accent)] via-[var(--success)] to-[var(--accent)] transition-all duration-150"
        [style.width]="progress() + '%'"
      ></div>
    </div>
  `
})
export class ReadingProgressBarComponent {
  readonly progress = signal<number>(0);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const docElement = document.documentElement;
    const scrollTop = docElement.scrollTop || document.body.scrollTop;
    const scrollHeight = docElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = docElement.clientHeight;
    
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    this.progress.set(Math.min(100, Math.max(0, scrolled)));
  }
}
