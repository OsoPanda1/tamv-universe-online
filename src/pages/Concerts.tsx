import { useState, useMemo } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Calendar,
  Users,
  Radio,
  Sparkles,
  Ticket,
  Coins,
  ArrowUpRight,
  Filter,
  ChevronDown,
  Megaphone,
} from "lucide-react";
import concertBg from "@/assets/concert-background.jpg";

type ConcertAccess = "free" | "paid";
type ImmersionLevel = "XR" | "Holográfico" | "Multisensorial";

interface Concert {
  id: number;
  title: string;
  artist: string;
  date: string;
  attendees: number;
  status: "live" | "upcoming" | "past";
  image: string;
  access: ConcertAccess;
  priceUSD?: number;          // 1 – 3000 USD
  immersion: ImmersionLevel;
  maxTickets?: number;
}

interface PromoPackage {
  id: number;
  type: "random" | "geo";
  name: string;
  reach: number;              // usuarios estimados
  priceUSD: number;
  description: string;
}

const mockConcerts: Concert[] = [
  {
    id: 1,
    title: "Concierto Sensorial XR · Aurora",
    artist: "Neurosync",
    date: "2025-12-05",
    attendees: 2500,
    status: "live",
    image: concertBg,
    access: "paid",
    priceUSD: 49,
    immersion: "XR",
    maxTickets: 5000,
  },
  {
    id: 2,
    title: "Quantum Beats Festival",
    artist: "Various Artists",
    date: "2025-12-10",
    attendees: 5000,
    status: "upcoming",
    image: concertBg,
    access: "free",
    immersion: "Multisensorial",
    maxTickets: 20000,
  },
  {
    id: 3,
    title: "Holographic Symphony",
    artist: "Digital Orchestra",
    date: "2025-12-15",
    attendees: 3200,
    status: "upcoming",
    image: concertBg,
    access: "paid",
    priceUSD: 12,
    immersion: "Holográfico",
    maxTickets: 8000,
  },
];

const promoPackages: PromoPackage[] = [
  {
    id: 1,
    type: "random",
    name: "Impulso Global Básico",
    reach: 1000,
    priceUSD: 4.99,
    description: "Notificaciones a ~1000 usuarios TAMV aleatorios.",
  },
  {
    id: 2,
    type: "random",
    name: "Impulso Global Plus",
    reach: 5000,
    priceUSD: 14.99,
    description: "Notificaciones a ~5000 usuarios TAMV aleatorios.",
  },
  {
    id: 3,
    type: "geo",
    name: "Impulso Geo Local",
    reach: 1000,
    priceUSD: 9.99,
    description: "Usuarios filtrados por geolocalización e idioma.",
  },
  {
    id: 4,
    type: "geo",
    name: "Impulso Geo Pro",
    reach: 5000,
    priceUSD: 29.99,
    description: "Mayor alcance segmentado por región/intereses.",
  },
];

