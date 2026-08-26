import { Injectable, signal, computed } from '@angular/core';
import {
  Project,
  BlogArticle,
  ExperienceItem,
  SkillCategory,
  OpenSourceItem,
  TestimonialItem,
  JourneyMilestone,
  ValueCard,
  RoadmapItem,
  CurrentlyBuildingItem,
  BeyondCodeInterest,
  CurrentlyLearningItem,
  CertificationItem,
  ResumeProfile
} from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Core reactive state signals
  private readonly projectsSignal = signal<Project[]>([
    {
      id: 'proj-humain',
      slug: 'humain',
      title: 'HUMAIN',
      tagline: 'Client-Facing Enterprise AI & Cloud Platform',
      featured: true,
      category: 'Enterprise AI',
      status: 'Production',
      completionYear: 2026,
      techStack: ['Angular', 'TypeScript', 'Node.js', 'RxJS', 'NgRx', 'SQL', 'MongoDB'],
      thumbnailUrl: 'assets/images/projects/humain.png',
      screenshots: [],
      timeline: '2022 - 2026',
      isFlagship: true,
      flagshipDetails: {
        companyContext: {
          role: 'Software Engineer',
          company: 'VisionWaves',
          duration: '4 Years',
          description: 'Contributed as part of the VisionWaves engineering team to client-facing enterprise AI and cloud platform initiatives for HUMAIN, working across software experiences supporting AI infrastructure, enterprise workflows, automation and next-generation agentic applications.'
        },
        visionWavesTimeline: {
          items: [
            { title: 'DataByte', subtitle: 'Enterprise Data & AI Platform' },
            { title: 'HUMAIN Compute', subtitle: 'AI Infrastructure & Cloud' },
            { title: 'HUMAIN ONE', subtitle: 'Agentic Enterprise AI' }
          ]
        },
        subProducts: [
          {
            name: 'HUMAIN Compute',
            label: 'AI Infrastructure & Cloud Platform',
            description: 'An AI-focused cloud and infrastructure platform designed to support high-performance computing, model training, inference and edge workloads.',
            capabilities: ['AI Infrastructure', 'HPC', 'Training', 'Inference', 'Cloud', 'Edge Workloads']
          },
          {
            name: 'HUMAIN ONE',
            label: 'Agentic Enterprise AI Platform',
            description: 'An intent-driven enterprise AI platform that connects users, enterprise systems and AI agents through a unified interface to automate workflows and operational tasks.',
            capabilities: ['Agentic AI', 'AI Agents', 'Workflow Automation', 'Enterprise AI', 'Natural Language', 'Orchestration', 'Productivity', 'Enterprise Systems']
          }
        ],
        personalContribution: [
          'Contributed to the development of client-facing enterprise software.',
          'Worked as part of a cross-functional engineering team delivering features for HUMAIN.',
          'Developed and maintained software components supporting complex enterprise workflows.',
          'Worked with API-driven application architecture and integrated frontend experiences with backend services.',
          'Collaborated with engineering, product and client-facing stakeholders.',
          'Participated in feature development, debugging, testing and production delivery.',
          'Worked on software supporting AI-enabled enterprise workflows and operational experiences.'
        ]
      }
    },
    {
      id: 'proj-databyte',
      slug: 'databyte',
      title: 'DataByte',
      tagline: 'Enterprise Data & AI Platform',
      featured: true,
      category: 'Data & AI Platform',
      status: 'Production',
      completionYear: 2026,
      techStack: ['Angular', 'TypeScript', 'Node.js', 'RxJS', 'NgRx', 'SQL', 'MongoDB'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      screenshots: [],
      timeline: '2022 - 2026',
      isFlagship: true,
      flagshipDetails: {
        companyContext: {
          role: 'Software Engineer',
          company: 'VisionWaves',
          duration: '4 Years',
          description: 'A multi-year journey contributing to the core development and scaling of an enterprise data lifecycle platform.'
        },
        productOverview: 'An enterprise-grade unified Data & AI platform designed to manage the complete data lifecycle — from ingestion and transformation to machine learning, analytics, automation, API delivery and governance.',
        capabilities: [
          { name: 'Data Engineering' },
          { name: 'Data Integration' },
          { name: 'Machine Learning' },
          { name: 'AI & Automation' },
          { name: 'Analytics' },
          { name: 'API & Data Delivery' },
          { name: 'Data Governance' },
          { name: 'DataOps' },
          { name: 'Enterprise Security' }
        ],
        engineeringJourney: {
          stages: ['Full-Stack Development', 'Enterprise Product Engineering', 'Broader Platform Ownership'],
          narrative: 'Progressed from full-stack feature development into handling complex enterprise-grade integrations, ultimately contributing to broader architectural patterns and platform stability.'
        },
        personalContribution: [
          'Engineered scalable full-stack modules using Angular, TypeScript, Node.js, SQL, MongoDB.',
          'Refactored complex user workflows using RxJS + NgRx, eliminating race conditions.',
          'Worked directly with clients to gather requirements and convert business needs into sprint deliverables.',
          'Mentored junior developers and improved code review standards.',
          'Built interconnected enterprise systems covering customer care and case management.',
          'Automated complex evaluation workflows, reducing manual effort by 90%.',
          'Enabled live device monitoring and faster operational decision-making for industrial clients.'
        ],
        productScale: [
          { metric: '2,000+', label: 'Connectors' },
          { metric: '10+', label: 'AI Agents' },
          { metric: '25+', label: 'Time-series Algorithms' },
          { metric: 'Multi-Cloud', label: 'AWS / Azure / GCP / On-prem' },
          { metric: 'Zero-Egress', label: 'Air-gapped Deployment Capability' }
        ],
        realWorldAreas: [
          'Telecom',
          'Finance',
          'Retail / Supply Chain',
          'Enterprise Data Platforms',
          'Operations',
          'AI / ML',
          'Data Governance'
        ]
      }
    },
    {
      id: 'proj-1',
      slug: 'mechoshade-bms',
      title: 'MechoSHADE BMS Integration',
      tagline: 'IoT-based Building Management System automating and controlling window shading across smart buildings.',
      featured: true,
      category: 'IoT & Enterprise App',
      status: 'Production',
      completionYear: 2026,
      techStack: ['Angular', 'Ionic', 'TypeScript', 'Node.js', 'REST APIs'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: '',
      demoUrl: '',
      docsUrl: '',
      pdfUrl: '',
      timeline: 'May 2026 - Present',
      caseStudy: {
        projectOverview: 'MechoSHADE is a client-focused Building Management System designed to automate and control window shading across smart buildings, optimizing energy efficiency and occupant comfort.',
        problemStatement: 'Integrating real-time device data from hardware sensors into a seamless, cross-platform user experience required robust API communication and responsive frontend architecture.',
        research: 'Evaluated various cross-platform frameworks to ensure a unified codebase could serve both web dashboards and mobile applications without compromising performance.',
        architectureSpecs: {
          frontend: 'Cross-platform mobile and web application built with Angular and Ionic.',
          backend: 'Node.js API layer facilitating real-time telemetry from IoT hardware.',
          deployment: 'Containerized deployment for scalable enterprise access.'
        },
        systemDesign: 'Designed a highly modular frontend architecture to consume real-time telemetry data, ensuring UI components update deterministically based on device state.',
        dataFlow: 'Hardware Sensors -> IoT Gateway -> Backend API -> Angular/Ionic Client -> UI Render.',
        folderStructure: '',
        techStackCategorized: [
          {
            category: 'Frontend',
            items: [
              { name: 'Angular', color: '#DD0031' },
              { name: 'Ionic', color: '#3880FF' },
              { name: 'TypeScript', color: '#3178C6' }
            ]
          }
        ],
        implementationDetails: 'Implemented automation features and integrated various microservices to create a robust, fault-tolerant application.',
        performanceData: {
          performanceScore: 98,
          accessibilityScore: 100,
          seoScore: 100,
          bundleSizeKb: 120,
          loadTimeMs: 450,
          p99LatencyMs: 45,
          throughputQps: 1500,
          usersServed: 'Enterprise Clients',
          deploymentFrequency: 'Sprintly'
        },
        accessibilityAudit: 'Ensured high contrast and readable typography across both web and native mobile interfaces.',
        securityArchitecture: 'Secure API token authentication for all IoT endpoints.',
        challenges: 'Handling sporadic connection drops from IoT hardware gracefully within the mobile app.',
        solutions: 'Implemented offline-first caching strategies and robust retry mechanisms on API requests.',
        lessonsLearned: 'Cross-platform mobile development requires strict attention to mobile-specific interaction patterns and performance profiling.',
        futureImprovements: ['Incorporate predictive shading models based on weather API data.'],
        metrics: {}
      }
    },
    {
      id: 'proj-2',
      slug: 'ai-hrms-platform',
      title: 'AI-Powered HRMS Platform',
      tagline: 'Automated candidate screening and evaluation workflows reducing manual HR effort by 90%.',
      featured: true,
      category: 'AI & HRTech',
      status: 'Production',
      completionYear: 2026,
      techStack: ['Angular', 'TypeScript', 'Node.js', 'OpenAI API', 'MongoDB'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      screenshots: [],
      githubUrl: '',
      demoUrl: '',
      timeline: '2023 - 2025',
      caseStudy: {
        projectOverview: 'Built and owned the frontend architecture for an AI-powered HRMS platform that automated candidate screening, evaluation workflows, and hiring operations.',
        problemStatement: 'Manual candidate screening was a massive bottleneck for HR departments, leading to slow hiring cycles and high operational costs.',
        research: 'Investigated LLM capabilities for accurate resume parsing and automated preliminary candidate scoring.',
        architectureSpecs: {
          frontend: 'Scalable Angular enterprise application with complex state management.',
          backend: 'Node.js microservices integrated with OpenAI API for intelligent processing.',
          database: 'MongoDB for flexible document storage of candidate profiles.'
        },
        systemDesign: 'Decoupled the AI processing queue from the main application thread to ensure the HR dashboard remained highly responsive during bulk evaluations.',
        dataFlow: 'Resume Upload -> Node.js Service -> OpenAI API -> Parsed JSON -> MongoDB -> Angular UI.',
        folderStructure: '',
        techStackCategorized: [
          { category: 'Backend', items: [{ name: 'OpenAI API', color: '#412991' }, { name: 'Node.js', color: '#339933' }] }
        ],
        implementationDetails: 'Engineered scalable full-stack modules to handle thousands of concurrent applicant evaluations.',
        performanceData: {
          performanceScore: 99,
          accessibilityScore: 100,
          seoScore: 100,
          bundleSizeKb: 140,
          loadTimeMs: 350,
          p99LatencyMs: 120,
          throughputQps: 500,
          usersServed: 'Enterprise HR Teams',
          deploymentFrequency: 'Continuous'
        },
        accessibilityAudit: 'Keyboard-navigable candidate evaluation forms and fully accessible tables.',
        securityArchitecture: 'Strict PII masking and data encryption at rest for candidate documents.',
        challenges: 'Eliminating race conditions in complex user workflows when evaluating candidates simultaneously.',
        solutions: 'Refactored complex user workflows using RxJS and NgRx to ensure deterministic state updates.',
        lessonsLearned: 'Strict state management (NgRx) is non-negotiable for enterprise-scale forms and multi-step workflows.',
        futureImprovements: [],
        metrics: { manualEffortReduction: '90%' }
      }
    },
    {
      id: 'proj-3',
      slug: 'industrial-iot-telemetry',
      title: 'Industrial IoT Dashboards',
      tagline: 'Real-time dashboards and analytics systems enabling live device monitoring and operational visibility.',
      featured: true,
      category: 'Data Infrastructure',
      status: 'Production',
      completionYear: 2024,
      techStack: ['Angular', 'RxJS', 'NgRx', 'SQL', 'Docker', 'AWS'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      screenshots: [],
      githubUrl: '',
      demoUrl: '',
      timeline: '2022 - 2024',
      caseStudy: {
        projectOverview: 'Developed real-time dashboards and analytics systems for Industrial IoT platforms, empowering operators with live device monitoring and faster decision-making.',
        problemStatement: 'Operators lacked a centralized, real-time view of industrial device health, leading to reactive maintenance rather than proactive management.',
        research: 'Explored efficient data streaming protocols and state synchronization patterns in Angular to handle high-frequency telemetry updates.',
        architectureSpecs: {
          frontend: 'Angular dashboards heavily utilizing RxJS streams for real-time data binding.',
          deployment: 'Dockerized microservices deployed on AWS.'
        },
        systemDesign: 'Implemented a unidirectional data flow using NgRx to manage thousands of active telemetry subscriptions without UI jank.',
        dataFlow: 'IoT Gateway -> AWS Core -> API -> RxJS WebSockets -> NgRx Store -> UI Component.',
        folderStructure: '',
        techStackCategorized: [
          { category: 'Frontend', items: [{ name: 'RxJS', color: '#B7178C' }, { name: 'NgRx', color: '#BA2AC2' }] }
        ],
        implementationDetails: 'Refactored complex user workflows, eliminating race conditions and improving reliability across enterprise-scale applications.',
        performanceData: {
          performanceScore: 96,
          accessibilityScore: 100,
          seoScore: 100,
          bundleSizeKb: 95,
          loadTimeMs: 250,
          p99LatencyMs: 15,
          throughputQps: 10000,
          usersServed: 'Industrial Operators',
          deploymentFrequency: 'Weekly'
        },
        accessibilityAudit: 'High-contrast data visualization modes for factory floor environments.',
        securityArchitecture: 'Role-based access control (RBAC) ensuring operators only view authorized factory segments.',
        challenges: 'Memory leaks caused by unclosed WebSocket subscriptions during rapid dashboard navigation.',
        solutions: 'Implemented robust RxJS takeUntil destroy patterns across all telemetry components.',
        lessonsLearned: 'Proactive memory management is the most critical aspect of building long-lived real-time dashboards.',
        futureImprovements: [],
        metrics: { platformReliability: 'High' }
      }
    }
  ]);

  // Journey milestones Signal
  private readonly journeySignal = signal<JourneyMilestone[]>([
    {
      id: 'j-1',
      year: '2018 - 2022',
      title: 'Computer Science Education',
      category: 'Education',
      description: 'Earned my Bachelor of Technology in Computer Science from Biju Patnaik University of Technology / KMBB College, building a strong foundation in algorithms and software engineering.',
      tech: ['Java', 'C++', 'Data Structures']
    },
    {
      id: 'j-2',
      year: '2022',
      title: 'Software Engineer at Vision Waves',
      category: 'Career',
      description: 'Joined Vision Waves as a Software Engineer, embarking on a nearly 4-year journey building scalable SaaS platforms across HRTech, Industrial IoT, and enterprise operations.',
      tech: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'SQL']
    },
    {
      id: 'j-3',
      year: '2023 - 2025',
      title: 'Architecting AI & Real-Time IoT Solutions',
      category: 'Production',
      description: 'Led the frontend architecture for an AI-powered HRMS reducing manual HR effort by 90%, and developed real-time industrial telemetry dashboards using advanced RxJS/NgRx patterns.',
      tech: ['OpenAI API', 'RxJS', 'NgRx', 'AWS', 'Docker']
    },
    {
      id: 'j-4',
      year: '2026 - Present',
      title: 'Software Engineer at Softdel',
      category: 'Career',
      description: 'Currently building MechoSHADE, a robust Building Management System (BMS). Focused on cross-platform mobile and web development (Angular/Ionic) and integrating real-time IoT device data.',
      tech: ['Angular', 'Ionic', 'Node.js', 'Microservices']
    }
  ]);

  // Values Signal
  private readonly valuesSignal = signal<ValueCard[]>([
    {
      id: 'v-1',
      title: 'Clean Architecture',
      tagline: 'Code that scales gracefully.',
      description: 'I bring a strong focus on clean architecture and maintainable code, ensuring that platforms can grow seamlessly without accumulating technical debt.',
      iconSvg: 'shield'
    },
    {
      id: 'v-2',
      title: 'Solving Real Business Problems',
      tagline: 'Technology with a purpose.',
      description: 'Whether it is automating candidate screening to reduce manual effort by 90% or enabling live factory monitoring, my goal is always aimed at solving real business problems.',
      iconSvg: 'sparkles'
    },
    {
      id: 'v-3',
      title: 'Performance Optimization',
      tagline: 'Fast, responsive, and reliable.',
      description: 'I obsess over eliminating race conditions, managing complex state with NgRx, and ensuring real-time dashboards never drop a frame.',
      iconSvg: 'bolt'
    },
    {
      id: 'v-4',
      title: 'Cross-Functional Delivery',
      tagline: 'From requirements to deployments.',
      description: 'I thrive on working directly with clients and stakeholders to gather requirements, convert needs into sprint deliverables, and iterate quickly.',
      iconSvg: 'server'
    }
  ]);

  // Future Plans ⭐ ("What's Next")
  private readonly roadmapSignal = signal<RoadmapItem[]>([
    {
      id: 'rm-1',
      title: 'Deepen AI Engineering Expertise',
      description: 'Continuing to explore LLMs, agentic workflows, and integrations (like OpenAI and n8n) to build smarter automation systems.',
      targetQuarter: 'Ongoing',
      status: 'In Progress',
      category: 'AI'
    },
    {
      id: 'rm-2',
      title: 'Expand Cross-Platform Mobile Reach',
      description: 'Leveraging Ionic and Angular to build increasingly complex native mobile experiences for IoT and enterprise applications.',
      targetQuarter: 'Ongoing',
      status: 'In Progress',
      category: 'Engineering'
    }
  ]);

  // Currently Building 🚀
  private readonly currentlyBuildingSignal = signal<CurrentlyBuildingItem[]>([
    {
      id: 'cb-1',
      name: 'MechoSHADE BMS',
      description: 'Client-focused Building Management System automating window shading across smart buildings.',
      currentMilestone: 'Cross-Platform UI Enhancements',
      techStack: ['Angular', 'Ionic', 'Node.js'],
      estimatedCompletion: 'Continuous',
      progressPercent: 80,
      status: 'Active Development',
      lastUpdated: 'Today'
    }
  ]);

  // Beyond Code Interests
  private readonly beyondCodeSignal = signal<BeyondCodeInterest[]>([
    { id: 'bc-1', title: 'Tech Community Mentorship', description: 'Mentoring junior developers and improving code review standards.', tag: 'Community' },
    { id: 'bc-2', title: 'Emerging AI Technologies', description: 'Exploring automation pipelines and new LLM capabilities.', tag: 'AI Research' }
  ]);

  // Experience Signal
  private readonly experienceSignal = signal<ExperienceItem[]>([
    {
      id: 'exp-1',
      company: 'Softdel (UNIDEL)',
      companyLogo: 'images/logos/softdel.png',
      roleTitle: 'Software Engineer',
      location: 'Pune District, Maharashtra, India',
      startDate: '2026-05',
      current: true,
      highlights: [
        'Building and maintaining cross-platform app and web solutions using Angular and Ionic.',
        'Presently contributing to MechoSHADE, an IoT-based Building Management System (BMS) that automates window shading.',
        'Working across frontend app development and backend API integration to connect real-time device data.'
      ],
      responsibilities: [
        'Enhancing UI and frontend development for enterprise client applications.',
        'Implementing automation features and integrating various services to create robust architectures.',
        'Developing cross-platform mobile applications for IoT-enabled infrastructure.'
      ],
      majorAchievements: [
        'Played a key role in developing MechoSHADE, strengthening understanding of building operations and IoT.'
      ],
      architectureHighlights: [
        'Integrated live real-time device data with seamless, responsive user experiences.'
      ],
      impactMetrics: {},
      techStack: ['Angular', 'Ionic', 'TypeScript', 'Node.js', 'Microservices']
    },
    {
      id: 'exp-2',
      company: 'Vision Waves',
      companyLogo: 'images/logos/visionwaves.png',
      roleTitle: 'Software Engineer',
      location: 'Indore, India',
      startDate: '2022-08',
      endDate: '2026-04',
      current: false,
      highlights: [
        'Built scalable SaaS platforms across HRTech, Industrial IoT, and enterprise operations systems.',
        'Built and owned frontend architecture for an AI-powered HRMS platform.',
        'Developed real-time dashboards and analytics systems for Industrial IoT platforms.'
      ],
      responsibilities: [
        'Engineered scalable full-stack modules using Angular, TypeScript, Node.js, SQL, MongoDB.',
        'Refactored complex user workflows using RxJS + NgRx, eliminating race conditions.',
        'Worked directly with clients to gather requirements and convert business needs into sprint deliverables.',
        'Mentored junior developers and improved code review standards.'
      ],
      majorAchievements: [
        'Automated candidate screening and evaluation workflows, reducing manual HR effort by 90%.',
        'Enabled live device monitoring and faster operational decision-making for industrial clients.'
      ],
      architectureHighlights: [
        'Built interconnected enterprise systems covering customer care and case management.'
      ],
      impactMetrics: {
        'HR Manual Effort Reduced': '90%'
      },
      techStack: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Node.js', 'SQL', 'MongoDB'],
      projectTimeline: [
        { name: 'DataByte', subtitle: 'Enterprise Data & AI Platform' },
        { name: 'HUMAIN Compute', subtitle: 'AI Infrastructure & Cloud' },
        { name: 'HUMAIN ONE', subtitle: 'Agentic Enterprise AI' }
      ]
    }
  ]);

  // Skills Signal
  private readonly skillsSignal = signal<SkillCategory[]>([
    {
      id: 'sc-1',
      name: 'Frontend',
      skills: [
        { name: 'Angular (v15+)', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 95, projectsUsedIn: ['Softdel', 'Vision Waves'], relatedTechnologies: ['TypeScript', 'Component Architecture'] },
        { name: 'TypeScript', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 95, projectsUsedIn: ['All Projects'], relatedTechnologies: ['ES6+', 'Static Typing'] },
        { name: 'Ionic', category: 'Frontend', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 85, projectsUsedIn: ['MechoSHADE'], relatedTechnologies: ['Cross-platform', 'Capacitor'] },
        { name: 'RxJS & NgRx', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 90, projectsUsedIn: ['IoT Dashboards', 'HRMS'], relatedTechnologies: ['State Management', 'Reactive Programming'] }
      ]
    },
    {
      id: 'sc-2',
      name: 'Backend',
      skills: [
        { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 88, projectsUsedIn: ['API Integration', 'Microservices'], relatedTechnologies: ['Express'] },
        { name: 'Microservices Architecture', category: 'Architecture', proficiency: 'Advanced', yearsExp: 3, confidenceLevel: 85, projectsUsedIn: ['Enterprise SaaS'], relatedTechnologies: ['REST', 'System Design'] }
      ]
    },
    {
      id: 'sc-3',
      name: 'Databases',
      skills: [
        { name: 'SQL', category: 'Databases', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 85, projectsUsedIn: ['Vision Waves Data Modules'], relatedTechnologies: ['Relational Data'] },
        { name: 'MongoDB', category: 'Databases', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 85, projectsUsedIn: ['HRMS Platform'], relatedTechnologies: ['NoSQL', 'Document Stores'] },
        { name: 'Docker & Kubernetes', category: 'DevOps', proficiency: 'Proficient', yearsExp: 2, confidenceLevel: 75, projectsUsedIn: ['Platform Deployments'], relatedTechnologies: ['Containerization'] },
        { name: 'AWS', category: 'Cloud', proficiency: 'Proficient', yearsExp: 2, confidenceLevel: 75, projectsUsedIn: ['Cloud Infrastructure'], relatedTechnologies: ['EC2', 'S3'] }
      ]
    },
    {
      id: 'sc-4',
      name: 'AI',
      skills: [
        { name: 'OpenAI API', category: 'AI', proficiency: 'Proficient', yearsExp: 2, confidenceLevel: 80, projectsUsedIn: ['AI HRMS'], relatedTechnologies: ['LLMs', 'Prompting'] },
        { name: 'n8n Workflow Automation', category: 'AI', proficiency: 'Proficient', yearsExp: 2, confidenceLevel: 80, projectsUsedIn: ['Internal Tools'], relatedTechnologies: ['Webhooks', 'Integration'] }
      ]
    }
  ]);

  // Currently Learning
  private readonly currentlyLearningSignal = signal<CurrentlyLearningItem[]>([
    { name: 'Advanced AI Engineering', focusArea: 'Integrating complex LLM workflows into SaaS products', progress: 'In Progress' },
    { name: 'IoT Edge Computing', focusArea: 'Processing device telemetry at the edge', progress: 'Exploring' }
  ]);

  // Certifications & Achievements
  private readonly certificationsSignal = signal<CertificationItem[]>([
    { id: 'cert-1', title: 'Angular Certification', issuer: 'Industry Recognized', date: 'Recent', type: 'Certification', badgeText: 'Certified' },
    { id: 'cert-2', title: 'Java (Basic) Certificate', issuer: 'Industry Recognized', date: 'Recent', type: 'Certification', badgeText: 'Certified' },
    { id: 'cert-3', title: 'Learn the Command Line Course', issuer: 'Educational Platform', date: 'Recent', type: 'Certification', badgeText: 'Completed' },
    { id: 'cert-4', title: 'Learn Java Course', issuer: 'Educational Platform', date: 'Recent', type: 'Certification', badgeText: 'Completed' }
  ]);

  // Resume Profile
  private readonly resumeSignal = signal<ResumeProfile>({
    lastUpdated: 'August 2026',
    version: 'v2026.8 — Full Stack Engineering',
    pdfUrl: 'assets/resume.pdf',
    previewText: 'Full Stack Engineer specialized in Angular, Node.js, and scalable SaaS platforms. Proven track record of building AI-powered systems and IoT integrations.'
  });

  // Read-only computed accessors
  readonly projects = computed(() => this.projectsSignal());
  readonly featuredProjects = computed(() => {
    const order = ['proj-1', 'proj-2', 'proj-databyte', 'proj-humain'];
    const projects = this.projectsSignal();
    return order.map(id => projects.find(p => p.id === id)).filter((p): p is Project => p !== undefined);
  });
  readonly journeyMilestones = computed(() => this.journeySignal());
  readonly values = computed(() => this.valuesSignal());
  readonly roadmapItems = computed(() => this.roadmapSignal());
  readonly currentlyBuilding = computed(() => this.currentlyBuildingSignal());
  readonly beyondCode = computed(() => this.beyondCodeSignal());
  readonly experience = computed(() => this.experienceSignal());
  readonly skills = computed(() => this.skillsSignal());
  readonly currentlyLearning = computed(() => this.currentlyLearningSignal());
  readonly certifications = computed(() => this.certificationsSignal());
  readonly resumeProfile = computed(() => this.resumeSignal());

  getProjectBySlug(slug: string): Project | undefined {
    return this.projectsSignal().find(p => p.slug === slug);
  }
}
