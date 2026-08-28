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
      thumbnailUrl: 'assets/images/projects/databyte.jpg',
      screenshots: [
        'assets/images/projects/databyte.jpg'
      ],
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
      thumbnailUrl: 'assets/images/projects/mechoshade.jpg',
      screenshots: [
        'assets/images/projects/mechoshade.jpg'
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
      slug: 'talent-singularity',
      title: 'Talent Singularity',
      tagline: 'In-house end-to-end AI hiring platform with automated Round 4 AI interviews, real-time proctoring, online compilers, and high-concurrency evaluation.',
      featured: true,
      category: 'AI & HRTech',
      status: 'Production',
      completionYear: 2026,
      techStack: [
        'Angular',
        'TypeScript',
        'RxJS',
        'NgRx',
        'Java',
        'MySQL',
        'WebSockets',
        'OpenAI API',
        'Groq',
        'Whisper',
        'TTS / STT'
      ],
      thumbnailUrl: 'assets/images/projects/talent-singularity.jpg',
      screenshots: [
        'assets/images/projects/talent-singularity.jpg'
      ],
      githubUrl: '',
      demoUrl: '',
      timeline: '2023 - 2025',
      caseStudy: {
        projectOverview: 'Single-handedly engineered the entire frontend architecture and complete user interface for Talent Singularity—a unified, end-to-end recruitment platform built to eliminate third-party HR tools and automate volume hiring.',
        problemStatement: 'Third-party assessment platforms lacked customization, incurred heavy vendor costs, and could not handle mass vs. experienced candidate tracks alongside automated AI interviews and proctoring under high traffic.',
        research: 'Researched WebSockets, WebRTC, MediaDevices API (camera/mic hardware streams), STT/TTS models (Whisper/Groq), low-latency LLM streaming, and sandboxed code/SQL compilation environments.',
        architectureSpecs: {
          frontend: 'Enterprise-grade Angular application single-handedly architected with NgRx and RxJS, featuring custom camera/microphone integration, live proctoring stream management, online code compiler, and multi-track candidate management.',
          backend: 'High-throughput Java microservices architecture backed by MySQL, utilizing WebSockets for real-time state sync, Groq LLM inferencing, Whisper STT, TTS pipelines, and OpenAI API.',
          database: 'MySQL enterprise relational store tracking full candidate journey histories, detailed round failure/pass reasons, sharing permissions, and assessment metrics.'
        },
        systemDesign: 'Built a 4-round hiring pipeline: Round 1 (Resume Parsing) -> Round 2 (Skill Assessment) -> Round 3 (Sandboxed Code & SQL Compiler) -> Round 4 (Interactive AI Video/Voice Interview with Proctoring). Includes one-touch paper generation scheduling, mass hiring vs. experienced hiring workflow separation, candidate profile sharing among interviewers, and direct in-platform video reviews.',
        dataFlow: 'Resume Upload -> High-Accuracy Java Parsing Engine (98% Success Rate) -> MySQL -> Candidate Track Assignment (Mass / Experienced) -> One-Touch Assessment Scheduling -> WebSockets / Media Devices (Camera/Mic Stream) -> Groq / Whisper STT & TTS Pipeline -> Real-Time Proctoring & Scorecard -> Shared Reviewer Workflow -> Final Decision.',
        folderStructure: '',
        techStackCategorized: [
          {
            category: 'Frontend (Solo Ownership)',
            items: [
              { name: 'Angular', color: '#DD0031' },
              { name: 'TypeScript', color: '#3178C6' },
              { name: 'NgRx', "color": '#BA2BD2' },
              { name: 'RxJS', color: '#B7178C' }
            ]
          },
          {
            category: 'Backend & AI Infrastructure',
            items: [
              { name: 'Java', color: '#007396' },
              { name: 'MySQL', color: '#4479A1' },
              { name: 'WebSockets', color: '#010101' },
              { name: 'Whisper STT', color: '#00A67E' },
              { name: 'Groq', color: '#F55036' },
              { name: 'OpenAI API', color: '#412991' }
            ]
          }
        ],
        implementationDetails: 'Single-handedly developed the UI, audio/video device capture mechanisms, and proctoring guardrails (blocking tab switching, copy-pasting, and window blurs). Built the online multi-language code & SQL compiler interface, automated paper generators for HR, and candidate profile sharing features for colleague cross-evaluations.',
        performanceData: {
          performanceScore: 99,
          accessibilityScore: 100,
          seoScore: 100,
          bundleSizeKb: 140,
          loadTimeMs: 350,
          p99LatencyMs: 120,
          throughputQps: 500,
          concurrentCandidatesSupported: 700,
          usersServed: 'Enterprise HR Teams, Technical Interviewers, and Mass Applicants',
          deploymentFrequency: 'Continuous'
        },
        accessibilityAudit: 'Accessible camera/mic selection dialogs, screen-reader compatible code and SQL editor panels, and keyboard-navigable candidate evaluation tables.',
        securityArchitecture: 'Sandboxed multi-language code runner, WebSockets JWT token authentication, PII data masking, and strict hardware permission handling for webcam/microphone media streams.',
        challenges: 'Managing local hardware media streams (camera and microphone) alongside bi-directional WebSocket audio state while serving over 700 concurrent candidates without UI lag or memory leaks.',
        solutions: 'Architected custom RxJS observable pipelines for browser MediaStream lifecycle management, decoupling audio/video rendering from background state updates using NgRx store slices.',
        lessonsLearned: 'Centralized RxJS stream management and strict state controls (NgRx) are vital when building full-featured, high-concurrency enterprise UI clients single-handedly.',
        futureImprovements: [
          'Add sub-100ms real-time audio-to-audio streaming interfaces.',
          'Expand AI proctoring with automated visual eye-gaze and multi-face detection models.'
        ],
        metrics: {
          manualEffortReduction: '90%',
          thirdPartyDependency: '0%',
          resumeParsingAccuracy: '98%',
          maxConcurrentCandidates: '700+'
        }
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
  // Journey milestones Signal
  private readonly journeySignal = signal<JourneyMilestone[]>([
    {
      id: 'j-1',
      year: '2022',
      title: 'Graduated in Computer Science',
      category: 'Education',
      description: 'Graduated with a Bachelor of Technology in Computer Science, laying a solid foundation in software engineering, algorithms, and system design.',
      tech: ['Java', 'C++', 'Data Structures', 'Algorithms']
    },
    {
      id: 'j-2',
      year: '2022',
      title: 'Joined Vision Waves as Associate Software Engineer',
      category: 'Career',
      description: 'Began my professional career at Vision Waves. Early on, collaborated with DataByte to work on ETL pipelines, Change Data Capture (CDC), ProcBot, and "Talk to Your Data" AI solutions.',
      tech: ['Angular', 'TypeScript', 'Node.js', 'ETL', 'CDC']
    },
    {
      id: 'j-3',
      year: '2023',
      title: 'IoT Platform & Rule Chain Integration',
      category: 'Production',
      description: 'Engineered high-performance IoT modules inspired by open-source platforms like ThingsBoard/ThingsDB, integrating dynamic rule chains and real-time telemetry processing.',
      tech: ['RxJS', 'NgRx', 'WebSockets', 'IoT', 'MQTT']
    },
    {
      id: 'j-4',
      year: '2023 - 2025',
      title: 'Talent Singularity & Cross-Functional Impact',
      category: 'Production',
      description: 'Worked directly alongside the CEO to architect Talent Singularity (an end-to-end AI hiring platform). Contributed to ongoing projects with the HUMAIN team and collaborated with cross-platform engineering teams on SingLife.',
      tech: ['OpenAI API', 'Whisper STT', 'Groq', 'Java', 'MySQL']
    },
    {
      id: 'j-5',
      year: '2022 - 2026',
      title: 'Leadership, Mentorship & Vision Waves Departure',
      category: 'Career',
      description: 'Mentored numerous junior developers throughout my 4-year tenure, guiding frontend architecture, code quality, and state management practices before concluding my impactful journey at Vision Waves in 2026.',
      tech: ['System Design', 'Code Reviews', 'Mentorship', 'Agile']
    },
    {
      id: 'j-6',
      year: '2026 - Present',
      title: 'Software Engineer at Softdel',
      category: 'Career',
      description: 'Joined Softdel to engineer cross-platform mobile and web applications (Angular/Ionic) for MechoShade, delivering intelligent Building Management Systems (BMS) and IoT automation.',
      tech: ['Angular', 'Ionic', 'TypeScript', 'Node.js', 'Microservices']
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
      name: 'Frontend & Mobile',
      iconSvg: 'layout',
      skills: [
        { name: 'Angular (v15+)', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 95, projectsUsedIn: ['Softdel', 'Vision Waves'], relatedTechnologies: [] },
        { name: 'Ionic', category: 'Mobile', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 85, projectsUsedIn: ['MechoSHADE'], relatedTechnologies: [] },
        { name: 'TypeScript', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 95, projectsUsedIn: ['All Projects'], relatedTechnologies: [] },
        { name: 'RxJS & NgRx', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 90, projectsUsedIn: ['IoT Dashboards', 'HRMS'], relatedTechnologies: [] },
        { name: 'Reactive Forms', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 95, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Angular Material', category: 'Frontend', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 90, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Cross-Platform Dev (iOS & Android)', category: 'Mobile', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] }
      ]
    },
    {
      id: 'sc-2',
      name: 'Backend & Systems',
      iconSvg: 'server',
      skills: [
        { name: 'Go (Golang)', category: 'Backend', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 88, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'REST APIs & Microservices', category: 'Backend', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 90, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'PostgreSQL & MySQL', category: 'Databases', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'MongoDB', category: 'Databases', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Real-Time Data Integration', category: 'Systems', proficiency: 'Expert', yearsExp: 3, confidenceLevel: 90, projectsUsedIn: [], relatedTechnologies: [] }
      ]
    },
    {
      id: 'sc-3',
      name: 'IoT, AI & Automation',
      iconSvg: 'cpu',
      skills: [
        { name: 'Smart Building/BMS Applications', category: 'IoT', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Industrial IoT Dashboards', category: 'IoT', proficiency: 'Expert', yearsExp: 3, confidenceLevel: 90, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'ETL/CDC Pipelines', category: 'Automation', proficiency: 'Advanced', yearsExp: 3, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'OpenAI API & Prompt Engineering', category: 'AI', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 88, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'n8n & Apache NiFi', category: 'Automation', proficiency: 'Advanced', yearsExp: 2, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] }
      ]
    },
    {
      id: 'sc-4',
      name: 'Cloud & DevOps',
      iconSvg: 'cloud',
      skills: [
        { name: 'AWS', category: 'Cloud', proficiency: 'Advanced', yearsExp: 3, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Docker & Kubernetes', category: 'DevOps', proficiency: 'Advanced', yearsExp: 3, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Helm & Jenkins CI/CD', category: 'DevOps', proficiency: 'Proficient', yearsExp: 2, confidenceLevel: 80, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Linux', category: 'Systems', proficiency: 'Advanced', yearsExp: 4, confidenceLevel: 90, projectsUsedIn: [], relatedTechnologies: [] }
      ]
    },
    {
      id: 'sc-5',
      name: 'AI-Assisted Tools',
      iconSvg: 'terminal',
      skills: [
        { name: 'Cursor & Claude Code', category: 'Tools', proficiency: 'Expert', yearsExp: 2, confidenceLevel: 95, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Gemini & GitHub Copilot', category: 'Tools', proficiency: 'Expert', yearsExp: 2, confidenceLevel: 95, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Codex & Postman', category: 'Tools', proficiency: 'Expert', yearsExp: 3, confidenceLevel: 95, projectsUsedIn: [], relatedTechnologies: [] }
      ]
    },
    {
      id: 'sc-6',
      name: 'Architecture & Leadership',
      iconSvg: 'git-branch',
      skills: [
        { name: 'System Design (HLD/LLD)', category: 'Architecture', proficiency: 'Advanced', yearsExp: 3, confidenceLevel: 85, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Scalable Architecture', category: 'Architecture', proficiency: 'Advanced', yearsExp: 3, confidenceLevel: 88, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Agile Delivery & Code Reviews', category: 'Leadership', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 90, projectsUsedIn: [], relatedTechnologies: [] },
        { name: 'Client Collaboration', category: 'Leadership', proficiency: 'Expert', yearsExp: 4, confidenceLevel: 95, projectsUsedIn: [], relatedTechnologies: [] }
      ]
    }
  ]);

  // Currently Learning
  private readonly currentlyLearningSignal = signal<CurrentlyLearningItem[]>([
    { name: 'AI Engineering (Self-Directed)', focusArea: 'Autonomous AI Agents, RAG Pipelines, Vector Databases (Pinecone/Qdrant), LLM Orchestration (LangChain)', progress: 'In Progress' },
    { name: 'High-Performance Systems', focusArea: 'Rust (Product Development, Memory Safety, Systems Programming)', progress: 'Active' },
    { name: 'Modern Stack Explorations', focusArea: 'Next.js / Serverless Architectures, WebSockets/gRPC Performance Optimization', progress: 'Exploring' }
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
