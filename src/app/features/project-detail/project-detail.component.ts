import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-project-detail',
  imports: [
    RouterLink
  ],
  template: `
    @if (project(); as p) {
      <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 py-32 space-y-32">
        <!-- Back Navigation & Breadcrumb -->
        <nav class="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <a routerLink="/projects" class="inline-flex items-center gap-2 text-sm font-sans text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] uppercase tracking-widest transition-colors">
            <span>← Back</span>
          </a>

          <div class="flex items-center gap-4 text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
            <span>{{ p.category }}</span>
            <span>•</span>
            <span class="text-[var(--text-primary)]">{{ p.status }}</span>
          </div>
        </nav>

        <!-- 1. Hero Section -->
        <header class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div class="lg:col-span-7 space-y-8">
            <div class="flex items-center gap-4">
              <span class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-2">
                Timeline: {{ p.timeline }}
              </span>
            </div>

            <h1 class="text-5xl sm:text-7xl font-display font-medium text-[var(--accent)] tracking-tighter leading-[1.05]">
              {{ p.title }}
            </h1>

            <p class="text-lg md:text-2xl text-[var(--text-primary)]/60 font-sans font-light leading-relaxed max-w-2xl">
              {{ p.tagline }}
            </p>
            
            <!-- External Links (if any) -->
            <div class="pt-8 flex flex-wrap gap-6 items-center">
              @if (p.demoUrl) {
                <a [href]="p.demoUrl" target="_blank" class="text-[var(--text-primary)] hover:opacity-70 transition-opacity font-medium tracking-wide border-b border-white pb-1">
                  Live View ↗
                </a>
              }
              @if (p.githubUrl) {
                <a [href]="p.githubUrl" target="_blank" class="text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors tracking-wide border-b border-transparent hover:border-[var(--border)] pb-1">
                  Source Code ↗
                </a>
              }
            </div>
          </div>

          <div class="lg:col-span-5 aspect-[4/3] bg-[var(--border)] overflow-hidden rounded-sm relative">
            @if (p.thumbnailUrl) {
              <img [src]="p.thumbnailUrl" [alt]="p.title" class="w-full h-full object-cover" />
            }
          </div>
        </header>

        <!-- FLAGSHIP RENDERER (DataByte, etc) -->
        @if (p.isFlagship && p.flagshipDetails; as fd) {
          
          <!-- Company Context -->
          <section class="border-t border-[var(--border)] pt-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 class="text-3xl font-display font-medium text-[var(--accent)] mb-6">Company Context</h2>
                <div class="text-sm font-sans text-[var(--text-primary)]/40 uppercase tracking-widest mb-2">{{ fd.companyContext.company }}</div>
                <div class="text-xl font-medium text-[var(--text-primary)] font-display mb-4">{{ fd.companyContext.role }}</div>
                <div class="text-sm text-[var(--text-primary)]/60 font-sans font-light">{{ fd.companyContext.duration }}</div>
              </div>
              <div class="text-lg text-[var(--text-primary)]/60 font-sans font-light leading-relaxed flex items-center">
                {{ fd.companyContext.description }}
              </div>
            </div>
          </section>

          <!-- Product Overview & Scale -->
          <section class="border-t border-[var(--border)] pt-16 space-y-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
              @if (fd.productOverview) {
                <div>
                  <h2 class="text-3xl font-display font-medium text-[var(--accent)] mb-6">Product Overview</h2>
                  <p class="text-lg text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
                    {{ fd.productOverview }}
                  </p>
                </div>
              }
              
              @if (fd.productScale) {
                <div>
                  <h2 class="text-3xl font-display font-medium text-[var(--accent)] mb-6">Platform at a Glance</h2>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    @for (scale of fd.productScale; track scale.metric) {
                      <div class="space-y-2">
                        <div class="text-3xl font-display font-medium text-[var(--text-primary)]">{{ scale.metric }}</div>
                        <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">{{ scale.label }}</div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </section>

          <!-- Sub Products Grid -->
          @if (fd.subProducts) {
            <section class="border-t border-[var(--border)] pt-16 space-y-12">
              <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Product Areas</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                @for (sp of fd.subProducts; track sp.name) {
                  <div class="space-y-8 p-8 border border-[var(--border)] relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div>
                      <h3 class="text-2xl font-display font-medium text-[var(--accent)] mb-2 relative z-10">{{ sp.name }}</h3>
                      <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest relative z-10">{{ sp.label }}</div>
                    </div>
                    <p class="text-lg text-[var(--text-primary)]/60 font-sans font-light leading-relaxed relative z-10">
                      {{ sp.description }}
                    </p>
                    <div class="space-y-4 relative z-10 pt-4 border-t border-[var(--border)]">
                      <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Capabilities</div>
                      <div class="flex flex-wrap gap-3">
                        @for (cap of sp.capabilities; track cap) {
                          <span class="text-sm font-sans text-[var(--text-primary)]/80 border-b border-[var(--border)] pb-1">{{ cap }}</span>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </section>
          }

          <!-- Product Capabilities Grid -->
          @if (fd.capabilities) {
            <section class="border-t border-[var(--border)] pt-16 space-y-12">
              <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Platform Capabilities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                @for (cap of fd.capabilities; track cap.name) {
                  <div class="border-b border-[var(--border)] pb-4">
                    <div class="text-lg font-medium text-[var(--text-primary)] font-display">{{ cap.name }}</div>
                  </div>
                }
              </div>
            </section>
          }

          <!-- Career Story Timeline -->
          @if (fd.visionWavesTimeline) {
            <section class="border-t border-[var(--border)] pt-16 space-y-12">
              <h2 class="text-3xl font-display font-medium text-[var(--accent)]">VisionWaves Career Progression</h2>
              <div class="flex flex-col md:flex-row gap-8 md:items-start pt-8 relative">
                <!-- Visual Connection Line -->
                <div class="hidden md:block absolute top-12 left-0 right-0 h-px bg-[var(--border)] -z-10"></div>
                
                @for (item of fd.visionWavesTimeline.items; track item.title; let isFirst = $first) {
                  <div class="flex-1 space-y-4">
                    <div class="w-2 h-2 rounded-full bg-white hidden md:block"></div>
                    <div class="space-y-1">
                      <h3 class="text-lg font-medium text-[var(--accent)] font-display">{{ item.title }}</h3>
                      <div class="text-xs font-sans text-[var(--text-primary)]/60 uppercase tracking-widest">{{ item.subtitle }}</div>
                    </div>
                  </div>
                }
              </div>
            </section>
          }

          <!-- Engineering Journey & Contribution -->
          <section class="border-t border-[var(--border)] pt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
            @if (fd.engineeringJourney) {
              <div class="space-y-12">
                <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Engineering Journey</h2>
                <div class="space-y-8">
                  <p class="text-lg text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
                    {{ fd.engineeringJourney.narrative }}
                  </p>
                  <div class="flex flex-col space-y-6 pt-4">
                    @for (stage of fd.engineeringJourney.stages; track stage; let i = $index) {
                      <div class="flex items-center gap-6">
                        <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Stage 0{{ i + 1 }}</div>
                        <div class="w-12 h-px bg-[var(--border)]"></div>
                        <div class="text-lg font-medium text-[var(--text-primary)] font-display">{{ stage }}</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            } @else {
              <div></div> <!-- Spacer -->
            }

            <div class="space-y-12">
              <h2 class="text-3xl font-display font-medium text-[var(--accent)]">My Contribution</h2>
              <ul class="space-y-6">
                @for (contrib of fd.personalContribution; track contrib) {
                  <li class="flex items-start gap-4 text-base text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">
                    <span class="text-[var(--text-primary)] mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                    <span>{{ contrib }}</span>
                  </li>
                }
              </ul>
            </div>
          </section>

          <!-- Tech Stack & Real World Domains -->
          <section class="border-t border-[var(--border)] pt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div class="space-y-12">
              <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Technology Stack</h2>
              <div class="flex flex-wrap gap-4">
                @for (tech of p.techStack; track tech) {
                  <span class="px-4 py-2 border border-[var(--border)] rounded text-xs font-sans text-[var(--text-primary)]/60 uppercase tracking-widest">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            @if (fd.realWorldAreas) {
              <div class="space-y-12">
                <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Enterprise Domains</h2>
                <div class="flex flex-wrap gap-4">
                  @for (area of fd.realWorldAreas; track area) {
                    <span class="px-4 py-2 bg-[var(--text-primary)]/5 border border-[var(--border)] rounded text-xs font-sans text-[var(--text-primary)]/80 uppercase tracking-widest">
                      {{ area }}
                    </span>
                  }
                </div>
              </div>
            }
          </section>

        } @else if (p.caseStudy; as cs) {
          
          <!-- STANDARD CASE STUDY RENDERER -->

          <!-- 2. Benchmark Metric Cards Grid -->
          <section class="border-t border-[var(--border)] pt-16 space-y-12">
            <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Metrics</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              
              <div class="space-y-4 border-b border-[var(--border)] pb-6">
                <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Max Throughput</div>
                <div class="text-4xl font-display font-medium text-[var(--text-primary)]">{{ cs.performanceData.throughputQps.toLocaleString() }}</div>
                <div class="text-sm font-sans text-[var(--text-primary)]/60 font-light">Peak ops / sec</div>
              </div>
              
              <div class="space-y-4 border-b border-[var(--border)] pb-6">
                <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Tail Latency</div>
                <div class="text-4xl font-display font-medium text-[var(--text-primary)]">{{ cs.performanceData.p99LatencyMs }}ms</div>
                <div class="text-sm font-sans text-[var(--text-primary)]/60 font-light">p99 End-to-end</div>
              </div>

              <div class="space-y-4 border-b border-[var(--border)] pb-6">
                <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Lighthouse</div>
                <div class="text-4xl font-display font-medium text-[var(--text-primary)]">{{ cs.performanceData.performanceScore }}</div>
                <div class="text-sm font-sans text-[var(--text-primary)]/60 font-light">Perfect 100 Score</div>
              </div>

              <div class="space-y-4 border-b border-[var(--border)] pb-6">
                <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">Scale</div>
                <div class="text-4xl font-display font-medium text-[var(--text-primary)]">B2B</div>
                <div class="text-sm font-sans text-[var(--text-primary)]/60 font-light">{{ cs.performanceData.usersServed }}</div>
              </div>

            </div>
          </section>

          <!-- 3. Project Overview & Problem Statement -->
          <section class="border-t border-[var(--border)] pt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div class="space-y-6">
              <h3 class="text-2xl font-display font-medium text-[var(--accent)]">Overview</h3>
              <p class="text-base text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">{{ cs.projectOverview }}</p>
            </div>

            <div class="space-y-6">
              <h3 class="text-2xl font-display font-medium text-[var(--accent)]">The Challenge</h3>
              <p class="text-base text-[var(--text-primary)]/60 font-sans font-light leading-relaxed">{{ cs.problemStatement }}</p>
            </div>
          </section>

          <!-- 4. Categorized Tech Stack -->
          <section class="border-t border-[var(--border)] pt-16 space-y-12">
            <h2 class="text-3xl font-display font-medium text-[var(--accent)]">Tech Stack</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
              @for (cat of cs.techStackCategorized; track cat.category) {
                <div class="space-y-6">
                  <h3 class="text-xs font-sans text-[var(--accent)]/40 uppercase tracking-widest border-b border-[var(--border)] pb-4">{{ cat.category }}</h3>
                  <div class="flex flex-wrap gap-4">
                    @for (item of cat.items; track item.name) {
                      <span class="text-sm font-sans text-[var(--text-primary)]/80">{{ item.name }}</span>
                    }
                  </div>
                </div>
              }
            </div>
          </section>

        }

        <!-- Next / Previous Navigation -->
        <section class="border-t border-[var(--border)] pt-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          @if (prevProject(); as prev) {
            <a [routerLink]="['/projects', prev.slug]" class="w-full sm:w-auto text-left group">
              <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest mb-2 group-hover:text-[var(--text-primary)] transition-colors">← Previous</div>
              <div class="text-xl font-display font-medium text-[var(--text-primary)]">{{ prev.title }}</div>
            </a>
          } @else {
            <div></div>
          }

          @if (nextProject(); as next) {
            <a [routerLink]="['/projects', next.slug]" class="w-full sm:w-auto text-right group">
              <div class="text-xs font-sans text-[var(--text-primary)]/40 uppercase tracking-widest mb-2 group-hover:text-[var(--text-primary)] transition-colors">Next →</div>
              <div class="text-xl font-display font-medium text-[var(--text-primary)]">{{ next.title }}</div>
            </a>
          }
        </section>
      </div>
    } @else {
      <!-- 404 Project Not Found -->
      <div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-8">
        <h2 class="text-6xl font-display font-medium text-[var(--accent)]">404</h2>
        <p class="text-lg text-[var(--text-primary)]/60 font-sans max-w-md">The project you requested does not exist.</p>
        <a routerLink="/projects" class="text-[var(--text-primary)] hover:opacity-70 transition-opacity font-medium tracking-wide border-b border-white pb-1">
          Return to Projects
        </a>
      </div>
    }
  `
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly portfolioService = inject(PortfolioService);

  private readonly slugSignal = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') || '')),
    { initialValue: '' }
  );

  readonly project = computed(() => this.portfolioService.getProjectBySlug(this.slugSignal()));

  readonly prevProject = computed(() => {
    const all = this.portfolioService.projects();
    const idx = all.findIndex(p => p.slug === this.slugSignal());
    return idx > 0 ? all[idx - 1] : undefined;
  });

  readonly nextProject = computed(() => {
    const all = this.portfolioService.projects();
    const idx = all.findIndex(p => p.slug === this.slugSignal());
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  });
}
