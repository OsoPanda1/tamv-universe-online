import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Sparkles, Plus } from "lucide-react";
import dreamspaceBg from "@/assets/dreamspace-background.jpg";

const DreamSpaces = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("dreamspaces");

  const spaces = [
    { id: 1, name: "Nebula Onírica", creator: "Usuario1", visits: 1200, image: dreamspaceBg },
    { id: 2, name: "Jardín Cuántico", creator: "Usuario2", visits: 890, image: dreamspaceBg },
    { id: 3, name: "Océano Astral", creator: "Usuario3", visits: 2100, image: dreamspaceBg },
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
                <h1 className="text-4xl font-bold mb-2 holographic">Dream Spaces</h1>
                <p className="text-muted-foreground">Explora mundos oníricos y crea tu propio universo</p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Crear Espacio
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaces.map((space) => (
                <Card key={space.id} className="glass overflow-hidden hover:shadow-neon-cyan transition-all group cursor-pointer">
                  <div className="relative aspect-square">
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Explorar
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{space.name}</h3>
                      <Cloud className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">por {space.creator}</p>
                    <p className="text-sm text-primary">{space.visits} visitas</p>
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

export default DreamSpaces;
