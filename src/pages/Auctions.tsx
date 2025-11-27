import { useState, useMemo } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gavel,
  Clock,
  TrendingUp,
  Flame,
  Filter,
  ChevronDown,
  User,
  Star,
  Trophy,
  ArrowUpRight,
  Coins,
} from "lucide-react";
import auctionBg from "@/assets/auction-background.jpg";

type AuctionType = "english" | "dutch" | "fixed";

interface AuctionItem {
  id: number;
  title: string;
  creator: string;
  creatorAvatar?: string;
  category: "Arte" | "Avatares" | "Espacios" | "Experiencias" | "Servicios";
  currentBid: number;
  startingBid: number;
  minIncrement: number;
  currency: "ETH" | "TAMV";
  bids: number;
  timeLeft: string; // simplificado; ideal: timestamp
  type: AuctionType;
  isHot: boolean;
  isNew: boolean;
  image: string;
}

const mockAuctions: AuctionItem[] = [
  {
    id: 1,
    title: "NFT Arte Digital Exclusivo · Aurora Sensorial",
    creator: "Isabella Studio",
    category: "Arte",
    currentBid: 5.2,
    startingBid: 1.0,
    minIncrement: 0.1,
    currency: "ETH",
    bids: 23,
    timeLeft: "2h 34m",
    type: "english",
    isHot: true,
    isNew: false,
    image: auctionBg,
  },
  {
    id: 2,
    title: "Avatar Premium Personalizado · Neo Jaguar",
    creator: "TAMV Avatars Lab",
    category: "Avatares",
    currentBid: 3.8,
    startingBid: 0.5,
    minIncrement: 0.05,
    currency: "TAMV",
    bids: 15,
    timeLeft: "5h 12m",
    type: "english",
    isHot: false,
    isNew: true,
    image: auctionBg,
  },
  {
    id: 3,
    title: "Espacio Virtual Único · Puente Onírico",
    creator: "Metaverse Builders MX",
    category: "Espacios",
    currentBid: 12.5,
    startingBid: 4.0,
    minIncrement: 0.25,
    currency: "ETH",
    bids: 47,
    timeLeft: "1h 05m",
    type: "english",
    isHot: true,
    isNew: true,
    image: auctionBg,
  },
];

