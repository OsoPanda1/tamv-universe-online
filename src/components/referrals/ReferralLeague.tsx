import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Gift } from "lucide-react";

interface ReferralLeader {
  id: string;
  name: string;
  invites: number;
  reward: string;
}

interface ReferralLeagueProps {
  leaders: ReferralLeader[];
  currentUserRank?: number;
  currentUserInvites?: number;
}

export const ReferralLeague = ({
  leaders,
  currentUserRank,
  currentUserInvites = 0,
}: ReferralLeagueProps) => {
  const getRewardTier = (invites: number) => {
    if (invites >= 10000) return { tier: "1 año gratis", color: "bg-yellow-600/90" };
    if (invites >= 5001) return { tier: "6 meses gratis", color: "bg-purple-600/90" };
    if (invites >= 3001) return { tier: "4 meses gratis", color: "bg-cyan-600/90" };
    if (invites >= 1001) return { tier: "2 meses gratis", color: "bg-emerald-600/90" };
    if (invites >= 500) return { tier: "1 mes gratis", color: "bg-blue-600/90" };
    return { tier: "Sin recompensa", color: "bg-gray-600/90" };
  };

  const progressToNext = (invites: number) => {
    const tiers = [500, 1001, 3001, 5001, 10000];
    const nextTier = tiers.find((t) => t > invites) || 10000;
    return ((invites / nextTier) * 100).toFixed(0);
  };

  return (
    <Card className="glass border border-border/60 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">Liga de Embajadores TAMV (3 meses)</h3>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Invita usuarios y gana recompensas. Los top 1000 embajadores obtienen beneficios exclusivos.
      </p>

      {currentUserRank && (
        <Card className="glass border border-primary/40 p-3 mb-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Tu posición</p>
              <p className="text-2xl font-bold text-primary">#{currentUserRank}</p>
            </div>
            <Badge className={getRewardTier(currentUserInvites).color}>
              {getRewardTier(currentUserInvites).tier}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {currentUserInvites} invitaciones
              </span>
              <span className="font-semibold">{progressToNext(currentUserInvites)}%</span>
            </div>
            <Progress value={Number(progressToNext(currentUserInvites))} className="h-2" />
          </div>
        </Card>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            Top 10
          </span>
          <span>Invitaciones</span>
        </div>

        {leaders.slice(0, 10).map((leader, idx) => (
          <div
            key={leader.id}
            className="flex items-center justify-between p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  idx === 0
                    ? "bg-yellow-600/90"
                    : idx === 1
                    ? "bg-gray-400/90"
                    : idx === 2
                    ? "bg-orange-600/90"
                    : "bg-primary/60"
                }`}
              >
                #{idx + 1}
              </div>
              <div>
                <p className="text-sm font-semibold">{leader.name}</p>
                <Badge variant="secondary" className="text-[10px]">
                  {leader.reward}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Users className="w-4 h-4 text-primary" />
              {leader.invites.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
