import { 
  StageItem, 
  CapabilityItem, 
  WorkflowNodeData, 
  McpServer, 
  PhilosophyComparison,
  ConcreteCapabilityCategory,
  UserScenario,
  ThoughtStage,
  DeveloperPersona,
  ProductUiScreen,
  ArchitectureComponent,
  TrustSignal,
  WorkflowStoryStep
} from './types';

export const CONCRETE_CAPABILITY_CATEGORIES: ConcreteCapabilityCategory[] = [
  {
    id: 'understand',
    tag: '01 / COMPREHENSION',
    title: 'Understand',
    description: 'Sylor maps your workspace, tracing symbol graphs and project-level architecture before formulating solutions.',
    items: [
      {
        id: 'u-1',
        number: '01',
        title: 'Read an unfamiliar codebase',
        explanation: 'Parses directory structures, monorepo workspaces, and configuration files to build a mental map of your system.',
        techDetail: 'Tree-sitter AST traversal across TS, Python, Go, Rust'
      },
      {
        id: 'u-2',
        number: '02',
        title: 'Trace relationships between files',
        explanation: 'Resolves imported symbols, type interfaces, and transitive dependencies across package boundaries.',
        techDetail: 'Cross-module symbol graph closure & LSP indexer'
      },
      {
        id: 'u-3',
        number: '03',
        title: 'Find the relevant context',
        explanation: 'Gathers only the files, types, and definitions strictly needed for the task without blowing token limits.',
        techDetail: 'BM25 + Semantic embedding hybrid context retrieval'
      },
      {
        id: 'u-4',
        number: '04',
        title: 'Understand existing architecture',
        explanation: 'Recognizes design patterns, state management models, API conventions, and database interaction styles.',
        techDetail: 'Structural archetype classification & pattern inference'
      },
      {
        id: 'u-5',
        number: '05',
        title: 'Inspect project context and secrets safely',
        explanation: 'Preserves environment security boundaries, ignoring .env secrets while reading necessary type declarations.',
        techDetail: 'Zero-leak secret masking & boundary enforcement'
      }
    ]
  },
  {
    id: 'plan-edit',
    tag: '02 / MUTATION & PLANNING',
    title: 'Plan & Edit',
    description: 'Constructs atomic execution graphs and performs surgical, AST-anchored code modifications.',
    items: [
      {
        id: 'p-1',
        number: '01',
        title: 'Plan multi-step tasks',
        explanation: 'Breaks complex requirements into discrete, verifiable steps with rollback checkpoints before making edits.',
        techDetail: 'Directed Acyclic Graph (DAG) state planner'
      },
      {
        id: 'p-2',
        number: '02',
        title: 'Create and modify files',
        explanation: 'Generates new modules, scaffolds boilerplate, and updates existing files with exact syntactic alignment.',
        techDetail: 'Syntactic boundary preservation & atomicity'
      },
      {
        id: 'p-3',
        number: '03',
        title: 'Refactor existing code safely',
        explanation: 'Restructures components and backend services while rigorously maintaining behavior and public API contracts.',
        techDetail: 'AST substitution without whitespace/comment damage'
      },
      {
        id: 'p-4',
        number: '04',
        title: 'Work across multiple files',
        explanation: 'Updates database schemas, API routes, client components, and types in a single synchronized patch.',
        techDetail: 'Transactional multi-file patch reconciliation'
      },
      {
        id: 'p-5',
        number: '05',
        title: 'Build complete features end-to-end',
        explanation: 'Implements full product capabilities from data modeling to interactive UI elements and error states.',
        techDetail: 'Full-stack contract generation & scaffolding'
      }
    ]
  },
  {
    id: 'tools-mcp',
    tag: '03 / EXTENSIBILITY & RUNTIME',
    title: 'Use Tools',
    description: 'Connects to open Model Context Protocol servers, custom markdown skills, and local developer CLIs.',
    items: [
      {
        id: 't-1',
        number: '01',
        title: 'Use Model Context Protocol (MCP)',
        explanation: 'Integrates with GitHub, databases, browsers, and custom internal tools through open JSON-RPC standards.',
        techDetail: 'Native MCP client with dynamic server discovery'
      },
      {
        id: 't-2',
        number: '02',
        title: 'Use composable Markdown Skills',
        explanation: 'Loads domain playbooks, framework rules, and team conventions stored directly in your repo.',
        techDetail: 'Schema-enforced markdown playbook loader'
      },
      {
        id: 't-3',
        number: '03',
        title: 'Work with external APIs & databases',
        explanation: 'Introspects SQL schemas, tests REST/GraphQL endpoints, and mocks integration responses locally.',
        techDetail: 'Scoped connection proxies & schema readers'
      },
      {
        id: 't-4',
        number: '04',
        title: 'Run development tasks & scripts',
        explanation: 'Executes package managers, database migrations, asset compilations, and container commands.',
        techDetail: 'Isolated sandbox runner with real-time stdout capture'
      },
      {
        id: 't-5',
        number: '05',
        title: 'Inspect browser rendering & network',
        explanation: 'Launches headless browsers to inspect DOM states, capture UI visual regressions, and check network traces.',
        techDetail: 'Chrome DevTools Protocol (CDP) headless driver'
      }
    ]
  },
  {
    id: 'verify-iterate',
    tag: '04 / RELIABILITY & QUALITY',
    title: 'Verify & Iterate',
    description: 'Sylor tests its own work, catches compiler errors, and loops until all assertions pass cleanly.',
    items: [
      {
        id: 'v-1',
        number: '01',
        title: 'Verify builds and compilation',
        explanation: 'Runs your project compiler (tsc, cargo, go build, vite) and parses diagnostics directly from stdout.',
        techDetail: 'Compiler error pattern matching & AST triangulation'
      },
      {
        id: 'v-2',
        number: '02',
        title: 'Debug runtime errors and stacktraces',
        explanation: 'Maps runtime exceptions back to exact source code lines and diagnoses the fundamental root cause.',
        techDetail: 'Source-map mapping & traceback causation reasoning'
      },
      {
        id: 'v-3',
        number: '03',
        title: 'Autonomous self-healing loop',
        explanation: 'When a test or build fails, Sylor analyzes the error, applies a targeted correction, and re-verifies.',
        techDetail: 'Closed-loop verification: Build → Test → Fix → Green'
      },
      {
        id: 'v-4',
        number: '04',
        title: 'Check lint and style conventions',
        explanation: 'Adheres to your existing ESLint, Prettier, or Biome configurations without introducing stylistic drift.',
        techDetail: 'Automatic lint format runner prior to hand-off'
      },
      {
        id: 'v-5',
        number: '05',
        title: 'Iterate on results with full context',
        explanation: 'Accepts follow-up feedback, refines edge cases, and adjusts implementation without starting from scratch.',
        techDetail: 'Incremental conversation state & delta history'
      }
    ]
  }
];

