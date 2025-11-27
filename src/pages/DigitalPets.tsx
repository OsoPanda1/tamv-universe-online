import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Sparkles,
  Play,
  Plus,
  Crown,
  Stars,
  Users,
  Store,
  Tag,
  ArrowRightLeft,
  Info,
} from "lucide-react";
import digitalPetImg from "@/assets/digital-pet.jpg";
import anubisImg from "@/assets/anubis-pet.jpg";

type UserArchetype = "Normal" | "Creador" | "Tecnológico" | "Meme";

interface Pet {
  id: number;
  name: string;
  type: string;
  archetype: UserArchetype;
  rarity: "Común" | "Rara" | "Épica";
  happiness: number;
  energy: number;
  image: string;
}

interface Accessory {
  id: number;
  name: string;
  type: "Skin" | "Accesorio" | "Animación" | "Hábitat";
  rarity: "Común" | "Raro" | "Épico";
  priceUSD: number;
}

interface UserAccessoryListing {
  id: number;
  accessory: Accessory;
  sellerName: string;
  priceUSD: number;
}

const basePets: Pet[] = [
  {
    id: 1,
    name: "Spark",
    type: "Zorro Digital",
    archetype: "Normal",
    rarity: "Común",
    happiness: 85,
    energy: 70,
    image: digitalPetImg,
  },
  {
    id: 2,
    name: "Neo",
    type: "Gato Cyber",
    archetype: "Tecnológico",
    rarity: "Rara",
    happiness: 92,
    energy: 60,
    image: digitalPetImg,
  },
];

const tamvAccessories: Accessory[] = [
  {
    id: 1,
    name: "Aura Neón Pulsante",
    type: "Skin",
    rarity: "Épico",
    priceUSD: 14.99,
  },
  {
    id: 2,
    name: "Collar Holográfico",
    type: "Accesorio",
    rarity: "Raro",
    priceUSD: 4.99,
  },
  {
    id: 3,
    name: "Animación · Entrada Estelar",
    type: "Animación",
    rarity: "Épico",
    priceUSD: 9.99,
  },
  {
    id: 4,
    name: "Hábitat · Nexus Lumínico",
    type: "Hábitat",
    rarity: "Épico",
    priceUSD: 19.99,
  },
];

const userMarketListings: UserAccessoryListing[] = [
  {
    id: 1,
    accessory: tamvAccessories[1],
    sellerName: "@creator_mx",
    priceUSD: 6.5,
  },
  {
    id: 2,
    accessory: tamvAccessories[0],
    sellerName: "@dev_tamv",
    priceUSD: 18,
  },
];

