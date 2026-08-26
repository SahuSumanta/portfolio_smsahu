import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <div class="group h-full flex flex-col cursor-pointer" [routerLink]="['/projects', project().slug]">
      
      <!-- Minimalist Thumbnail -->
      <div class="aspect-[4/3] bg-[var(--border)] overflow-hidden rounded-sm relative mb-6">
        @if (project().thumbnailUrl) {
          <img
            [src]="project().thumbnailUrl"
            [alt]="project().title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        } @else {
          <div class="absolute inset-0 bg-[var(--surface-hover)]"></div>
        }
      </div>

      <!-- Content -->
      <div class="flex flex-col flex-1 justify-between">
        <div class="space-y-2">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-display font-medium text-[var(--text-primary)] group-hover:opacity-70 transition-opacity">
              {{ project().title }}
            </h3>
            <span class="text-[var(--text-primary)]/20 font-sans text-sm">{{ project().completionYear }}</span>
          </div>
          
          <p class="text-sm text-[var(--text-primary)]/60 font-sans font-light leading-relaxed line-clamp-2">
            {{ project().tagline }}
          </p>
        </div>

        <div class="pt-6 mt-6 border-t border-[var(--border)] flex flex-wrap gap-2">
          @for (tech of project().techStack.slice(0, 3); track tech) {
            <span class="text-[10px] font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
              {{ tech }}
            </span>
          }
          @if (project().techStack.length > 3) {
            <span class="text-[10px] font-sans text-[var(--text-primary)]/40 uppercase tracking-widest">
              +{{ project().techStack.length - 3 }}
            </span>
          }
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block h-full'
  }
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