export const REAL_USER_SCENARIOS: UserScenario[] = [
  {
    id: 'scenario-auth',
    title: 'Build a complete authentication flow',
    category: 'Feature Development',
    complexity: 'Multi-file',
    description: 'Inspects project architecture, determines auth boundaries, creates required session endpoints, integrates guards, and verifies.',
    userPrompt: 'Add session-based authentication with protected dashboard routes and user role verification.',
    planSteps: [
      'Inspect database schema & route tree for user models',
      'Construct atomic 4-step execution graph with rollback gates',
      'Mutate 4 files surgically: auth.ts, router, middleware, frontend',
      'Execute compiler & test suite asserting 200 OK and 401 Unauthorized'
    ],
    executionTime: '2.4s',
    filesModified: [
      'src/lib/auth.ts (New)',
      'src/routes/auth.ts (New)',
      'src/middleware/guard.ts',
      'src/components/Header.tsx'
    ],
    verificationProof: 'PASS src/__tests__/auth.test.ts (6 tests passed, 0 failures, 18ms)',
    verifications: ['Zero token leaks', 'TypeScript passes with 0 errors', 'Role guard test: 100% green']
  },
  {
    id: 'scenario-bug',
    title: 'Fix the payment bug in checkout',
    category: 'Bug Resolution',
    complexity: 'Quick',
    description: 'Isolates checkout webhook handler, identifies floating-point currency calculation drift, and patches the exact line.',
    userPrompt: 'Users in EUR region are seeing a 1-cent discrepancy in the final Stripe checkout total during discount calculations.',
    planSteps: [
      'Locate billing calculations in src/services/billing.ts',
      'Draft reproduction test isolating the 15% discount on €19.99 drift',
      'Refactor math to use integer cents and Math.round',
      'Run complete billing regression suite across USD, EUR, GBP, JPY'
    ],
    executionTime: '820ms',
    filesModified: [
      'src/services/billing.ts (L44-L61 patched)',
      'src/__tests__/billing.test.ts (Added reproduction case)'
    ],
    verificationProof: 'PASS src/__tests__/billing.test.ts (18 tests passed across 4 currencies)',
    verifications: ['Integer-safe math guaranteed', 'All 18 billing tests green', 'No side effects on checkout webhook']
  },
  {
    id: 'scenario-dashboard',
    title: 'Add an analytics dashboard to this React project',
    category: 'UI & Layout',
    complexity: 'Multi-file',
    description: 'Scans existing Tailwind tokens, builds responsive metric widgets and data visualizers, and connects real hooks.',
    userPrompt: 'Create an analytics dashboard with 4 metric cards, a weekly activity chart, and a recent events table.',
    planSteps: [
      'Index design system: colors, typography rhythm, Lucide icon imports',
      'Generate modular hierarchy: MetricCard, ActivityChart, EventTable',
      'Bind typed data interfaces with graceful empty & loading states',
      'Audit mobile breakpoints (< 768px) ensuring zero horizontal overflow'
    ],
    executionTime: '3.1s',
    filesModified: [
      'src/components/DashboardView.tsx (New)',
      'src/components/MetricCard.tsx (New)',
      'src/components/ActivityChart.tsx (New)',
      'src/components/EventTable.tsx (New)'
    ],
    verificationProof: 'Compiled in 312ms. 0 type errors, 0 lint warnings. 100% WCAG AA contrast.',
    verifications: ['Matches project typography & palette', 'Zero runtime warnings', 'Fully accessible keyboard focus']
  },
  {
    id: 'scenario-refactor',
    title: 'Refactor this monolith without breaking behavior',
    category: 'Code Quality',
    complexity: 'Architecture',
    description: 'Decomposes a 650-line monolith component into 4 focused sub-components while maintaining all props and tests.',
    userPrompt: 'Split `OrderManager.tsx` into smaller maintainable modules without breaking existing consumers or test contracts.',
    planSteps: [
      'Extract component props contract and internal state dependencies',
      'Create sub-components: OrderHeader, OrderItemsList, PaymentSummary',
      'Reassemble OrderManager container preserving public API contract',
      'Run snapshot & integration test suites to verify 100% parity'
    ],
    executionTime: '1.9s',
    filesModified: [
      'src/components/OrderManager.tsx (Reduced 650 -> 48 lines)',
      'src/components/OrderHeader.tsx (New)',
      'src/components/OrderItemsList.tsx (New)',
      'src/components/PaymentSummary.tsx (New)'
    ],
    verificationProof: 'PASS src/__tests__/OrderManager.test.tsx (14 tests passed, 0 prop alterations needed)',
    verifications: ['Public interface 100% unchanged', 'Cyclomatic complexity reduced by 72%', 'All 14 integration tests pass']
  },
  {
    id: 'scenario-repo',
    title: 'Understand this unfamiliar repository',
    category: 'Exploration',
    complexity: 'Quick',
    description: 'Indexes dependencies, maps entrypoints, explains data flow, and provides an actionable developer guide.',
    userPrompt: 'Explain how this open-source distributed cache repo handles cluster node failover and leader election.',
    planSteps: [
      'Traverse consensus and membership packages via Tree-Sitter',
      'Trace heartbeat timeout transitions to RequestVote broadcast RPCs',
      'Synthesize architectural report with state machine diagrams and exact file anchors',
      'Prime local agent memory for immediate follow-up surgical edits'
    ],
    executionTime: '1.4s',
    filesModified: [
      'Zero files altered (Inspection-only mode active)'
    ],
    verificationProof: 'Grounded AST report generated across 42 source files with 0 hallucinations.',
    verifications: ['Accurate file & line references', 'Zero hallucinated APIs', 'Immediate readiness for edits']
  }
];

export const THOUGHT_STAGES: ThoughtStage[] = [
  {
    id: 'stage-request',
    stepNumber: '01',
    title: 'User Request',
    shortSummary: 'Captures intent, scope, and technical constraints',
    fullDescription: 'Sylor ingests the natural language request or issue description, extracting explicit goals, target files, and safety constraints.',
    agentAction: 'Parse prompt -> Extract AST targets -> Validate boundary permissions',
    codebaseImpact: 'Read-only intake. Establishes session memory and project grounding.',
    outputArtifact: 'Normalized Intent Object + Constraint Matrix'
  },
  {
    id: 'stage-context',
    stepNumber: '02',
    title: 'Context Gathering',
    shortSummary: 'Finds the exact files and definitions required',
    fullDescription: 'Rather than loading the entire repository blindly, Sylor identifies the specific files, symbols, and dependencies relevant to the task.',
    agentAction: 'Traverse symbol references -> Index type definitions -> Build context buffer',
    codebaseImpact: 'Non-destructive AST reading with zero secret leakage.',
    outputArtifact: 'Focused Context Buffer (< 12KB token budget)'
  },
  {
    id: 'stage-understanding',
    stepNumber: '03',
    title: 'Understanding',
    shortSummary: 'Interprets existing conventions and contracts',
    fullDescription: 'Sylor analyzes how your codebase structures data, manages state, names variables, and handles errors so its work feels native.',
    agentAction: 'Infer project architecture archetype -> Verify TypeScript type invariants',
    codebaseImpact: 'Zero file mutations. Calibrates stylistic patterns to local standards.',
    outputArtifact: 'Ground-Truth Architecture Model'
  },
  {
    id: 'stage-plan',
    stepNumber: '04',
    title: 'Deterministic Plan',
    shortSummary: 'Maps out changes before touching any code',
    fullDescription: 'Sylor designs an ordered dependency graph of atomic steps, validating blast radius and preparing rollback checkpoints.',
    agentAction: 'Generate Directed Acyclic Graph (DAG) -> Schedule mutation checkpoints',
    codebaseImpact: 'Pre-flight safety gate. Formulates rollback points before any file write.',
    outputArtifact: 'Topological Execution Plan (Verified DAG)'
  },
  {
    id: 'stage-tools',
    stepNumber: '05',
    title: 'Tool Selection',
    shortSummary: 'Binds the right MCP servers and capabilities',
    fullDescription: 'Sylor chooses which Model Context Protocol tools, local CLI commands, or skills are needed to complete each step of the plan.',
    agentAction: 'Query MCP registry -> Authenticate tool permissions -> Scaffolding handles',
    codebaseImpact: 'Scoped environment execution with explicit session permissions.',
    outputArtifact: 'Scoped Callable Tool Handles'
  },
  {
    id: 'stage-implementation',
    stepNumber: '06',
    title: 'Implementation',
    shortSummary: 'Applies surgical, AST-anchored file modifications',
    fullDescription: 'Sylor generates non-destructive diffs that adhere to your project formatting, lint rules, and type invariants.',
    agentAction: 'Synthesize exact AST diff -> Apply atomic file patches',
    codebaseImpact: 'Targeted file modifications. Preserves comments, whitespace, and formatting.',
    outputArtifact: 'Unified Syntactic Patch Buffer'
  },
  {
    id: 'stage-verification',
    stepNumber: '07',
    title: 'Verification',
    shortSummary: 'Runs builds, tests, and self-heals errors',
    fullDescription: 'Sylor checks compiler diagnostics, executes test suites, and autonomously fixes any unexpected discrepancies before completing.',
    agentAction: 'Run tsc & vitest -> Parse error output -> Autonomously patch regressions',
    codebaseImpact: 'Autonomous self-healing feedback loop guaranteeing compiler invariants.',
    outputArtifact: 'Clean Diagnostic Test & Build Report'
  },
  {
    id: 'stage-result',
    stepNumber: '08',
    title: 'Result & Control',
    shortSummary: 'Delivers working software ready for your review',
    fullDescription: 'You receive working code, a clear explanation of changes, and a clean Git state ready to inspect, test, or commit.',
    agentAction: 'Present unified diff -> Provide commit message -> Release file locks',
    codebaseImpact: 'Production-ready software ready for direct developer approval.',
    outputArtifact: 'Production-Ready Working Software'
  }
];

