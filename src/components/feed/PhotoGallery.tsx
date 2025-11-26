import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const PhotoGallery = () => {
  const photos = [
    { id: 1, likes: 234, comments: 45 },
    { id: 2, likes: 189, comments: 32 },
    { id: 3, likes: 456, comments: 78 },
    { id: 4, likes: 321, comments: 56 },
    { id: 5, likes: 267, comments: 41 },
    { id: 6, likes: 198, comments: 29 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <Card key={photo.id} className="group overflow-hidden glass hover:shadow-neon-purple transition-all cursor-pointer">
          <div className="aspect-square bg-gradient-card relative">
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-5 h-5" />
                    <span>{photo.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5" />
                    <span>{photo.comments}</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="mt-2">
                  <Download className="w-4 h-4 mr-2" />
                  Ver más
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhotoGallery;
