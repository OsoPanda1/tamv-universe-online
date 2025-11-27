import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, TrendingUp } from "lucide-react";
import groupsIcon from "@/assets/groups-icon.jpg";

const Groups = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("groups");

  const groups = [
    { id: 1, name: "IA Creators", members: 2.3, trend: "+12%", image: groupsIcon },
    { id: 2, name: "Metaverse Latino", members: 5.1, trend: "+8%", image: groupsIcon },
    { id: 3, name: "Quantum Developers", members: 1.8, trend: "+15%", image: groupsIcon },
    { id: 4, name: "Music Producers", members: 3.4, trend: "+5%", image: groupsIcon },
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
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 neon-glow-purple">Grupos</h1>
                <p className="text-muted-foreground">Únete a comunidades con intereses compartidos</p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Crear Grupo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="glass overflow-hidden hover:shadow-neon-purple transition-all cursor-pointer">
                  <div className="aspect-video relative">
                    <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-glow opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{group.members}K miembros</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <TrendingUp className="w-4 h-4" />
                        <span>{group.trend}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">Unirse</Button>
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

export default Groups;