const Concerts = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("concerts");

  const [filterAccess, setFilterAccess] = useState<"all" | "free" | "paid">("all");
  const [filterImmersion, setFilterImmersion] = useState<ImmersionLevel | "Todas">(
    "Todas"
  );
  const [sortBy, setSortBy] = useState<"date" | "attendees" | "liveFirst">(
    "liveFirst"
  );

  const [wallet] = useState({
    TAMV: 18450,
    USD: 120.75,
  });

  const filteredConcerts = useMemo(() => {
    let list = [...mockConcerts];

    if (filterAccess !== "all") {
      list = list.filter((c) => c.access === filterAccess);
    }
    if (filterImmersion !== "Todas") {
      list = list.filter((c) => c.immersion === filterImmersion);
    }

    switch (sortBy) {
      case "attendees":
        list.sort((a, b) => b.attendees - a.attendees);
        break;
      case "date":
        list.sort(
          (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "liveFirst":
      default:
        list.sort((a, b) => {
          if (a.status === "live" && b.status !== "live") return -1;
          if (b.status === "live" && a.status !== "live") return 1;
          return (
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        });
        break;
    }

    return list;
  }, [filterAccess, filterImmersion, sortBy]);

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
            {/* Header + resumen de wallet / ingresos */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  Conciertos Sensoriales
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Experiencias musicales inmersivas únicas en el metaverso TAMV.
                  Crea conciertos free o de paga (1 a 3000 USD por ticket), vende
                  entradas, entrega tickets coleccionables y decide si impulsas tu
                  concierto con campañas internas de notificaciones.
                </p>
              </div>

              <Card className="glass px-4 py-3 flex items-center gap-4 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-300" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Econ. conciertos
                  </span>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="block text-[11px] text-muted-foreground uppercase tracking-wide">
                      Saldo TAMV
                    </span>
                    <span className="font-semibold">
                      {wallet.TAMV.toLocaleString("es-MX")} TAMV
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground uppercase tracking-wide">
                      Estimado USD
                    </span>
                    <span className="font-semibold">${wallet.USD}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Crear concierto
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </div>

            {/* Filtros / control */}
            <Card className="glass border border-border/60 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Explora conciertos sensoriales</span>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                {/* Free / Paid */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Tipo
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="xs"
                      variant={filterAccess === "all" ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => setFilterAccess("all")}
                    >
                      Todos
                    </Button>
                    <Button
                      size="xs"
                      variant={filterAccess === "free" ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => setFilterAccess("free")}
                    >
                      Free
                    </Button>
                    <Button
                      size="xs"
                      variant={filterAccess === "paid" ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => setFilterAccess("paid")}
                    >
                      De paga
                    </Button>
                  </div>
                </div>

                {/* Inmersión */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Inmersión
                  </span>
                  <div className="flex gap-1">
                    {["Todas", "XR", "Holográfico", "Multisensorial"].map((lvl) => (
                      <Button
                        key={lvl}
                        size="xs"
                        variant={filterImmersion === lvl ? "default" : "outline"}
                        className="text-xs"
                        onClick={() =>
                          setFilterImmersion(lvl as ImmersionLevel | "Todas")
                        }
                      >
                        {lvl}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Orden */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Ordenar por
                  </span>
                  <Button
                    size="xs"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => {
                      const order: typeof sortBy[] = ["liveFirst", "date", "attendees"];
                      const idx = order.indexOf(sortBy);
                      setSortBy(order[(idx + 1) % order.length]);
                    }}
                  >
                    {sortBy === "liveFirst" && "En vivo / pronto"}
                    {sortBy === "date" && "Fecha"}
                    {sortBy === "attendees" && "Asistencia"}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Banner ticket coleccionable / upsell */}
            <Card className="glass border border-fuchsia-400/40 p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-fuchsia-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Ticket digital coleccionable
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Cada ticket de concierto de paga incluye un diseño holográfico
                exclusivo descargable e imprimible sin valor legal. Los asistentes
                pueden comprar packs de personalización del ticket desde 2.99 USD
                hasta 19.99 USD para elevar aún más la experiencia visual.
              </p>
              <Button size="sm" variant="outline" className="whitespace-nowrap">
                Ver ejemplo de ticket
              </Button>
            </Card>

            {/* Banner de promoción pagada */}
            <Card className="glass border border-cyan-400/40 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-cyan-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Promoción opcional de conciertos
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tú eres responsable de promocionar tu concierto por fuera (redes,
                comunidad, canales TAMV). Si quieres que TAMV envíe notificaciones
                internas tipo anuncio a usuarios seleccionados, puedes contratar
                campañas de alcance global (usuarios random) o campañas
                geolocalizadas con segmentación más precisa.
              </p>

              {/* Tabla/tiles de paquetes de promoción */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {promoPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="glass border border-border/60 p-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">
                          {pkg.name}
                        </span>
                        <Badge
                          className={
                            pkg.type === "random"
                              ? "bg-sky-600/80"
                              : "bg-emerald-600/80"
                          }
                        >
                          {pkg.type === "random" ? "Global" : "Geo"}
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
                        <span className="block text-[11px] text-muted-foreground uppercase tracking-wide">
                          Precio
                        </span>
                        <span className="text-sm font-semibold">
                          ${pkg.priceUSD.toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 w-full">
                      Usar en mi concierto
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Grid de conciertos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
              {filteredConcerts.map((concert) => {
                const isPaid = concert.access === "paid";
                const dateStr = new Date(concert.date).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <Card
                    key={concert.id}
                    className="glass overflow-hidden hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:-translate-y-1 transition-all duration-300 border border-border/60"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={concert.image}
                        alt={concert.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      {/* Badges estado */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {concert.status === "live" && (
                          <Badge className="bg-red-600/90 animate-pulse gap-1">
                            <Radio className="w-3 h-3" />
                            EN VIVO
                          </Badge>
                        )}
                        {concert.status === "upcoming" && (
                          <Badge className="bg-emerald-600/85">Próximamente</Badge>
                        )}
                      </div>

                      {/* Tipo de acceso / inmersión */}
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                        <Badge
                          className={
                            isPaid ? "bg-fuchsia-600/95" : "bg-sky-600/95"
                          }
                        >
                          {isPaid ? "Concierto de paga" : "Concierto free"}
                        </Badge>
                        <Badge className="bg-slate-900/80 border border-white/10 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-300" />
                          {concert.immersion}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 leading-tight">
                          {concert.title}
                        </h3>
                        <p className="text-primary text-sm flex items-center gap-1">
                          <Music className="w-4 h-4" />
                          {concert.artist}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {concert.attendees.toLocaleString("es-MX")} asistentes
                            {concert.maxTickets &&
                              ` · cupo máx. ${concert.maxTickets.toLocaleString(
                                "es-MX"
                              )}`}
                          </span>
                        </div>
                      </div>

                      {/* Precio + comisión TAMV + ticket */}
                      <div className="flex items-center justify-between text-sm mt-1">
                        {isPaid && concert.priceUSD ? (
                          <div>
                            <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                              Precio por ticket
                            </span>
                            <span className="text-xl font-semibold">
                              ${concert.priceUSD.toFixed(2)} USD
                            </span>
                            <p className="text-[11px] text-muted-foreground">
                              TAMV recibe el 25% del valor total de cada ticket
                              vendido. El artista recibe el 75% en su Wallet TAMV.
                            </p>
                          </div>
                        ) : (
                          <div>
                            <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                              Acceso
                            </span>
                            <span className="text-sm font-semibold">
                              Entrada libre (free)
                            </span>
                          </div>
                        )}
                        <div className="text-right text-[11px] text-muted-foreground max-w-[200px]">
                          <span className="block font-semibold mb-1">
                            Ticket coleccionable
                          </span>
                          <span>
                            Diseño exclusivo descargable e imprimible sin valor
                            legal. Personalización opcional con packs de
                            2.99–19.99 USD.
                          </span>
                        </div>
                      </div>

                      <Button className="w-full gap-2 mt-2">
                        <Music className="w-4 h-4" />
                        {concert.status === "live"
                          ? "Unirme ahora"
                          : isPaid
                          ? "Comprar ticket"
                          : "Reservar entrada"}
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

export default Concerts;

