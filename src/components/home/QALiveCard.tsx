import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Calendar, Users } from "lucide-react";
import { QALiveEvent } from "@/types/tamv";

interface QALiveCardProps {
  event: QALiveEvent | null;
}

export const QALiveCard = ({ event }: QALiveCardProps) => {
  if (!event) return null;

  const eventDate = new Date(event.startTime);
  const isLive = eventDate <= new Date();
  
  return (
    <Card className="glass border border-primary/40 p-4 mb-4 overflow-hidden relative">
      {isLive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 animate-pulse" />
      )}
      
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
          <Radio className="w-6 h-6 text-purple-300" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold">Q&A Live · Hoy en TAMV</h3>
            {isLive && (
              <Badge className="bg-red-500/90 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-1.5" />
                EN VIVO
              </Badge>
            )}
          </div>

          <p className="text-sm font-semibold mb-1">{event.title}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Con {event.host}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {eventDate.toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="gap-2">
              <Radio className="w-4 h-4" />
              {isLive ? "Entrar al Q&A en vivo" : "Próximamente"}
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Ver calendario
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
