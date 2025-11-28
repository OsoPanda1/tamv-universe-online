import { useState, useMemo } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Sparkles,
  Plus,
  Edit3,
  Users,
  Ticket,
  Lock,
  Store,
  DollarSign,
  Info,
  Star,
  LayoutTemplate,
  BarChart2,
} from "lucide-react";
import dreamspaceBg from "@/assets/dreamspace-background.jpg";

type SpaceMode = "Personal" | "Social" | "Evento";

interface DreamSpace {
  id: number;
  name: string;
  creator: string;
  isMine: boolean;
  visits: number;
  image: string;
  mode: SpaceMode;
  isPaidEntry: boolean;
  entryPriceUSD?: number;
  level: number;
  capacity: number;
  status: "Abierto" | "Solo invitados" | "Evento programado";
  widgets: string[];
}

interface StoreBundle {
  id: number;
  name: string;
  description: string;
  priceUSD: number;
  contents: string[];
  tag: "Starter" | "Creator" | "Venue";
}

const mySpaces: DreamSpace[] = [
  {
    id: 1,
    name: "Nebula Onírica",
    creator: "Tú",
    isMine: true,
    visits: 1200,
    image: dreamspaceBg,
    mode: "Personal",
    isPaidEntry: false,
    level: 2,
    capacity: 12,
    status: "Abierto",
    widgets: ["Mascotas", "Vitrinas de arte", "Playlist ambiente"],
  },
  {
    id: 2,
    name: "Jardín Cuántico",
    creator: "Tú",
    isMine: true,
    visits: 890,
    image: dreamspaceBg,
    mode: "Social",
    isPaidEntry: true,
    entryPriceUSD: 3.5,
    level: 3,
    capacity: 32,
    status: "Solo invitados",
    widgets: ["Escenario mini", "Canales premium", "Chat inmersivo"],
  },
];

const communitySpaces: DreamSpace[] = [
  {
    id: 3,
    name: "Océano Astral",
    creator: "Usuario3",
    isMine: false,
    visits: 2100,
    image: dreamspaceBg,
    mode: "Evento",
    isPaidEntry: true,
    entryPriceUSD: 9.99,
    level: 4,
    capacity: 120,
    status: "Evento programado",
    widgets: ["Escenario sensorial", "Pantallas XR", "Portales a conciertos"],
  },
];

const storeBundles: StoreBundle[] = [
  {
    id: 1,
    name: "Starter DreamSpace",
    description: "Plantilla base + pack de muebles esenciales y luz ambiente.",
    priceUSD: 3.99,
    contents: ["1 plantilla base", "Pack muebles básicos", "Preset de iluminación suave"],
    tag: "Starter",
  },
  {
    id: 2,
    name: "Creator Studio",
    description: "Convierte tu espacio en estudio creativo profesional.",
    priceUSD: 9.99,
    contents: ["Plantilla estudio", "Escenario pequeño", "Pantalla XR", "Módulo de vitrinas"],
    tag: "Creator",
  },
  {
    id: 3,
    name: "Sensory Venue XR",
    description: "Set completo para conciertos sensoriales y eventos de paga.",
    priceUSD: 24.99,
    contents: [
      "Plantilla venue XR",
      "Escenario avanzado",
      "Sistema de luces reactivas",
      "Módulo de ticketing",
      "Portales a conciertos",
    ],
    tag: "Venue",
  },
];

const baseIncludedSpaces = 1;
const extraSpaceUnlockPrice = 4.99; // USD
const tamvEntryCommission = 0.25; // 25%

