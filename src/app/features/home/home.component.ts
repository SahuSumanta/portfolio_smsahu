import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { BlogService } from '../../core/services/blog.service';
import { Project } from '../../core/models/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';
import { Hero3DSceneComponent } from '../../shared/components/hero-3d-scene/hero-3d-scene.component';
import { SkillsDirectoryComponent } from '../../shared/components/skills-directory/skills-directory.component';

interface CaseView {
  project: Project;
  index: string;
  role: string;
  problem: string;
  challenge: string;
  hasImage: boolean;
}

interface Token { t: string; c?: 'k' | 'f' | 's' | 'm' | 'p'; }

/** Role labels per project — taken from the existing experience/case-study content. */
const ROLES: Record<string, string> = {
  'mechoshade-bms': 'Software Engineer · Softdel',
  'talent-singularity': 'Frontend architecture & UI — sole owner',
  'databyte': 'Software Engineer · VisionWaves',
  'humain': 'Software Engineer · VisionWaves'
};

/** Index of the personalContribution entry that best describes the engineering challenge (flagship projects). */
const FLAGSHIP_CHALLENGE_INDEX: Record<string, number> = { databyte: 1, humain: 3 };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, Hero3DSceneComponent, SkillsDirectoryComponent],
  styleUrl: './home.component.css',
  template: `
    <!-- ================= HERO ================= -->
    <section class="hero relative isolate grain overflow-hidden min-h-[100svh] flex flex-col justify-between" aria-labelledby="hero-title">
      <div class="hero-horizon absolute inset-0 -z-10"></div>
      <div class="grid-lines -z-10"></div>
      <div class="glow drift-a -z-10" style="width:46vw;height:46vw;left:-12vw;top:-18vw;background:var(--accent-deep);opacity:.45"></div>
      <div class="glow drift-b -z-10 parallax" style="--p:60px;width:56vw;height:32vw;left:50%;bottom:-16vw;translate:-50% 0;background:var(--accent);opacity:.55"></div>

      <div class="container-x flex-1 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-28 pb-10">
        <!-- Hero Text Column -->
        <div class="lg:col-span-7 flex flex-col justify-center z-10">
          <p class="eyebrow fade-in" style="--d:150ms">Software Engineer — Pune, India</p>

          <h1 id="hero-title" class="hero-title mt-6">
            <span class="rise"><span style="--d:250ms">Engineering</span></span>
            <span class="rise"><span style="--d:370ms"><em class="serif-em">thoughtful</em></span></span>
            <span class="rise"><span style="--d:490ms">digital experiences.</span></span>
          </h1>

          <p class="lead max-w-[34rem] mt-8 fade-in" style="--d:800ms">
            I build enterprise web and mobile applications — real-time interfaces, IoT integrations and AI-enabled products — with an eye on architecture that stays maintainable as it grows.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-4 fade-in" style="--d:950ms">
            <a href="#work" class="btn btn-primary" (click)="scrollTo($event, 'work')">Explore My Work <span class="arrow">→</span></a>
            <a routerLink="/contact" class="btn btn-ghost">Get In Touch</a>
            <a href="https://github.com/SahuSumanta" target="_blank" rel="noopener noreferrer" class="btn btn-ghost !border-transparent hover:!border-[var(--border)] font-mono text-xs tracking-wider">GitHub ↗</a>
          </div>
        </div>

        <!-- 3D Interactive WebGL Sculptural Core -->
        <div class="lg:col-span-5 h-[360px] sm:h-[420px] lg:h-[520px] w-full flex items-center justify-center fade-in relative" style="--d:400ms">
          <app-hero-3d-scene class="w-full h-full" />
        </div>
      </div>

      <!-- Hero Footer Status Bar -->
      <div class="container-x pb-8 fade-in z-10" style="--d:1200ms">
        <div class="flex items-center justify-between border-t border-[var(--border)] pt-5 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
          <span class="flex items-center gap-2"><i class="live-dot" aria-hidden="true"></i> Now · Softdel — MechoSHADE BMS</span>
          <a href="#approach" class="hidden sm:inline hover:text-[var(--text-primary)] transition-colors" (click)="scrollTo($event, 'approach')">Scroll ↓</a>
        </div>
      </div>
    </section>

    <!-- ================= 01 — APPROACH (OVERLAPPING PANEL) ================= -->
    <section id="approach" class="panel-layer z-10 bg-[#0c0c0e] section-y pt-16 md:pt-24" aria-labelledby="approach-title">
      <div class="panel-specular" aria-hidden="true"></div>
      <div class="container-x">
        <div class="grid lg:grid-cols-12 gap-x-10 gap-y-12">
          <p class="eyebrow lg:col-span-3 lg:pt-3" appScrollReveal>01 — Approach</p>
          <div class="lg:col-span-9">
            <h2 id="approach-title" class="statement" appScrollReveal>
              I build software that stays <span class="serif-em">maintainable</span> as it grows — reusable interfaces, predictable state, and experiences that feel considered.
            </h2>
            <p class="lead max-w-2xl mt-10" appScrollReveal [delay]="120">
              Four years across enterprise Angular, real-time systems and cross-platform mobile have taught me that quality is mostly decided by architecture, long before the first pixel is polished.
            </p>

            <ol class="mt-20 border-t border-[var(--border)]">
              @for (p of principles; track p.n) {
                <li class="principle group" appScrollReveal [delay]="$index * 80">
                  <span class="font-mono text-xs text-[var(--text-tertiary)] tracking-widest">{{ p.n }}</span>
                  <h3 class="font-display text-[var(--fs-h3)] font-medium tracking-tight">{{ p.title }}</h3>
                  <p class="text-[var(--text-secondary)] leading-relaxed max-w-md">{{ p.body }}</p>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 02 — SELECTED WORK (OVERLAPPING PANEL) ================= -->
    <section id="work" class="panel-layer z-20 bg-[#08080a] section-y pt-16 md:pt-24" aria-labelledby="work-title">
      <div class="panel-specular" aria-hidden="true"></div>
      <div class="container-x">
        <header class="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 md:pb-24" appScrollReveal>
          <div>
            <p class="eyebrow mb-6">02 — Selected work</p>
            <h2 id="work-title" class="h-display max-w-[14ch]">Products, <span class="serif-em">not</span> screenshots.</h2>
          </div>
          <a routerLink="/projects" class="btn btn-ghost self-start md:self-auto">All projects <span class="arrow">→</span></a>
        </header>

        <div class="flex flex-col gap-24 md:gap-40">
          @for (c of cases(); track c.project.id; let odd = $odd) {
            <article class="case grid grid-cols-12 items-center gap-y-8" [class.case-odd]="odd" appScrollReveal>
              <a
                [routerLink]="['/projects', c.project.slug]"
                class="case-visual frame group col-span-12"
                [attr.aria-label]="'Read the ' + c.project.title + ' case study'"
              >
                <div class="frame-bar"><i></i><i></i><i></i>
                  <span class="ml-3 font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase">{{ c.project.category }}</span>
                </div>
                <div class="relative aspect-[16/10] overflow-hidden bg-[var(--ink-900)]">
                  @if (c.hasImage) {
                    <img
                      [src]="c.project.thumbnailUrl"
                      [alt]="c.project.title + ' interface'"
                      loading="lazy" decoding="async" width="1200" height="750"
                      class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  } @else {
                    <div class="placeholder absolute inset-0 grid place-items-center">
                      <span class="font-display text-4xl tracking-tight text-white/80">{{ c.project.title }}</span>
                    </div>
                  }
                  <div class="case-sheen"></div>
                </div>
              </a>

              <div class="case-card surface-elevated col-span-12 p-7 md:p-10">
                <div class="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  <span><span class="text-[var(--accent)]">{{ c.index }}</span> &nbsp;/&nbsp; {{ c.project.completionYear }}</span>
                  <span>{{ c.project.status }}</span>
                </div>
                <h3 class="font-display text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-medium tracking-[-0.03em] leading-[1.05] mt-5">{{ c.project.title }}</h3>
                <p class="text-[var(--text-secondary)] mt-4 leading-relaxed">{{ c.project.tagline }}</p>

                <dl class="mt-8 space-y-5 text-sm">
                  <div>
                    <dt class="eyebrow eyebrow-plain mb-1.5">Problem</dt>
                    <dd class="text-[var(--text-primary)]/80 leading-relaxed line-clamp-3">{{ c.problem }}</dd>
                  </div>
                  <div>
                    <dt class="eyebrow eyebrow-plain mb-1.5">My role</dt>
                    <dd class="text-[var(--text-primary)]/80">{{ c.role }}</dd>
                  </div>
                  @if (c.challenge) {
                    <div>
                      <dt class="eyebrow eyebrow-plain mb-1.5">Engineering challenge</dt>
                      <dd class="text-[var(--text-primary)]/80 leading-relaxed line-clamp-3">{{ c.challenge }}</dd>
                    </div>
                  }
                </dl>

                <ul class="flex flex-wrap gap-2 mt-8" aria-label="Technologies used">
                  @for (t of c.project.techStack.slice(0, 6); track t) { <li class="tag">{{ t }}</li> }
                </ul>

                <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a [routerLink]="['/projects', c.project.slug]" class="link-u text-sm font-medium">Read case study →</a>
                  @if (c.project.githubUrl) { <a [href]="c.project.githubUrl" target="_blank" rel="noopener noreferrer" class="link-muted text-sm">Source ↗</a> }
                  @if (c.project.demoUrl) { <a [href]="c.project.demoUrl" target="_blank" rel="noopener noreferrer" class="link-muted text-sm">Live demo ↗</a> }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- ================= 03 — TECHNICAL SKILLS DIRECTORY ================= -->
    <section id="skills" class="panel-layer z-30 bg-[#080808] section-y pt-16 md:pt-24 border-t border-white/10" aria-label="Technical Skills Directory">
      <div class="panel-specular" aria-hidden="true"></div>
      <app-skills-directory />
    </section>

    <!-- ================= 04 — ENGINEERING DEPTH (OVERLAPPING PANEL) ================= -->
    <section class="panel-layer z-40 depth relative isolate overflow-hidden section-y pt-16 md:pt-24 bg-[#0a0a0c] border-t border-white/10" aria-labelledby="depth-title">
      <div class="panel-specular" aria-hidden="true"></div>
      <div class="glow -z-10" style="width:40vw;height:40vw;right:-14vw;top:-10vw;background:var(--accent-deep);opacity:.35"></div>
      <div class="container-x">
        <header class="max-w-3xl pb-16 md:pb-24" appScrollReveal>
          <p class="eyebrow mb-6">04 — Engineering depth</p>
          <h2 class="h-display">How the work gets <span class="serif-em">built.</span></h2>
          <p class="lead mt-8">A few of the problems I keep returning to — real-time data, state that stays predictable, and interfaces that hold up under load.</p>
        </header>

        <div class="grid grid-cols-12 gap-5 md:gap-6">
          <!-- Code -->
          <div class="col-span-12 lg:col-span-7 frame" appScrollReveal>
            <div class="frame-bar"><i></i><i></i><i></i>
              <span class="ml-3 font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase">telemetry.service.ts — illustrative pattern</span>
            </div>
            <pre class="code" tabindex="0" aria-label="Illustrative RxJS pattern for resilient real-time streams"><code>@for (line of code; track $index) {<span class="ln">{{ $index + 1 }}</span>@for (tok of line; track $index) {<span [class]="tok.c ? 't-' + tok.c : ''">{{ tok.t }}</span>}
}</code></pre>
          </div>

          <div class="col-span-12 lg:col-span-5 flex flex-col gap-5 md:gap-6">
            <article class="note surface p-7 md:p-8 flex-1" appScrollReveal [delay]="80">
              <p class="eyebrow eyebrow-plain mb-4 text-[var(--accent)]">Real-time interfaces</p>
              <h3 class="font-display text-xl font-medium tracking-tight">Streams that clean up after themselves.</h3>
              <p class="text-[var(--text-secondary)] mt-3 leading-relaxed text-sm">On long-lived IoT dashboards, unclosed WebSocket subscriptions leaked memory during rapid navigation. Disciplined RxJS teardown patterns across every telemetry component fixed it.</p>
            </article>
            <article class="note surface p-7 md:p-8 flex-1" appScrollReveal [delay]="160">
              <p class="eyebrow eyebrow-plain mb-4 text-[var(--accent)]">Frontend architecture</p>
              <h3 class="font-display text-xl font-medium tracking-tight">State that stays predictable.</h3>
              <p class="text-[var(--text-secondary)] mt-3 leading-relaxed text-sm">For Talent Singularity, custom RxJS pipelines manage the browser MediaStream lifecycle while NgRx store slices keep audio/video rendering decoupled from background state — built for 700+ concurrent candidates.</p>
            </article>
          </div>

          <!-- Data flow diagram -->
          <div class="col-span-12 surface-elevated p-7 md:p-10 overflow-hidden" appScrollReveal>
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p class="eyebrow eyebrow-plain mb-3 text-[var(--accent)]">IoT &amp; device communication</p>
                <h3 class="font-display text-2xl font-medium tracking-tight">From hardware sensor to rendered UI.</h3>
              </div>
              <p class="font-mono text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">MechoSHADE BMS — data flow</p>
            </div>
            <ol class="flow" aria-label="Data flow from hardware sensors to the user interface">
              @for (n of flow; track n.name; let i = $index) {
                <li class="flow-node">
                  <span class="flow-dot" aria-hidden="true"></span>
                  <span class="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)]">0{{ i + 1 }}</span>
                  <strong class="font-display text-base font-medium tracking-tight">{{ n.name }}</strong>
                  <span class="text-xs text-[var(--text-secondary)] leading-snug">{{ n.note }}</span>
                </li>
              }
            </ol>
          </div>

          <article class="note surface p-7 md:p-10 col-span-12 lg:col-span-5" appScrollReveal>
            <p class="eyebrow eyebrow-plain mb-4 text-[var(--accent)]">Enterprise &amp; mobile</p>
            <h3 class="font-display text-xl font-medium tracking-tight">One Angular + Ionic codebase, web and mobile.</h3>
            <p class="text-[var(--text-secondary)] mt-3 leading-relaxed text-sm">Offline-first caching and retry strategies on API requests handle sporadic device connection drops gracefully — and accessibility is treated as part of the build, with keyboard-navigable tables and accessible device-selection dialogs.</p>
          </article>
          <article class="note surface p-7 md:p-10 col-span-12 lg:col-span-7" appScrollReveal [delay]="100">
            <p class="eyebrow eyebrow-plain mb-4 text-[var(--accent)]">AI-assisted engineering</p>
            <h3 class="font-display text-xl font-medium tracking-tight">AI in the product, and in the workflow.</h3>
            <p class="text-[var(--text-secondary)] mt-3 leading-relaxed text-sm max-w-xl">Shipped speech and LLM pipelines (Whisper, Groq, OpenAI API) inside an AI interviewing product. Day to day, I work with Cursor, Claude Code and GitHub Copilot — and review their output like any other pull request.</p>
            <a routerLink="/skills" class="link-u text-sm font-medium inline-block mt-6">Full skill breakdown →</a>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= 05 — EXPERIENCE (OVERLAPPING PANEL) ================= -->
    <section class="panel-layer z-50 bg-[#08080a] section-y pt-16 md:pt-24 border-t border-white/10" aria-labelledby="exp-title">
      <div class="panel-specular" aria-hidden="true"></div>
      <div class="container-x">
        <div class="grid lg:grid-cols-12 gap-x-10 gap-y-10">
          <header class="lg:col-span-4" appScrollReveal>
            <p class="eyebrow mb-6">05 — Experience</p>
            <h2 id="exp-title" class="h-section">A short <span class="serif-em">record.</span></h2>
            <a routerLink="/experience" class="link-u text-sm font-medium inline-block mt-8">Full experience →</a>
          </header>
          <ol class="lg:col-span-8 border-t border-[var(--border)]">
            @for (e of experience(); track e.id) {
              <li class="xp group" appScrollReveal>
                <span class="font-mono text-xs tracking-[0.12em] uppercase text-[var(--text-tertiary)] pt-1.5">{{ fmt(e.startDate) }} — {{ e.current ? 'Present' : fmt(e.endDate) }}</span>
                <div>
                  <h3 class="font-display text-[var(--fs-h3)] font-medium tracking-tight">{{ e.roleTitle }} <span class="text-[var(--text-secondary)] font-normal">· {{ e.company }}</span></h3>
                  <p class="text-[var(--text-secondary)] mt-3 leading-relaxed max-w-xl">{{ e.highlights[0] }}</p>
                  <ul class="flex flex-wrap gap-2 mt-5">
                    @for (t of e.techStack.slice(0, 5); track t) { <li class="tag">{{ t }}</li> }
                  </ul>
                </div>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>

    <!-- ================= 06 — ABOUT (OVERLAPPING PANEL) ================= -->
    <section class="panel-layer z-50 bg-[#0c0c0f] section-y pt-16 md:pt-24 border-t border-white/10" aria-labelledby="about-title">
      <div class="panel-specular" aria-hidden="true"></div>
      <div class="container-x">
        <div class="about grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div class="lg:col-span-5" appScrollReveal direction="scale">
            <div class="portrait frame">
              <img src="assets/profile-picture.png" alt="Portrait of Sumanta Sahu" loading="lazy" decoding="async" width="800" height="1000" class="w-full aspect-[4/5] object-cover" />
              <div class="portrait-tint"></div>
            </div>
          </div>
          <div class="lg:col-span-7">
            <p class="eyebrow mb-6" appScrollReveal>06 — About</p>
            <h2 id="about-title" class="h-section" appScrollReveal>Engineer first. <span class="serif-em">Teammate</span> always.</h2>
            <div class="space-y-5 mt-8 text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl" appScrollReveal [delay]="100">
              <p>I'm Sumanta — a software engineer based in Pune with four-plus years bridging scalable backend systems with declarative, component-driven web and mobile architectures in Angular and Ionic.</p>
              <p>I enjoy working directly with clients and stakeholders to turn requirements into shippable work, and I've spent much of my career mentoring junior developers and raising the bar on code review.</p>
            </div>
            <div class="mt-10 flex flex-wrap gap-4" appScrollReveal [delay]="180">
              <a routerLink="/about" class="btn btn-ghost">More about me <span class="arrow">→</span></a>
              <a routerLink="/resume" class="btn btn-ghost">Resume</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 07 — WRITING ================= -->
    @if (articles().length) {
      <section class="panel-layer z-50 bg-[#08080a] section-y pt-16 md:pt-24 border-t border-white/10 pb-20" aria-labelledby="writing-title">
        <div class="panel-specular" aria-hidden="true"></div>
        <div class="container-x">
          <div class="grid lg:grid-cols-12 gap-x-10 gap-y-10">
            <header class="lg:col-span-4" appScrollReveal>
              <p class="eyebrow mb-6">07 — Writing</p>
              <h2 id="writing-title" class="h-section">Notes from the <span class="serif-em">work.</span></h2>
              <a routerLink="/blog" class="link-u text-sm font-medium inline-block mt-8">All writing →</a>
            </header>
            <ul class="lg:col-span-8 border-t border-[var(--border)]">
              @for (a of articles(); track a.id) {
                <li appScrollReveal>
                  <a [routerLink]="['/blog', a.slug]" class="post group">
                    <span class="font-mono text-xs tracking-[0.12em] uppercase text-[var(--text-tertiary)]">{{ a.readingTimeMin }} min read</span>
                    <span>
                      <span class="block font-display text-[var(--fs-h3)] font-medium tracking-tight group-hover:text-[var(--accent)] transition-colors">{{ a.title }}</span>
                      <span class="block text-[var(--text-secondary)] mt-2 line-clamp-2 max-w-xl">{{ a.summary }}</span>
                    </span>
                    <span class="post-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
      </section>
    }
  `
})
export class HomeComponent {
  private readonly portfolio = inject(PortfolioService);
  private readonly blog = inject(BlogService);

