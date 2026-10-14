import { Component, input } from '@angular/core';

@Component({
  selector: 'app-architecture-diagram',
  template: `
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden divide-y divide-[var(--border)]">
      <div class="p-6 bg-[var(--surface-hover)]/60 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-[var(--accent)]"></span>
          <h3 class="font-display font-bold text-lg text-[var(--text-primary)]">System Architecture & Component Layers</h3>
        </div>
        <span class="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border)]">
          Production Blueprint
        </span>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        @if (specs().frontend) {
          <div class="space-y-2 p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border)]">
            <div class="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
              <span>Frontend Architecture</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ specs().frontend }}</p>
          </div>
        }

        @if (specs().backend) {
          <div class="space-y-2 p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border)]">
            <div class="flex items-center gap-2 text-xs font-mono text-[var(--success)] uppercase tracking-wider font-semibold">
              <span>Backend & Consensus Engine</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ specs().backend }}</p>
          </div>
        }

        @if (specs().database) {
          <div class="space-y-2 p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border)]">
            <div class="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
              <span>Database & Storage Layer</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ specs().database }}</p>
          </div>
        }

        @if (specs().apiLayer) {
          <div class="space-y-2 p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border)]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-wider font-semibold">
              <span>API Ingress & Networking</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ specs().apiLayer }}</p>
          </div>
        }

        @if (specs().auth) {
          <div class="space-y-2 p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border)]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#EC4899] uppercase tracking-wider font-semibold">
              <span>Authentication & Security</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ specs().auth }}</p>
          </div>
        }

        @if (specs().stateManagement) {
          <div class="space-y-2 p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border)]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
              <span>State & Synchronization</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ specs().stateManagement }}</p>
          </div>
        }
      </div>

      @if (specs().deployment) {
        <div class="p-6 bg-[var(--bg-primary)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">Deployment Topology</span>
            <p class="text-sm text-[var(--text-primary)] font-medium">{{ specs().deployment }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[var(--success)]"></span>
            <span class="text-xs font-mono text-[var(--success)]">High Availability Active</span>
          </div>
        </div>
      }
    </div>
  `
})
export class ArchitectureDiagramComponent {
  readonly specs = input.required<{
    frontend?: string;
    backend?: string;
    database?: string;
    apiLayer?: string;
    auth?: string;
    stateManagement?: string;
    deployment?: string;
  }>();
}
