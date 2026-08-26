import { Component, input } from '@angular/core';

export interface ComparisonRow {
  metric: string;
  legacy: string;
  modern: string;
  improvement: string;
}

@Component({
  selector: 'app-comparison-table',
  template: `
    <div class="my-8 overflow-x-auto rounded-2xl border border-[#242428] bg-[#131316]">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#1C1C21] border-b border-[#242428] text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            <th class="p-4 sm:p-5">{{ title() || 'Architectural Evaluation Metric' }}</th>
            <th class="p-4 sm:p-5 text-[#F59E0B]">{{ colA() || 'Legacy Architecture' }}</th>
            <th class="p-4 sm:p-5 text-[#3B82F6]">{{ colB() || 'Modern Paradigm' }}</th>
            <th class="p-4 sm:p-5 text-[#22C55E]">{{ colC() || 'Delta Impact' }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#242428]/80 text-xs sm:text-sm font-mono">
          @for (row of rows(); track row.metric) {
            <tr class="hover:bg-[#1C1C21]/60 transition-colors">
              <td class="p-4 sm:p-5 font-bold text-[var(--text-primary)]">{{ row.metric }}</td>
              <td class="p-4 sm:p-5 text-[#A1A1AA]">{{ row.legacy }}</td>
              <td class="p-4 sm:p-5 text-[var(--text-primary)] font-medium">{{ row.modern }}</td>
              <td class="p-4 sm:p-5 text-[#22C55E] font-bold">{{ row.improvement }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class ComparisonTableComponent {
  readonly title = input<string>('Evaluation Metric');
  readonly colA = input<string>('Legacy Architecture');
  readonly colB = input<string>('Modern Paradigm');
  readonly colC = input<string>('Delta Impact');
  readonly rows = input.required<ComparisonRow[]>();
}
