import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff, Phone, Monitor } from "lucide-react";
import videoCallBg from "@/assets/video-call.jpg";

const VideoCall = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("videocall");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

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

        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col gap-4">
            <Card className="glass flex-1 relative overflow-hidden">
              <img src={videoCallBg} alt="Video Call" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <Card className="glass w-48 aspect-video">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-card">
                    <Video className="w-8 h-8 text-primary" />
                  </div>
                </Card>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant={videoEnabled ? "default" : "destructive"}
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className="gap-2"
                >
                  {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  {videoEnabled ? "Cámara" : "Sin Cámara"}
                </Button>
                <Button
                  size="lg"
                  variant={audioEnabled ? "default" : "destructive"}
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="gap-2"
                >
                  {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  {audioEnabled ? "Audio" : "Sin Audio"}
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Monitor className="w-5 h-5" />
                  Compartir Pantalla
                </Button>
                <Button size="lg" variant="destructive" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Colgar
                </Button>
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

export default VideoCall;