const Auctions = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("auctions");

  const [selectedCategory, setSelectedCategory] = useState<
    AuctionItem["category"] | "Todas"
  >("Todas");
  const [sortBy, setSortBy] = useState<
    "mostRecent" | "endingSoon" | "mostBids" | "highestBid"
  >("endingSoon");

  const [walletBalance] = useState({
    TAMV: 12500,
    ETH: 3.42,
  });

  const filteredAuctions = useMemo(() => {
    let list = [...mockAuctions];

    if (selectedCategory !== "Todas") {
      list = list.filter((a) => a.category === selectedCategory);
    }

    switch (sortBy) {
      case "mostBids":
        list.sort((a, b) => b.bids - a.bids);
        break;
      case "highestBid":
        list.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "mostRecent":
        list.sort((a, b) => a.id - b.id);
        break;
      case "endingSoon":
      default:
        list.sort((a, b) => a.timeLeft.localeCompare(b.timeLeft));
        break;
    }

    return list;
  }, [selectedCategory, sortBy]);

  const getActivityLabel = (auction: AuctionItem) => {
    if (auction.isHot && auction.bids > 30) return "Muy activa";
    if (auction.isNew) return "Nueva";
    if (auction.bids < 5) return "Calentando";
    return "En curso";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background text-foreground overflow-hidden">
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
            {/* Header + Wallet resumen */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  Subastas
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Puja por activos digitales y espacios únicos dentro del
                  ecosistema TAMV. Cada oferta mueve tu historia creativa y tu
                  economía interna.
                </p>
              </div>

              <Card className="glass px-4 py-3 flex items-center gap-4 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Wallet TAMV
                  </span>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="block text-xs text-muted-foreground">
                      Saldo TAMV
                    </span>
                    <span className="font-semibold">
                      {walletBalance.TAMV.toLocaleString("es-MX")} TAMV
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">
                      Saldo ETH
                    </span>
                    <span className="font-semibold">
                      {walletBalance.ETH} ETH
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Ir a Banco TAMV
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </div>

            {/* Filtros y barra superior */}
            <Card className="glass border border-border/60 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Refinar subastas</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Categoría
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["Todas", "Arte", "Avatares", "Espacios", "Experiencias", "Servicios"].map(
                      (cat) => (
                        <Button
                          key={cat}
                          size="xs"
                          variant={
                            selectedCategory === cat ? "default" : "outline"
                          }
                          className="text-xs"
                          onClick={() =>
                            setSelectedCategory(
                              cat as AuctionItem["category"] | "Todas"
                            )
                          }
                        >
                          {cat}
                        </Button>
                      )
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Ordenar por
                  </span>
                  <Button
                    size="xs"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => {
                      const order: typeof sortBy[] = [
                        "endingSoon",
                        "mostBids",
                        "highestBid",
                        "mostRecent",
                      ];
                      const idx = order.indexOf(sortBy);
                      setSortBy(order[(idx + 1) % order.length]);
                    }}
                  >
                    {sortBy === "endingSoon" && "Termina antes"}
                    {sortBy === "mostBids" && "Más pujas"}
                    {sortBy === "highestBid" && "Mayor puja"}
                    {sortBy === "mostRecent" && "Más reciente"}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Gamificación ligera / resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass border border-emerald-400/40 p-4 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-emerald-300" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Liga de postores
                  </p>
                  <p className="text-sm">
                    Sube en el ranking participando en subastas activas y gana
                    badges exclusivos TAMV.
                  </p>
                </div>
              </Card>
              <Card className="glass border border-fuchsia-400/30 p-4 flex items-center gap-3">
                <Flame className="w-6 h-6 text-fuchsia-300" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Subastas en tendencia
                  </p>
                  <p className="text-sm">
                    Descubre los activos con más pujas y la energía creativa más
                    alta del momento.
                  </p>
                </div>
              </Card>
              <Card className="glass border border-sky-400/30 p-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-sky-300" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Tiempo real
                  </p>
                  <p className="text-sm">
                    Las pujas se actualizan en vivo para que nunca te quedes
                    atrás en la última oferta.
                  </p>
                </div>
              </Card>
            </div>

            {/* Grid de subastas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              {filteredAuctions.map((auction) => (
                <Card
                  key={auction.id}
                  className="glass overflow-hidden hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:-translate-y-1 transition-all duration-300 border border-border/60"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={auction.image}
                      alt={auction.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {auction.isHot && (
                        <Badge className="bg-red-500/90 text-xs gap-1">
                          <Flame className="w-3 h-3" />
                          En fuego
                        </Badge>
                      )}
                      {auction.isNew && (
                        <Badge className="bg-emerald-500/90 text-xs">
                          Nuevo
                        </Badge>
                      )}
                    </div>
                    <Badge className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-xs gap-1 border border-white/10">
                      <Clock className="w-3 h-3" />
                      {auction.timeLeft}
                    </Badge>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {auction.category} ·{" "}
                          {auction.type === "english"
                            ? "Subasta tradicional"
                            : auction.type === "dutch"
                            ? "Subasta holandesa"
                            : "Precio fijo"}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {getActivityLabel(auction)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                        {auction.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold text-white">
                          {auction.creator
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Creador
                            </span>
                          </div>
                          <p className="text-xs font-medium">
                            {auction.creator}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/10"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                            Puja actual
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {auction.currentBid} {auction.currency}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                            Desde
                          </span>
                          <span className="text-sm font-medium">
                            {auction.startingBid} {auction.currency}
                          </span>
                          <p className="text-[11px] text-muted-foreground">
                            + min. {auction.minIncrement} {auction.currency}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{auction.bids} pujas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          <span>Liga TAMV: suma puntos al pujar</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full gap-2 mt-1">
                      <Gavel className="w-4 h-4" />
                      Hacer oferta ahora
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

export default Auctions;
