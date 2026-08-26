import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Sumanta Sahu — Systems & Frontend Engineer',
    data: { animation: 'HomePage' }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About — Sumanta Sahu',
    data: { animation: 'AboutPage' }
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent),
    title: 'Experience — Sumanta Sahu',
    data: { animation: 'ExperiencePage' }
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
    title: 'Skills — Sumanta Sahu',
    data: { animation: 'SkillsPage' }
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Projects — Sumanta Sahu',
    data: { animation: 'ProjectsPage' }
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./features/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    title: 'Project — Sumanta Sahu',
    data: { animation: 'ProjectDetailPage' }
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-home.component').then(m => m.BlogHomeComponent),
    title: 'Blog — Sumanta Sahu',
    data: { animation: 'BlogPage' }
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
    title: 'Blog Post — Sumanta Sahu',
    data: { animation: 'BlogDetailPage' }
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/blog/categories-hub.component').then(m => m.CategoriesHubComponent),
    title: 'Categories — Sumanta Sahu',
    data: { animation: 'CategoriesPage' }
  },
  {
    path: 'tags',
    loadComponent: () => import('./features/blog/tags-hub.component').then(m => m.TagsHubComponent),
    title: 'Tags — Sumanta Sahu',
    data: { animation: 'TagsPage' }
  },
  {
    path: 'search',
    loadComponent: () => import('./features/blog/blog-search.component').then(m => m.BlogSearchComponent),
    title: 'Search — Sumanta Sahu',
    data: { animation: 'SearchPage' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — Sumanta Sahu',
    data: { animation: 'ContactPage' }
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
    title: 'Resume — Sumanta Sahu',
    data: { animation: 'ResumePage' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