export const PRODUCT_UI_SCREENS: ProductUiScreen[] = [
  {
    id: 'workspace',
    tabLabel: 'Agent Workspace',
    title: 'Agent Workspace',
    subtitle: 'Natural conversation paired with real-time execution telemetry',
    description: 'Sylor shows you its intent, current sub-task, active tool calls, and execution progress in a clean, focused window.',
    badge: 'Core UI',
    highlights: [
      'Split editor view with live reasoning stream',
      'Step-by-step progress checklist with rollback controls',
      'Active tool invocation telemetry'
    ]
  },
  {
    id: 'ast-context',
    tabLabel: 'Project Context',
    title: 'Project Context & AST',
    subtitle: 'Deterministic grounding across your entire codebase',
    description: 'Browse the symbol graph Sylor constructed for your project. See exactly which types, modules, and contracts it is referencing.',
    badge: 'AST Grounding',
    highlights: [
      'Cross-file symbol graph visualization',
      'Transitive dependency resolution',
      'Zero-leak secret masking'
    ]
  },
  {
    id: 'surgical-diff',
    tabLabel: 'Surgical Diff',
    title: 'Multi-File Surgical Diff',
    subtitle: 'Non-destructive, atomic code modifications',
    description: 'Inspect clear line-by-line syntax diffs with instant preview. Accept all changes or review them file by file.',
    badge: 'Patch Engine',
    highlights: [
      'AST target block replacement',
      'Preserves comments, formatting, and indentation',
      'Atomic multi-file rollback checkpoints'
    ]
  },
  {
    id: 'mcp-skills',
    tabLabel: 'MCP & Skills',
    title: 'MCP & Skills Registry',
    subtitle: 'Configurable tools, servers, and custom skills',
    description: 'Toggle tools on and off with a single click. Connect PostgreSQL, GitHub, Docker, Playwright, or your own MCP servers.',
    badge: 'Open Protocol',
    highlights: [
      'Standard Model Context Protocol (MCP 1.0)',
      'Custom repository-level markdown skills',
      'Dynamic zero-restart discovery'
    ]
  },
  {
    id: 'verification-engine',
    tabLabel: 'Verification Engine',
    title: 'Verification Engine',
    subtitle: 'Automated compiler and test suite diagnostics',
    description: 'Watch Sylor run your test suite, capture stdout diagnostics, self-heal compiler errors, and deliver green builds.',
    badge: 'Reliability',
    highlights: [
      'Autonomous closed-loop healing (Build -> Test -> Fix)',
      'Compiler traceback diagnostic parser',
      'Type checker invariant validation'
    ]
  },
  {
    id: 'settings-memory',
    tabLabel: 'Settings & Memory',
    title: 'Settings & Memory',
    subtitle: 'Repository-specific guidelines and memory',
    description: 'Set architectural constraints, preferred libraries, and security permissions in your local project config file.',
    badge: 'Control',
    highlights: [
      'Local-first configuration (.sylor/config.json)',
      'Explicit tool permission boundaries',
      'Zero telemetry by default'
    ]
  }
];

export const DEVELOPER_PERSONAS: DeveloperPersona[] = [
  {
    id: 'persona-builder',
    role: 'For the Builder',
    title: 'The Full-Stack Builder',
    tagline: 'Turn a product idea into working software fast.',
    quote: 'I want to spend my energy on product architecture and user experience, not wrestling with boilerplate and wiring up API routes.',
    description: 'Sylor scaffolds full-stack features from simple prompts, creates database schemas, connects frontend components, and tests the end-to-end flow so you can ship fast.',
    typicalTask: 'Scaffold an authenticated dashboard with Stripe billing, user settings, and automated Postgres migrations.',
    valueDrivers: [
      'Full-stack feature scaffolding in seconds',
      'Automated schema, API, and UI wiring',
      'End-to-end test verification before hand-off'
    ],
    keyWorkflows: [
      'Scaffold full-stack features from specifications',
      'Generate database migrations and API endpoints',
      'Create responsive UI components matching design tokens',
      'Wire authentication, billing, and third-party webhooks'
    ],
    recommendedSetup: 'Filesystem MCP + GitHub MCP + Database MCP'
  },
  {
    id: 'persona-maintainer',
    role: 'For the Maintainer',
    title: 'The System Maintainer',
    tagline: 'Understand, improve, and refactor existing systems safely.',
    quote: 'I manage a 50,000-line codebase. I need an agent that respects our existing patterns and doesn\'t blindly rewrite working modules.',
    description: 'Sylor performs surgical multi-file refactoring, updates deprecated dependencies, isolates regressions, and ensures zero behavioral breaks through automated verification.',
    typicalTask: 'Refactor state management in our 600-line monolith component without changing any public props or tests.',
    valueDrivers: [
      'Surgical AST-level diffs that preserve style',
      'Regression isolation from stacktraces',
      'Strict invariant verification prior to commit'
    ],
    keyWorkflows: [
      'Multi-file refactoring across module boundaries',
      'Upgrade deprecated library versions safely',
      'Isolate regression bugs from stacktraces',
      'Decompose complex monolith components'
    ],
    recommendedSetup: 'Filesystem MCP + Test Runner Skill + Git Engine'
  },
  {
    id: 'persona-learner',
    role: 'For the Learner',
    title: 'The Learning Engineer',
    tagline: 'Explore unfamiliar code with an agent that explains as it works.',
    quote: 'Whenever I jump into a new repository or language, I want to understand why things are built the way they are.',
    description: 'Sylor maps symbol dependencies, explains subtle architectural decisions, walks through execution codepaths, and guides you through complex open-source projects.',
    typicalTask: 'Explain the request lifecycle in this distributed Raft consensus implementation and point to the election RPCs.',
    valueDrivers: [
      'Clear AST-grounded architectural explanations',
      'Step-by-step code walkthroughs with file links',
      'Zero hallucinated packages or functions'
    ],
    keyWorkflows: [
      'Trace request lifecycles across unfamiliar repos',
      'Explain subtle algorithmic and concurrency logic',
      'Learn idiomatic patterns in Rust, Go, or TypeScript',
      'Interactive architecture Q&A directly against code'
    ],
    recommendedSetup: 'AST Inspector + Context Graph + Markdown Skills'
  },
  {
    id: 'persona-power',
    role: 'For the Power User',
    title: 'The Power User',
    tagline: 'Configure tools, MCP servers, skills, and workflows around your environment.',
    quote: 'I don\'t want a black-box assistant. I want a configurable agent with custom tools, specific protocols, and exact constraints.',
    description: 'Sylor connects to custom Model Context Protocol servers, reads repository-level rules, executes sandboxed scripts, and seamlessly integrates into your existing terminal and editor workflow.',
    typicalTask: 'Connect our internal deployment CLI via MCP and run our custom database migration checklist with strict verification.',
    valueDrivers: [
      'Open Model Context Protocol 1.0 integration',
      'Custom repository-level markdown skills',
      'Zero telemetry and local-first execution'
    ],
    keyWorkflows: [
      'Connect private internal APIs via custom MCP servers',
      'Define team-wide coding rules in repo config files',
      'Automate complex multi-step deployment checklists',
      'Custom LLM model routing and temperature control'
    ],
    recommendedSetup: 'Full MCP Suite + Custom Internal Servers + Repo Config'
  }
];

