import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gavel, Clock, TrendingUp } from "lucide-react";
import auctionBg from "@/assets/auction-background.jpg";

const Auctions = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("auctions");

  const auctions = [
    { id: 1, title: "NFT Arte Digital Exclusivo", currentBid: 5.2, bids: 23, timeLeft: "2h 34m", image: auctionBg },
    { id: 2, title: "Avatar Premium Personalizado", currentBid: 3.8, bids: 15, timeLeft: "5h 12m", image: auctionBg },
    { id: 3, title: "Espacio Virtual Único", currentBid: 12.5, bids: 47, timeLeft: "1h 05m", image: auctionBg },
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
              <h1 className="text-4xl font-bold mb-2 neon-glow-purple">Subastas</h1>
              <p className="text-muted-foreground">Puja por activos digitales exclusivos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <Card key={auction.id} className="glass overflow-hidden hover:shadow-neon-purple transition-all">
                  <div className="relative aspect-square">
                    <img src={auction.image} alt={auction.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-4 right-4 bg-red-500 animate-pulse">
                      <Clock className="w-3 h-3 mr-1" />
                      {auction.timeLeft}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">{auction.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Puja actual</span>
                      <span className="text-2xl font-bold text-primary">{auction.currentBid} ETH</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                      <TrendingUp className="w-4 h-4" />
                      <span>{auction.bids} pujas</span>
                    </div>
                    <Button className="w-full gap-2">
                      <Gavel className="w-4 h-4" />
                      Hacer Oferta
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
