import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Sparkles, MessageCircle } from "lucide-react";
import { CollaborationMatch } from "@/types/tamv";

interface PuentesOniricosPanelProps {
  matches: CollaborationMatch[];
}

export const PuentesOniricosPanel = ({ matches }: PuentesOniricosPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">Matches Colaborativos</h3>
      </div>

      {matches.map((match) => (
        <Card
          key={match.id}
          className="glass border border-primary/40 p-4 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-purple-600/90">
              <Sparkles className="w-3 h-3 mr-1" />
              Match Perfecto
            </Badge>
          </div>

          <div className="flex items-center gap-3 mb-3">
            {match.users.map((user, idx) => (
              <div key={user.id} className="flex items-center gap-2">
                {idx > 0 && (
                  <div className="h-px w-6 bg-gradient-to-r from-purple-400 to-cyan-400" />
                )}
                <div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold mb-1">
                    {user.name.charAt(0)}
                  </div>
                  <p className="text-xs font-semibold text-center">{user.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Razón del match
            </p>
            <p className="text-sm">{match.reason}</p>
          </div>

          {match.users.map((user) => (
            <div key={user.id} className="mb-2">
              <p className="text-xs font-semibold mb-1">{user.name}</p>
              <div className="flex flex-wrap gap-1 mb-1">
                {user.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[10px]">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <Button className="w-full gap-2 mt-2">
            <MessageCircle className="w-4 h-4" />
            Conectar y crear proyecto
          </Button>
        </Card>
      ))}
    </div>
  );
};
