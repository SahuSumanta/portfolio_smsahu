import { Component, input } from '@angular/core';
import { ValueCard } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-value-card',
  template: `
    <div class="h-full bg-[#131316] border border-[#242428] rounded-2xl p-6 sm:p-8 hover:border-[#3B82F6]/50 hover:bg-[#1C1C21] transition-all duration-300 flex flex-col justify-between space-y-6 group">
      <div class="space-y-4">
        <!-- Icon Badge -->
        <div class="w-12 h-12 rounded-2xl bg-[#1C1C21] border border-[#242428] flex items-center justify-center text-[#3B82F6] group-hover:scale-110 group-hover:bg-[#3B82F6]/10 transition-all duration-300">
          @switch (value().iconSvg) {
            @case ('shield') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            }
            @case ('sparkles') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            }
            @case ('book') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            }
            @case ('server') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            }
            @case ('heart') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            }
            @default {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            }
          }
        </div>

        <div>
          <h3 class="text-2xl font-['Space_Grotesk'] font-bold text-white group-hover:text-[#3B82F6] transition-colors">
            {{ value().title }}
          </h3>
          <div class="text-xs font-mono text-[#3B82F6] mt-1">{{ value().tagline }}</div>
        </div>

        <p class="text-sm text-[#A1A1AA] leading-relaxed">
          {{ value().description }}
        </p>
      </div>
    </div>
  `
})
export class ValueCardComponent {
  readonly value = input.required<ValueCard>();
}
