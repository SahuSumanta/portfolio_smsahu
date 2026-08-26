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

  private readonly articlesSignal = signal<BlogArticle[]>([
    {
      id: 'art-1',
      slug: 'angular-20-signals-architecture',
      title: 'Architecting Reactive Enterprise SPAs with Angular 20 Signals & Zone-Less Execution',
      summary: 'A deep architectural guide on migrating monolithic enterprise applications from Zone.js dirty-checking to declarative fine-grained Signals, reducing CPU runtime overhead by 68%.',
      author: this.authorProfile(),
      publishedAt: '2026-06-18',
      readingTimeMin: 12,
      difficulty: 'Advanced',
      categories: ['Angular', 'Frontend', 'Performance', 'Architecture'],
      tags: ['#Angular', '#Signals', '#RxJS', '#Performance', '#TypeScript'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
      featured: true,
      viewCount: 14200,
      likesCount: 890,
      tableOfContents: [
        { id: 'introduction', title: '1. The Cost of Zone.js in Enterprise Scale', level: 2 },
        { id: 'signal-primitives', title: '2. Anatomy of Writable & Computed Signals', level: 2 },
        { id: 'zoneless-migration', title: '3. Step-by-Step Zone-Less Migration Strategy', level: 2 },
        { id: 'benchmarks', title: '4. Production Telemetry & Benchmarks', level: 2 },
        { id: 'conclusion', title: '5. Architectural Verdict', level: 2 }
      ],
      contentMarkdown: `
## 1. The Cost of Zone.js in Enterprise Scale

For nearly a decade, Angular applications relied on **Zone.js** to monkey-patch native browser APIs (` + '`setTimeout`' + `, DOM listeners, Promises) and trigger global application change detection cycles. While convenient for beginners, top-down tree traversals scale O(N) with DOM node complexity.

In enterprise dashboards with 10,000+ real-time financial telemetry rows, ` + '`ngDoCheck`' + ` execution storms can easily drop frame rates below 24fps.

\`\`\`typescript
// Legacy Zone.js pattern triggering top-down checks
@Component({
  selector: 'app-legacy-ticker',
  template: '<div>Last Price: {{ price }}</div>'
})
export class LegacyTickerComponent {
  price = 100.45;
  
  ngOnInit() {
    // Every WebSocket message triggers a full component tree re-evaluation
    this.ws.onMessage(data => this.price = data.price);
  }
}
\`\`\`

---

## 2. Anatomy of Writable & Computed Signals

Angular 20 introduces **declarative reactive primitives** via fine-grained Signals. When a signal value changes, only templates directly reading that signal receive localized dirty notifications.

\`\`\`typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-reactive-ticker',
  template: \`
    <div class="p-4 bg-[#131316] rounded-xl border border-[#242428]">
      <span class="text-sm font-mono text-[#A1A1AA]">Live Price:</span>
      <span class="text-2xl font-bold text-[#22C55E]">{{\$formattedPrice()}}</span>
    </div>
  \`
})
export class ReactiveTickerComponent {
  readonly rawPrice = signal<number>(100.45);
  
  // Memoized computed signal — evaluates only when rawPrice mutates
  readonly formattedPrice = computed(() => \`$\${this.rawPrice().toFixed(2)}\`);

  updatePrice(newVal: number) {
    this.rawPrice.set(newVal);
  }
}
\`\`\`

> [!TIP]
> Never mutate signal arrays or objects directly using ` + '`.push()`' + `. Always use ` + '`.update(arr => [...arr, item])`' + ` or ` + '`.set()`' + ` to ensure immutable reference changes trigger downstream computed memos.

---

## 3. Step-by-Step Zone-Less Migration Strategy

To eliminate ` + '`zone.js`' + ` entirely in Angular 20, configure ` + '`provideExperimentalZonelessChangeDetection()`' + ` inside your application bootstrap.

\`\`\`typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
}).catch(err => console.error(err));
\`\`\`

---

## 4. Production Telemetry & Benchmarks

Migrating our core real-time observability console yielded immediate improvements across all Core Web Vitals:

| Metric | Zone.js Architecture | Angular 20 Signals | Improvement |
| :--- | :--- | :--- | :--- |
| **Interaction to Next Paint (INP)** | 145 ms | 18 ms | **-87%** |
| **Main Thread CPU Blocking** | 380 ms | 42 ms | **-88%** |
| **Bundle Size (Gzipped)** | 84 kB | 61 kB | **-27%** |

---

## 5. Architectural Verdict

Signal-first architecture is not just a syntax update—it represents a paradigm shift toward deterministic, reactive software design that guarantees 60fps rendering under heavy data load.
      `
    },
    {
      id: 'art-2',
      slug: 'distributed-raft-consensus-go',
      title: 'Anatomy of a Zero-Allocation Raft Consensus Engine in Go 1.23',
      summary: 'Exploring low-level memory pooling, ring buffer network handlers, and lock-free log replication strategies to achieve 185,000 QPS in distributed storage.',
      author: this.authorProfile(),
      publishedAt: '2026-05-24',
      readingTimeMin: 16,
      difficulty: 'Expert',
      categories: ['Backend', 'System Design', 'Architecture', 'Programming'],
      tags: ['#Go', '#Raft', '#SystemDesign', '#Performance', '#Backend'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      featured: false,
      viewCount: 9800,
      likesCount: 710,
      tableOfContents: [
        { id: 'problem-statement', title: '1. The Garbage Collection Bottleneck', level: 2 },
        { id: 'memory-pooling', title: '2. Zero-Allocation gRPC Buffers via sync.Pool', level: 2 },
        { id: 'wal-compaction', title: '3. Asynchronous WAL Compaction', level: 2 }
      ],
      contentMarkdown: `
## 1. The Garbage Collection Bottleneck

In high-throughput Raft state machines, allocating heap memory for every AppendEntries RPC byte buffer forces the Go runtime into continuous mark-and-sweep GC pauses.

\`\`\`go
// High-allocation anti-pattern
func (s *RaftServer) AppendEntries(req *AppendReq) (*AppendResp, error) {
    // Creating a slice on heap for every single incoming log request
    buffer := make([]byte, len(req.Payload))
    copy(buffer, req.Payload)
    return s.stateMachine.Apply(buffer)
}
\`\`\`

---

## 2. Zero-Allocation gRPC Buffers via sync.Pool

By reusing byte slices from a thread-safe object pool, heap escapes drop to zero during steady-state quorum replication.

\`\`\`go
var bufferPool = sync.Pool{
    New: func() interface{} {
        b := make([]byte, 0, 4096)
        return &b
    },
}

func (s *RaftServer) AppendEntriesFast(req *AppendReq) (*AppendResp, error) {
    bufPtr := bufferPool.Get().(*[]byte)
    *bufPtr = (*bufPtr)[:0]
    *bufPtr = append(*bufPtr, req.Payload...)
    
    defer bufferPool.Put(bufPtr)
    return s.stateMachine.ApplyFast(*bufPtr)
}
\`\`\`

> [!IMPORTANT]
> Always reset the slice length ` + '`(*bufPtr)[:0]`' + ` before reusing pooled buffers to prevent reading stale memory payloads from previous requests.
      `
    },
    {
      id: 'art-3',
      slug: 'flink-clickhouse-sub-ms-pipelines',
      title: 'Engineering Sub-Millisecond Event Processing Pipelines with Apache Flink & ClickHouse',
      summary: 'Architectural lessons learned scaling anomaly detection streaming engines to 1.2 million events per second with exactly-once semantic guarantees.',
      author: this.authorProfile(),
      publishedAt: '2026-04-10',
      readingTimeMin: 14,
      difficulty: 'Advanced',
      categories: ['Data Infrastructure', 'DevOps', 'Cloud', 'Performance'],
      tags: ['#Kafka', '#Flink', '#ClickHouse', '#Performance', '#Cloud'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
      featured: false,
      viewCount: 7600,
      likesCount: 520,
      tableOfContents: [
        { id: 'stream-ingestion', title: '1. Designing Idempotent Kafka Sinks', level: 2 },
        { id: 'columnar-sorting', title: '2. ClickHouse Sorting Key Optimization', level: 2 }
      ],
      contentMarkdown: `
## 1. Designing Idempotent Kafka Sinks

When executing distributed windowed stream joins in Apache Flink, worker node failures trigger checkpoint rollbacks. Without deterministic deduplication keys, downstream ClickHouse tables accumulate duplicate records.

\`\`\`sql
-- ClickHouse ReplacingMergeTree schema ensuring deterministic deduplication
CREATE TABLE financial_events_telemetry (
    event_id UUID,
    account_id UInt64,
    timestamp DateTime64(3),
    amount Decimal(18, 4),
    payload String
) ENGINE = ReplacingMergeTree(timestamp)
ORDER BY (account_id, event_id);
\`\`\`

> [!WARNING]
> Do not rely on random UUID generation inside Flink map operators. Generate MurmurHash3 deterministic IDs from payload timestamps and sequence numbers at ingress edge proxies.
      `
    },
    {
      id: 'art-4',
      slug: 'token-driven-design-systems',
      title: 'Scaling Token-Driven UI Architecture Across 14 Enterprise Suites',
      summary: 'How three-layer token hierarchies (Primitive -> Semantic -> Component) decouple visual styling from component runtime logic across web and mobile platforms.',
      author: this.authorProfile(),
      publishedAt: '2026-03-02',
      readingTimeMin: 10,
      difficulty: 'Intermediate',
      categories: ['Design', 'Frontend', 'Accessibility', 'Architecture'],
      tags: ['#DesignSystem', '#TailwindCSS', '#Angular', '#Accessibility', '#TypeScript'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
      featured: false,
      viewCount: 11500,
      likesCount: 640,
      tableOfContents: [
        { id: 'token-architecture', title: '1. The Three-Layer Token Pyramid', level: 2 },
        { id: 'css-vars', title: '2. Zero-Runtime CSS Variable Injection', level: 2 }
      ],
      contentMarkdown: `
## 1. The Three-Layer Token Pyramid

Design systems break down when engineers directly consume raw hexadecimal colors like ` + '`#3B82F6`' + ` inside component templates. By structuring tokens into three distinct tiers, design changes propagate seamlessly:

1. **Primitive Tokens**: Immutable visual palette definitions (` + '`color-blue-500: #3B82F6`' + `).
2. **Semantic Tokens**: Contextual meaning mapping (` + '`color-action-primary: var(--color-blue-500)`' + `).
3. **Component Tokens**: Specific widget styling (` + '`button-primary-bg: var(--color-action-primary)`' + `).

\`\`\`css
/* Automated compilation generated from Figma design studio */
:root {
  --color-primitive-blue-500: #3B82F6;
  --color-semantic-action: var(--color-primitive-blue-500);
  --btn-primary-background: var(--color-semantic-action);
}
\`\`\`
      `
    }
  ]);

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
