import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle, Sparkles } from "lucide-react";

interface DailyMission {
  id: string;
  title: string;
  description: string;
  action: string;
}

const DAILY_MISSION_KEY = "tamv_daily_mission";

export const DailyMissionWidget = () => {
  const [mission, setMission] = useState<DailyMission | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Load mission from localStorage
    const stored = localStorage.getItem(DAILY_MISSION_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toDateString();
      
      if (data.date === today) {
        setMission(data.mission);
        setCompleted(data.completed || false);
      } else {
        // New day, generate new mission
        generateNewMission();
      }
    } else {
      generateNewMission();
    }
  }, []);

  const generateNewMission = () => {
    const missions: DailyMission[] = [
      {
        id: "collab",
        title: "Colabora con alguien nuevo",
        description: "Conecta con un creador y inicia un proyecto juntos",
        action: "Ir a Puentes Oníricos",
      },
      {
        id: "concert",
        title: "Asiste a un concierto sensorial",
        description: "Explora una experiencia musical inmersiva",
        action: "Ver conciertos",
      },
      {
        id: "dreamspace",
        title: "Crea tu primer Dream Space",
        description: "Diseña un espacio virtual único",
        action: "Crear espacio",
      },
      {
        id: "post",
        title: "Comparte tu creatividad",
        description: "Publica contenido sobre tu proyecto o idea",
        action: "Publicar ahora",
      },
    ];

    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    const today = new Date().toDateString();

    const data = {
      mission: randomMission,
      date: today,
      completed: false,
    };

    localStorage.setItem(DAILY_MISSION_KEY, JSON.stringify(data));
    setMission(randomMission);
    setCompleted(false);
  };

  const handleComplete = () => {
    if (!mission) return;

    setCompleted(true);
    const stored = localStorage.getItem(DAILY_MISSION_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      data.completed = true;
      localStorage.setItem(DAILY_MISSION_KEY, JSON.stringify(data));
    }
  };

  if (!mission) return null;

  return (
    <Card className="glass border border-border/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold">Misión diaria</h3>
        {completed && (
          <Badge className="bg-emerald-600/90 ml-auto">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completada
          </Badge>
        )}
      </div>

      <p className="text-sm font-semibold mb-1">{mission.title}</p>
      <p className="text-xs text-muted-foreground mb-4">{mission.description}</p>

      {!completed && (
        <Button size="sm" className="w-full gap-2" onClick={handleComplete}>
          <Sparkles className="w-4 h-4" />
          {mission.action}
        </Button>
      )}

      {completed && (
        <p className="text-xs text-center text-primary font-semibold flex items-center justify-center gap-1">
          <CheckCircle className="w-3 h-3" />
          ¡Misión cumplida! Vuelve mañana por una nueva
        </p>
      )}
    </Card>
  );
};
