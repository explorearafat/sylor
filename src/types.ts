export interface StageItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  technicalDetails: string[];
  metrics: { label: string; value: string }[];
  visualFlow: string[];
}

export interface ConcreteCapabilityCategory {
  id: string;
  tag: string;
  title: string;
  description: string;
  items: {
    id: string;
    number: string;
    title: string;
    explanation: string;
    techDetail: string;
  }[];
}

export interface UserScenario {
  id: string;
  title: string;
  category: string;
  complexity: 'Quick' | 'Multi-file' | 'Architecture';
  description: string;
  userPrompt: string;
  planSteps: string[];
  executionTime: string;
  filesModified: string[];
  verificationProof: string;
  verifications: string[];
}

export interface ThoughtStage {
  id: string;
  stepNumber: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  agentAction: string;
  codebaseImpact: string;
  outputArtifact: string;
}

export interface DeveloperPersona {
  id: string;
  role: string;
  title: string;
  tagline: string;
  quote: string;
  description: string;
  typicalTask: string;
  valueDrivers: string[];
  keyWorkflows: string[];
  recommendedSetup: string;
}

export interface ProductUiScreen {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  highlights: string[];
}

export interface ArchitectureComponent {
  id: string;
  title: string;
  role: string;
  description: string;
  techSpec: string;
  interfaces: string;
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  meta: string;
}

export interface WorkflowStoryStep {
  id: string;
  step: string;
  title: string;
  phase: string;
  action: string;
  files: string[];
  codeDiffSnippet: string;
  verificationStatus: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'core' | 'ecosystem';
  description: string;
  latency: string;
  protocol: string;
  features: string[];
}

export interface WorkflowNodeData {
  id: string;
  label: string;
  category: 'input' | 'reasoning' | 'integration' | 'execution' | 'verification' | 'output';
  role: string;
  description: string;
  inputs: string[];
  outputs: string[];
  specs: { [key: string]: string };
  codeSnippet?: string;
}

export interface McpServer {
  id: string;
  name: string;
  description: string;
  category: 'version-control' | 'runtime' | 'database' | 'browser' | 'diagnostics' | 'custom';
  enabled: boolean;
  toolsCount: number;
  latencyMs: number;
  permissions: string[];
  icon: string;
  useCase: string;
}

export interface PhilosophyComparison {
  dimension: string;
  chatModel: string;
  sylorAgent: string;
  technicalContrast: string;
}

export interface TaskTemplate {
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
}

export interface InteractiveThinkingTask {
  id: string;
  title: string;
  prompt: string;
  category: string;
  steps: {
    id: string;
    number: string;
    phase: string;
    action: string;
    insight: string;
    fileOrArtifact: string;
  }[];
  finalVerification: string;
  estimatedTime: string;
}

export interface CapabilityToggleItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  type: 'core' | 'protocol' | 'runtime' | 'data';
  workflowImpact: string;
}
