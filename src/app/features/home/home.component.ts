import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ScrollRevealDirective],
  template: `
    <div class="min-h-screen overflow-x-hidden pt-32 pb-24">
      
      <!-- Minimalist Typographic Hero Section -->
      <section class="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-40">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p class="text-sm font-sans text-white/40 uppercase tracking-widest">Sumanta Sahu</p>
            <h1 class="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display font-medium text-white tracking-tighter leading-[1.05]">
              Full Stack<br />
              Software Engineer.
            </h1>
            <p class="text-lg md:text-2xl text-white/60 max-w-2xl font-sans font-light leading-relaxed pt-6">
              Building scalable platforms and refined user interfaces from Pune, India.
            </p>

          <div class="flex items-center gap-6 pt-6 text-white/40">
            <!-- Web Icon -->
            <div class="flex items-center gap-2" title="Web Development">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
              <span class="text-xs font-sans uppercase tracking-widest font-medium">Web</span>
            </div>
            <!-- Android Icon -->
            <div class="flex items-center gap-2" title="Android Development">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414ZM6.477 15.3414C6.477 15.3414 6.477 15.3414 6.477 15.3414C6.477 15.3414 6.477 15.3414 6.477 15.3414C6.477 15.3414 6.477 15.3414 6.477 15.3414C6.477 15.3414 6.477 15.3414 6.477 15.3414ZM12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335ZM12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335ZM12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335ZM12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335ZM12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335ZM12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335C12.015 11.2335 12.015 11.2335 12.015 11.2335ZM12 4C14.75 4 17.2 5.37 18.72 7.5L20.21 4.9C20.35 4.67 20.65 4.59 20.88 4.73C21.12 4.88 21.19 5.18 21.05 5.41L19.51 8.08C20.46 9.49 21.01 11.18 21.01 13H2.99C2.99 11.18 3.54 9.49 4.49 8.08L2.95 5.41C2.81 5.18 2.88 4.88 3.12 4.73C3.35 4.59 3.65 4.67 3.79 4.9L5.28 7.5C6.8 5.37 9.25 4 12 4ZM7.44 11.24C6.91 11.24 6.47 10.8 6.47 10.27C6.47 9.73 6.91 9.3 7.44 9.3C7.97 9.3 8.41 9.73 8.41 10.27C8.41 10.8 7.97 11.24 7.44 11.24ZM16.56 11.24C16.03 11.24 15.59 10.8 15.59 10.27C15.59 9.73 16.03 9.3 16.56 9.3C17.09 9.3 17.53 9.73 17.53 10.27C17.53 10.8 17.09 11.24 16.56 11.24ZM3.51 14H20.49C20.49 18.06 17.2 21.36 13.14 21.36H10.86C6.8 21.36 3.51 18.06 3.51 14Z"/>
              </svg>
              <span class="text-xs font-sans uppercase tracking-widest font-medium">Android</span>
            </div>
            <!-- iOS Icon -->
            <div class="flex items-center gap-2" title="iOS Development">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.42 12.35C15.41 10.57 16.86 9.71 16.93 9.67C16.02 8.35 14.59 8.16 14.09 8.14C12.87 8.02 11.68 8.86 11.05 8.86C10.42 8.86 9.45 8.16 8.43 8.18C7.12 8.2 5.92 8.94 5.25 10.1C3.87 12.48 4.89 16.02 6.24 17.97C6.89 18.91 7.66 19.98 8.68 19.94C9.65 19.9 10.02 19.32 11.19 19.32C12.35 19.32 12.69 19.94 13.7 19.92C14.73 19.9 15.41 18.95 16.05 18.01C16.8 16.91 17.11 15.84 17.13 15.78C17.11 15.77 15.44 15.13 15.42 12.35M12.98 6.55C13.51 5.9 13.87 5.01 13.77 4.1C12.97 4.14 12.02 4.64 11.47 5.29C10.97 5.86 10.53 6.77 10.65 7.65C11.53 7.72 12.44 7.21 12.98 6.55"/>
              </svg>
              <span class="text-xs font-sans uppercase tracking-widest font-medium">iOS</span>
            </div>
          </div>
          
          <div class="pt-12 flex flex-wrap gap-6 items-center">
            <a routerLink="/projects" class="text-white hover:opacity-70 transition-opacity font-medium tracking-wide">
              Selected Work ↗
            </a>
            <a routerLink="/about" class="text-white/60 hover:text-white transition-colors tracking-wide">
              About Me ↗
            </a>
            <a routerLink="/resume" class="text-white/60 hover:text-white transition-colors tracking-wide border-l border-white/10 pl-6">
              View Resume ↗
            </a>
            <a href="assets/resume.pdf" download="Sumanta_Sahu_Resume.pdf" class="text-white/60 hover:text-white transition-colors tracking-wide">
              Download Resume ↓
            </a>
          </div>
          </div>
          
          <!-- Image Content -->
          <div class="lg:col-span-4 hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border)]">
              <div class="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                alt="Sumanta Sahu" 
                class="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Selected Case Studies (Gallery Style) -->
      <section appScrollReveal direction="up" class="max-w-7xl mx-auto px-6 lg:px-8 py-32 border-t border-[var(--border)]">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-16">
          <h2 class="text-3xl md:text-5xl font-display font-medium tracking-tighter">Selected Work</h2>
          <a routerLink="/projects" class="text-sm font-sans text-white/60 hover:text-white transition-colors uppercase tracking-widest">
            View All Projects
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          @for (project of featuredProjects(); track project.id) {
            <div class="group cursor-pointer" [routerLink]="['/projects', project.id]">
              <div class="aspect-[4/3] bg-[var(--border)] mb-6 overflow-hidden rounded-sm relative">
                @if (project.thumbnailUrl) {
                  <img [src]="project.thumbnailUrl" [alt]="project.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                } @else {
                  <div class="absolute inset-0 bg-[var(--surface-hover)]"></div>
                }
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-display font-medium mb-2">{{ project.title }}</h3>
                  <p class="text-white/40 text-sm font-sans line-clamp-2 max-w-sm">{{ project.tagline }}</p>
                </div>
                <span class="text-white/20 font-sans text-sm">{{ project.completionYear }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Minimal Contact CTA -->
      <section appScrollReveal direction="up" class="max-w-7xl mx-auto px-6 lg:px-8 py-32 border-t border-[var(--border)]">
        <div class="flex flex-col items-start space-y-6">
          <h2 class="text-4xl md:text-6xl font-display font-medium tracking-tighter">Let's work together.</h2>
          <p class="text-white/60 font-sans text-lg md:text-xl max-w-xl font-light">
            Available for new opportunities and consulting.
          </p>
          <div class="pt-8 flex flex-wrap gap-6 items-center">
            <a href="mailto:sumantasahu.sm@gmail.com" class="text-white text-lg hover:opacity-70 transition-opacity border-b border-white pb-1">
              sumantasahu.sm&#64;gmail.com
            </a>
            <a routerLink="/contact" class="text-white/60 hover:text-white transition-colors text-lg border-b border-transparent hover:border-white/60 pb-1">
              Contact Form ↗
            </a>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomeComponent {
  private readonly portfolioService = inject(PortfolioService);
  readonly featuredProjects = this.portfolioService.featuredProjects;
}
