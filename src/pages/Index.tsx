import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import MainFeed from "@/components/feed/MainFeed";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("feed");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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

      <Toaster />
    </div>
  );
};

export default Index;