export const WORKFLOW_STORY_STEPS: WorkflowStoryStep[] = [
  {
    id: 'story-1',
    step: '01',
    title: 'Inspects project environment & configuration',
    phase: 'Understand',
    action: 'Sylor scans package.json, tailwind.config.js, and index.html to identify the styling architecture and entrypoints.',
    files: ['package.json', 'tailwind.config.js', 'index.html'],
    codeDiffSnippet: `// Discovered:
// - Tailwind CSS configured with darkMode: "class"
// - React 18 + TypeScript entrypoint: src/main.tsx
// - Root DOM target: #root in index.html`,
    verificationStatus: 'AST & configuration mapped in 18ms'
  },
  {
    id: 'story-2',
    step: '02',
    title: 'Finds layout wrappers & color tokens',
    phase: 'Context',
    action: 'Traces the root canvas #faf9f7, identifies all hardcoded color classes across the header, cards, and text hierarchy.',
    files: ['src/App.tsx', 'src/components/Navigation.tsx', 'src/index.css'],
    codeDiffSnippet: `// Identified 14 hardcoded neutral color classes:
// - bg-[#faf9f7] -> needs dark:bg-[#111111]
// - text-[#111111] -> needs dark:text-[#faf9f7]
// - border-[#e8e6e2] -> needs dark:border-[#2a2a2a]`,
    verificationStatus: 'Color token hierarchy indexed'
  },
  {
    id: 'story-3',
    step: '03',
    title: 'Plans the required changes & state provider',
    phase: 'Plan',
    action: 'Determines that a ThemeProvider context is needed to sync system preferences and persist user choices in localStorage.',
    files: ['src/context/ThemeContext.tsx (To create)', 'src/components/ThemeToggle.tsx (To create)'],
    codeDiffSnippet: `Plan DAG:
1. Create ThemeContext.tsx (useLocalStorage + matchMedia listener)
2. Wrap App.tsx with ThemeProvider
3. Add ThemeToggle to Navigation.tsx
4. Verify build & class injection on <html class="dark">`,
    verificationStatus: 'Execution DAG formulated with 0 breaking changes'
  },
  {
    id: 'story-4',
    step: '04',
    title: 'Applies surgical diffs & verifies build',
    phase: 'Execute & Verify',
    action: 'Creates the provider, inserts the toggle in navigation, updates CSS variables, and runs tsc and vite build.',
    files: ['src/context/ThemeContext.tsx', 'src/App.tsx', 'src/components/Navigation.tsx'],
    codeDiffSnippet: `$ tsc --noEmit
$ vite build
✓ 48 modules transformed.
dist/index.html   0.45 kB
dist/assets/index.js  142.10 kB
✓ Build completed in 240ms with 0 errors.`,
    verificationStatus: 'Verified: 0 TypeScript errors, zero FOUC, 100% functional'
  }
];

export const ARCHITECTURE_COMPONENTS: ArchitectureComponent[] = [
  {
    id: 'arch-model',
    title: 'Reasoning Engine',
    role: 'Language Intelligence & Intent Decomposition',
    description: 'High-leverage reasoning loops that translate developer intent into structured execution graphs.',
    techSpec: 'Multi-turn reasoning • Structured tool schema synthesis • Dynamic constraint validation',
    interfaces: 'LLM APIs / Reasoning Loops'
  },
  {
    id: 'arch-context',
    title: 'Context & Memory Engine',
    role: 'AST Graph & Codebase Grounding',
    description: 'Traverses file trees, symbols, exported types, and package manifests to establish ground truth.',
    techSpec: 'Tree-Sitter AST indexer • LSP symbol closure • Vector + BM25 hybrid context budget',
    interfaces: 'Local File System / AST Cache'
  },
  {
    id: 'arch-protocols',
    title: 'Tool & Protocol Protocols',
    role: 'Model Context Protocol (MCP 1.0)',
    description: 'Standard JSON-RPC protocol interface to external data, git engines, headless browsers, and custom skills.',
    techSpec: 'JSON-RPC 2.0 stdio/SSE • Dynamic tool discovery • Schema-enforced argument checking',
    interfaces: 'MCP Standard / Skills System'
  },
  {
    id: 'arch-verification',
    title: 'Verification & Invariant Guard',
    role: 'Autonomous Compilation & Diagnostic Check',
    description: 'Executes compiler checks, test suites, and linter runs. Self-heals if unexpected errors arise.',
    techSpec: 'Diagnostic traceback parser • Closed-loop repair engine • Zero regression guarantee',
    interfaces: 'tsc / vitest / eslint / cargo'
  },
  {
    id: 'arch-workspace',
    title: 'Local Project Workspace',
    role: 'Your Environment & Git Working Tree',
    description: 'Operates directly in your local environment. Code stays on your machine with zero telemetry.',
    techSpec: 'Atomic file mutations • Non-destructive diffs • Direct Git branch integration',
    interfaces: 'Local OS / Git Engine'
  }
];

export const TRUST_SIGNALS: TrustSignal[] = [
  {
    id: 'trust-local',
    title: 'Local First & Private',
    description: 'Your codebase stays on your machine. Sylor never sends your proprietary code to third-party training databases.',
    meta: 'Zero Telemetry by Default'
  },
  {
    id: 'trust-diffs',
    title: 'Transparent Diffs',
    description: 'Review every file modification and tool execution before changes are committed to your working tree.',
    meta: 'Human-in-the-Loop Control'
  },
  {
    id: 'trust-lockin',
    title: 'Zero Proprietary Lock-In',
    description: 'Built on open standards — Model Context Protocol, Markdown Skills, and standard language server tooling.',
    meta: 'MCP 1.0 Compatible'
  },
  {
    id: 'trust-tools',
    title: 'Works With Your Stack',
    description: 'Compatible with VS Code, Git, Terminal, Node, Python, Rust, Go, React, and any language toolchain.',
    meta: 'Universal Language Support'
  }
];

// Single source of truth for the public desktop release. The Windows installer
// is published on GitHub Releases under a version-less asset name, so this
// "latest" link keeps working across every future release without a site edit
// (see electron-builder artifactName: ${productName}-Setup.exe).
export const RELEASE = {
  version: '0.1.0',
  repoUrl: 'https://github.com/explorearafat/sylor',
  releasesUrl: 'https://github.com/explorearafat/sylor/releases/latest',
  windowsUrl: 'https://github.com/explorearafat/sylor/releases/latest/download/Sylor-Setup.exe'
};

export const INSTALL_PLATFORMS = [
  {
    id: 'windows',
    name: 'Windows',
    osTag: 'Windows 10 & 11 (64-bit)',
    primaryPackage: 'Sylor-Setup.exe',
    fileSize: '118 MB',
    downloadUrl: RELEASE.windowsUrl,
    cliCommand: '',
    available: true,
    recommendedFor: 'Standard desktop install. Self-signed — SmartScreen may warn on first run.'
  },
  {
    id: 'macos',
    name: 'macOS',
    osTag: 'macOS 12.0+ (Apple Silicon & Intel)',
    primaryPackage: 'Coming soon',
    fileSize: '—',
    downloadUrl: '',
    cliCommand: '',
    available: false,
    recommendedFor: 'A signed universal build is on the way.'
  },
  {
    id: 'linux',
    name: 'Linux',
    osTag: 'Ubuntu, Debian, Fedora, Arch',
    primaryPackage: 'Coming soon',
    fileSize: '—',
    downloadUrl: '',
    cliCommand: '',
    available: false,
    recommendedFor: 'AppImage & .deb packages are on the way.'
  }
];

