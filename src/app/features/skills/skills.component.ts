import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsDirectoryComponent } from '../../shared/components/skills-directory/skills-directory.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillsDirectoryComponent],
  template: `
    <main class="min-h-screen bg-[#080808] text-white pt-20 md:pt-28 pb-24" aria-label="Technical Skills Directory">
      <app-skills-directory [fullDirectory]="true" />
    </main>
  `
})
export class SkillsComponent {}