  readonly experience = this.portfolio.experience;
  readonly articles = computed(() => this.blog.latestArticles().slice(0, 3));

  readonly cases = computed<CaseView[]>(() =>
    this.portfolio.featuredProjects().map((project, i) => {
      const cs = project.caseStudy;
      const fd = project.flagshipDetails;
      const challengeIdx = FLAGSHIP_CHALLENGE_INDEX[project.slug];
      return {
        project,
        index: String(i + 1).padStart(2, '0'),
        role: ROLES[project.slug] ?? fd?.companyContext.role ?? 'Software Engineer',
        problem: cs?.problemStatement ?? fd?.productOverview ?? fd?.companyContext.description ?? project.tagline,
        challenge: cs?.challenges ?? (challengeIdx !== undefined ? fd?.personalContribution?.[challengeIdx] ?? '' : ''),
        hasImage: !!project.thumbnailUrl && !project.thumbnailUrl.startsWith('http')
      };
    })
  );

  readonly principles = [
    { n: '01', title: 'First principles', body: 'Understand the constraints of a problem before writing code — whether it is a slow API query or a complex UI flow.' },
    { n: '02', title: 'Predictable state', body: 'Reactive patterns with RxJS and NgRx keep complex frontends maintainable and free of race conditions.' },
    { n: '03', title: 'Product-minded', body: 'Code is a means to an end: software that solves real user problems and scales gracefully with demand.' }
  ];

