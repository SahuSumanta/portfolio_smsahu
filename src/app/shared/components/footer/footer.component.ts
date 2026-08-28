import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-12 border-t border-[var(--border)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        
        <!-- Minimal Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          <div class="md:col-span-2 space-y-4">
            <h2 class="text-2xl font-display font-medium tracking-tight">Sumanta Sahu</h2>
            <p class="text-[var(--text-primary)]/60 text-sm max-w-sm font-sans leading-relaxed">
              Full Stack Software Engineer. Crafting highly scalable applications with absolute precision and world-class aesthetics.
            </p>
          </div>

          <div>
            <h3 class="text-xs uppercase tracking-widest text-[var(--accent)]/40 font-medium mb-6">Connect</h3>
            <ul class="space-y-4 text-sm font-sans">
              <li><a href="https://linkedin.com/in/sahusumanta" target="_blank" rel="noopener noreferrer" class="text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/SahuSumanta" target="_blank" rel="noopener noreferrer" class="text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] transition-colors">GitHub</a></li>
              <li><a href="mailto:sumantasahu.sm@gmail.com" class="text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] transition-colors">Email</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs uppercase tracking-widest text-[var(--accent)]/40 font-medium mb-6">Navigation</h3>
            <ul class="space-y-4 text-sm font-sans">
              <li><a routerLink="/projects" class="text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] transition-colors">Projects</a></li>
              <li><a routerLink="/experience" class="text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] transition-colors">Experience</a></li>
              <li><a routerLink="/about" class="text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] transition-colors">About</a></li>
            </ul>
          </div>
        </div>

        <!-- Base -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-primary)]/40 font-sans gap-4 border-t border-[var(--border)]">
          <p>© 2026 Sumanta Sahu. All rights reserved.</p>
          <p>Designed and engineered with strict minimalism.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