const DigitalPets = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("pets");

  const [filterArchetype, setFilterArchetype] = useState<
    UserArchetype | "Todos"
  >("Todos");

  const pets = basePets.filter(
    (p) => filterArchetype === "Todos" || p.archetype === filterArchetype
  );

  // Datos del Anubis épico
  const anubisBasePrice = 399; // USD
  const anubisAuction = {
    status: "active" as "active" | "upcoming" | "ended",
    nextBirthInDays: 47, // cada 2–3 meses “nace” un nuevo Anubis
    currentBidUSD: 812,
    minBidUSD: anubisBasePrice,
    timeLeft: "3d 12h 08m",
  };

  const platformCommissionSecondary = 0.25; // 25% en mercado entre usuarios

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
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Mascotas Digitales TAMV
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Compañeros virtuales oficiales del metaverso TAMV. Todas las
                  mascotas, accesorios y personalizaciones son diseñados,
                  registrados y vendidos exclusivamente por TAMV.
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Adoptar Mascota
              </Button>
            </div>

            {/* Aviso de modelo económico */}
            <Card className="glass border border-border/60 p-4 flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Modelo económico de la sección Mascotas
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Todas las ventas de mascotas, accesorios, distintivos y packs de
                personalización son operadas directamente por TAMV, que absorbe
                el 100% del ingreso de estas compras. Los usuarios pueden
                intercambiar o revender accesorios entre sí; cada transacción
                entre usuarios genera una comisión del 25% a favor de TAMV.
              </p>
            </Card>

            {/* Banner de tipos / arquetipos */}
            <Card className="glass border border-border/60 p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Familias de mascotas por tipo de usuario
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Las mascotas se inspiran en categorías internas: usuario normal
                (compañeros equilibrados), creadores (mascotas ligadas a arte y
                contenido), usuarios tecnológicos (criaturas de código y
                circuitos) y usuarios meme (mascotas exageradas y cómicas).
              </p>
              <div className="flex flex-wrap gap-1">
                {["Todos", "Normal", "Creador", "Tecnológico", "Meme"].map(
                  (arc) => (
                    <Button
                      key={arc}
                      size="xs"
                      variant={
                        filterArchetype === arc ? "default" : "outline"
                      }
                      className="text-xs"
                      onClick={() =>
                        setFilterArchetype(arc as UserArchetype | "Todos")
                      }
                    >
                      {arc}
                    </Button>
                  )
                )}
              </div>
            </Card>

            {/* Bloque especial ANUBIS épico */}
            <Card className="glass border border-fuchsia-500/60 p-5 grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-5">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={anubisImg}
                  alt="Anubis · Edición Fundador"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-fuchsia-600/95 flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Mascota Épica Ultra Rara
                </Badge>
                <Badge className="absolute top-3 right-3 bg-slate-900/80 border border-white/10 text-[11px] flex items-center gap-1">
                  Próxima generación en {anubisAuction.nextBirthInDays} días
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Anubis · Edición Fundador
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    La primera mascota digital que nacerá en el TAMV y que
                    acompañará a Isabella IA en todo su viaje. Figura
                    extremadamente exclusiva que representa la vida e historia
                    fundacional del ecosistema y actúa como guardián entre
                    mundos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                      Precio base de subasta
                    </span>
                    <p className="text-lg font-semibold">
                      ${anubisBasePrice} USD
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Cada 2–3 meses “nace” un nuevo Anubis. La subasta inicia
                      siempre en {anubisBasePrice} USD y el precio final lo
                      define la puja más alta.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                      Estado actual de subasta
                    </span>
                    <p className="text-lg font-semibold">
                      Oferta actual: ${anubisAuction.currentBidUSD.toFixed(0)} USD
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Mínimo para pujar: ${anubisAuction.minBidUSD} USD · Tiempo
                      restante: {anubisAuction.timeLeft}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground">
                  Esta subasta es operada directamente por TAMV, que recibe el
                  100% del valor final pagado por cada Anubis. El ganador
                  obtiene la propiedad de la mascota épica vinculada a su
                  identidad TAMV.
                </div>

                <Button
                  className="w-full gap-2"
                  disabled={anubisAuction.status !== "active"}
                >
                  <Stars className="w-4 h-4" />
                  {anubisAuction.status === "active"
                    ? "Pujar por Anubis"
                    : "Subasta aún no disponible"}
                </Button>
              </div>
            </Card>

            {/* Tus mascotas */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Stars className="w-5 h-5 text-primary" />
                Tus mascotas digitales
              </h2>
              <p className="text-sm text-muted-foreground">
                Cuida, juega y evoluciona tus compañeros virtuales. Su felicidad
                y energía reaccionan a tu actividad en el ecosistema TAMV:
                conciertos, espacios, retos y colaboraciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <Card
                  key={pet.id}
                  className="glass overflow-hidden border border-border/60"
                >
                  <div className="relative aspect-square">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge className="bg-slate-900/80 border border-white/10 text-[11px]">
                        {pet.archetype}
                      </Badge>
                      <Badge
                        className={
                          pet.rarity === "Épica"
                            ? "bg-fuchsia-600/90"
                            : pet.rarity === "Rara"
                            ? "bg-cyan-600/90"
                            : "bg-emerald-600/90"
                        }
                      >
                        {pet.rarity}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">
                          {pet.name}
                        </h3>
                        <p className="text-primary text-sm">{pet.type}</p>
                      </div>
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Felicidad
                          </span>
                          <span className="text-sm font-semibold">
                            {pet.happiness}%
                          </span>
                        </div>
                        <Progress value={pet.happiness} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Energía
                          </span>
                          <span className="text-sm font-semibold">
                            {pet.energy}%
                          </span>
                        </div>
                        <Progress value={pet.energy} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="gap-2 text-xs">
                        <Heart className="w-4 h-4" />
                        Acariciar
                      </Button>
                      <Button variant="outline" className="gap-2 text-xs">
                        <Sparkles className="w-4 h-4" />
                        Alimentar
                      </Button>
                      <Button variant="outline" className="gap-2 text-xs">
                        <Play className="w-4 h-4" />
                        Jugar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Tienda oficial de accesorios TAMV */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Store className="w-5 h-5 text-primary" />
                Tienda oficial de accesorios TAMV
              </h2>
              <p className="text-sm text-muted-foreground">
                Solo los accesorios creados, registrados y generados por TAMV son
                compatibles con las mascotas digitales. Todas las compras en esta
                tienda se facturan directamente por TAMV, que recibe el 100% del
                ingreso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {tamvAccessories.map((acc) => (
                <Card
                  key={acc.id}
                  className="glass border border-border/60 p-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {acc.name}
                      </span>
                      <Badge
                        className={
                          acc.rarity === "Épico"
                            ? "bg-fuchsia-600/90"
                            : acc.rarity === "Raro"
                            ? "bg-cyan-600/90"
                            : "bg-emerald-600/90"
                        }
                      >
                        {acc.rarity}
                      </Badge>
                    </div>
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {acc.type}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-semibold">
                      ${acc.priceUSD.toFixed(2)} USD
                    </span>
                    <Button size="sm" variant="outline">
                      Comprar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Packs de personalización */}
            <Card className="glass border border-primary/40 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Packs de personalización avanzada
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Personaliza aún más la apariencia y el aura de tus mascotas con
                packs de personalización. Los rangos típicos van de 2.99 USD a
                19.99 USD según complejidad y rareza del pack; todos son emitidos
                y vendidos directamente por TAMV.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge className="bg-emerald-600/80">
                  Pack Básico · 2.99 USD
                </Badge>
                <Badge className="bg-cyan-600/80">
                  Pack Intermedio · 7.99 USD
                </Badge>
                <Badge className="bg-fuchsia-600/80">
                  Pack Épico · 19.99 USD
                </Badge>
              </div>
            </Card>

            {/* Mercado entre usuarios */}
            <div className="space-y-3 pb-10">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                Mercado entre usuarios (accesorios)
              </h2>
              <p className="text-sm text-muted-foreground">
                Puedes intercambiar o vender accesorios TAMV que ya poseas a
                otros usuarios. Cada venta entre usuarios genera una comisión del{" "}
                {platformCommissionSecondary * 100}% para TAMV sobre el valor
                total de la transacción.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userMarketListings.map((listing) => (
                  <Card
                    key={listing.id}
                    className="glass border border-border/60 p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {listing.accessory.name}
                        </span>
                        <Badge
                          className={
                            listing.accessory.rarity === "Épico"
                              ? "bg-fuchsia-600/90"
                              : listing.accessory.rarity === "Raro"
                              ? "bg-cyan-600/90"
                              : "bg-emerald-600/90"
                          }
                        >
                          {listing.accessory.rarity}
                        </Badge>
                      </div>
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {listing.accessory.type}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Vendedor: {listing.sellerName}
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>
                        Precio: ${listing.priceUSD.toFixed(2)} USD · Comisión TAMV:{" "}
                        {(listing.priceUSD * platformCommissionSecondary).toFixed(
                          2
                        )}{" "}
                        USD
                      </p>
                    </div>
                    <Button size="sm" className="mt-3">
                      Comprar accesorio
                    </Button>
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

export default DigitalPets;
