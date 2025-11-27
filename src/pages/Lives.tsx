import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Eye, Play } from "lucide-react";
import liveStreamingBg from "@/assets/live-streaming.jpg";

const Lives = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("lives");

  const liveStreams = [
    { id: 1, title: "Coding Session: Building DApps", streamer: "DevMaster", viewers: 2341, isLive: true, image: liveStreamingBg },
    { id: 2, title: "Music Production Live", streamer: "BeatCreator", viewers: 1823, isLive: true, image: liveStreamingBg },
    { id: 3, title: "Gaming Tournament Finals", streamer: "ProGamer", viewers: 5672, isLive: true, image: liveStreamingBg },
    { id: 4, title: "Art Creation Session", streamer: "DigitalArtist", viewers: 934, isLive: true, image: liveStreamingBg },
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
              <h1 className="text-4xl font-bold mb-2 text-red-500 animate-pulse">En Vivo</h1>
              <p className="text-muted-foreground">Descubre transmisiones en tiempo real</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="glass overflow-hidden hover:shadow-neon-cyan transition-all group cursor-pointer">
                  <div className="relative aspect-video">
                    <img src={stream.image} alt={stream.title} className="w-full h-full object-cover" />
                    {stream.isLive && (
                      <Badge className="absolute top-4 left-4 bg-red-500 animate-pulse">
                        <Radio className="w-3 h-3 mr-1" />
                        EN VIVO
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" className="gap-2">
                        <Play className="w-5 h-5" />
                        Ver Ahora
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-semibold">{stream.viewers.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{stream.title}</h3>
                    <p className="text-sm text-primary">{stream.streamer}</p>
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

export default Lives;
