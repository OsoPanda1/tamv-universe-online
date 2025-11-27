import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from "lucide-react";
import musicPlayer from "@/assets/music-player.jpg";

const Music = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("music");
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { id: 1, title: "Quantum Dreams", artist: "Neurosync", duration: "3:45" },
    { id: 2, title: "Digital Horizons", artist: "Cyberwave", duration: "4:12" },
    { id: 3, title: "Neon Nights", artist: "Synthpulse", duration: "3:28" },
    { id: 4, title: "Holographic Love", artist: "Virtual Hearts", duration: "4:05" },
    { id: 5, title: "Metaverse Anthem", artist: "DigitalSoul", duration: "3:52" },
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 holographic">Música</h1>
              <p className="text-muted-foreground">Tu biblioteca musical en el metaverso</p>
            </div>

            <Card className="glass p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={musicPlayer} alt="Now Playing" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-3xl font-bold mb-2">{playlist[0].title}</h2>
                  <p className="text-primary mb-6">{playlist[0].artist}</p>
                  
                  <Slider defaultValue={[33]} max={100} step={1} className="mb-4" />
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">1:23</span>
                    <span className="text-sm text-muted-foreground">{playlist[0].duration}</span>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Button variant="ghost" size="icon">
                      <SkipBack className="w-6 h-6" />
                    </Button>
                    <Button 
                      size="icon" 
                      className="w-14 h-14"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <SkipForward className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-2 flex-1">
                      <Volume2 className="w-5 h-5" />
                      <Slider defaultValue={[70]} max={100} step={1} className="w-32" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-4">Lista de Reproducción</h3>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <div
                    key={track.id}
                    className={`p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors ${
                      index === 0 ? "bg-accent/30" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground w-6">{index + 1}</span>
                        <div>
                          <p className="font-semibold">{track.title}</p>
                          <p className="text-sm text-muted-foreground">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{track.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
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

export default Music;