export const STAGES_DATA: StageItem[] = [
  {
    id: 'stage-01',
    number: '01',
    title: 'Understand',
    headline: 'Sylor starts by understanding the environment.',
    description: 'Before writing or altering a single token, Sylor inspects the structural hierarchy, symbol dependencies, runtime configuration, and git history of your repository.',
    technicalDetails: [
      'AST-level dependency tree indexing across TypeScript, Python, Go, and Rust',
      'Environment boundary mapping and secret detection prevention',
      'Dynamic symbol resolution for monorepos and multi-package workspaces',
      'Context condensation preserving critical type contracts and invariants'
    ],
    metrics: [
      { label: 'Context Precision', value: '99.4%' },
      { label: 'Index Velocity', value: '14ms/file' }
    ],
    visualFlow: ['Scan Tree', 'Parse AST', 'Resolve Symbols', 'Map Contracts']
  },
  {
    id: 'stage-02',
    number: '02',
    title: 'Plan',
    headline: 'Before changing anything, Sylor builds a path forward.',
    description: 'Sylor constructs a deterministic topological execution plan. It separates exploration from destructive edits and establishes checkpoints before invoking tools.',
    technicalDetails: [
      'Topological task graph construction with invariant validation',
      'Blast-radius estimation calculating downstream file impacts',
      'Explicit human review gates for high-leverage architectural shifts',
      'Failure-recovery rollbacks generated prior to code mutations'
    ],
    metrics: [
      { label: 'Plan Convergence', value: '98.1%' },
      { label: 'Topological Depth', value: 'Up to 32 steps' }
    ],
    visualFlow: ['Request', 'Context', 'Plan Graph', 'Action Plan']
  },
  {
    id: 'stage-03',
    number: '03',
    title: 'Build',
    headline: 'Sylor turns intent into implementation.',
    description: 'Implementation is performed with surgical precision. Rather than rewriting entire files, Sylor generates exact AST-anchored diffs, respects lint configurations, and updates documentation in lockstep.',
    technicalDetails: [
      'Non-destructive block replacements with syntactic boundary enforcement',
      'Strict adherence to project-local ESLint, Prettier, and Biome conventions',
      'Atomic multi-file refactoring across frontend and backend boundaries',
      'Automatic companion test generation matching local testing patterns'
    ],
    metrics: [
      { label: 'Diff Precision', value: '100% syntactic match' },
      { label: 'Refactor Speed', value: '< 280ms' }
    ],
    visualFlow: ['Target AST', 'Synthesize Diff', 'Preserve Style', 'Apply Patch']
  },
  {
    id: 'stage-04',
    number: '04',
    title: 'Use Tools',
    headline: 'Sylor can work through the tools you choose.',
    description: 'Through Model Context Protocol (MCP) and custom skills, Sylor connects directly to your development toolchain — from database schemas and browser testing to CLI utilities and cloud infrastructure.',
    technicalDetails: [
      'Native Model Context Protocol (MCP) client with dynamic discovery',
      'Sandboxed execution with fine-grained capability tokens',
      'Bidirectional protocol streaming for large dataset inspections',
      'Custom skill injection with schema-enforced argument validation'
    ],
    metrics: [
      { label: 'Tool Registry', value: 'Dynamic / Zero-restart' },
      { label: 'Protocol Overheads', value: '< 3ms IPC' }
    ],
    visualFlow: ['Discover MCP', 'Authorize Tool', 'Execute IPC', 'Stream Output']
  },
  {
    id: 'stage-05',
    number: '05',
    title: 'Verify',
    headline: 'Sylor doesn’t stop at writing code.',
    description: 'Writing code is only the midpoint. Sylor runs builds, executes test suites, inspects browser rendering traces, and autonomously corrects errors before declaring a task complete.',
    technicalDetails: [
      'Self-healing closed verification loop: Build → Check → Fix → Verify',
      'Static analysis and type-checker validation prior to completion',
      'Headless browser console log and visual regression inspection',
      'Autonomous regression diagnostics isolating introduced faults'
    ],
    metrics: [
      { label: 'First-Pass Green', value: '94.8%' },
      { label: 'Diagnostic Loop', value: 'Max 3 cycles' }
    ],
    visualFlow: ['Build Asset', 'Run Tests', 'Diagnose Error', 'Confirm Green']
  },
  {
    id: 'stage-06',
    number: '06',
    title: 'Adapt',
    headline: 'Sylor becomes configurable around the way you work.',
    description: 'No two engineering teams share identical practices. Sylor adapts to project-level rules, security constraints, custom MCP servers, and individual developer preferences without rigid dogmas.',
    technicalDetails: [
      'Workspace-level memory and instruction anchoring via project blueprints',
      'Dynamic permission escalation controls tailored to local or remote environments',
      'Custom architectural heuristics stored alongside the codebase',
      'Zero proprietary lock-in with standard open protocols'
    ],
    metrics: [
      { label: 'Constraint Adherence', value: '99.9%' },
      { label: 'Config Overhead', value: '1 YAML / JSON file' }
    ],
    visualFlow: ['Read Blueprint', 'Bind Rules', 'Tune Heuristics', 'Execute Custom']
  }
];

export const CORE_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    title: 'Semantic Code Comprehension',
    subtitle: 'Deep AST & Type Hierarchy Mapping',
    category: 'core',
    description: 'Traverses module graphs, resolves ambient types, and understands inheritance trees without loading irrelevant token baggage.',
    latency: '8ms',
    protocol: 'Tree-Sitter / Language Server Protocol',
    features: ['Monorepo symbol resolution', 'Circular dependency detection', 'Interface contract extraction']
  },
  {
    id: 'cap-2',
    title: 'Project Context Condensation',
    subtitle: 'High-Fidelity Token Budget Optimization',
    category: 'core',
    description: 'Distills multi-thousand-line codebases into relevant context vectors, avoiding hallucinations from stale or out-of-scope files.',
    latency: '12ms',
    protocol: 'Context Vector Embedding & BM25 Hybrid',
    features: ['Relevance clustering', 'Token-budget allocation', 'Ephemeral cache invalidation']
  },
  {
    id: 'cap-3',
    title: 'Surgical File Mutation',
    subtitle: 'Deterministic AST Patching',
    category: 'core',
    description: 'Replaces exact syntactic units while preserving indentation, comments, and project-specific code style conventions.',
    latency: '4ms',
    protocol: 'Unified Diff & AST Substitution',
    features: ['Line-level diff validation', 'Zero whitespace corruption', 'Atomic multi-file commits']
  },
  {
    id: 'cap-4',
    title: 'Topological Task Planning',
    subtitle: 'Hierarchical Dependency Graphing',
    category: 'core',
    description: 'Breaks complex feature requests into discrete, verifiable sub-tasks organized in a dependency acyclic graph.',
    latency: '19ms',
    protocol: 'Deterministic State Machine',
    features: ['Prerequisite scheduling', 'Blast radius containment', 'Checkpoint rollback paths']
  },
  {
    id: 'cap-5',
    title: 'Autonomous Self-Healing Loop',
    subtitle: 'Automated Diagnostic Correction',
    category: 'core',
    description: 'Listens to compiler outputs and test failures to hypothesize root causes, apply fixes, and re-verify until green.',
    latency: '24ms',
    protocol: 'Closed-Loop Verification Engine',
    features: ['Compiler traceback parsing', 'Type-error deduction', 'Regression prevention']
  }
];

export const ECOSYSTEM_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'eco-1',
    title: 'Model Context Protocol (MCP)',
    subtitle: 'Universal Standard for Extensibility',
    category: 'ecosystem',
    description: 'Natively communicates with any standard MCP server to expose databases, internal APIs, and local services to Sylor.',
    latency: '< 2ms IPC',
    protocol: 'JSON-RPC 2.0 / MCP Standard',
    features: ['Dynamic tool discovery', 'Resource URI subscriptions', 'Prompt template ingestion']
  },
  {
    id: 'eco-2',
    title: 'Composable Skill Registry',
    subtitle: 'Domain-Specific Execution Knowledge',
    category: 'ecosystem',
    description: 'Load custom playbooks for frameworks, cloud SDKs, migration checklists, and team-specific architectural patterns.',
    latency: '1ms load',
    protocol: 'Markdown + Schema Frontmatter',
    features: ['Framework-specific patterns', 'Zero runtime overhead', 'Version-controlled skills']
  },
  {
    id: 'eco-3',
    title: 'Browser & Runtime Tooling',
    subtitle: 'Headless Verification & Visual Audits',
    category: 'ecosystem',
    description: 'Inspect live DOM trees, verify network requests, capture layout screenshots, and catch client runtime exceptions.',
    latency: '15ms IPC',
    protocol: 'Chrome DevTools Protocol (CDP)',
    features: ['DOM mutation observation', 'Network waterfall audit', 'Visual layout assertions']
  },
  {
    id: 'eco-4',
    title: 'Data & Cloud Connectors',
    subtitle: 'Secure Environment Proxies',
    category: 'ecosystem',
    description: 'Query database schemas, inspect live query plans, and interface with cloud runtimes through strict permission gates.',
    latency: '30ms SSL',
    protocol: 'Mutual TLS / Scoped Tokens',
    features: ['Schema introspection', 'Read-only query safeguards', 'Ephemeral secret injection']
  },
  {
    id: 'eco-5',
    title: 'Continuous Automation Pipeline',
    subtitle: 'CI/CD & Background Task Dispatch',
    category: 'ecosystem',
    description: 'Trigger autonomous code audits, pull request reviews, dependency upgrades, and benchmark evaluations in the background.',
    latency: 'Event-driven',
    protocol: 'Webhook & CLI Daemon',
    features: ['PR review synthesis', 'Automated patch authoring', 'Performance profiling']
  }
];

