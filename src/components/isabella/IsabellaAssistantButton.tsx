import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { IsabellaChatModal } from "./IsabellaChatModal";

export const IsabellaAssistantButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all hover:scale-110"
      >
        <div className="relative">
          <Sparkles className="w-6 h-6" />
          <Badge className="absolute -top-2 -right-2 w-3 h-3 p-0 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </Button>

      <IsabellaChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