const DreamSpaces = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("dreamspaces");
  const [filterMode, setFilterMode] = useState<SpaceMode | "Todos">("Todos");

  const allSpaces = useMemo(
    () => [...mySpaces, ...communitySpaces],
    []
  );

  const filteredMySpaces =
    filterMode === "Todos"
      ? mySpaces
      : mySpaces.filter((s) => s.mode === filterMode);
  const filteredCommunitySpaces =
    filterMode === "Todos"
      ? communitySpaces
      : communitySpaces.filter((s) => s.mode === filterMode);

  const paidExamplePrice = 5; // para simulador
  const paidExampleAttendees = 100;
  const creatorRevenue = paidExamplePrice * paidExampleAttendees * (1 - tamvEntryCommission);
  const tamvRevenue = paidExamplePrice * paidExampleAttendees * tamvEntryCommission;

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
                <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                  DreamSpaces
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Mundos oníricos personales donde vives, creas, expones y recibes
                  a tu comunidad. TAMV vende las plantillas, muebles, skins y
                  módulos XR; tú decides si abres la puerta gratis o con ticket.
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Crear nuevo DreamSpace
              </Button>
            </div>

            {/* Aviso de modelo económico */}
            <Card className="glass border border-border/60 p-4 flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Modelo económico de DreamSpaces
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Todos los ítems de personalización (plantillas, muebles, skins,
                efectos, módulos especiales) son diseñados y vendidos
                exclusivamente por TAMV, que recibe el 100% del ingreso de esas
                compras. Cada DreamSpace adicional más allá del primero tiene un
                costo mínimo de desbloqueo, y si cobras entrada a tu DreamSpace,
                TAMV obtiene una comisión del 25% de cada ticket vendido.
              </p>
            </Card>

            {/* Controles / filtros */}
            <Card className="glass border border-border/60 p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Modos de DreamSpace
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Alterna entre espacios Personales, Sociales y de Evento. Cada
                modo ajusta aforo, widgets activos y opciones de monetización
                (tickets, pases, experiencias privadas).
              </p>
              <div className="flex flex-wrap gap-1">
                {["Todos", "Personal", "Social", "Evento"].map((m) => (
                  <Button
                    key={m}
                    size="sm"
                    variant={filterMode === m ? "default" : "outline"}
                    className="text-xs"
                    onClick={() => setFilterMode(m as SpaceMode | "Todos")}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Tienda de bundles TAMV */}
            <Card className="glass border border-cyan-400/40 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-cyan-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Bundles de plantillas y personalización TAMV
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                TAMV ofrece bundles curados para llevar tu DreamSpace de un
                lienzo vacío a un estudio creativo o venue sensorial completo.
                Todas las compras en esta tienda son emitidas por TAMV y generan
                el 100% del ingreso para la plataforma.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storeBundles.map((bundle) => (
                  <Card
                    key={bundle.id}
                    className="glass border border-border/60 p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold flex items-center gap-1">
                          <LayoutTemplate className="w-4 h-4 text-primary" />
                          {bundle.name}
                        </span>
                        <Badge
                          className={
                            bundle.tag === "Venue"
                              ? "bg-fuchsia-600/90"
                              : bundle.tag === "Creator"
                              ? "bg-cyan-600/90"
                              : "bg-emerald-600/90"
                          }
                        >
                          {bundle.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {bundle.description}
                      </p>
                      <ul className="text-[11px] text-muted-foreground list-disc list-inside">
                        {bundle.contents.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="font-semibold">
                        ${bundle.priceUSD.toFixed(2)} USD
                      </span>
                      <Button size="sm" variant="outline">
                        Comprar bundle
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Bloque de DreamSpaces adicionales */}
            <Card className="glass border border-emerald-400/40 p-4 flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Desbloqueo de DreamSpaces adicionales
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Cada usuario incluye un DreamSpace base. Para evitar creación
                masiva sin sentido de espacios abandonados, cada DreamSpace
                adicional requiere un desbloqueo con un costo mínimo de{" "}
                {extraSpaceUnlockPrice.toFixed(2)} USD. Esto incentiva espacios
                cuidados, con propósito y curaduría.
              </p>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <span>
                  • DreamSpace base: 1 incluido.
                </span>
                <span>
                  • DreamSpaces extra: {extraSpaceUnlockPrice.toFixed(2)} USD
                  c/u.
                </span>
              </div>
            </Card>

            {/* Bloque de entradas y simulador de ingresos */}
            <Card className="glass border border-fuchsia-400/40 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-fuchsia-300" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Cobro de entrada y simulador de ingresos
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Puedes convertir un DreamSpace en venue de paga para eventos,
                exhibiciones privadas, meetups o experiencias XR. Tú decides el
                precio; TAMV gestiona la infraestructura y cobra una comisión del
                25% por ticket, mientras tú recibes el 75% en Banco/Wallet TAMV.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <Card className="glass border border-border/60 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart2 className="w-4 h-4 text-primary" />
                    <span className="font-semibold">
                      Ejemplo de cálculo rápido
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Si cobras <strong>${paidExamplePrice}</strong> USD y entran{" "}
                    <strong>{paidExampleAttendees}</strong> personas:
                  </p>
                  <p className="mt-1">
                    • Tú recibes aprox.{" "}
                    <strong>${creatorRevenue.toFixed(2)}</strong> USD.
                  </p>
                  <p>
                    • TAMV recibe aprox.{" "}
                    <strong>${tamvRevenue.toFixed(2)}</strong> USD.
                  </p>
                </Card>
                <Card className="glass border border-border/60 p-3">
                  <p className="text-muted-foreground">
                    Puedes usar modelos de acceso:
                  </p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Entrada única por evento.</li>
                    <li>Pases de temporada a un DreamSpace.</li>
                    <li>Bundles: acceso + grabación o contenido extra.</li>
                  </ul>
                </Card>
                <Card className="glass border border-border/60 p-3">
                  <p className="text-muted-foreground">
                    TAMV puede destacar DreamSpaces con buena curaduría,
                    asistencia y experiencia sensorial, potenciando tus
                    posibilidades de monetizar entradas de forma sostenida.
                  </p>
                </Card>
              </div>
            </Card>

            {/* Tus DreamSpaces */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Tus DreamSpaces
              </h2>
              <p className="text-sm text-muted-foreground">
                Gestiona tus mundos personales, sociales y de evento. Ajusta
                el modo, el aforo, los módulos activos y si cobras o no entrada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMySpaces.map((space) => (
                <Card
                  key={space.id}
                  className="glass overflow-hidden hover:shadow-[0_0_24px_rgba(56,189,248,0.45)] hover:-translate-y-1 transition-all group cursor-pointer border border-border/60"
                >
                  <div className="relative aspect-square">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Entrar a tu DreamSpace
                      </Button>
                    </div>

                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge className="bg-slate-900/80 border border-white/10 text-[11px] flex items-center gap-1">
                        <Cloud className="w-3 h-3" />
                        {space.mode}
                      </Badge>
                      <Badge className="bg-slate-900/80 border border-white/10 text-[11px]">
                        Nivel {space.level} · Aforo {space.capacity}
                      </Badge>
                    </div>

                    {space.isPaidEntry && space.entryPriceUSD && (
                      <Badge className="absolute top-3 right-3 bg-fuchsia-600/95 text-[11px] flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Entrada · ${space.entryPriceUSD.toFixed(2)}
                      </Badge>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold leading-tight">
                          {space.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          por {space.creator}
                        </p>
                      </div>
                      <Edit3 className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {space.visits.toLocaleString("es-MX")} visitas
                        </span>
                      </div>
                      <span className="text-xs">{space.status}</span>
                    </div>

                    {space.widgets.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {space.widgets.slice(0, 3).map((w, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-primary/5 text-muted-foreground"
                          >
                            {w}
                          </span>
                        ))}
                        {space.widgets.length > 3 && (
                          <span className="text-[11px] text-muted-foreground">
                            +{space.widgets.length - 3} módulos
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs"
                      >
                        <Edit3 className="w-3 h-3" />
                        Editar DreamSpace
                      </Button>
                      {space.isPaidEntry && space.entryPriceUSD ? (
                        <div className="text-[11px] text-muted-foreground text-right">
                          <p>
                            Ticket: ${space.entryPriceUSD.toFixed(2)} USD
                          </p>
                          <p>Comisión TAMV 25%</p>
                        </div>
                      ) : (
                        <div className="text-[11px] text-muted-foreground text-right">
                          <p>Entrada libre (free)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* DreamSpaces destacados de la comunidad */}
            <div className="space-y-3 pb-10">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                DreamSpaces destacados de la comunidad
              </h2>
              <p className="text-sm text-muted-foreground">
                Explora espacios de otros usuarios que han llevado su diseño,
                curaduría y experiencia sensorial a otro nivel.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunitySpaces.map((space) => (
                  <Card
                    key={space.id}
                    className="glass overflow-hidden hover:shadow-[0_0_24px_rgba(129,140,248,0.45)] hover:-translate-y-1 transition-all group cursor-pointer border border-border/60"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" className="gap-2">
                          <Sparkles className="w-4 h-4" />
                          Explorar espacio
                        </Button>
                      </div>

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className="bg-slate-900/80 border border-white/10 text-[11px] flex items-center gap-1">
                          <Cloud className="w-3 h-3" />
                          {space.mode}
                        </Badge>
                        <Badge className="bg-slate-900/80 border border-white/10 text-[11px]">
                          Nivel {space.level} · Aforo {space.capacity}
                        </Badge>
                      </div>

                      {space.isPaidEntry && space.entryPriceUSD && (
                        <Badge className="absolute top-3 right-3 bg-fuchsia-600/95 text-[11px] flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Entrada · ${space.entryPriceUSD.toFixed(2)}
                        </Badge>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold leading-tight">
                            {space.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            por {space.creator}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {space.visits.toLocaleString("es-MX")} visitas
                          </span>
                        </div>
                        <span className="text-xs">{space.status}</span>
                      </div>

                      {space.widgets.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {space.widgets.slice(0, 3).map((w, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-0.5 rounded-full bg-primary/5 text-muted-foreground"
                            >
                              {w}
                            </span>
                          ))}
                          {space.widgets.length > 3 && (
                            <span className="text-[11px] text-muted-foreground">
                              +{space.widgets.length - 3} módulos
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
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

export default DreamSpaces;
