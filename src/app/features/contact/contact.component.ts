import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface ContactChannel {
  id: string;
  name: string;
  handle: string;
  description: string;
  url: string;
  actionText: string;
  isEmail?: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Contact"
      title="Let's talk about "
      accent="what you're building."
      lead="Whether you're scaling a platform, architecting a real-time system, or looking for an engineering partner — reach out through any of the channels below."
    />

    <div class="container-x py-16 md:py-24 space-y-20">

      <!-- Status & Quick Overview Bar -->
      <dl class="grid sm:grid-cols-3 gap-8 border-b border-zinc-800/80 pb-12">
        <div class="space-y-1.5">
          <dt class="eyebrow eyebrow-plain text-zinc-500">Primary Email</dt>
          <dd>
            <a href="mailto:sumantasahu.sm@gmail.com" class="link-u font-display text-xl tracking-tight text-white hover:text-[var(--accent)] transition-colors">
              sumantasahu.sm&#64;gmail.com
            </a>
          </dd>
        </div>
        <div class="space-y-1.5">
          <dt class="eyebrow eyebrow-plain text-zinc-500">Location &amp; Timezone</dt>
          <dd class="font-display text-xl tracking-tight text-white">Pune, India <span class="font-mono text-xs text-zinc-500 ml-1">(IST / UTC+5:30)</span></dd>
        </div>
        <div class="space-y-1.5">
          <dt class="eyebrow eyebrow-plain text-zinc-500">Engineering Availability</dt>
          <dd class="font-display text-xl tracking-tight flex items-center gap-3 text-white">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]"></span>
            </span>
            Open to opportunities
          </dd>
        </div>
      </dl>

      <!-- Main Grid: Direct Channels (Left) & FAQs (Right) -->
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        <!-- Direct Social & Email Channels (Replacing the static form) -->
        <section class="lg:col-span-7" aria-labelledby="channels-title">
          <div class="flex items-center gap-3 font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-3">
            <span class="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <span>Direct Channels</span>
          </div>

          <h2 id="channels-title" class="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-white">
            Connect <span class="serif-em">directly.</span>
          </h2>

          <p class="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
            Reach out directly for contracts, full-time engineering roles, or architecture advisory. Typical response time is under 24 hours.
          </p>

          <div class="grid sm:grid-cols-2 gap-4">

            <!-- 1. Email Channel Card -->
            <div class="channel-card sm:col-span-2 group relative p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <div class="icon-box w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/40 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-base font-medium text-white flex items-center gap-2">
                      Email
                      <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                        Primary
                      </span>
                    </h3>
                    <p class="font-mono text-xs text-zinc-400 mt-0.5">sumantasahu.sm&#64;gmail.com</p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    (click)="copyEmail($event)"
                    class="px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
                    [attr.aria-label]="copiedEmail() ? 'Email address copied' : 'Copy email address'"
                  >
                    {{ copiedEmail() ? '✓ Copied' : 'Copy' }}
                  </button>
                  <a
                    href="mailto:sumantasahu.sm@gmail.com"
                    class="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors inline-flex items-center gap-1.5"
                  >
                    Compose <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <p class="text-xs text-zinc-400 mt-3 pt-3 border-t border-zinc-800/60 leading-relaxed font-sans">
                Best for formal engineering inquiries, architecture proposals, and job opportunities.
              </p>
            </div>

            <!-- 2. LinkedIn Channel Card -->
            <a
              href="https://linkedin.com/in/sahusumanta"
              target="_blank"
              rel="noopener noreferrer"
              class="channel-card group p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-3.5">
                  <div class="icon-box w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[#0a66c2] group-hover:border-[#0a66c2]/40 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                  </div>
                  <span class="text-zinc-500 group-hover:text-white transition-colors text-sm font-mono">↗</span>
                </div>
                <h3 class="text-base font-medium text-white group-hover:text-white">LinkedIn</h3>
                <p class="font-mono text-xs text-zinc-400 mt-0.5">in/sahusumanta</p>
                <p class="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans">
                  Professional experience, peer recommendations, and enterprise network.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 font-mono text-[11px] text-[var(--accent)] uppercase tracking-wider flex items-center gap-1">
                <span>View Profile</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            <!-- 3. Twitter / X Channel Card -->
            <a
              href="https://x.com/sahusumanta"
              target="_blank"
              rel="noopener noreferrer"
              class="channel-card group p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-3.5">
                  <div class="icon-box w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span class="text-zinc-500 group-hover:text-white transition-colors text-sm font-mono">↗</span>
                </div>
                <h3 class="text-base font-medium text-white group-hover:text-white">Twitter / X</h3>
                <p class="font-mono text-xs text-zinc-400 mt-0.5">&#64;sahusumanta</p>
                <p class="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans">
                  Engineering discussions, frontend performance thoughts, and open DMs.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 font-mono text-[11px] text-zinc-300 group-hover:text-white uppercase tracking-wider flex items-center gap-1">
                <span>Follow &amp; Message</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            <!-- 4. Instagram Channel Card -->
            <a
              href="https://instagram.com/sahusumanta"
              target="_blank"
              rel="noopener noreferrer"
              class="channel-card group p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-3.5">
                  <div class="icon-box w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[#e4405f] group-hover:border-[#e4405f]/40 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <span class="text-zinc-500 group-hover:text-white transition-colors text-sm font-mono">↗</span>
                </div>
                <h3 class="text-base font-medium text-white group-hover:text-white">Instagram</h3>
                <p class="font-mono text-xs text-zinc-400 mt-0.5">&#64;sahusumanta</p>
                <p class="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans">
                  Behind the scenes, creative side pursuits, and visual updates.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 font-mono text-[11px] text-zinc-300 group-hover:text-white uppercase tracking-wider flex items-center gap-1">
                <span>View Instagram</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            <!-- 5. GitHub Channel Card -->
            <a
              href="https://github.com/SahuSumanta"
              target="_blank"
              rel="noopener noreferrer"
              class="channel-card group p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-3.5">
                  <div class="icon-box w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </div>
                  <span class="text-zinc-500 group-hover:text-white transition-colors text-sm font-mono">↗</span>
                </div>
                <h3 class="text-base font-medium text-white group-hover:text-white">GitHub</h3>
                <p class="font-mono text-xs text-zinc-400 mt-0.5">github.com/SahuSumanta</p>
                <p class="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans">
                  Open source repositories, personal tools, and public code samples.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 font-mono text-[11px] text-zinc-300 group-hover:text-white uppercase tracking-wider flex items-center gap-1">
                <span>Explore Code</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

          </div>
        </section>

        <!-- Right Column: Engineering FAQ & Working Preferences -->
        <section class="lg:col-span-5" aria-labelledby="faq-title">
          <div class="flex items-center gap-3 font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase mb-3">
            <span class="inline-block w-2 h-2 rounded-full bg-zinc-600"></span>
            <span>Preferences</span>
          </div>

          <h2 id="faq-title" class="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-white">
            Good to <span class="serif-em">know.</span>
          </h2>

          <p class="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 font-sans">
            Quick notes on working arrangements, technical stack focus, and collaboration styles.
          </p>

          <dl class="border-t border-zinc-800/80 divide-y divide-zinc-800/80">
            @for (f of faq; track f.q) {
              <div class="py-6 space-y-2">
                <dt class="font-display text-lg font-medium tracking-tight text-zinc-100">{{ f.q }}</dt>
                <dd class="text-zinc-400 leading-relaxed text-sm font-sans">{{ f.a }}</dd>
              </div>
            }
          </dl>
        </section>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .channel-card {
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .channel-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.7);
    }
  `]
})
export class ContactComponent {
  readonly copiedEmail = signal<boolean>(false);

  readonly faq = [
    {
      q: 'What is your current availability?',
      a: 'I am actively open to discussing full-time senior engineering opportunities, technical leadership roles, and selected architecture contracts.'
    },
    {
      q: 'Do you work remotely or hybrid?',
      a: 'Yes — based in Pune, India, and fully equipped for remote collaboration across global teams, asynchronous workflows, or on-site arrangements.'
    },
    {
      q: 'What are your core technology strengths?',
      a: 'Angular (Signals, RxJS, NgRx), cross-platform Ionic/Capacitor, Node.js and Go backends, IoT real-time telemetry, and AI/LLM product integrations.'
    },
    {
      q: 'What is the fastest way to get in touch?',
      a: 'A direct email to sumantasahu.sm@gmail.com or a message on LinkedIn / Twitter. I typically respond within 24 hours.'
    }
  ];

  copyEmail(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('sumantasahu.sm@gmail.com').then(() => {
        this.copiedEmail.set(true);
        setTimeout(() => this.copiedEmail.set(false), 2400);
      });
    }
  }
}
