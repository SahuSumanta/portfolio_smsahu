import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ScrollRevealDirective],
  template: `
    <div class="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-32 overflow-x-hidden">
      <!-- Minimal Header -->
      <header appScrollReveal direction="up" class="space-y-6 max-w-4xl border-b border-[var(--border)] pb-16">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-white tracking-tighter leading-[1.1]">
          Contact
        </h1>

        <p class="text-lg md:text-2xl text-white/60 font-sans font-light leading-relaxed max-w-3xl">
          Whether you are scaling backend architectures, building complex UIs, or looking for a technical partner, let's connect.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-8 border-t border-[var(--border)]">
          <div class="space-y-2">
            <div class="text-xs font-sans text-white/40 uppercase tracking-widest">Email</div>
            <div class="text-base font-medium text-white">sumantasahu.sm&#64;gmail.com</div>
          </div>
          <div class="space-y-2">
            <div class="text-xs font-sans text-white/40 uppercase tracking-widest">Phone</div>
            <div class="text-base font-medium text-white">+91 6370133571</div>
          </div>
          <div class="space-y-2">
            <div class="text-xs font-sans text-white/40 uppercase tracking-widest">Location</div>
            <div class="text-base font-medium text-white">Pune, India</div>
          </div>
          <div class="space-y-2">
            <div class="text-xs font-sans text-white/40 uppercase tracking-widest">Status</div>
            <div class="text-base font-medium text-white">Available for Work</div>
          </div>
        </div>
      </header>

      <section appScrollReveal direction="up" class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <!-- Direct Consultation Request Form -->
        <div class="space-y-12">
          <h2 class="text-3xl font-display font-medium text-white">Send a Message</h2>
          
          <form (ngSubmit)="onFormSubmit()" class="space-y-8 relative">
            <div class="space-y-3">
              <label class="block text-xs font-sans text-white/40 uppercase tracking-widest">Name</label>
              <input
                type="text"
                required
                [(ngModel)]="formName"
                name="formName"
                class="w-full pb-3 bg-transparent border-b border-[var(--border)] text-white text-lg focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                placeholder="Jane Doe"
              />
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-sans text-white/40 uppercase tracking-widest">Email</label>
              <input
                type="email"
                required
                [(ngModel)]="formEmail"
                name="formEmail"
                class="w-full pb-3 bg-transparent border-b border-[var(--border)] text-white text-lg focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                placeholder="jane&#64;example.com"
              />
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-sans text-white/40 uppercase tracking-widest">Message</label>
              <textarea
                rows="4"
                required
                [(ngModel)]="formMessage"
                name="formMessage"
                class="w-full pb-3 bg-transparent border-b border-[var(--border)] text-white text-lg focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/20"
                placeholder="How can I help you?"
              ></textarea>
            </div>

            @if (formSubmitted()) {
              <div class="text-white text-sm font-sans flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-white"></span>
                <span>Message received. I will get back to you soon.</span>
              </div>
            } @else {
              <button
                type="submit"
                class="text-lg font-medium text-white hover:opacity-70 transition-opacity border-b border-white pb-1"
              >
                Send Message ↗
              </button>
            }
          </form>
        </div>

        <!-- FAQ -->
        <div class="space-y-12">
          <h2 class="text-3xl font-display font-medium text-white">FAQ</h2>
          
          <div class="space-y-12">
            <div class="space-y-4">
              <h4 class="text-xl font-medium text-white font-display">What is your availability?</h4>
              <p class="text-base text-white/60 font-sans font-light leading-relaxed">
                I am currently open to discussing new Full Stack Engineering opportunities.
              </p>
            </div>
            <div class="space-y-4">
              <h4 class="text-xl font-medium text-white font-display">Do you work remotely?</h4>
              <p class="text-base text-white/60 font-sans font-light leading-relaxed">
                Yes, I am comfortable with remote, hybrid, or on-site arrangements in Pune, India. I communicate effectively across teams.
              </p>
            </div>
            <div class="space-y-4">
              <h4 class="text-xl font-medium text-white font-display">What is your core expertise?</h4>
              <p class="text-base text-white/60 font-sans font-light leading-relaxed">
                My expertise lies in Angular, Node.js, and scaling applications across enterprise environments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ContactComponent {
  formName = '';
  formEmail = '';
  formMessage = '';
  readonly formSubmitted = signal<boolean>(false);

  onFormSubmit(): void {
    if (!this.formName || !this.formEmail || !this.formMessage) return;
    this.formSubmitted.set(true);
    setTimeout(() => {
      this.formSubmitted.set(false);
      this.formName = '';
      this.formEmail = '';
      this.formMessage = '';
    }, 6000);
  }
}
