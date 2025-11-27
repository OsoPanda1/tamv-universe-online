import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye } from "lucide-react";
import streamingBg from "@/assets/streaming-background.jpg";

const Streaming = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("streaming");

  const videos = [
    { id: 1, title: "Tutorial: Cómo crear tu primer NFT", duration: "45:32", views: 12500, category: "Educativo", image: streamingBg },
    { id: 2, title: "Documental: El Futuro del Metaverso", duration: "1:23:15", views: 34200, category: "Documental", image: streamingBg },
    { id: 3, title: "Serie: Vida Digital - Ep 1", duration: "28:45", views: 18900, category: "Serie", image: streamingBg },
    { id: 4, title: "Conferencia: IA y Ética", duration: "1:05:22", views: 8750, category: "Conferencia", image: streamingBg },
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
              <h1 className="text-4xl font-bold mb-2 neon-glow-purple">Streaming</h1>
              <p className="text-muted-foreground">Contenido bajo demanda de alta calidad</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="glass overflow-hidden hover:shadow-neon-purple transition-all group cursor-pointer">
                  <div className="relative aspect-video">
                    <img src={video.image} alt={video.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 right-2">{video.category}</Badge>
                    <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" className="gap-2">
                        <Play className="w-5 h-5" />
                        Reproducir
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{video.views.toLocaleString()} vistas</span>
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

export default Streaming;
