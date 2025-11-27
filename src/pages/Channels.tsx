import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Users, Hash } from "lucide-react";
import techPattern from "@/assets/tech-pattern.jpg";

const Channels = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("channels");

  const channels = [
    { id: 1, name: "tech-innovators", members: 1234, online: 456, image: techPattern },
    { id: 2, name: "creative-minds", members: 987, online: 234, image: techPattern },
    { id: 3, name: "quantum-physics", members: 543, online: 123, image: techPattern },
    { id: 4, name: "music-production", members: 876, online: 345, image: techPattern },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <TopToolbar
        expanded={topToolbarExpanded}
        onToggleExpand={() => setTopToolbarExpanded(!topToolbarExpanded)}
        onSectionChange={setActiveSection}
      />

      <div className="flex h-[calc(100vh-64px)] mt-16">
        <LeftSidebar
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 neon-glow-cyan">Canales</h1>
              <p className="text-muted-foreground">Espacios temáticos para conversaciones específicas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map((channel) => (
                <Card key={channel.id} className="glass p-6 hover:shadow-neon-cyan transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold">{channel.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{channel.members} miembros</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                          <Radio className="w-4 h-4" />
                          <span>{channel.online} en línea</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Unirse</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <RightSidebar
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      </div>
    </div>
  );
};

export default Channels;
