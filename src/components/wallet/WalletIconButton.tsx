import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import { BancoTAMVPanel } from "./BancoTAMVPanel";

export const WalletIconButton = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const balance = { TAMV: 12500, USD: 450.00 };

  return (
    <>
      <Button
        id="tamv-wallet"
        variant="ghost"
        size="sm"
        onClick={() => setIsPanelOpen(true)}
        className="relative gap-2"
      >
        <Wallet className="w-5 h-5" />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-[10px] text-muted-foreground leading-none">
            Wallet TAMV
          </span>
          <span className="text-xs font-semibold leading-none mt-0.5">
            {balance.TAMV.toLocaleString()} TAMV
          </span>
        </div>
        <Badge variant="secondary" className="absolute -top-1 -right-1 text-[9px] px-1 py-0">
          {balance.USD.toFixed(0)} USD
        </Badge>
      </Button>

      <BancoTAMVPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        balance={balance}
      />
    </>
  );
};
