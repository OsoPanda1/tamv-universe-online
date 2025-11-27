import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  TrendingUp,
  Globe2,
  Lock,
  MessageCircle,
  Star,
  DollarSign,
  Megaphone,
} from "lucide-react";
import groupsIcon from "@/assets/groups-icon.jpg";

type GroupVisibility = "Público" | "Privado";
type GroupPurpose =
  | "Debate"
  | "Soporte"
  | "Aprendizaje"
  | "Networking"
  | "Showcase"
  | "Memes";

type GroupAccessModel = "Free" | "De paga";

interface Group {
  id: number;
  name: string;
  membersK: number;
  trend: string;
  image: string;
  visibility: GroupVisibility;
  purpose: GroupPurpose;
  activityLevel: "Baja" | "Media" | "Alta";
  region: string;
  language: string;
  isFeatured: boolean;
  accessModel: GroupAccessModel;
  priceUSD?: number; // solo para de paga
}

interface PromoPackage {
  id: number;
  type: "random" | "premium";
  name: string;
  reach: number;
  maxFilters?: number;
  priceUSD: number;
  description: string;
}

const MIN_GROUP_PRICE = 2.99;
const MAX_GROUP_PRICE = 299;
const GROUP_COMMISSION = 0.25; // 25% TAMV

const groups: Group[] = [
  {
    id: 1,
    name: "IA Creators",
    membersK: 2.3,
    trend: "+12%",
    image: groupsIcon,
    visibility: "Público",
    purpose: "Showcase",
    activityLevel: "Alta",
    region: "Global",
    language: "Español / Inglés",
    isFeatured: true,
    accessModel: "De paga",
    priceUSD: 7.99,
  },
  {
    id: 2,
    name: "Metaverse Latino",
    membersK: 5.1,
    trend: "+8%",
    image: groupsIcon,
    visibility: "Público",
    purpose: "Networking",
    activityLevel: "Alta",
    region: "Latinoamérica",
    language: "Español",
    isFeatured: true,
    accessModel: "Free",
  },
  {
    id: 3,
    name: "Quantum Developers",
    membersK: 1.8,
    trend: "+15%",
    image: groupsIcon,
    visibility: "Privado",
    purpose: "Aprendizaje",
    activityLevel: "Media",
    region: "Global",
    language: "Inglés",
    isFeatured: false,
    accessModel: "De paga",
    priceUSD: 19.99,
  },
  {
    id: 4,
    name: "Music Producers",
    membersK: 3.4,
    trend: "+5%",
    image: groupsIcon,
    visibility: "Público",
    purpose: "Debate",
    activityLevel: "Alta",
    region: "Global",
    language: "Español / Inglés",
    isFeatured: false,
    accessModel: "Free",
  },
];

const promoPackages: PromoPackage[] = [
  {
    id: 1,
    type: "random",
    name: "Impulso Random · Básico",
    reach: 1000,
    priceUSD: 4.99,
    description:
      "Notificación de tu grupo enviada a ~1000 usuarios TAMV seleccionados aleatoriamente.",
  },
  {
    id: 2,
    type: "random",
    name: "Impulso Random · Plus",
    reach: 5000,
    priceUSD: 14.99,
    description:
      "Mayor alcance global con usuarios random para acelerar el crecimiento.",
  },
  {
    id: 3,
    type: "premium",
    name: "Impulso Premium · Filtros",
    reach: 1000,
    maxFilters: 4,
    priceUSD: 19.99,
    description:
      "Usuarios filtrados (hasta 4 filtros: región, idioma, intereses, tipo de usuario).",
  },
  {
    id: 4,
    type: "premium",
    name: "Impulso Premium · XL",
    reach: 5000,
    maxFilters: 4,
    priceUSD: 49.99,
    description:
      "Alcance amplio con segmentación avanzada para audiencias altamente relevantes.",
  },
];