export const WORKFLOW_NODES: WorkflowNodeData[] = [
  {
    id: 'intent',
    label: 'User Intent',
    category: 'input',
    role: 'Natural Language & Specification Intake',
    description: 'Captures the developer request, target constraints, and reference requirements.',
    inputs: ['Developer Prompt', 'Feature Spec', 'Bug Report'],
    outputs: ['Normalized Intent Object', 'Constraint Matrix'],
    specs: {
      'Input Format': 'Text / Voice / Issue Link',
      'Extraction Speed': '18ms',
      'Target Scope': 'Feature / Refactor / Fix'
    },
    codeSnippet: `interface Intent {
  target: "auth-layer" | "db-migration" | "ui-component";
  constraints: ["no-breaking-changes", "preserve-tokens"];
  scope: "src/lib/auth/*";
}`
  },
  {
    id: 'understand',
    label: 'Understand Codebase',
    category: 'reasoning',
    role: 'AST & Dependency Tree Comprehension',
    description: 'Traverses file trees, symbols, exported types, and package manifests to establish ground truth.',
    inputs: ['Normalized Intent', 'File Tree', 'Git Log'],
    outputs: ['Symbol Graph', 'Relevant Context Buffer'],
    specs: {
      'Parser Engine': 'Tree-Sitter / Language Server',
      'Resolution': 'Cross-file transitive closures',
      'Context Cap': 'Dynamic precision-budgeted'
    },
    codeSnippet: `const context = await sylor.analyzeWorkspace({
  entrypoints: ["src/index.ts"],
  resolveTypes: true,
  depth: "transitive"
});`
  },
  {
    id: 'plan',
    label: 'Plan Execution',
    category: 'reasoning',
    role: 'Topological Task Graph Construction',
    description: 'Generates an ordered dependency graph of atomic steps and rollback checkpoints before mutation.',
    inputs: ['Symbol Graph', 'Relevant Context Buffer'],
    outputs: ['Topological Task Graph', 'Safety Checklist'],
    specs: {
      'Graph Type': 'Directed Acyclic Graph (DAG)',
      'Verification Steps': 'Inline at each node',
      'Rollback Ready': 'true'
    },
    codeSnippet: `const plan = PlanBuilder.create()
  .step("1. Schema Migration", { dryRun: true })
  .step("2. Update API Route", { dependsOn: [1] })
  .step("3. Client Component", { dependsOn: [2] });`
  },
  {
    id: 'mcp-skills',
    label: 'MCP & Skills Engine',
    category: 'integration',
    role: 'Dynamic Tooling & Protocol Binding',
    description: 'Discovers available Model Context Protocol servers, skills, and tools dynamically to empower the plan.',
    inputs: ['Safety Checklist', 'MCP Manifests', 'Custom Skills'],
    outputs: ['Bound Tool Callables', 'Schema Validators'],
    specs: {
      'Protocol': 'Model Context Protocol v1.0',
      'Permission Model': 'Explicit grant per session',
      'Latency': '< 2ms IPC'
    },
    codeSnippet: `await sylor.mcp.connect([
  "github.com/mcp/postgres",
  "github.com/mcp/playwright",
  "./skills/tailwind-patterns.md"
]);`
  },
  {
    id: 'execute',
    label: 'Execute & Patch',
    category: 'execution',
    role: 'AST-Anchored Surgical Code Generation',
    description: 'Generates non-destructive diffs, creates files, and runs tools according to the plan.',
    inputs: ['Bound Tool Callables', 'Topological Task Graph'],
    outputs: ['Patched Files', 'Execution Traces'],
    specs: {
      'Diff Mode': 'AST Target Substitution',
      'Style Rules': 'Prettier / ESLint automatic',
      'Atomicity': 'Rollback on write fault'
    },
    codeSnippet: `const result = await sylor.applyPatch({
  file: "src/auth/session.ts",
  strategy: "ast-surgical-replace",
  validateSyntax: true
});`
  },
  {
    id: 'verify',
    label: 'Verify & Self-Heal',
    category: 'verification',
    role: 'Autonomous Compilation & Diagnostic Check',
    description: 'Executes compiler checks, test suites, and linter runs. Self-heals if unexpected errors arise.',
    inputs: ['Patched Files', 'Test Suites', 'Linter'],
    outputs: ['Verification Report', 'Corrected Patch'],
    specs: {
      'Feedback Loops': 'Autonomous max 3 turns',
      'Coverage Check': 'Zero regressions',
      'Diagnostic Mode': 'Traceback reasoning'
    },
    codeSnippet: `const status = await sylor.verify({
  commands: ["npm run lint", "npm run test"],
  autoHealOnFailure: true,
  maxIterations: 3
});`
  },
  {
    id: 'complete',
    label: 'Complete & Ship',
    category: 'output',
    role: 'Production-Ready Working Software',
    description: 'Delivers cleanly formatted code, changelog summary, and verified green status ready for commit or deploy.',
    inputs: ['Verification Report', 'Patched Files'],
    outputs: ['Working Software', 'Summary of Changes'],
    specs: {
      'Confidence': 'Deterministic Green Build',
      'Artifact Status': 'Clean Git Working Tree',
      'User Hand-off': 'Ready for review'
    },
    codeSnippet: `// Output: Production-ready software artifact
// Build status: PASSED (0 errors, 0 warnings)
// All tests: 42 passed, 0 failed`
  }
];

export const INITIAL_MCP_SERVERS: McpServer[] = [
  {
    id: 'filesystem',
    name: 'Workspace Filesystem',
    description: 'High-speed AST tree traversal, surgical file editing, binary asset handling, and recursive glob search.',
    category: 'runtime',
    enabled: true,
    toolsCount: 8,
    latencyMs: 2,
    permissions: ['fs:read', 'fs:write', 'fs:watch'],
    icon: 'FolderGit2',
    useCase: 'Read files, create modules, apply non-destructive line diffs, and search symbol references.'
  },
  {
    id: 'github',
    name: 'GitHub & Git Engine',
    description: 'Inspect commit logs, branch histories, create pull requests, and resolve merge conflicts autonomously.',
    category: 'version-control',
    enabled: true,
    toolsCount: 14,
    latencyMs: 12,
    permissions: ['repo:read', 'pull_request:write'],
    icon: 'GitBranch',
    useCase: 'Connect repositories, inspect issues, review project context, and work with source control.'
  },
  {
    id: 'browser',
    name: 'Browser Automation (CDP)',
    description: 'Headless browser execution for live UI regression tests, console traceback audits, and layout validations.',
    category: 'browser',
    enabled: true,
    toolsCount: 11,
    latencyMs: 18,
    permissions: ['browser:launch', 'dom:inspect', 'network:listen'],
    icon: 'Globe',
    useCase: 'Verify client DOM rendering, detect uncaught console exceptions, and validate responsive layouts.'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & Database Lens',
    description: 'Schema introspection, safe migration dry-runs, index advisory, and read-only query plan evaluations.',
    category: 'database',
    enabled: false,
    toolsCount: 9,
    latencyMs: 8,
    permissions: ['schema:read', 'query:plan'],
    icon: 'Database',
    useCase: 'Read live table schemas, evaluate query performance, and safely validate migration SQL files.'
  },
  {
    id: 'docker',
    name: 'Container Runtime & Docker',
    description: 'Spawn ephemeral test containers, execute isolated build scripts, and verify microservice boundaries.',
    category: 'runtime',
    enabled: true,
    toolsCount: 6,
    latencyMs: 22,
    permissions: ['container:exec', 'port:bind'],
    icon: 'Box',
    useCase: 'Run tests in clean isolated environments, test Dockerfiles, and execute containerized microservices.'
  },
  {
    id: 'sentry',
    name: 'Diagnostic & Sentry Observability',
    description: 'Fetch real-world production error stacktraces, link them directly to codebase lines, and draft regression fixes.',
    category: 'diagnostics',
    enabled: false,
    toolsCount: 5,
    latencyMs: 34,
    permissions: ['issues:read', 'telemetry:analyze'],
    icon: 'Activity',
    useCase: 'Ingest production error reports, pinpoint exact offending source lines, and generate reproduction tests.'
  }
];

