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
import { ScrollProgressBar, BackToTop } from './components/ScrollProgressBar';
import { QuickCommandPalette } from './components/QuickCommandPalette';

export default function App() {
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const openDownloadModal = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#141413] flex flex-col antialiased selection:bg-[#141413] selection:text-[#faf9f7]">
      
      <ScrollProgressBar />

      
      <Navigation
        onOpenConfig={() => setIsManifestOpen(true)}
        onOpenDownloadModal={openDownloadModal}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      
      <main className="flex-1">
        
        <Hero
          onOpenDownloadModal={openDownloadModal}
          onOpenConfig={() => setIsManifestOpen(true)}
        />

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <IntroStatement />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <DeterministicVmInspector />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <StageStorytelling />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <HowSylorThinks />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <RealWorkflowStory />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <EditorialArchitecture />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <TwoSidedMatrix />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <ConcreteCapabilities />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <McpExtensibility />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <InstallationPreview />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <RealScenarios />
        </GeometricReveal>

        
        <WorkflowVisualization />

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <PhilosophySection />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <DeveloperPersonas />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <TrustSignalsSection />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={20}>
          <FinalInstallSection />
        </GeometricReveal>

        
        <GeometricReveal durationMs={600} distancePx={16}>
          <DeveloperSection />
        </GeometricReveal>
      </main>

      
      <BackToTop />

      
      <Footer />

      
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      
      <AgentManifestModal
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
      />

      
      <QuickCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDownloadModal={openDownloadModal}
        onOpenManifest={() => setIsManifestOpen(true)}
      />
    </div>
  );
}
