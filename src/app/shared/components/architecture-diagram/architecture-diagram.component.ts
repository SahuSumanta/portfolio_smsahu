import { Component, input } from '@angular/core';

@Component({
  selector: 'app-architecture-diagram',
  template: `
    <div class="bg-[#131316] border border-[#242428] rounded-2xl overflow-hidden divide-y divide-[#242428]">
      <div class="p-6 bg-[#1C1C21]/60 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
          <h3 class="font-['Space_Grotesk'] font-bold text-lg text-[var(--accent)]">System Architecture & Component Layers</h3>
        </div>
        <span class="text-xs font-mono text-[#A1A1AA] bg-[#0B0B0C] px-3 py-1 rounded-full border border-[#242428]">
          Production Blueprint
        </span>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        @if (specs().frontend) {
          <div class="space-y-2 p-4 rounded-xl bg-[#0B0B0C]/60 border border-[#242428]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#3B82F6] uppercase tracking-wider font-semibold">
              <span>Frontend Architecture</span>
            </div>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ specs().frontend }}</p>
          </div>
        }

        @if (specs().backend) {
          <div class="space-y-2 p-4 rounded-xl bg-[#0B0B0C]/60 border border-[#242428]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#22C55E] uppercase tracking-wider font-semibold">
              <span>Backend & Consensus Engine</span>
            </div>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ specs().backend }}</p>
          </div>
        }

        @if (specs().database) {
          <div class="space-y-2 p-4 rounded-xl bg-[#0B0B0C]/60 border border-[#242428]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#F59E0B] uppercase tracking-wider font-semibold">
              <span>Database & Storage Layer</span>
            </div>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ specs().database }}</p>
          </div>
        }

        @if (specs().apiLayer) {
          <div class="space-y-2 p-4 rounded-xl bg-[#0B0B0C]/60 border border-[#242428]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-wider font-semibold">
              <span>API Ingress & Networking</span>
            </div>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ specs().apiLayer }}</p>
          </div>
        }

        @if (specs().auth) {
          <div class="space-y-2 p-4 rounded-xl bg-[#0B0B0C]/60 border border-[#242428]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#EC4899] uppercase tracking-wider font-semibold">
              <span>Authentication & Security</span>
            </div>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ specs().auth }}</p>
          </div>
        }

        @if (specs().stateManagement) {
          <div class="space-y-2 p-4 rounded-xl bg-[#0B0B0C]/60 border border-[#242428]">
            <div class="flex items-center gap-2 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
              <span>State & Synchronization</span>
            </div>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ specs().stateManagement }}</p>
          </div>
        }
      </div>

      @if (specs().deployment) {
        <div class="p-6 bg-[#0B0B0C]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Deployment Topology</span>
            <p class="text-sm text-[var(--text-primary)] font-medium">{{ specs().deployment }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            <span class="text-xs font-mono text-[#22C55E]">High Availability Active</span>
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
