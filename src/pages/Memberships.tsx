import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap } from "lucide-react";
import premiumBadge from "@/assets/premium-badge.jpg";

const Memberships = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("memberships");

  const tiers = [
    {
      id: 1,
      name: "Básico",
      price: "Gratis",
      features: ["Acceso al Feed", "1 Dream Space", "Chat básico", "5GB de almacenamiento"],
      icon: Zap,
      popular: false,
    },
    {
      id: 2,
      name: "Premium",
      price: "$9.99/mes",
      features: [
        "Todo lo de Básico",
        "Dream Spaces ilimitados",
        "Chat con Isabella IA",
        "100GB de almacenamiento",
        "Sin anuncios",
        "Acceso anticipado",
      ],
      icon: Crown,
      popular: true,
    },
    {
      id: 3,
      name: "Elite",
      price: "$29.99/mes",
      features: [
        "Todo lo de Premium",
        "Espacios VIP exclusivos",
        "Prioridad en conciertos",
        "1TB de almacenamiento",
        "Badge holográfico",
        "Soporte prioritario 24/7",
        "NFTs exclusivos mensuales",
      ],
      icon: Crown,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-2 holographic">Membresías</h1>
              <p className="text-muted-foreground">Elige el plan perfecto para tu experiencia en TAMV</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <Card
                    key={tier.id}
                    className={`glass overflow-hidden relative ${
                      tier.popular ? "border-2 border-primary shadow-neon-purple" : ""
                    }`}
                  >
                    {tier.popular && (
                      <Badge className="absolute top-4 right-4 bg-primary">Más Popular</Badge>
                    )}
                    <div className="p-8">
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-4xl font-bold mb-6">
                        {tier.price}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={tier.popular ? "default" : "outline"}
                      >
                        {tier.id === 1 ? "Empezar Gratis" : "Suscribirse"}
                      </Button>
                    </div>
                    {tier.id === 3 && (
                      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
                        <img src={premiumBadge} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
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

export default Memberships;
