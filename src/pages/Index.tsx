import { useState, useEffect } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import MainFeed from "@/components/feed/MainFeed";
import { Toaster } from "@/components/ui/toaster";
import ImmersiveBackground from "@/components/effects/ImmersiveBackground";
import { ProductTourOverlay } from "@/components/home/ProductTourOverlay";
import { IsabellaAssistantButton } from "@/components/isabella/IsabellaAssistantButton";
import { EnterVRButton } from "@/components/home/EnterVRButton";
import { PRODUCT_TOUR_STEPS, startTour, nextStep, skipTour, completeTour } from "@/modules/productTour/productTour";
import type { ProductTourState } from "@/types/tamv";
import { shouldShowTour } from "@/modules/productTour/productTour";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("feed");
  const [tourState, setTourState] = useState<ProductTourState>({ isActive: false, currentStepIndex: 0 });

  useEffect(() => {
    // Check if we should show the product tour
    const tourShouldShow = shouldShowTour();
    if (tourShouldShow) {
      // Delay tour start to allow components to render
      const timer = setTimeout(() => {
        setTourState(startTour());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNextStep = () => {
    setTourState(nextStep(tourState));
  };

  const handleSkipTour = () => {
    skipTour();
    setTourState({ isActive: false, currentStepIndex: 0 });
  };

  const handleFinishTour = () => {
    completeTour();
    setTourState({ isActive: false, currentStepIndex: 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Immersive Background Effects */}
      <ImmersiveBackground variant="full" />

      {/* Top Toolbar */}
      <TopToolbar
        expanded={topToolbarExpanded}
        onToggleExpand={() => setTopToolbarExpanded(!topToolbarExpanded)}
        onSectionChange={setActiveSection}
      />

      <div className="flex h-[calc(100vh-64px)] mt-16">
        {/* Left Sidebar */}
        <LeftSidebar
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            leftSidebarOpen ? "ml-0" : "ml-0"
          } ${rightSidebarOpen ? "mr-0" : "mr-0"}`}
        >
          <MainFeed activeSection={activeSection} />
        </main>

        {/* Right Sidebar */}
        <RightSidebar
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      </div>

      {/* Floating Action Buttons */}
      <IsabellaAssistantButton />
      <EnterVRButton />

      {/* Product Tour */}
      <ProductTourOverlay
        steps={PRODUCT_TOUR_STEPS}
        currentStepIndex={tourState.currentStepIndex}
        isActive={tourState.isActive}
        onNext={handleNextStep}
        onSkip={handleSkipTour}
        onFinish={handleFinishTour}
      />

      <Toaster />
    </div>
  );
};

export default Index;
