import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
import { RecommendationItem } from "@/types/tamv";
import { useState } from "react";

interface RecommendedForYouCarouselProps {
  items: RecommendationItem[];
}

export const RecommendedForYouCarousel = ({ items }: RecommendedForYouCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= items.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(0, items.length - itemsPerPage)
        : prev - itemsPerPage
    );
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <Card className="glass border border-border/60 p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Recomendado para ti
          </h3>
          <p className="text-xs text-muted-foreground">
            Basado en tus conciertos, Dream Spaces y conexiones
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="outline"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= items.length}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            className="glass border border-border/60 p-3 hover:border-primary/60 transition-all cursor-pointer group"
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <Badge className="mb-2 text-xs" variant="secondary">
              {item.type === "creator" && "Creador"}
              {item.type === "dreamspace" && "Dream Space"}
              {item.type === "group" && "Grupo"}
              {item.type === "channel" && "Canal"}
            </Badge>

            <h4 className="font-semibold text-sm mb-1 line-clamp-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {item.subtitle}
            </p>

            <Button size="sm" variant="outline" className="w-full text-xs gap-1">
              <Users className="w-3 h-3" />
              Explorar
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
};
