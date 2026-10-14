import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="relative isolate overflow-hidden border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div class="glow drift-b -z-10" style="width:70vw;height:38vw;left:50%;bottom:-24vw;translate:-50% 0;background:var(--accent-deep);opacity:.7"></div>
      <div class="glow -z-10" style="width:30vw;height:20vw;left:50%;bottom:-14vw;translate:-50% 0;background:var(--accent);opacity:.35"></div>

      <div class="container-x">
        @if (!onContact()) {
          <section class="pt-[var(--section-y)] pb-24 md:pb-32" aria-labelledby="closing-heading">
            <p class="eyebrow mb-8">Contact</p>
            <h2 id="closing-heading" class="h-display max-w-[16ch]">
              Let's build something <span class="serif-em">considered.</span>
            </h2>
            <p class="lead max-w-xl mt-8">
              Available for new opportunities and consulting. If you're working on a product that values architecture and craft, I'd like to hear about it.
            </p>
            <div class="mt-12 flex flex-wrap items-center gap-4">
              <a href="mailto:sumantasahu.sm@gmail.com" class="btn btn-primary">sumantasahu.sm&#64;gmail.com <span class="arrow">→</span></a>
              <a routerLink="/contact" class="btn btn-ghost">Send a message</a>
            </div>
          </section>
        }

        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 border-t border-[var(--border)] text-sm" [class.mt-24]="onContact()">
          <div class="col-span-2">
            <p class="font-display text-xl tracking-tight">Sumanta Sahu</p>
            <p class="text-[var(--text-secondary)] mt-3 max-w-xs leading-relaxed">Software engineer in Pune, India, building enterprise web and mobile products.</p>
          </div>
          <nav aria-label="Footer">
            <p class="eyebrow eyebrow-plain mb-5">Explore</p>
            <ul class="space-y-3">
              <li><a routerLink="/projects" class="link-muted">Projects</a></li>
              <li><a routerLink="/experience" class="link-muted">Experience</a></li>
              <li><a routerLink="/about" class="link-muted">About</a></li>
              <li><a routerLink="/skills" class="link-muted">Skills</a></li>
              <li><a routerLink="/blog" class="link-muted">Writing</a></li>
              <li><a routerLink="/resume" class="link-muted">Resume</a></li>
            </ul>
          </nav>
          <div>
            <p class="eyebrow eyebrow-plain mb-5">Elsewhere</p>
            <ul class="space-y-3">
              <li><a href="https://github.com/SahuSumanta" target="_blank" rel="noopener noreferrer" class="link-muted">GitHub ↗</a></li>
              <li><a href="https://linkedin.com/in/sahusumanta" target="_blank" rel="noopener noreferrer" class="link-muted">LinkedIn ↗</a></li>
              <li><a href="mailto:sumantasahu.sm@gmail.com" class="link-muted">Email ↗</a></li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between gap-3 py-6 border-t border-[var(--border-subtle)] font-mono text-[11px] tracking-wider text-[var(--text-tertiary)] uppercase">
          <span>© 2026 Sumanta Sahu</span>
          <span>Pune, IN — Built with Angular</span>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private readonly router = inject(Router);
  readonly onContact = signal(false);

  constructor() {
    this.onContact.set(this.router.url.startsWith('/contact'));
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.onContact.set((e as NavigationEnd).urlAfterRedirects.startsWith('/contact')));
  }
}
