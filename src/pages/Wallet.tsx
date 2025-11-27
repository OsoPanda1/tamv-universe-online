import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet as WalletIcon, Send, Download, ArrowUpDown, TrendingUp } from "lucide-react";
import walletBg from "@/assets/wallet-background.jpg";

const Wallet = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("wallet");

  const transactions = [
    { id: 1, type: "receive", amount: 2.5, currency: "ETH", from: "Usuario123", date: "2025-11-26" },
    { id: 2, type: "send", amount: 0.8, currency: "ETH", to: "Usuario456", date: "2025-11-25" },
    { id: 3, type: "purchase", amount: 149.99, currency: "TAMV", item: "Avatar Premium", date: "2025-11-24" },
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
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 neon-glow-cyan">Billetera</h1>
              <p className="text-muted-foreground">Gestiona tus activos digitales</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="glass p-6 lg:col-span-2 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img src={walletBg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <WalletIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Balance Total</span>
                  </div>
                  <div className="text-5xl font-bold mb-2">12.487 <span className="text-2xl text-primary">ETH</span></div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">+5.2% esta semana</span>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-sm text-muted-foreground mb-4">Acciones Rápidas</h3>
                <div className="space-y-2">
                  <Button className="w-full justify-start gap-2">
                    <Send className="w-4 h-4" />
                    Enviar
                  </Button>
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <Download className="w-4 h-4" />
                    Recibir
                  </Button>
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <ArrowUpDown className="w-4 h-4" />
                    Intercambiar
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-6">Transacciones Recientes</h3>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "receive" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}>
                        {tx.type === "receive" ? (
                          <Download className="w-5 h-5 text-green-500" />
                        ) : (
                          <Send className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">
                          {tx.type === "receive" && `Recibido de ${tx.from}`}
                          {tx.type === "send" && `Enviado a ${tx.to}`}
                          {tx.type === "purchase" && `Compra: ${tx.item}`}
                        </p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === "receive" ? "text-green-500" : "text-red-500"}`}>
                        {tx.type === "receive" ? "+" : "-"}{tx.amount} {tx.currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
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

export default Wallet;
