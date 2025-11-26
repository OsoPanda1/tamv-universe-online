import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Users,
  Radio,
  Music,
  Star,
  Moon,
  Gavel,
  Store,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Waves,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSectionChange: (section: string) => void;
}

const LeftSidebar = ({ isOpen, onToggle, onSectionChange }: LeftSidebarProps) => {
  const mainSections = [
    { icon: Home, label: "Feed Principal", section: "feed", badge: null },
    { icon: Users, label: "Grupos", section: "groups", badge: "12" },
    { icon: Radio, label: "Canales", section: "channels", badge: "5" },
    { icon: Music, label: "Conciertos Sensoriales", section: "concerts", badge: "Live" },
  ];

  const specialSections = [
    { icon: Moon, label: "Dream Spaces", section: "dreams" },
    { icon: Gavel, label: "Subastas", section: "auctions" },
    { icon: Store, label: "Marketplaces", section: "marketplace" },
    { icon: Sparkles, label: "Puestos Oníricos", section: "oneiric" },
    { icon: Waves, label: "KAOS System", section: "kaos" },
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] glass border-r border-border transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-card border border-border hover:bg-primary/10 z-50"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        <ScrollArea className="h-full px-2 py-4">
          {/* Main Sections */}
          <div className="space-y-1">
            {mainSections.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                onClick={() => onSectionChange(item.section)}
                className={`w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition-colors ${
                  !isOpen && "justify-center"
                }`}
              >
                <item.icon className={`${isOpen ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`} />
                {isOpen && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={item.badge === "Live" ? "destructive" : "secondary"}
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            ))}
          </div>

          {isOpen && (
            <>
              <Separator className="my-4" />

              {/* Special Sections */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold text-muted-foreground mb-2">
                  EXPERIENCIAS
                </p>
                {specialSections.map((item) => (
                  <Button
                    key={item.section}
                    variant="ghost"
                    onClick={() => onSectionChange(item.section)}
                    className="w-full justify-start gap-3 hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  </Button>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Status Card */}
              <div className="px-3 py-3 rounded-lg bg-gradient-glow border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold">Membresía Premium</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Acceso a todas las funciones exclusivas
                </p>
                <Button size="sm" className="w-full bg-gradient-primary hover:opacity-90">
                  Mejorar Plan
                </Button>
              </div>
            </>
          )}
        </ScrollArea>
      </aside>

      {/* Spacer to prevent content overlap */}
      <div className={`transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`} />
    </>
  );
};

export default LeftSidebar;
