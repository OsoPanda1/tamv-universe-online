import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, Play, Plus } from "lucide-react";
import digitalPetImg from "@/assets/digital-pet.jpg";

const DigitalPets = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("pets");

  const pets = [
    { id: 1, name: "Spark", type: "Digital Fox", happiness: 85, energy: 70, image: digitalPetImg },
    { id: 2, name: "Neo", type: "Cyber Cat", happiness: 92, energy: 60, image: digitalPetImg },
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
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 holographic">Mascotas Digitales</h1>
                <p className="text-muted-foreground">Tus compañeros virtuales en el metaverso</p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Adoptar Mascota
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <Card key={pet.id} className="glass overflow-hidden">
                  <div className="relative aspect-square">
                    <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{pet.name}</h3>
                        <p className="text-primary">{pet.type}</p>
                      </div>
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Felicidad</span>
                          <span className="text-sm font-semibold">{pet.happiness}%</span>
                        </div>
                        <Progress value={pet.happiness} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Energía</span>
                          <span className="text-sm font-semibold">{pet.energy}%</span>
                        </div>
                        <Progress value={pet.energy} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="gap-2">
                        <Heart className="w-4 h-4" />
                        Acariciar
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Alimentar
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Play className="w-4 h-4" />
                        Jugar
                      </Button>
                    </div>
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

export default DigitalPets;
