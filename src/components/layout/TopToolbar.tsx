import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Search,
  Menu,
  Video,
  Radio,
  ShoppingBag,
  Wallet,
  GraduationCap,
  Settings,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopToolbarProps {
  expanded: boolean;
  onToggleExpand: () => void;
  onSectionChange: (section: string) => void;
}

const TopToolbar = ({ expanded, onToggleExpand, onSectionChange }: TopToolbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    { icon: Video, label: "Lives", section: "lives", badge: "3" },
    { icon: Radio, label: "Streaming", section: "streaming" },
    { icon: ShoppingBag, label: "Store", section: "store" },
    { icon: Wallet, label: "Wallet", section: "wallet" },
    { icon: GraduationCap, label: "Universidad", section: "university" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      {/* Main Toolbar */}
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-bold holographic hidden sm:block">TAMV ONLINE</span>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en TAMV..."
              className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Center: Quick Actions */}
        <div className="hidden lg:flex items-center gap-2 mx-4">
          {quickActions.map((action) => (
            <Button
              key={action.section}
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onSectionChange(action.section)}
            >
              <action.icon className="w-5 h-5" />
              {action.badge && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-secondary text-xs">
                  {action.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Right: Profile & Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10"
          >
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-xs">
              12
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSectionChange("profile")}
            className="hover:bg-primary/10"
          >
            <User className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSectionChange("settings")}
            className="hover:bg-primary/10"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
            className="lg:hidden"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Expanded Mobile Menu */}
      {expanded && (
        <div className="lg:hidden border-t border-border p-4 animate-in slide-in-from-top">
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.section}
                variant="outline"
                onClick={() => {
                  onSectionChange(action.section);
                  onToggleExpand();
                }}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <action.icon className="w-5 h-5" />
                <span className="text-xs">{action.label}</span>
                {action.badge && (
                  <Badge className="mt-1 bg-secondary">{action.badge}</Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopToolbar;
