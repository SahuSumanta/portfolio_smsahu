import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BlogService } from '../../core/services/blog.service';
import { ReadingProgressBarComponent } from '../../shared/components/reading-progress-bar/reading-progress-bar.component';
import { TableOfContentsComponent } from '../../shared/components/table-of-contents/table-of-contents.component';
import { AuthorCardComponent } from '../../shared/components/author-card/author-card.component';
import { NewsletterCardComponent } from '../../shared/components/newsletter-card/newsletter-card.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { AdmonitionComponent } from '../../shared/components/admonition/admonition.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-blog-detail',
  imports: [
    RouterLink,
    ReadingProgressBarComponent,
    TableOfContentsComponent,
    AuthorCardComponent,
    NewsletterCardComponent,
    CodeBlockComponent,
    AdmonitionComponent,
    ButtonComponent
  ],
  template: `
    <app-reading-progress-bar />

    @if (article(); as art) {
      <div class="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <!-- Back Breadcrumb & Metadata -->
        <nav class="flex items-center justify-between border-b border-[#242428] pb-6">
          <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-[var(--text-primary)] transition-colors">
            <span>← Return to Publications Hub</span>
          </a>

          <div class="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
            <span>Domain: {{ art.categories[0] }}</span>
            <span>•</span>
            <span class="text-[#22C55E]">{{ art.difficulty }} Level</span>
          </div>
        </nav>

        <!-- Article Hero Header -->
        <header class="max-w-4xl space-y-6">
          <div class="flex flex-wrap items-center gap-2">
            @for (cat of art.categories; track cat) {
              <span class="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 text-xs font-mono font-bold">
                {{ cat }}
              </span>
            }
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] tracking-tight leading-tight">
            {{ art.title }}
          </h1>

          <p class="text-lg sm:text-xl text-[#A1A1AA] leading-relaxed">
            {{ art.summary }}
          </p>

          <!-- Author Byline Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-[#242428] py-4 text-xs font-mono text-[#A1A1AA]">
            <div class="flex items-center gap-3">
              <img [src]="art.author.avatarUrl" [alt]="art.author.name" class="w-10 h-10 rounded-full object-cover border border-[#242428]" />
              <div>
                <div class="text-[var(--text-primary)] font-bold">{{ art.author.name }}</div>
                <div class="text-[11px] text-[#3B82F6]">{{ art.author.title }}</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span>📅 Published: {{ art.publishedAt }}</span>
              <span>•</span>
              <span>⏱ {{ art.readingTimeMin }} min read</span>
              <span>•</span>
              <span>👁 {{ art.viewCount.toLocaleString() }} Views</span>
            </div>
          </div>
        </header>

        <!-- Cover Image -->
        <div class="aspect-video w-full rounded-3xl overflow-hidden bg-[#131316] border border-[#242428] shadow-2xl">
          <img [src]="art.coverUrl" [alt]="art.title" class="w-full h-full object-cover" />
        </div>

        <!-- Main Body Grid: Content + Sticky TOC -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Article Content Body -->
          <article class="lg:col-span-8 space-y-8 text-[#E5E7EB] font-sans leading-relaxed text-base sm:text-lg">
            @if (art.slug === 'angular-20-signals-architecture') {
              <section id="introduction" class="space-y-4">
                <h2 class="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] border-b border-[#242428] pb-3">
                  1. The Cost of Zone.js in Enterprise Scale
                </h2>
                <p>
                  For nearly a decade, Angular applications relied on <strong>Zone.js</strong> to monkey-patch native browser APIs (<code>setTimeout</code>, DOM listeners, Promises) and trigger global application change detection cycles. While convenient for beginners, top-down tree traversals scale O(N) with DOM node complexity.
                </p>
                <p>
                  In enterprise dashboards with 10,000+ real-time financial telemetry rows, <code>ngDoCheck</code> execution storms can easily drop frame rates below 24fps.
                </p>
                <app-code-block
                  language="typescript"
                  [code]="legacyCodeSnippet"
                />
              </section>

              <section id="signal-primitives" class="space-y-4">
                <h2 class="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] border-b border-[#242428] pb-3">
                  2. Anatomy of Writable & Computed Signals
                </h2>
                <p>
                  Angular 20 introduces <strong>declarative reactive primitives</strong> via fine-grained Signals. When a signal value changes, only templates directly reading that signal receive localized dirty notifications.
                </p>
                <app-code-block
                  language="typescript"
                  [code]="modernSignalSnippet"
                />
                <app-admonition type="tip" title="IMMUTABLE SIGNAL MUTATION">
                  Never mutate signal arrays or objects directly using <code>.push()</code>. Always use <code>.update(arr => [...arr, item])</code> or <code>.set()</code> to ensure immutable reference changes trigger downstream computed memos.
                </app-admonition>
              </section>

              <section id="zoneless-migration" class="space-y-4">
                <h2 class="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] border-b border-[#242428] pb-3">
                  3. Step-by-Step Zone-Less Migration Strategy
                </h2>
                <p>
                  To eliminate <code>zone.js</code> entirely in Angular 20, configure <code>provideExperimentalZonelessChangeDetection()</code> inside your application bootstrap.
                </p>
                <app-code-block
                  language="typescript"
                  [code]="zonelessBootstrapSnippet"
                />
              </section>

              <section id="benchmarks" class="space-y-4">
                <h2 class="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] border-b border-[#242428] pb-3">
                  4. Production Telemetry & Benchmarks
                </h2>
                <p>
                  Migrating our core real-time observability console yielded immediate improvements across all Core Web Vitals:
                </p>
                <div class="my-6 overflow-x-auto rounded-2xl border border-[#242428] bg-[#131316]">
                  <table class="w-full text-left border-collapse font-mono text-xs sm:text-sm">
                    <thead>
                      <tr class="bg-[#1C1C21] border-b border-[#242428] text-[#A1A1AA]">
                        <th class="p-4">Metric</th>
                        <th class="p-4 text-[#F59E0B]">Zone.js Architecture</th>
                        <th class="p-4 text-[#3B82F6]">Angular 20 Signals</th>
                        <th class="p-4 text-[#22C55E]">Delta Impact</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#242428]">
                      <tr>
                        <td class="p-4 font-bold text-[var(--text-primary)]">Interaction to Next Paint (INP)</td>
                        <td class="p-4 text-[#A1A1AA]">145 ms</td>
                        <td class="p-4 text-[var(--text-primary)]">18 ms</td>
                        <td class="p-4 text-[#22C55E] font-bold">-87%</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-[var(--text-primary)]">Main Thread CPU Blocking</td>
                        <td class="p-4 text-[#A1A1AA]">380 ms</td>
                        <td class="p-4 text-[var(--text-primary)]">42 ms</td>
                        <td class="p-4 text-[#22C55E] font-bold">-88%</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-[var(--text-primary)]">Bundle Size (Gzipped)</td>
                        <td class="p-4 text-[#A1A1AA]">84 kB</td>
                        <td class="p-4 text-[var(--text-primary)]">61 kB</td>
                        <td class="p-4 text-[#22C55E] font-bold">-27%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="conclusion" class="space-y-4">
                <h2 class="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)] border-b border-[#242428] pb-3">
                  5. Architectural Verdict
                </h2>
                <p>
                  Signal-first architecture represents a permanent evolution toward deterministic software design that guarantees 60fps rendering under high data concurrency.
                </p>
              </section>
            } @else {
              <!-- Standard Markdown fallback view -->
              <div class="whitespace-pre-line font-sans text-base sm:text-lg text-[#E5E7EB] space-y-6">
                {{ art.contentMarkdown }}
              </div>
            }

            <!-- Tags Row -->
            <div class="pt-8 border-t border-[#242428] flex flex-wrap gap-2">
              <span class="text-xs font-mono text-[#A1A1AA] mr-2">Index Tags:</span>
              @for (tag of art.tags; track tag) {
                <span class="px-3 py-1 rounded-lg bg-[#131316] border border-[#242428] text-xs font-mono text-[#3B82F6]">
                  {{ tag }}
                </span>
              }
            </div>

            <!-- Share Utilities -->
            <div class="p-6 rounded-2xl bg-[#131316] border border-[#242428] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span class="text-sm font-bold text-[var(--text-primary)] font-['Space_Grotesk']">Found this architectural insight useful? Share it with your engineering peers:</span>
              <div class="flex items-center gap-3">
                <button type="button" (click)="onShare(art.title)" class="inline-block">
                  <app-button variant="primary" size="md">Share Article ↗</app-button>
                </button>
                <button type="button" (click)="copyLink()" class="inline-block">
                  <app-button variant="outline" size="md">Copy Link</app-button>
                </button>
              </div>
            </div>
          </article>

          <!-- Sticky Sidebar Table of Contents -->
          <aside class="lg:col-span-4 space-y-8">
            <app-table-of-contents [items]="art.tableOfContents" />
          </aside>
        </div>

        <!-- Author Signature Card -->
        <section class="pt-12 border-t border-[#242428]">
          <h3 class="text-xs font-mono uppercase tracking-wider text-[#3B82F6] font-bold mb-6">About The Author</h3>
          <app-author-card [author]="art.author" />
        </section>

        <!-- Next / Previous Article Navigation -->
        <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          @if (prevArticle(); as prev) {
            <a [routerLink]="['/blog', prev.slug]" class="p-6 rounded-2xl bg-[#131316] hover:bg-[#1C1C21] border border-[#242428] flex items-center gap-4 transition-all duration-200">
              <span class="text-2xl text-[#3B82F6]">←</span>
              <div>
                <div class="text-xs font-mono text-[#A1A1AA]">Previous Publication</div>
                <div class="text-base font-bold text-[var(--text-primary)] line-clamp-1">{{ prev.title }}</div>
              </div>
            </a>
          } @else { <div></div> }

          @if (nextArticle(); as next) {
            <a [routerLink]="['/blog', next.slug]" class="p-6 rounded-2xl bg-[#131316] hover:bg-[#1C1C21] border border-[#242428] flex items-center justify-end gap-4 transition-all duration-200 text-right">
              <div>
                <div class="text-xs font-mono text-[#A1A1AA]">Next Publication</div>
                <div class="text-base font-bold text-[var(--text-primary)] line-clamp-1">{{ next.title }}</div>
              </div>
              <span class="text-2xl text-[#3B82F6]">→</span>
            </a>
          }
        </section>

        <!-- Newsletter Subscription -->
        <section class="pt-8">
          <app-newsletter-card />
        </section>
      </div>
    } @else {
      <!-- 404 Not Found -->
      <div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
        <div class="text-5xl">📄</div>
        <h2 class="text-3xl font-['Space_Grotesk'] font-bold text-[var(--text-primary)]">Publication Not Found</h2>
        <p class="text-sm text-[#A1A1AA] max-w-md">The technical article you requested does not exist or has been archived.</p>
        <a routerLink="/blog">
          <app-button variant="primary">Return to Publications Hub</app-button>
        </a>
      </div>
    }
  `
})
export class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);

  private readonly slugSignal = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') || '')),
    { initialValue: '' }
  );

  readonly article = computed(() => this.blogService.getArticleBySlug(this.slugSignal()));

  readonly prevArticle = computed(() => {
    const all = this.blogService.articles();
    const idx = all.findIndex(a => a.slug === this.slugSignal());
    return idx > 0 ? all[idx - 1] : undefined;
  });

  readonly nextArticle = computed(() => {
    const all = this.blogService.articles();
    const idx = all.findIndex(a => a.slug === this.slugSignal());
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  });

  readonly legacyCodeSnippet = `// Legacy Zone.js pattern triggering top-down checks
@Component({
  selector: 'app-legacy-ticker',
  template: '<div>Last Price: {{ price }}</div>'
})
export class LegacyTickerComponent {
  price = 100.45;
  
  ngOnInit() {
    this.ws.onMessage(data => this.price = data.price);
  }
}`;

  readonly modernSignalSnippet = `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-reactive-ticker',
  template: \`
    <div class="p-4 bg-[#131316] rounded-xl border border-[#242428]">
      <span class="text-sm font-mono text-[#A1A1AA]">Live Price:</span>
      <span class="text-2xl font-bold text-[#22C55E]">{{\$formattedPrice()}}</span>
    </div>
  \`
})
export class ReactiveTickerComponent {
  readonly rawPrice = signal<number>(100.45);
  readonly formattedPrice = computed(() => \`$\${this.rawPrice().toFixed(2)}\`);

  updatePrice(newVal: number) {
    this.rawPrice.set(newVal);
  }
}`;

  readonly zonelessBootstrapSnippet = `import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
}).catch(err => console.error(err));`;

  async onShare(title: string): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href
        });
      } catch {
        // Ignored
      }
    } else {
      this.copyLink();
    }
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    } catch {
      // Ignored
    }
  }
}
