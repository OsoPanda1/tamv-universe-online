import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Calendar, Users, Radio } from "lucide-react";
import concertBg from "@/assets/concert-background.jpg";

const Concerts = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("concerts");

  const concerts = [
    { id: 1, title: "Concierto Sensorial XR", artist: "Neurosync", date: "2025-12-05", attendees: 2500, status: "live", image: concertBg },
    { id: 2, title: "Quantum Beats Festival", artist: "Various Artists", date: "2025-12-10", attendees: 5000, status: "upcoming", image: concertBg },
    { id: 3, title: "Holographic Symphony", artist: "Digital Orchestra", date: "2025-12-15", attendees: 3200, status: "upcoming", image: concertBg },
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
              <h1 className="text-4xl font-bold mb-2 holographic">Conciertos Sensoriales</h1>
              <p className="text-muted-foreground">Experiencias musicales inmersivas en el metaverso</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {concerts.map((concert) => (
                <Card key={concert.id} className="glass overflow-hidden hover:shadow-neon-purple transition-all">
                  <div className="relative aspect-video">
                    <img src={concert.image} alt={concert.title} className="w-full h-full object-cover" />
                    {concert.status === "live" && (
                      <Badge className="absolute top-4 right-4 bg-red-500 animate-pulse">
                        <Radio className="w-3 h-3 mr-1" />
                        EN VIVO
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{concert.title}</h3>
                    <p className="text-primary mb-4">{concert.artist}</p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(concert.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{concert.attendees} asistentes</span>
                      </div>
                    </div>
                    <Button className="w-full gap-2">
                      <Music className="w-4 h-4" />
                      {concert.status === "live" ? "Unirse Ahora" : "Reservar Entrada"}
                    </Button>
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

export default Concerts;