const Groups = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("groups");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-foreground overflow-hidden">
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 neon-glow-purple">
                  Grupos TAMV
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Comunidades públicas o privadas, free o de paga, donde cada
                  creador puede construir su propio hub y monetizar accesos
                  bajo un modelo claro y transparente.
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Crear Grupo
              </Button>
            </div>

            {/* Aviso de modelo económico */}
            <Card className="glass border border-border/60 p-4 flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Modelo económico de grupos
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Los creadores pueden hacer sus grupos públicos o privados, y
                decidir si el acceso será free o de paga. Para grupos de paga,
                el precio de ingreso por persona va de{" "}
                {MIN_GROUP_PRICE.toFixed(2)} USD a{" "}
                {MAX_GROUP_PRICE.toFixed(2)} USD; el creador define el valor
                final. Cada ingreso pagado genera una comisión del 25% para
                TAMV y un 75% para el propietario del grupo, con la misma
                dinámica que en los conciertos sensoriales.
              </p>
            </Card>

            {/* Bloque de publicidad opcional */}
            <Card className="glass border border-cyan-400/40 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-cyan-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Publicidad opcional para tu grupo
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cada propietario es responsable directo de la publicidad y
                crecimiento de su grupo (redes externas, comunidad interna,
                DreamSpaces, conciertos, etc.). TAMV solo envía campañas
                internas de promoción (notificaciones estilo anuncio) si el
                creador contrata un paquete de publicidad: random X usuarios
                por X precio o paquetes premium con filtros avanzados.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                {promoPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="glass border border-border/60 p-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[13px]">
                          {pkg.name}
                        </span>
                        <Badge
                          className={
                            pkg.type === "random"
                              ? "bg-sky-600/80"
                              : "bg-emerald-600/80"
                          }
                        >
                          {pkg.type === "random" ? "Random" : "Premium"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {pkg.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] text-muted-foreground uppercase tracking-wide">
                          Alcance estimado
                        </span>
                        <span className="text-sm font-semibold">
                          ~{pkg.reach.toLocaleString("es-MX")} usuarios
                        </span>
                      </div>
                      <div className="text-right">
                        {pkg.maxFilters && (
                          <span className="block text-[11px] text-muted-foreground">
                            Hasta {pkg.maxFilters} filtros
                          </span>
                        )}
                        <span className="block text-sm font-semibold">
                          ${pkg.priceUSD.toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 w-full">
                      Usar para mi grupo
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Grid de grupos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              {groups.map((group) => {
                const isPaid = group.accessModel === "De paga";
                const price = group.priceUSD ?? MIN_GROUP_PRICE;
                const creatorShare = price * (1 - GROUP_COMMISSION);
                const tamvShare = price * GROUP_COMMISSION;

                return (
                  <Card
                    key={group.id}
                    className="glass overflow-hidden hover:shadow-[0_0_22px_rgba(147,51,234,0.45)] hover:-translate-y-1 transition-all cursor-pointer border border-border/60"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-glow opacity-0 hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className="bg-slate-900/80 border border-white/10 text-[11px] flex items-center gap-1">
                          <Globe2 className="w-3 h-3" />
                          {group.region}
                        </Badge>
                        <Badge className="bg-slate-900/80 border border-white/10 text-[11px]">
                          {group.language}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                        <Badge
                          className={
                            group.visibility === "Público"
                              ? "bg-emerald-600/90 text-[11px] flex items-center gap-1"
                              : "bg-rose-600/90 text-[11px] flex items-center gap-1"
                          }
                        >
                          {group.visibility === "Público" ? (
                            <>
                              <Users className="w-3 h-3" />
                              Público
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3" />
                              Privado
                            </>
                          )}
                        </Badge>
                        {group.isFeatured && (
                          <Badge className="bg-fuchsia-600/90 text-[11px] flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Destacado
                          </Badge>
                        )}
                        <Badge
                          className={
                            isPaid
                              ? "bg-fuchsia-700/95 text-[11px]"
                              : "bg-sky-700/95 text-[11px]"
                          }
                        >
                          {isPaid
                            ? `De paga · $${price.toFixed(2)}`
                            : "Free"}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold">{group.name}</h3>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{group.membersK}K miembros</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                          <TrendingUp className="w-4 h-4" />
                          <span>{group.trend}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Propósito: {group.purpose}</span>
                        <span>
                          Actividad:{" "}
                          {group.activityLevel === "Alta"
                            ? "Muy activa"
                            : group.activityLevel === "Media"
                            ? "Estable"
                            : "Tranquila"}
                        </span>
                      </div>

                      {isPaid && (
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>
                              Ingreso por miembro: ${price.toFixed(2)} USD · Tú
                              recibes ~${creatorShare.toFixed(2)} · TAMV recibe ~$
                              {tamvShare.toFixed(2)} (25% comisión).
                            </span>
                          </div>
                          <p>
                            El propietario del grupo es responsable directo de
                            su publicidad; las campañas internas de TAMV solo se
                            activan si se contratan paquetes de promoción.
                          </p>
                        </div>
                      )}

                      <Button className="w-full mt-2" variant="outline">
                        {isPaid ? "Unirme (acceso de paga)" : "Unirme al grupo"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
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

export default Groups;
