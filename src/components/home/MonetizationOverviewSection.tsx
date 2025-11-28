import { Card } from "@/components/ui/card";
import { Music, Home, Gavel, Store, Crown, Users } from "lucide-react";

const monetizationOptions = [
  {
    icon: <Music className="w-6 h-6" />,
    title: "Conciertos Sensoriales",
    description: "Crea experiencias musicales inmersivas y cobra por acceso",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/30",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Dream Spaces",
    description: "Diseña espacios virtuales únicos y monetiza visitas",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-400/30",
  },
  {
    icon: <Gavel className="w-6 h-6" />,
    title: "Subastas",
    description: "Vende activos digitales exclusivos al mejor postor",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-400/30",
  },
  {
    icon: <Store className="w-6 h-6" />,
    title: "Marketplaces",
    description: "Comercializa tu contenido, arte y servicios creativos",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30",
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "Membresías",
    description: "Ofrece contenido premium con suscripción mensual",
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-400/30",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Programa de Afiliados",
    description: "Invita usuarios y gana recompensas recurrentes",
    color: "from-fuchsia-500/20 to-purple-500/20",
    borderColor: "border-fuchsia-400/30",
  },
];

export const MonetizationOverviewSection = () => {
  return (
    <Card className="glass border border-border/60 p-6 mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Monetización TAMV</h3>
        <p className="text-sm text-muted-foreground">
          Convierte tu creatividad en ingresos a través de múltiples canales dentro del ecosistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monetizationOptions.map((option, idx) => (
          <Card
            key={idx}
            className={`glass border ${option.borderColor} p-4 hover:scale-105 transition-all duration-300 cursor-pointer group bg-gradient-to-br ${option.color}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-background/50 group-hover:bg-background/80 transition-colors">
                {option.icon}
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-sm">{option.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
