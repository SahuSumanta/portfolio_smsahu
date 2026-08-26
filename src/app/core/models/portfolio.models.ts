export interface TechBadgeItem {
  name: string;
  color: string;
  tooltip?: string;
}

export interface CategorizedTechStack {
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'DevOps' | 'Testing';
  items: TechBadgeItem[];
}

export interface BenchmarkMetrics {
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  bundleSizeKb: number;
  loadTimeMs: number;
  p99LatencyMs: number;
  throughputQps: number;
  usersServed: string;
  deploymentFrequency: string;
}

export interface CaseStudy {
  projectOverview: string;
  problemStatement: string;
  research: string;
  architectureSpecs: {
    frontend?: string;
    backend?: string;
    database?: string;
    apiLayer?: string;
    auth?: string;
    stateManagement?: string;
    deployment?: string;
  };
  systemDesign: string;
  dataFlow: string;
  folderStructure: string;
  techStackCategorized: CategorizedTechStack[];
  implementationDetails: string;
  performanceData: BenchmarkMetrics;
  accessibilityAudit: string;
  securityArchitecture: string;
  challenges: string;
  solutions: string;
  lessonsLearned: string;
  futureImprovements: string[];
  metrics: Record<string, string | number>;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  category: string;
  status: 'Production' | 'Staging' | 'Open Source';
  completionYear: number;
  techStack: string[];
  thumbnailUrl: string;
  screenshots: string[];
  githubUrl?: string;
  demoUrl?: string;
  playStoreUrl?: string;
  docsUrl?: string;
  figmaUrl?: string;
  pdfUrl?: string;
  timeline: string;
  caseStudy?: CaseStudy;
  isFlagship?: boolean;
  flagshipDetails?: FlagshipDetails;
}

export interface FlagshipSubProduct {
  name: string;
  label: string;
  description: string;
  capabilities: string[];
}

export interface FlagshipDetails {
  companyContext: {
    role: string;
    company: string;
    duration: string;
    description: string;
  };
  productOverview?: string;
  capabilities?: { name: string; icon?: string }[];
  subProducts?: FlagshipSubProduct[];
  engineeringJourney?: {
    stages: string[];
    narrative: string;
  };
  visionWavesTimeline?: {
    items: { title: string; subtitle: string }[];
  };
  personalContribution: string[];
  productScale?: { metric: string; label: string }[];
  realWorldAreas?: string[];
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  category: 'Origin' | 'Education' | 'Milestone' | 'Internship' | 'Production' | 'Career' | 'Achievement';
  description: string;
  tech?: string[];
}

export interface ValueCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconSvg: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  targetQuarter: string;
  status: 'Planned' | 'In Progress' | 'Exploring';
  category: 'Engineering' | 'Open Source' | 'Product' | 'Community' | 'AI';
}

export interface CurrentlyBuildingItem {
  id: string;
  name: string;
  description: string;
  currentMilestone: string;
  techStack: string[];
  estimatedCompletion: string;
  progressPercent: number;
  status: 'Active Development' | 'Architecture Review' | 'Beta Testing';
  lastUpdated: string;
}

export interface BeyondCodeInterest {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  roleTitle: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  responsibilities: string[];
  majorAchievements: string[];
  architectureHighlights: string[];
  impactMetrics?: Record<string, string>;
  techStack: string[];
  projectTimeline?: {
    name: string;
    subtitle: string;
  }[];
  companyLogo?: string;
}

export type SkillCategoryType =
  | 'Frontend'
  | 'Backend'
  | 'Android'
  | 'Cloud'
  | 'DevOps'
  | 'Databases'
  | 'Testing'
  | 'UI/UX'
  | 'Architecture'
  | 'AI'
  | 'Developer Tools';

export interface SkillItem {
  name: string;
  category: SkillCategoryType;
  proficiency: 'Expert' | 'Advanced' | 'Proficient';
  yearsExp: number;
  confidenceLevel: number;
  projectsUsedIn: string[];
  relatedTechnologies: string[];
}

export interface SkillCategory {
  id: string;
  name: SkillCategoryType;
  skills: SkillItem[];
}

export interface CurrentlyLearningItem {
  name: string;
  focusArea: string;
  progress: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'Certification' | 'Award' | 'Hackathon' | 'Publication' | 'Course' | 'Badge';
  credentialUrl?: string;
  badgeText: string;
}

export interface ResumeProfile {
  lastUpdated: string;
  pdfUrl: string;
  previewText: string;
  version: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  topics: string[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  author: AuthorProfile;
  publishedAt: string;
  readingTimeMin: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  categories: string[];
  tags: string[];
  thumbnailUrl: string;
  coverUrl: string;
  featured: boolean;
  viewCount: number;
  likesCount: number;
  tableOfContents: TableOfContentsItem[];
}

export interface KnowledgeResource {
  id: string;
  title: string;
  category:
    | 'Architecture Notes'
    | 'Cheat Sheets'
    | 'Learning Notes'
    | 'Design Patterns'
    | 'Interview Notes'
    | 'System Design'
    | 'Best Practices'
    | 'Reference Guides'
    | 'Bookmarks'
    | 'Roadmaps';
  summary: string;
  format: 'Cheat Sheet' | 'Architecture Diagram' | 'Deep Dive' | 'Checklist';
  updatedDate: string;
  contentSnippet: string;
  tags: string[];
  downloadUrl?: string;
}

export interface OpenSourceItem {
  repositoryName: string;
  prTitle: string;
  prUrl: string;
  status: 'Merged' | 'Open';
  mergedAt?: string;
  stars: number;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorTitle: string;
  quote: string;
  relationship: string;
}