export const PHILOSOPHY_ITEMS: PhilosophyComparison[] = [
  {
    dimension: 'Interaction Model',
    chatModel: 'Chat-based answers requiring constant copy-pasting and manual context assembly.',
    sylorAgent: 'Agentic execution directly inside your local development workspace.',
    technicalContrast: 'Prompt in -> response out vs. Understand -> plan -> act -> verify'
  },
  {
    dimension: 'Execution Loop',
    chatModel: 'Outputs text snippets and ends the turn without running or testing code.',
    sylorAgent: 'Autonomous self-healing verification loop: builds, lints, tests, and repairs.',
    technicalContrast: 'Blind text generation vs. Closed-loop compiler verification'
  },
  {
    dimension: 'Context Awareness',
    chatModel: 'Limited token context windows prone to hallucinating non-existent APIs.',
    sylorAgent: 'Project-aware AST indexing, symbol closure mapping, and repository ground truth.',
    technicalContrast: 'Stale window approximations vs. Deterministic AST & type graph'
  },
  {
    dimension: 'Tool Extensibility',
    chatModel: 'Fixed, rigid capabilities locked inside a proprietary walled garden.',
    sylorAgent: 'Configurable tools through open Model Context Protocol (MCP) and custom Skills.',
    technicalContrast: 'Hardcoded plugins vs. Open protocol stdio/SSE MCP & Skills'
  },
  {
    dimension: 'Interface & Control',
    chatModel: 'Single isolated chat box separated from your editor and terminal.',
    sylorAgent: 'Unified agent environment with project tree, AST inspector, diff viewer, and tool console.',
    technicalContrast: 'Disjointed chat window vs. Full-stack developer workstation'
  }
];

export const TASK_TEMPLATES: {
  id: string;
  label: string;
  prompt: string;
  category: string;
  contextScope: string;
  reasoningSteps: {
    number: string;
    action: string;
    detail: string;
  }[];
  verificationNote: string;
}[] = [
  {
    id: 'tpl-dashboard',
    label: 'Build a dashboard',
    prompt: 'Add an analytics dashboard with 4 metric cards, weekly activity chart, and event logs.',
    category: 'UI & Layout',
    contextScope: 'src/components, tailwind tokens, chart hooks',
    reasoningSteps: [
      { number: '01', action: 'Understand', detail: 'Inspect Tailwind theme tokens, typography scale, and Lucide icon imports.' },
      { number: '02', action: 'Context', detail: 'Locate existing metric types and responsive grid layout wrappers.' },
      { number: '03', action: 'Plan', detail: 'Design modular hierarchy: MetricCard, ActivityChart, and EventTable.' },
      { number: '04', action: 'Tools', detail: 'Invoke Filesystem MCP to scaffold typed components.' },
      { number: '05', action: 'Execute', detail: 'Synthesize components adhering strictly to zero horizontal overflow rules.' },
      { number: '06', action: 'Verify', detail: 'Compile with tsc and verify WCAG AA contrast and mobile breakpoints.' }
    ],
    verificationNote: 'TypeScript passes with 0 errors. Mobile responsive layout verified.'
  },
  {
    id: 'tpl-bug',
    label: 'Fix a bug',
    prompt: 'Fix the 1-cent rounding discrepancy in checkout webhook discount calculations.',
    category: 'Bug Resolution',
    contextScope: 'src/services/billing.ts, Stripe webhooks, currency formatters',
    reasoningSteps: [
      { number: '01', action: 'Understand', detail: 'Locate billing calculation codepath in src/services/billing.ts.' },
      { number: '02', action: 'Context', detail: 'Trace floating-point division in 15% discount calculation on €19.99.' },
      { number: '03', action: 'Plan', detail: 'Draft atomic patch converting calculations to integer cents with Math.round.' },
      { number: '04', action: 'Tools', detail: 'Bind Test Runner skill to isolate reproduction case.' },
      { number: '05', action: 'Execute', detail: 'Apply surgical line replacement on billing service lines 44-61.' },
      { number: '06', action: 'Verify', detail: 'Execute billing regression test suite across USD, EUR, GBP, and JPY.' }
    ],
    verificationNote: 'All 18 billing regression tests green. Zero floating point drift.'
  },
  {
    id: 'tpl-refactor',
    label: 'Refactor a component',
    prompt: 'Split the 650-line OrderManager monolith into modular sub-components without breaking props.',
    category: 'Code Quality',
    contextScope: 'src/components/OrderManager.tsx and consumer routes',
    reasoningSteps: [
      { number: '01', action: 'Understand', detail: 'Extract public props interface and internal state hooks from OrderManager.' },
      { number: '02', action: 'Context', detail: 'Trace sub-tree dependencies: OrderHeader, OrderItemsList, PaymentSummary.' },
      { number: '03', action: 'Plan', detail: 'Plan 4-file decomposition preserving 100% public component signature.' },
      { number: '04', action: 'Tools', detail: 'Use AST mutation engine to create child components.' },
      { number: '05', action: 'Execute', detail: 'Reduce OrderManager container from 650 to 48 lines with clean imports.' },
      { number: '06', action: 'Verify', detail: 'Run component snapshot tests and verify props parity with 0 regressions.' }
    ],
    verificationNote: 'Cyclomatic complexity reduced by 72%. All 14 tests pass.'
  },
  {
    id: 'tpl-repo',
    label: 'Understand this repository',
    prompt: 'Explain how this distributed storage engine handles cluster node failover and leader election.',
    category: 'Exploration',
    contextScope: 'consensus/raft.go, membership/cluster.go, RPC interfaces',
    reasoningSteps: [
      { number: '01', action: 'Understand', detail: 'Traverse consensus and cluster membership packages via Tree-Sitter.' },
      { number: '02', action: 'Context', detail: 'Trace heartbeat timeout transitions to RequestVote broadcast RPCs.' },
      { number: '03', action: 'Plan', detail: 'Formulate state machine transition map and consensus quorum logic.' },
      { number: '04', action: 'Tools', detail: 'Use AST Symbol Graph to index exact line numbers for each RPC handler.' },
      { number: '05', action: 'Execute', detail: 'Synthesize grounded architectural walkthrough with exact file anchors.' },
      { number: '06', action: 'Verify', detail: 'Ensure zero hallucinated function names against real codebase AST.' }
    ],
    verificationNote: '100% AST grounded. Zero hallucinations across 42 source files.'
  },
  {
    id: 'tpl-api',
    label: 'Add an API',
    prompt: 'Add an authenticated /api/v1/workspaces endpoint with schema validation and rate limiting.',
    category: 'Backend & APIs',
    contextScope: 'src/server/routes, drizzle schema, auth middleware',
    reasoningSteps: [
      { number: '01', action: 'Understand', detail: 'Inspect server routing conventions, Zod schemas, and session middleware.' },
      { number: '02', action: 'Context', detail: 'Identify workspace database table definitions and tenant isolation rules.' },
      { number: '03', action: 'Plan', detail: 'Draft endpoint route, Zod input validator, database query, and test suite.' },
      { number: '04', action: 'Tools', detail: 'Invoke Filesystem MCP and Database Lens to verify SQL schema.' },
      { number: '05', action: 'Execute', detail: 'Create route handler with typed error responses and 401/403 status codes.' },
      { number: '06', action: 'Verify', detail: 'Execute integration tests asserting 200 OK, 400 Bad Request, and 401 Unauthorized.' }
    ],
    verificationNote: 'Verified: 0 TypeScript errors, 100% endpoint test coverage.'
  }
];

