import { useState, useMemo } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Radio,
  Users,
  Hash,
  Lock,
  Crown,
  Star,
  Zap,
  Coins,
  ArrowUpRight,
  Filter,
  ChevronDown,
} from "lucide-react";
import techPattern from "@/assets/tech-pattern.jpg";

type ChannelAccess = "free" | "paid";

interface Channel {
  id: number;
  name: string;
  title: string;
  description: string;
  members: number;
  online: number;
  access: ChannelAccess;
  pricePerMonth?: number; // solo para paid
  creatorName: string;
  perks: string[];
  image: string;
  category: "Arte" | "Música" | "Tecnología" | "Ciencia" | "Gaming" | "Negocios";
  hot: boolean;
  new: boolean;
}

const mockChannels: Channel[] = [
  {
    id: 1,
    name: "tech-innovators",
    title: "Tech Innovators LATAM",
    description: "IA, metaverso y APIs: el laboratorio donde TAMV y los devs se cruzan.",
    members: 1234,
    online: 456,
    access: "free",
    creatorName: "TAMV Core Team",
    perks: ["Charlas abiertas", "Code reviews comunitarios", "Anuncios técnicos TAMV"],
    image: techPattern,
    category: "Tecnología",
    hot: true,
    new: false,
  },
  {
    id: 2,
    name: "creative-minds",
    title: "Creative Minds · Inner Circle",
    description: "Club creativo para quienes viven de contar historias y diseñar experiencias.",
    members: 987,
    online: 234,
    access: "paid",
    pricePerMonth: 7.99,
    creatorName: "Isabella Studio",
    perks: [
      "Feedback directo a tus proyectos",
      "Sesiones privadas mensuales",
      "Acceso anticipado a features TAMV",
    ],
    image: techPattern,
    category: "Arte",
    hot: true,
    new: true,
  },
  {
    id: 3,
    name: "quantum-physics",
    title: "Quantum Physics & Beyond",
    description: "De la mecánica cuántica a la filosofía, aplicado al diseño de realidades.",
    members: 543,
    online: 123,
    access: "free",
    creatorName: "Quantum MX",
    perks: ["Debates semanales", "Recursos curados", "Colaboraciones en proyectos"],
    image: techPattern,
    category: "Ciencia",
    hot: false,
    new: true,
  },
  {
    id: 4,
    name: "music-production",
    title: "Music Production Guild",
    description: "Productores, DJs y compositores construyendo el soundtrack del metaverso.",
    members: 876,
    online: 345,
    access: "paid",
    pricePerMonth: 4.99,
    creatorName: "Metaverse Beats",
    perks: [
      "Samples exclusivos",
      "Feedback de mezclas",
      "Acceso a conciertos sensoriales privados",
    ],
    image: techPattern,
    category: "Música",
    hot: true,
    new: false,
  },
];

