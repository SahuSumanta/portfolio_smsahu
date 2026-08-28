import { Injectable, signal, computed } from '@angular/core';
import { BlogArticle, KnowledgeResource, AuthorProfile } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  readonly authorProfile = signal<AuthorProfile>({
    name: 'Sumanta Sahu',
    title: 'Principal Systems & Frontend Architect',
    bio: 'Software architect specialized in distributed consensus protocols (Go/Rust), ultra-low latency streaming pipelines, and declarative Angular 20 design systems.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/SahuSumanta',
    linkedinUrl: 'https://linkedin.com/in/sahusumanta',
    twitterUrl: 'https://x.com/sahusumanta',
    websiteUrl: 'https://sumantasahu.dev',
    topics: ['Angular 20', 'Go', 'Rust', 'Distributed Systems', 'Signals', 'TailwindCSS', 'System Design']
  });

  private readonly articlesSignal = signal<BlogArticle[]>(
    [
      {
        id: "art-1",
        slug: "ionic-angular-60fps-performance",
        title: "Achieving 60fps Native Performance in Hybrid Ionic & Angular Apps",
        summary: "Practical optimization techniques for handling complex DOM trees, heavy animation frames, and real-time state updates across iOS and Android low-end hardware.",
        author: {
          name: "Sumanta Sahu",
          role: "Software Engineer & AI Systems Builder",
          avatarUrl: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: "2026-07-12",
        readingTimeMin: 11,
        difficulty: "Advanced",
        categories: [
          "Ionic",
          "Angular",
          "Mobile",
          "Performance"
        ],
        tags: [
          "#Ionic",
          "#Angular",
          "#MobileDev",
          "#Performance",
          "#TypeScript"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        coverUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
        featured: true,
        viewCount: 16400,
        likesCount: 1120,
        tableOfContents: [
          {
            id: "webview-bottlenecks",
            title: "1. Diagnosing Mobile WebView Frame Drops",
            level: 2
          },
          {
            id: "hardware-acceleration",
            title: "2. Hardware-Accelerated Layouts & CSS Will-Change",
            level: 2
          },
          {
            id: "zoneless-mobile",
            title: "3. Going Zoneless on Capacitor/Cordova Bridges",
            level: 2
          },
          {
            id: "benchmark-results",
            title: "4. Real-Device Benchmarks (iOS vs Android)",
            level: 2
          }
        ],
        contentMarkdown: `## 1. Diagnosing Mobile WebView Frame Drops

When running Angular inside an Ionic iOS WKWebView or Android WebView, standard dirty-checking overhead hits hardware limits fast. Frame drops under 30fps usually happen during rapid swipe gestures or heavy lists.

\`\`\`typescript
// Anti-Pattern: Triggering angular change detection during scroll events
@Component({
  selector: 'app-heavy-list',
  template: \`<ion-content (ionScroll)="onScroll($event)">...</ion-content>\`
})
export class HeavyListComponent {
  onScroll(ev: CustomEvent) {
    // Every scroll tick fires global Angular zone dirty-checking
    this.calculateHeaderParallax(ev.detail.scrollTop);
  }
}
\`\`\`

---

## 2. Hardware-Accelerated Layouts & CSS Will-Change

Leveraging native GPU composition layers prevents main-thread layout thrashing during page transitions.

\`\`\`css
/* Force GPU composite layer for dynamic shade position sliders */
.shade-control-card {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
\`\`\`

---

## 3. Going Zoneless on Capacitor/Cordova Bridges

By decoupling native plugin event listeners (Bluetooth BLE events, push notifications) from \`Zone.js\`, bridge serialization bottlenecks disappear completely.`
      },
      {
        id: "art-2",
        slug: "ngrx-signal-store-hybrid-architecture",
        title: "Architecting Hybrid State: NgRx SignalStore Meets RxJS Event Streams",
        summary: "Why replacing all RxJS with Signals is an anti-pattern: building a scalable pattern that pairs NgRx SignalStore for UI state with RxJS for complex async WebSocket telemetry.",
        author: {
          name: "Sumanta Sahu",
          role: "Software Engineer & AI Systems Builder",
          avatarUrl: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: "2026-05-18",
        readingTimeMin: 14,
        difficulty: "Advanced",
        categories: [
          "Angular",
          "State Management",
          "Architecture",
          "RxJS"
        ],
        tags: [
          "#Angular",
          "#NgRx",
          "#Signals",
          "#RxJS",
          "#Architecture"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        coverUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
        featured: true,
        viewCount: 12800,
        likesCount: 940,
        tableOfContents: [
          {
            id: "the-hybrid-model",
            title: "1. The Right Boundaries: Signals vs RxJS",
            level: 2
          },
          {
            id: "signal-store-implementation",
            title: "2. Building Route-Scoped NgRx SignalStores",
            level: 2
          },
          {
            id: "bridge-async-streams",
            title: "3. Bridging RxJS Pipelines into Signal Sinks",
            level: 2
          }
        ],
        contentMarkdown: `## 1. The Right Boundaries: Signals vs RxJS

A common mistake in modern Angular codebases is attempting to replace all RxJS streams with Signals. Signals excel at local UI reactivity and derived synchronous state, but **RxJS remains indispensable** for backpressure, cancellation (\`switchMap\`), and real-time event orchestration.

---

## 2. Building Route-Scoped NgRx SignalStores

\`\`\`typescript
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';

export interface DeviceTelemetryState {
  devices: Device[];
  selectedZone: string | null;
  isConnecting: boolean;
}

const initialState: DeviceTelemetryState = {
  devices: [],
  selectedZone: null,
  isConnecting: false,
};

export const DeviceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setZone(zoneId: string) {
      patchState(store, { selectedZone: zoneId });
    },
    updateDeviceStatus(deviceId: string, active: boolean) {
      patchState(store, (state) => ({
        devices: state.devices.map(d => d.id === deviceId ? { ...d, active } : d)
      }));
    }
  }))
);
\`\`\`

> [!TIP]
> Always keep writable signals and \`patchState\` operations encapsulated inside store methods. Never expose mutable signals directly to template components.`
      },
      {
        id: "art-3",
        slug: "real-time-iot-websocket-angular-ionic",
        title: "Building Real-Time Industrial IoT Dashboards with Angular & WebSockets",
        summary: "Lessons learned handling high-frequency telemetry data streams, offline sync queues, and BLE fallback reconnection algorithms in commercial building automation.",
        author: {
          name: "Sumanta Sahu",
          role: "Software Engineer & AI Systems Builder",
          avatarUrl: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: "2026-03-30",
        readingTimeMin: 15,
        difficulty: "Expert",
        categories: [
          "IoT",
          "Angular",
          "Mobile",
          "WebSockets"
        ],
        tags: [
          "#IoT",
          "#WebSockets",
          "#Angular",
          "#Ionic",
          "#RxJS"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        viewCount: 9200,
        likesCount: 680,
        tableOfContents: [
          {
            id: "telemetry-backpressure",
            title: "1. Managing Telemetry Backpressure with RxJS",
            level: 2
          },
          {
            id: "offline-reconciliation",
            title: "2. Offline Signal Queuing & Sync",
            level: 2
          }
        ],
        contentMarkdown: `## 1. Managing Telemetry Backpressure with RxJS

When building industrial BMS dashboards monitoring thousands of motorized window shades or environmental sensors, receiving unthrottled WebSocket bursts will crash mobile WebViews.

\`\`\`typescript
// Throttling high-frequency MQTT/WebSocket data streams
this.websocketService.stream$
  .pipe(
    filter(msg => msg.type === 'TELEMETRY_UPDATE'),
    bufferTime(250), // Batch UI updates into 250ms windows
    filter(batch => batch.length > 0),
    takeUntilDestroyed(this.destroyRef)
  )
  .subscribe(batch => this.processTelemetryBatch(batch));
\`\`\``
      },
      {
        id: "art-4",
        slug: "cross-platform-design-systems-ionic",
        title: "Cross-Platform UI Consistency: Custom Tokens in Ionic & Tailwind CSS",
        summary: "Decoupling component logic from platform styles to build a unified design system that renders natively across iOS Human Interface Guidelines and Android Material 3.",
        author: {
          name: "Sumanta Sahu",
          role: "Software Engineer & AI Systems Builder",
          avatarUrl: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: "2026-02-14",
        readingTimeMin: 9,
        difficulty: "Intermediate",
        categories: [
          "Design",
          "Ionic",
          "Frontend",
          "Mobile"
        ],
        tags: [
          "#DesignSystem",
          "#Ionic",
          "#TailwindCSS",
          "#Angular",
          "#UIUX"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        coverUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        viewCount: 10400,
        likesCount: 590,
        tableOfContents: [
          {
            id: "theme-variables",
            title: "1. Overriding Ionic CSS Custom Properties",
            level: 2
          },
          {
            id: "tailwind-integration",
            title: "2. Integrating Tailwind CSS with Ionic Shadow DOM",
            level: 2
          }
        ],
        contentMarkdown: `## 1. Overriding Ionic CSS Custom Properties

Ionic components leverage Web Components with Shadow DOM encapsulation. Customizing theme variables cleanly requires mapping your central Design System semantic tokens directly into Ionic's CSS variables:

\`\`\`css
:root {
  /* Brand Semantic Variables */
  --app-color-brand-primary: #e61c24;
  --app-color-surface-dark: #121214;

  /* Ionic Core Component Overrides */
  --ion-color-primary: var(--app-color-brand-primary);
  --ion-background-color: var(--app-color-surface-dark);
}
\`\`\``
      }
    ]
  );



  private readonly resourcesSignal = signal<KnowledgeResource[]>([
    {
      id: 'kr-1',
      title: 'Distributed Consensus Raft vs. Multi-Paxos Cheat Sheet',
      category: 'Cheat Sheets',
      summary: 'Side-by-side protocol comparison matrix covering leader election latency, log compaction overhead, and split-brain recovery metrics.',
      format: 'Cheat Sheet',
      updatedDate: 'June 2026',
      contentSnippet: 'Raft enforces strong leader term monotonicity; Paxos allows out-of-order log commits across instances.',
      tags: ['#Raft', '#Paxos', '#DistributedSystems']
    },
    {
      id: 'kr-2',
      title: 'Angular 20 Standalone & Signals Blueprint',
      category: 'Architecture Notes',
      summary: 'Architectural checklist for zone-less change detection, input.required() signals, computed memos, and SSR hydration.',
      format: 'Architecture Diagram',
      updatedDate: 'May 2026',
      contentSnippet: 'Use output<T>() signal emitters and model<T>() two-way bindings to replace legacy @Output() EventEmitters.',
      tags: ['#Angular', '#Signals', '#SSR']
    },
    {
      id: 'kr-3',
      title: 'Kubernetes Multi-Region Edge Network Architecture',
      category: 'System Design',
      summary: 'Production ingress routing, BGP Anycast failover topologies, and service mesh mTLS encryption policies.',
      format: 'Deep Dive',
      updatedDate: 'April 2026',
      contentSnippet: 'Deploy Envoy edge gateways with health checking circuits targeting nearest active Raft read replicas.',
      tags: ['#Kubernetes', '#SystemDesign', '#Cloud']
    },
    {
      id: 'kr-4',
      title: 'Chrome DevTools Memory Leak & Accessibility Audit Guide',
      category: 'Best Practices',
      summary: 'Step-by-step workflow for capturing heap snapshots, retaining tree introspection, and validating WCAG AA keyboard contrast compliance.',
      format: 'Checklist',
      updatedDate: 'March 2026',
      contentSnippet: 'Filter Allocation Timelines by detached DOM nodes to locate lingering event listeners inside destroyed components.',
      tags: ['#Testing', '#DevTools', '#Accessibility']
    }
  ]);

  readonly articles = computed(() => this.articlesSignal());
  readonly featuredArticle = computed(() => this.articlesSignal().find(a => a.featured) || this.articlesSignal()[0]);
  readonly latestArticles = computed(() => this.articlesSignal());
  readonly knowledgeResources = computed(() => this.resourcesSignal());

  readonly allCategories = computed(() => {
    const cats = new Set<string>();
    this.articlesSignal().forEach(a => a.categories.forEach(c => cats.add(c)));
    return Array.from(cats).sort();
  });

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.articlesSignal().forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  });

  getArticleBySlug(slug: string): BlogArticle | undefined {
    return this.articlesSignal().find(a => a.slug === slug);
  }
}
