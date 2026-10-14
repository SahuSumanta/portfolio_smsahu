import { Component, input, output } from '@angular/core';
import { Project } from '../../../core/models/portfolio.models';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-project-grid',
  imports: [ProjectCardComponent, ButtonComponent],
  template: `
    <div class="space-y-8">
      @if (loading()) {
        <!-- Loading Skeletons -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (item of [1, 2, 3]; track item) {
            <div class="h-[480px] bg-[var(--surface)] border border-[var(--border)] rounded-lg animate-pulse flex flex-col justify-between p-6">
              <div class="aspect-video w-full bg-[var(--surface-hover)] rounded-xl"></div>
              <div class="space-y-3 mt-4">
                <div class="h-6 bg-[var(--surface-hover)] rounded-md w-3/4"></div>
                <div class="h-4 bg-[var(--surface-hover)] rounded-md w-full"></div>
                <div class="h-4 bg-[var(--surface-hover)] rounded-md w-2/3"></div>
              </div>
              <div class="h-10 bg-[var(--surface-hover)] rounded-lg w-full mt-6"></div>
            </div>
          }
        </div>
      } @else if (projects().length === 0) {
        <!-- Empty State -->
        <div class="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-12 text-center max-w-xl mx-auto space-y-4">
          <div class="w-12 h-12 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--text-secondary)]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="font-display text-xl font-bold text-[var(--text-primary)]">No Projects Found</h3>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
            We couldn't find any engineering case studies matching your search filters. Try clearing your search keywords or resetting domain tags.
          </p>
          <div class="pt-2">
            <app-button variant="secondary" (buttonClick)="resetFilters.emit()">
              Reset Filters
            </app-button>
          </div>
        </div>
      } @else {
        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (project of projects(); track project.id) {
            <app-project-card [project]="project" />
          }
        </div>
      }
    </div>
  `
})
export class ProjectGridComponent {
  readonly projects = input.required<Project[]>();
  readonly loading = input<boolean>(false);

  readonly resetFilters = output<void>();
}
