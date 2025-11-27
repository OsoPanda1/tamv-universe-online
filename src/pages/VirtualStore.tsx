import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Heart } from "lucide-react";
import virtualStoreBg from "@/assets/virtual-store.jpg";

const VirtualStore = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("store");

  const products = [
    { id: 1, name: "Outfit Holográfico", price: 49.99, rating: 4.9, image: virtualStoreBg },
    { id: 2, name: "Accesorio Neon", price: 19.99, rating: 4.7, image: virtualStoreBg },
    { id: 3, name: "Skin Exclusivo", price: 34.99, rating: 4.8, image: virtualStoreBg },
    { id: 4, name: "Pack Premium", price: 99.99, rating: 5.0, image: virtualStoreBg },
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 holographic">Tienda Virtual</h1>
              <p className="text-muted-foreground">Personaliza tu experiencia en el metaverso</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="glass overflow-hidden hover:shadow-neon-cyan transition-all group">
                  <div className="relative aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/50 hover:bg-background/80"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      <Button size="sm" className="gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Añadir
                      </Button>
                    </div>
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

export default VirtualStore;