  /** Data flow taken from the MechoSHADE case study. */
  readonly flow = [
    { name: 'Hardware sensors', note: 'Device state & telemetry' },
    { name: 'IoT gateway', note: 'Edge aggregation' },
    { name: 'Backend API', note: 'Node.js service layer' },
    { name: 'Angular / Ionic client', note: 'Deterministic state updates' },
    { name: 'UI render', note: 'Web dashboard & mobile app' }
  ];

  readonly code: Token[][] = [
    [{ t: 'readonly ', c: 'k' }, { t: 'device$ = ' }, { t: 'this' , c: 'k'}, { t: '.socket.' }, { t: 'stream', c: 'f' }, { t: '<' }, { t: 'DeviceState', c: 'm' }, { t: '>(' }, { t: "'device/state'", c: 's' }, { t: ').' }, { t: 'pipe', c: 'f' }, { t: '(' }],
    [{ t: '  ' }, { t: 'retry', c: 'f' }, { t: '({ delay: (_, n) => ' }, { t: 'timer', c: 'f' }, { t: '(2 ** n * 500) }),' }],
    [{ t: '  ' }, { t: 'distinctUntilChanged', c: 'f' }, { t: '(isSameState),' }],
    [{ t: '  ' }, { t: 'takeUntilDestroyed', c: 'f' }, { t: '(' }, { t: 'this', c: 'k' }, { t: '.destroyRef),' }],
    [{ t: ');' }],
    [{ t: '' }],
    [{ t: '// UI reads one deterministic signal', c: 'p' }],
    [{ t: 'readonly ', c: 'k' }, { t: 'state = ' }, { t: 'toSignal', c: 'f' }, { t: '(' }, { t: 'this', c: 'k' }, { t: '.device$, { initialValue: ' }, { t: 'IDLE', c: 'm' }, { t: ' });' }]
  ];

  fmt(date?: string): string {
    if (!date) return '';
    const d = new Date(`${date}-01T00:00:00`);
    return isNaN(d.getTime()) ? date : d.toLocaleDateString('en', { month: 'short', year: 'numeric' });
  }

  scrollTo(event: Event, id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
}