export const THINKING_TASKS = [
  {
    id: 'think-darkmode',
    title: 'Add dark mode to this application',
    category: 'Design Systems',
    prompt: 'Add dark mode support with localStorage persistence and system theme sync without breaking existing colors.',
    steps: [
      {
        id: 's1',
        number: '01',
        phase: 'Understand',
        action: 'Inspect styling architecture & config',
        insight: 'Discovered Tailwind configured with class-based dark mode and React 18 root.',
        fileOrArtifact: 'tailwind.config.js + package.json'
      },
      {
        id: 's2',
        number: '02',
        phase: 'Context',
        action: 'Find hardcoded color tokens & layout wrappers',
        insight: 'Traced 14 hardcoded neutral classes (e.g. bg-[#faf9f7], text-[#111111]) across header, cards, and text.',
        fileOrArtifact: 'src/App.tsx + src/index.css'
      },
      {
        id: 's3',
        number: '03',
        phase: 'Plan',
        action: 'Design ThemeProvider & toggle DAG',
        insight: 'Formulate 4-step execution plan: Context provider -> App wrapper -> Nav toggle -> CSS sync.',
        fileOrArtifact: 'Execution DAG (0 breaking changes)'
      },
      {
        id: 's4',
        number: '04',
        phase: 'Tools',
        action: 'Select Filesystem & Browser MCP',
        insight: 'Bind filesystem tool for file writes and CDP browser driver for visual rendering validation.',
        fileOrArtifact: 'MCP Tool Manifest'
      },
      {
        id: 's5',
        number: '05',
        phase: 'Build',
        action: 'Apply surgical diffs across components',
        insight: 'Created ThemeContext.tsx, wrapped root in App.tsx, inserted ThemeToggle into Navigation.',
        fileOrArtifact: '3 files patched atomically'
      },
      {
        id: 's6',
        number: '06',
        phase: 'Verify',
        action: 'Compile & check zero FOUC',
        insight: 'Ran tsc and vite build. Verified dark class toggles cleanly on <html> with zero flash of unstyled content.',
        fileOrArtifact: 'Build PASSED (0 errors, 240ms)'
      }
    ],
    finalVerification: 'Verified: 0 TypeScript errors, zero FOUC, theme state stored in localStorage.',
    estimatedTime: '2.8s'
  },
  {
    id: 'think-auth',
    title: 'Add session auth with role guards',
    category: 'Architecture & Security',
    prompt: 'Add session-based authentication with protected routes and role verification for admin dashboard.',
    steps: [
      {
        id: 's1',
        number: '01',
        phase: 'Understand',
        action: 'Inspect database schema & route tree',
        insight: 'Identified User table schema, session token hashing patterns, and existing unprotected routes.',
        fileOrArtifact: 'src/db/schema.ts + src/router.tsx'
      },
      {
        id: 's2',
        number: '02',
        phase: 'Context',
        action: 'Map authentication boundaries',
        insight: 'Identified session cookie serialization and token secret masking in .env.',
        fileOrArtifact: 'src/lib/session.ts'
      },
      {
        id: 's3',
        number: '03',
        phase: 'Plan',
        action: 'Construct atomic 4-step execution graph',
        insight: 'Formulate rollback checkpoints for middleware, auth routes, and client auth state hook.',
        fileOrArtifact: 'Execution DAG'
      },
      {
        id: 's4',
        number: '04',
        phase: 'Tools',
        action: 'Bind Database & Filesystem tools',
        insight: 'Bind database schema validator to ensure password hashing never stores plaintext.',
        fileOrArtifact: 'Crypto & Schema Tools'
      },
      {
        id: 's5',
        number: '05',
        phase: 'Build',
        action: 'Implement auth routes & React hook',
        insight: 'Created auth endpoints, useAuth hook, and <ProtectedRoute requiredRole="admin"> wrapper.',
        fileOrArtifact: 'src/routes/auth.ts + src/hooks/useAuth.ts'
      },
      {
        id: 's6',
        number: '06',
        phase: 'Verify',
        action: 'Execute automated security test suite',
        insight: 'Asserted 200 OK for valid credentials, 401 for expired sessions, and 403 for unauthorized roles.',
        fileOrArtifact: '6 tests passed, 0 failures'
      }
    ],
    finalVerification: 'Zero token leaks. Role guard security test: 100% green.',
    estimatedTime: '3.4s'
  },
  {
    id: 'think-refactor',
    title: 'Refactor monolith without breaking contracts',
    category: 'Code Refactoring',
    prompt: 'Decompose 650-line OrderManager component into 4 focused sub-components while keeping all tests passing.',
    steps: [
      {
        id: 's1',
        number: '01',
        phase: 'Understand',
        action: 'Parse AST and calculate cyclomatic complexity',
        insight: 'OrderManager contains 650 lines, 14 state variables, and 8 nested UI render functions.',
        fileOrArtifact: 'src/components/OrderManager.tsx'
      },
      {
        id: 's2',
        number: '02',
        phase: 'Context',
        action: 'Isolate component boundaries & props contracts',
        insight: 'Extracted clear sub-domains: OrderHeader, OrderItemsList, and PaymentSummary.',
        fileOrArtifact: 'AST Symbol Closure'
      },
      {
        id: 's3',
        number: '03',
        phase: 'Plan',
        action: 'Plan bottom-up decomposition order',
        insight: 'Order of construction: leaf sub-components first, parent container last to maintain testability.',
        fileOrArtifact: 'Decomposition DAG'
      },
      {
        id: 's4',
        number: '04',
        phase: 'Tools',
        action: 'Use AST refactor engine & Vitest runner',
        insight: 'Bind automated test runner to run snapshots after every sub-component extraction.',
        fileOrArtifact: 'Vitest Runner Hook'
      },
      {
        id: 's5',
        number: '05',
        phase: 'Build',
        action: 'Extract sub-components & reassemble parent',
        insight: 'Reduced OrderManager to 48 lines of clean composition with zero prop alterations.',
        fileOrArtifact: '4 modular files created'
      },
      {
        id: 's6',
        number: '06',
        phase: 'Verify',
        action: 'Run snapshot & behavior integration suite',
        insight: 'All 14 integration and snapshot tests passed with 100% output parity.',
        fileOrArtifact: 'PASS src/__tests__/OrderManager.test.tsx'
      }
    ],
    finalVerification: 'Public interface 100% unchanged. Cyclomatic complexity reduced by 72%.',
    estimatedTime: '2.1s'
  }
];

export const CAPABILITY_TOGGLE_ITEMS = [
  {
    id: 'filesystem',
    label: 'Filesystem',
    description: 'High-speed AST tree traversal, surgical line diffs, and recursive symbol indexing.',
    enabled: true,
    type: 'core',
    workflowImpact: 'Enables direct read/write AST modifications and project-wide symbol resolution.'
  },
  {
    id: 'github',
    label: 'GitHub & Git Engine',
    description: 'Inspect commit history, branch diffs, PR reviews, and merge conflict resolution.',
    enabled: true,
    type: 'protocol',
    workflowImpact: 'Adds git commit staging and pull-request synthesis to the execution pipeline.'
  },
  {
    id: 'browser',
    label: 'Browser (CDP)',
    description: 'Headless Chrome DevTools Protocol execution for DOM audits and visual regression checks.',
    enabled: true,
    type: 'runtime',
    workflowImpact: 'Adds headless rendering validation, console error capture, and layout audits to verification.'
  },
  {
    id: 'mcp',
    label: 'Model Context Protocol (MCP)',
    description: 'Standard JSON-RPC 2.0 interface connecting external tools, CLI daemons, and microservices.',
    enabled: true,
    type: 'protocol',
    workflowImpact: 'Exposes external protocol tools and dynamic servers directly into Sylor’s execution graph.'
  },
  {
    id: 'skills',
    label: 'Markdown Skills',
    description: 'Composable domain knowledge, framework guidelines, and team conventions stored in your repository.',
    enabled: true,
    type: 'core',
    workflowImpact: 'Loads domain playbooks and framework-specific best practices before planning changes.'
  },
  {
    id: 'database',
    label: 'Database Lens',
    description: 'SQL schema introspection, migration dry-runs, index advisory, and safe query plan evaluation.',
    enabled: false,
    type: 'data',
    workflowImpact: 'Adds SQL schema analysis and migration rollback verification to the task graph.'
  }
];

export const CURATED_QUESTIONS = [
  {
    id: 'q-explain',
    title: 'Explain this repository',
    subtitle: 'Onboard to an unfamiliar codebase instantly',
    prompt: 'Explain the architecture of this project, its data flows, and where the primary entrypoints are.',
    category: 'Exploration'
  },
  {
    id: 'q-bug',
    title: 'Find why checkout is failing',
    subtitle: 'Trace stacktraces back to exact source lines',
    prompt: 'Diagnose why the payment webhook is dropping discount totals for EUR currency transactions.',
    category: 'Debugging'
  },
  {
    id: 'q-dashboard',
    title: 'Build a settings dashboard',
    subtitle: 'Scaffold full-stack UI with existing design tokens',
    prompt: 'Create a user profile and organization settings view matching our existing Tailwind design system.',
    category: 'Scaffolding'
  },
  {
    id: 'q-refactor',
    title: 'Refactor this monolith safely',
    subtitle: 'Decompose complex files with zero behavioral breakage',
    prompt: 'Refactor OrderManager.tsx into focused sub-components while maintaining public props and tests.',
    category: 'Refactoring'
  },
  {
    id: 'q-api',
    title: 'Connect a database via MCP',
    subtitle: 'Integrate external services through open protocols',
    prompt: 'Connect PostgreSQL via Model Context Protocol, introspect the schema, and scaffold typed CRUD queries.',
    category: 'Protocols'
  },
  {
    id: 'q-tests',
    title: 'Add comprehensive test suite',
    subtitle: 'Autonomous test authoring and verification',
    prompt: 'Add unit and integration tests for our auth session middleware asserting all edge cases.',
    category: 'Quality'
  }
];
