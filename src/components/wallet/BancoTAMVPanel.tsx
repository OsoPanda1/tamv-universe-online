import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  CreditCard,
  Settings,
  TrendingUp,
} from "lucide-react";

interface BancoTAMVPanelProps {
  isOpen: boolean;
  onClose: () => void;
  balance: {
    TAMV: number;
    USD: number;
  };
}

export const BancoTAMVPanel = ({ isOpen, onClose, balance }: BancoTAMVPanelProps) => {
  const transactions = [
    {
      id: "1",
      type: "mint",
      amount: 500,
      currency: "TAMV",
      description: "Recompensa por reto completado",
      date: "2025-11-27",
    },
    {
      id: "2",
      type: "purchase",
      amount: -25,
      currency: "USD",
      description: "Compra de accesorio digital",
      date: "2025-11-26",
    },
    {
      id: "3",
      type: "transfer",
      amount: 1000,
      currency: "TAMV",
      description: "Venta de contenido",
      date: "2025-11-25",
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Banco TAMV
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Saldo principal */}
          <Card className="glass border border-primary/40 p-6 bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
            <div className="text-sm text-muted-foreground mb-1">Saldo total</div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-black text-primary">
                {balance.TAMV.toLocaleString()}
              </span>
              <span className="text-lg font-semibold">TAMV</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-muted-foreground">Equivalente:</span>
              <span className="font-semibold">${balance.USD.toFixed(2)} USD</span>
            </div>
          </Card>

          {/* Acciones rápidas */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="gap-2">
              <ArrowDownLeft className="w-4 h-4" />
              Depositar
            </Button>
            <Button variant="outline" className="gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Retirar
            </Button>
          </div>

          {/* Tarjeta virtual */}
          <Card className="glass border border-border/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">Tarjeta Digital TAMV</span>
              </div>
              <Badge variant="secondary" className="text-xs">Básica</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Personaliza tu tarjeta digital por $9.99 USD o mejora a Elite ($29.99 USD) con privilegios exclusivos.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Personalizar tarjeta
            </Button>
          </Card>

          <Separator />

          {/* Historial de transacciones */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <History className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Historial reciente</h3>
            </div>

            <div className="space-y-2">
              {transactions.map((tx) => (
                <Card key={tx.id} className="glass border border-border/60 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-0.5">
                        {tx.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          tx.amount > 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount} {tx.currency}
                      </p>
                      <Badge variant="secondary" className="text-[10px] mt-1">
                        {tx.type}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Panel de creadores */}
          <Card className="glass border border-border/60 p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Panel de Creadores</span>
              <Badge className="bg-yellow-600/90 ml-auto">Premium</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Accede a estadísticas avanzadas, herramientas de monetización y beneficios exclusivos.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Ver panel completo
            </Button>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
