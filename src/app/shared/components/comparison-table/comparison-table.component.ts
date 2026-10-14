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
    <div class="my-8 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[var(--surface-hover)] border-b border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            <th class="p-4 sm:p-5">{{ title() || 'Architectural Evaluation Metric' }}</th>
            <th class="p-4 sm:p-5 text-[var(--accent)]">{{ colA() || 'Legacy Architecture' }}</th>
            <th class="p-4 sm:p-5 text-[var(--accent)]">{{ colB() || 'Modern Paradigm' }}</th>
            <th class="p-4 sm:p-5 text-[var(--success)]">{{ colC() || 'Delta Impact' }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--border)]/80 text-xs sm:text-sm font-mono">
          @for (row of rows(); track row.metric) {
            <tr class="hover:bg-[var(--surface-hover)]/60 transition-colors">
              <td class="p-4 sm:p-5 font-bold text-[var(--text-primary)]">{{ row.metric }}</td>
              <td class="p-4 sm:p-5 text-[var(--text-secondary)]">{{ row.legacy }}</td>
              <td class="p-4 sm:p-5 text-[var(--text-primary)] font-medium">{{ row.modern }}</td>
              <td class="p-4 sm:p-5 text-[var(--success)] font-bold">{{ row.improvement }}</td>
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
