import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Calendar, Gift } from "lucide-react";
import { Challenge } from "@/types/tamv";

interface ChallengesSectionProps {
  challenges: Challenge[];
}

export const ChallengesSection = ({ challenges }: ChallengesSectionProps) => {
  return (
    <Card id="tamv-challenges" className="glass border border-border/60 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">Retos del mes</h3>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => {
          const endDate = new Date(challenge.endDate);
          const daysLeft = Math.ceil(
            (endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );

          return (
            <Card
              key={challenge.id}
              className="glass border border-border/60 p-4 hover:border-primary/60 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{challenge.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {challenge.shortDescription}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{daysLeft} días restantes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      <span className="text-primary font-semibold">
                        {challenge.reward}
                      </span>
                    </div>
                  </div>
                </div>

                <Badge
                  className={
                    challenge.progressPercent > 0
                      ? "bg-primary/90"
                      : "bg-emerald-600/90"
                  }
                >
                  {challenge.progressPercent > 0 ? "En progreso" : "Nuevo"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-semibold">{challenge.progressPercent}%</span>
                </div>
                <Progress value={challenge.progressPercent} className="h-2" />
              </div>

              <Button size="sm" className="w-full mt-3 gap-2">
                <Trophy className="w-4 h-4" />
                {challenge.progressPercent > 0 ? "Continuar reto" : "Unirme al reto"}
              </Button>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};
