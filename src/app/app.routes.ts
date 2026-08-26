import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Sumanta Sahu — Systems & Frontend Engineer'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About — Sumanta Sahu'
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent),
    title: 'Experience — Sumanta Sahu'
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
    title: 'Skills — Sumanta Sahu'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Projects — Sumanta Sahu'
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./features/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    title: 'Project — Sumanta Sahu'
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-home.component').then(m => m.BlogHomeComponent),
    title: 'Blog — Sumanta Sahu'
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
    title: 'Blog Post — Sumanta Sahu'
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/blog/categories-hub.component').then(m => m.CategoriesHubComponent),
    title: 'Categories — Sumanta Sahu'
  },
  {
    path: 'tags',
    loadComponent: () => import('./features/blog/tags-hub.component').then(m => m.TagsHubComponent),
    title: 'Tags — Sumanta Sahu'
  },
  {
    path: 'search',
    loadComponent: () => import('./features/blog/blog-search.component').then(m => m.BlogSearchComponent),
    title: 'Search — Sumanta Sahu'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — Sumanta Sahu'
  },
  {
    path: 'hire',
    redirectTo: 'contact'
  },
  {
    path: 'schedule',
    redirectTo: 'contact'
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume.component').then(m => m.ResumeComponent),
    title: 'Resume — Sumanta Sahu'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

