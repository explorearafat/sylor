import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { IntroStatement } from './components/IntroStatement';
import { DeterministicVmInspector } from './components/DeterministicVmInspector';
import { StageStorytelling } from './components/StageStorytelling';
import { HowSylorThinks } from './components/HowSylorThinks';
import { RealWorkflowStory } from './components/RealWorkflowStory';
import { EditorialArchitecture } from './components/EditorialArchitecture';
import { TwoSidedMatrix } from './components/TwoSidedMatrix';
import { ConcreteCapabilities } from './components/ConcreteCapabilities';
import { McpExtensibility } from './components/McpExtensibility';
import { InstallationPreview } from './components/InstallationPreview';
import { RealScenarios } from './components/RealScenarios';
import { WorkflowVisualization } from './components/WorkflowVisualization';
import { PhilosophySection } from './components/PhilosophySection';
import { DeveloperPersonas } from './components/DeveloperPersonas';
import { TrustSignalsSection } from './components/TrustSignalsSection';
import { FinalInstallSection } from './components/FinalInstallSection';
import { DeveloperSection } from './components/DeveloperSection';
import { Footer } from './components/Footer';
import { AgentManifestModal } from './components/AgentManifestModal';
import { DownloadModal } from './components/DownloadModal';
import { GeometricReveal } from './components/GeometricReveal';

export default function App() {
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const openDownloadModal = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#141413] flex flex-col antialiased selection:bg-[#141413] selection:text-[#faf9f7]">
      {/* Fixed Editorial Navigation */}
      <Navigation
        onOpenConfig={() => setIsManifestOpen(true)}
        onOpenDownloadModal={openDownloadModal}
      />

      {/* Main Editorial Flow */}
      <main className="flex-1">
        {/* 1. Hero: Requested Clean Landing Page with Direct Installation & Links */}
        <Hero
          onOpenDownloadModal={openDownloadModal}
          onOpenConfig={() => setIsManifestOpen(true)}
        />

        {/* 2. Intro Statement: Core Premise & Rethinking The Coding Agent */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <IntroStatement />
        </GeometricReveal>

        {/* 3. Deterministic VM Live Inspector (Moved below hero) */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <DeterministicVmInspector />
        </GeometricReveal>

        {/* 4. Stage-by-Stage Progression (Interactive Stepper & Visual State Graph) */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <StageStorytelling />
        </GeometricReveal>

        {/* 5. How Sylor Thinks: 8-Stage Sequential Cognition & Decisions */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <HowSylorThinks />
        </GeometricReveal>

        {/* 6. Real Workflow Story: Case Study Walkthrough */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <RealWorkflowStory />
        </GeometricReveal>

        {/* 7. Editorial Architecture: 3 Sovereign Layers (Intake, VM Core, Closed-Loop Verification) */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <EditorialArchitecture />
        </GeometricReveal>

        {/* 8. Two-Sided Asymmetric Matrix: Cognitive Core meets MCP Ecosystem */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <TwoSidedMatrix />
        </GeometricReveal>

        {/* 9. Concrete Capabilities Grid */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <ConcreteCapabilities />
        </GeometricReveal>

        {/* 10. Open MCP Extensibility & Config Generator */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <McpExtensibility />
        </GeometricReveal>

        {/* 11. Frictionless Onboarding: Download to First Task */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <InstallationPreview onOpenDownloadModal={openDownloadModal} />
        </GeometricReveal>

        {/* 12. Real Engineering Scenarios */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <RealScenarios />
        </GeometricReveal>

        {/* 13. Pipeline Workflow Graph */}
        <WorkflowVisualization />

        {/* 14. Philosophy & Technical Comparison */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <PhilosophySection />
        </GeometricReveal>

        {/* 15. Developer Personas */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <DeveloperPersonas />
        </GeometricReveal>

        {/* 16. Trust Signals & Local-First Guarantees */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <TrustSignalsSection />
        </GeometricReveal>

        {/* 17. Final Installation & Package Quickstart */}
        <GeometricReveal durationMs={600} distancePx={20}>
          <FinalInstallSection onOpenDownloadModal={openDownloadModal} />
        </GeometricReveal>

        {/* 18. Developer Attribution */}
        <GeometricReveal durationMs={600} distancePx={16}>
          <DeveloperSection />
        </GeometricReveal>
      </main>

      {/* Footer */}
      <Footer />

      {/* Download / Install Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Manifest Specification Drawer */}
      <AgentManifestModal
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
      />
    </div>
  );
}