const Channels = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("channels");

  const [filterAccess, setFilterAccess] = useState<"all" | "free" | "paid">("all");
  const [filterCategory, setFilterCategory] = useState<
    Channel["category"] | "Todas"
  >("Todas");
  const [sortBy, setSortBy] = useState<"mostMembers" | "mostOnline" | "newest" | "hot">(
    "hot"
  );

  const [walletBalance] = useState({
    TAMV: 12500,
    USD: 38.5,
  });

  const filteredChannels = useMemo(() => {
    let list = [...mockChannels];

    if (filterAccess !== "all") {
      list = list.filter((c) => c.access === filterAccess);
    }
    if (filterCategory !== "Todas") {
      list = list.filter((c) => c.category === filterCategory);
    }

    switch (sortBy) {
      case "mostMembers":
        list.sort((a, b) => b.members - a.members);
        break;
      case "mostOnline":
        list.sort((a, b) => b.online - a.online);
        break;
      case "newest":
        list.sort((a, b) => Number(b.new) - Number(a.new));
        break;
      case "hot":
      default:
        list.sort((a, b) => Number(b.hot) - Number(a.hot));
        break;
    }

    return list;
  }, [filterAccess, filterCategory, sortBy]);

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
            {/* Header + wallet resumen canales */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Canales
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Clubs creativos donde puedes unirte gratis o desbloquear acceso
                  premium. Los creadores definen el valor; TAMV conecta, protege
                  y orquesta la economía interna.
                </p>
              </div>

              <Card className="glass px-4 py-3 flex items-center gap-4 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-300" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Ingresos de canales
                  </span>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="block text-[11px] text-muted-foreground uppercase tracking-wide">
                      Saldo TAMV
                    </span>
                    <span className="font-semibold">
                      {walletBalance.TAMV.toLocaleString("es-MX")} TAMV
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground uppercase tracking-wide">
                      Estimado USD
                    </span>
                    <span className="font-semibold">${walletBalance.USD}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Panel de creador
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </div>

            {/* Barra de filtros */}
            <Card className="glass border border-border/60 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Explora y filtra canales</span>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                {/* Free / Paid toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Tipo
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={filterAccess === "all" ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => setFilterAccess("all")}
                    >
                      Todos
                    </Button>
                    <Button
                      size="sm"
                      variant={filterAccess === "free" ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => setFilterAccess("free")}
                    >
                      Free
                    </Button>
                    <Button
                      size="sm"
                      variant={filterAccess === "paid" ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => setFilterAccess("paid")}
                    >
                      Premium
                    </Button>
                  </div>
                </div>

                {/* Categorías */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Categoría
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["Todas", "Arte", "Música", "Tecnología", "Ciencia", "Gaming", "Negocios"].map(
                      (cat) => (
                        <Button
                          key={cat}
                          size="sm"
                          variant={filterCategory === cat ? "default" : "outline"}
                          className="text-xs"
                          onClick={() =>
                            setFilterCategory(cat as Channel["category"] | "Todas")
                          }
                        >
                          {cat}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Ordenar por
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => {
                      const order: typeof sortBy[] = [
                        "hot",
                        "mostOnline",
                        "mostMembers",
                        "newest",
                      ];
                      const idx = order.indexOf(sortBy);
                      setSortBy(order[(idx + 1) % order.length]);
                    }}
                  >
                    {sortBy === "hot" && "En tendencia"}
                    {sortBy === "mostOnline" && "Más activos ahora"}
                    {sortBy === "mostMembers" && "Más grandes"}
                    {sortBy === "newest" && "Más nuevos"}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Banner de valor para creadores */}
            <Card className="glass border border-emerald-400/40 p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-emerald-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Crea tu propio canal
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Elige si tu canal será free o premium. Tú defines el precio; TAMV
                gestiona accesos y cobra el 25% de comisión por cada nuevo ingreso.
                Tú recibes el 75% directo en tu Wallet TAMV.
              </p>
              <Button size="sm" className="whitespace-nowrap">
                Crear canal ahora
              </Button>
            </Card>

            {/* Grid de canales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
              {filteredChannels.map((channel) => (
                <Card
                  key={channel.id}
                  className="glass p-5 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:-translate-y-1 transition-all duration-300 border border-border/60"
                >
                  <div className="flex items-start gap-4">
                    {/* Imagen / avatar canal */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={channel.image}
                        alt={channel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/40 via-transparent to-fuchsia-500/40" />
                    </div>

                    {/* Info principal */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-primary" />
                        <h3 className="text-lg font-semibold leading-tight">
                          {channel.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        @{channel.name} · {channel.category}
                      </p>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {channel.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] mt-1">
                        <Badge
                          variant={channel.access === "free" ? "secondary" : "default"}
                          className="flex items-center gap-1 px-2 py-0.5"
                        >
                          {channel.access === "free" ? (
                            <>
                              <Radio className="w-3 h-3" />
                              Free
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3" />
                              Premium
                            </>
                          )}
                        </Badge>

                        {channel.hot && (
                          <Badge className="bg-fuchsia-600/80 px-2 py-0.5 text-[10px]">
                            <Zap className="w-3 h-3 mr-1" />
                            En tendencia
                          </Badge>
                        )}

                        {channel.new && (
                          <Badge className="bg-emerald-600/80 px-2 py-0.5 text-[10px]">
                            Nuevo
                          </Badge>
                        )}

                        {channel.access === "paid" && channel.pricePerMonth && (
                          <span className="text-[11px] text-primary font-medium ml-1">
                            {channel.pricePerMonth.toFixed(2)} USD / mes
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs mt-2">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{channel.members} miembros</span>
                          </div>
                          <div className="flex items-center gap-1 text-primary">
                            <Radio className="w-3 h-3" />
                            <span>{channel.online} en línea ahora</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Star className="w-3 h-3 text-yellow-300" />
                          <span>Beneficios exclusivos</span>
                        </div>
                      </div>

                      {/* Perks resumidos */}
                      {channel.perks.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {channel.perks.slice(0, 3).map((perk, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-0.5 rounded-full bg-primary/5 text-muted-foreground"
                            >
                              {perk}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Nota de comisión TAMV para canales premium */}
                      {channel.access === "paid" && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          TAMV recibe el 25% de cada ingreso. El creador obtiene el
                          75% directo en su Wallet TAMV.
                        </p>
                      )}
                    </div>

                    {/* Botón de acción */}
                    <Button
                      variant={channel.access === "free" ? "outline" : "default"}
                      size="sm"
                      className="whitespace-nowrap mt-1"
                    >
                      {channel.access === "free" ? "Unirse" : "Unirme Premium"}
                    </Button>
                  </div>
                </Card>
              ))}
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

export default Channels;
