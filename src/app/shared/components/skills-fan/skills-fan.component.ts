import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal/scroll-reveal.directive';

export interface SkillDomain {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  accent: string;
  glowColor: string;
  borderColor: string;
  icon: string;
  description: string;
  productionContext: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

@Component({
  selector: 'app-skills-fan',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <div class="skills-fan-wrapper relative isolate select-none py-12 md:py-16">
      <!-- Ambient Backlight matching active card's accent -->
      <div
        class="ambient-glow absolute pointer-events-none -z-10 transition-all duration-700 ease-out"
        [style.background]="'radial-gradient(circle at 50% 40%, ' + activeDomain().glowColor + ' 0%, transparent 70%)'"
        aria-hidden="true"
      ></div>

      <!-- Controls & Header summary -->
      <div class="container-x text-center mb-12 md:mb-16">
        <p class="eyebrow mx-auto mb-4">Technical Competency</p>
        <h2 class="h-section">Disciplines arranged in <span class="serif-em">depth.</span></h2>
        <p class="lead max-w-xl mx-auto mt-4 text-sm md:text-base">
          Interactive perspective fan. Select any domain card to explore production implementations and engineering principles.
        </p>
      </div>

      <!-- The 3D Perspective Fan Stage -->
      <div class="fan-stage relative w-full overflow-hidden px-4 md:px-0">
        <div class="fan-viewport relative mx-auto flex items-center justify-center">
          @for (card of domains; track card.id; let idx = $index) {
            <div
              class="fan-card-container"
              [class.is-active]="activeId() === card.id"
              [style.--fan-offset]="idx - activeIndex()"
              [style.--total-cards]="domains.length"
              (click)="selectCard(card.id)"
              (keydown.enter)="selectCard(card.id)"
              (keydown.space)="selectCard(card.id)"
              tabindex="0"
              [attr.aria-label]="card.title + ' skill card - ' + card.subtitle"
              [attr.aria-selected]="activeId() === card.id"
              role="button"
            >
              <article
                class="fan-card relative flex flex-col justify-between overflow-hidden"
                [style.--card-accent]="card.accent"
                [style.--card-glow]="card.glowColor"
                [style.--card-border]="card.borderColor"
              >
                <!-- Subtle internal glass sheen -->
                <div class="card-sheen absolute inset-0 pointer-events-none" aria-hidden="true"></div>

                <!-- Card Header -->
                <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <span class="font-mono text-xs tracking-widest text-white/50">{{ card.index }}</span>
                  <span
                    class="domain-badge font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/80"
                  >
                    {{ card.subtitle }}
                  </span>
                </div>

                <!-- Card Body -->
                <div class="relative z-10 my-auto py-6">
                  <div
                    class="domain-icon-box w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5 text-xl"
                    [style.color]="card.accent"
                  >
                    {{ card.icon }}
                  </div>
                  <h3 class="font-display text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
                    {{ card.title }}
                  </h3>
                  <p class="text-xs md:text-sm text-white/60 line-clamp-3 mt-3 leading-relaxed">
                    {{ card.description }}
                  </p>
                </div>

                <!-- Card Footer Tech Pills -->
                <div class="relative z-10 pt-4 border-t border-white/10">
                  <div class="flex flex-wrap gap-1.5">
                    @for (tag of card.tags.slice(0, 3); track tag) {
                      <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-black/40 text-white/70 border border-white/5">
                        {{ tag }}
                      </span>
                    }
                    @if (card.tags.length > 3) {
                      <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-white/40">
                        +{{ card.tags.length - 3 }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Corner Accent Indicator -->
                <div
                  class="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                  [style.background]="'radial-gradient(circle at 100% 0%, ' + card.accent + '33 0%, transparent 70%)'"
                  aria-hidden="true"
                ></div>
              </article>
            </div>
          }
        </div>
      </div>

      <!-- Quick Selector Tabs for Mobile / Accessibility -->
      <div class="container-x mt-8 flex flex-wrap items-center justify-center gap-2 relative z-30" role="tablist">
        @for (card of domains; track card.id) {
          <button
            type="button"
            class="fan-tab px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider transition-all cursor-pointer"
            [class.active]="activeId() === card.id"
            (click)="selectCard(card.id)"
            role="tab"
            [attr.aria-selected]="activeId() === card.id"
          >
            {{ card.title }}
          </button>
        }
      </div>

      <!-- Active Domain Inspection HUD -->
      <div class="container-x mt-10 md:mt-14 max-w-4xl" appScrollReveal>
        <div
          class="hud-panel relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#0d0d10]/95 p-6 md:p-10 shadow-2xl backdrop-blur-xl"
        >
          <!-- Specular top edge -->
          <div
            class="absolute top-0 left-0 right-0 h-[1px]"
            [style.background]="'linear-gradient(90deg, transparent, ' + activeDomain().accent + ', transparent)'"
            aria-hidden="true"
          ></div>

          <div class="grid md:grid-cols-12 gap-8 items-start">
            <div class="md:col-span-7 space-y-5">
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                  Domain {{ activeDomain().index }} // Focus Area
                </span>
                <span class="h-1 w-1 rounded-full bg-white/20"></span>
                <span class="font-mono text-xs text-white/50 tracking-wider">
                  {{ activeDomain().subtitle }}
                </span>
              </div>

              <h4 class="font-display text-2xl md:text-3xl font-medium tracking-tight text-white">
                {{ activeDomain().title }}
              </h4>

              <p class="text-white/70 leading-relaxed text-sm md:text-base">
                {{ activeDomain().description }}
              </p>

              <!-- Real Production Proof Point -->
              <div class="rounded-xl border border-white/10 bg-white/[0.02] p-4 mt-4">
                <p class="font-mono text-[11px] tracking-widest uppercase text-[var(--accent)] mb-1">
                  Production Proof Point
                </p>
                <p class="text-xs md:text-sm text-white/80 leading-relaxed">
                  {{ activeDomain().productionContext }}
                </p>
              </div>
            </div>

            <div class="md:col-span-5 space-y-6 md:border-l md:border-white/10 md:pl-8">
              <div>
                <p class="font-mono text-xs tracking-widest uppercase text-white/40 mb-3">Core Stack &amp; Tools</p>
                <div class="flex flex-wrap gap-2">
                  @for (tag of activeDomain().tags; track tag) {
                    <span
                      class="px-2.5 py-1 rounded-lg font-mono text-xs border border-white/10 bg-white/5 text-white/90"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                @for (m of activeDomain().metrics; track m.label) {
                  <div>
                    <span class="block font-mono text-xs text-white/40 uppercase tracking-widest">{{ m.label }}</span>
                    <span class="block font-display text-lg font-semibold text-white mt-1">{{ m.value }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fan-stage {
      perspective: 1200px;
      perspective-origin: 50% 50%;
      height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fan-viewport {
      width: 100%;
      max-width: 900px;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
    }

    .fan-card-container {
      position: absolute;
      width: 270px;
      height: 380px;
      top: 50%;
      left: 50%;
      margin-left: -135px;
      margin-top: -190px;
      transform-style: preserve-3d;
      transition: transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), z-index 0.3s;
      cursor: pointer;
      outline: none;
    }

    /* Transform calculations for desktop fan */
    @media (min-width: 768px) {
      .fan-card-container {
        /* CSS calc based on distance from active index */
        transform:
          translateX(calc(var(--fan-offset) * 140px))
          translateZ(calc(max(0, 1 - abs(var(--fan-offset))) * 60px - abs(var(--fan-offset)) * 40px))
          rotateY(calc(var(--fan-offset) * -12deg))
          rotateZ(calc(var(--fan-offset) * 3.5deg))
          scale(calc(1 - abs(var(--fan-offset)) * 0.05));
        z-index: calc(20 - abs(var(--fan-offset)));
      }

      .fan-card-container:hover:not(.is-active) {
        transform:
          translateX(calc(var(--fan-offset) * 140px))
          translateZ(calc(max(0, 1 - abs(var(--fan-offset))) * 60px - abs(var(--fan-offset)) * 40px + 35px))
          rotateY(calc(var(--fan-offset) * -8deg))
          scale(calc(1.03 - abs(var(--fan-offset)) * 0.04));
        z-index: 25;
      }

      .fan-card-container.is-active {
        transform: translateX(0px) translateZ(80px) rotateY(0deg) rotateZ(0deg) scale(1.08);
        z-index: 30;
      }
    }

    /* Transform for mobile touch devices (<768px) */
    @media (max-width: 767px) {
      .fan-stage {
        height: 420px;
      }
      .fan-card-container {
        width: 240px;
        height: 340px;
        margin-left: -120px;
        margin-top: -170px;
        transform:
          translateX(calc(var(--fan-offset) * 45px))
          translateZ(calc(max(0, 1 - abs(var(--fan-offset))) * 40px - abs(var(--fan-offset)) * 30px))
          rotateY(calc(var(--fan-offset) * -8deg))
          scale(calc(1 - abs(var(--fan-offset)) * 0.08));
        z-index: calc(20 - abs(var(--fan-offset)));
      }
      .fan-card-container.is-active {
        transform: translateX(0px) translateZ(60px) rotateY(0deg) scale(1.05);
        z-index: 30;
      }
    }

    .fan-card {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      background: linear-gradient(145deg, rgba(26, 26, 32, 0.95) 0%, rgba(12, 12, 16, 0.98) 100%);
      border: 1px solid var(--card-border, rgba(255, 255, 255, 0.12));
      padding: 1.5rem;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 30px -10px var(--card-glow, transparent);
      transition: border-color 0.4s ease, box-shadow 0.4s ease;
    }

    .fan-card-container.is-active .fan-card {
      border-color: var(--card-accent, rgba(244, 38, 80, 0.7));
      box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.95), 0 0 50px -5px var(--card-glow, rgba(244, 38, 80, 0.4));
    }

    .card-sheen {
      background: radial-gradient(70% 50% at 50% 0%, rgba(255, 255, 255, 0.08), transparent 70%);
      mix-blend-mode: screen;
    }

    .ambient-glow {
      width: 800px;
      height: 500px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.35;
      filter: blur(80px);
    }

    .fan-tab {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.6);
    }
    .fan-tab:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    .fan-tab.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
      box-shadow: 0 4px 15px -3px rgba(244, 38, 80, 0.5);
    }
  `]
})
export class SkillsFanComponent {
  readonly activeId = signal<string>('frontend');

  readonly domains: SkillDomain[] = [
    {
      id: 'frontend',
      index: '01',
      title: 'Frontend Architecture',
      subtitle: 'Core Specialty',
      accent: '#F42650',
      glowColor: 'rgba(244, 38, 80, 0.45)',
      borderColor: 'rgba(244, 38, 80, 0.35)',
      icon: '◈',
      description: 'Declarative, signal-driven enterprise frontends engineered for longevity, predictable state, and zero race conditions.',
      productionContext: 'Architected Talent Singularity: complete UI ownership from prototype to 700+ concurrent candidate evaluation runs with NgRx store slices.',
      tags: ['Angular 17-21', 'Signals', 'TypeScript', 'RxJS', 'NgRx', 'Micro-frontends'],
      metrics: [
        { label: 'Production Apps', value: '8+ Shipped' },
        { label: 'Architecture', value: 'Signals / NgRx' }
      ]
    },
    {
      id: 'mobile',
      index: '02',
      title: 'Cross-Platform Mobile',
      subtitle: 'Enterprise Client',
      accent: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      borderColor: 'rgba(139, 92, 246, 0.35)',
      icon: '📱',
      description: 'Single-codebase web and mobile architecture delivering native feel and hardware integrations on iOS & Android.',
      productionContext: 'Engineered MechoSHADE BMS mobile client: offline-first synchronization, push alerts, and hardware-accelerated animations.',
      tags: ['Ionic Framework', 'Capacitor', 'Android SDK', 'iOS Deployments', 'Responsive UI'],
      metrics: [
        { label: 'Platforms', value: 'Web · iOS · Android' },
        { label: 'Performance', value: '60 FPS Native' }
      ]
    },
    {
      id: 'realtime',
      index: '03',
      title: 'Real-Time & Telemetry',
      subtitle: 'High Concurrency',
      accent: '#06B6D4',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      borderColor: 'rgba(6, 182, 212, 0.35)',
      icon: '⚡',
      description: 'Resilient WebSocket streams, event-driven pipelines, and telemetry dashboards that handle continuous live telemetry with zero memory leaks.',
      productionContext: 'Created disciplined RxJS teardown patterns across 24/7 building automation telemetry feeds, eliminating legacy memory leaks.',
      tags: ['WebSockets', 'RxJS Pipelines', 'Event Streams', 'Live Graphs', 'takeUntilDestroyed'],
      metrics: [
        { label: 'Telemetry Rate', value: '100+ updates/sec' },
        { label: 'Lifecycle', value: 'Leak-Free Teardown' }
      ]
    },
    {
      id: 'iot',
      index: '04',
      title: 'IoT & Hardware Systems',
      subtitle: 'Edge to Cloud',
      accent: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      icon: '⎋',
      description: 'Connecting physical building hardware to cloud backends and responsive user interfaces with deterministic state feedback.',
      productionContext: 'Integrated motor shade controllers, BACnet/IP gateways, and environmental sensors into MechoSHADE BMS with robust offline retry.',
      tags: ['BACnet/IP', 'Modbus', 'Edge Gateways', 'Sensor Telemetry', 'Device Provisioning'],
      metrics: [
        { label: 'Hardware', value: 'Industrial Shade BMS' },
        { label: 'Resilience', value: 'Exponential Retry' }
      ]
    },
    {
      id: 'backend',
      index: '05',
      title: 'Scalable APIs & Backend',
      subtitle: 'Service Layer',
      accent: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      icon: '⛁',
      description: 'Designing performant REST APIs, relational data models, and caching strategies that serve millions of transactions with low latency.',
      productionContext: 'Built and optimized Node.js / Express microservices backed by PostgreSQL & MySQL with indexed query plans and connection pooling.',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'MySQL', 'RESTful Design', 'JWT Auth'],
      metrics: [
        { label: 'Storage', value: 'SQL / Relational' },
        { label: 'API Protocols', value: 'REST & WebSocket' }
      ]
    },
    {
      id: 'ai',
      index: '06',
      title: 'AI & Engineering Tools',
      subtitle: 'Modern Workflow',
      accent: '#E2E8F0',
      glowColor: 'rgba(226, 232, 240, 0.3)',
      borderColor: 'rgba(226, 232, 240, 0.25)',
      icon: '✦',
      description: 'Integrating multimodal AI pipelines into customer-facing products while leveraging LLM agentic toolchains to accelerate development.',
      productionContext: 'Shipped Round 4 AI interview proctoring in Talent Singularity (Whisper transcription + Groq low-latency evaluation pipelines).',
      tags: ['OpenAI API', 'Groq LPU', 'Whisper Speech', 'Claude Code', 'Cursor', 'Prompt Chains'],
      metrics: [
        { label: 'AI Inference', value: 'Sub-second Voice AI' },
        { label: 'Developer DX', value: 'Agentic Workflows' }
      ]
    }
  ];

  readonly activeIndex = computed(() => {
    const idx = this.domains.findIndex(d => d.id === this.activeId());
    return idx >= 0 ? idx : 0;
  });

  readonly activeDomain = computed(() => {
    return this.domains[this.activeIndex()];
  });

  selectCard(id: string): void {
    this.activeId.set(id);
  }
}
