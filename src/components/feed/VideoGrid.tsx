import { Card } from "@/components/ui/card";
import { Play, Eye, Clock } from "lucide-react";

const VideoGrid = () => {
  const videos = [
    { id: 1, title: "Concierto Sensorial Live", views: "45K", duration: "1:23:45" },
    { id: 2, title: "Tutorial Dream Spaces", views: "12K", duration: "15:30" },
    { id: 3, title: "KAOS System Demo", views: "28K", duration: "08:15" },
    { id: 4, title: "Marketplace Tour", views: "19K", duration: "12:45" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map((video) => (
        <Card key={video.id} className="group overflow-hidden glass hover:shadow-neon-cyan transition-all cursor-pointer">
          <div className="aspect-video bg-gradient-card relative">
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{video.views} vistas</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VideoGrid;
