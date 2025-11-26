import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Video,
  Phone,
  ChevronLeft,
  ChevronRight,
  Circle,
  Crown,
  Heart,
  TrendingUp,
} from "lucide-react";

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const RightSidebar = ({ isOpen, onToggle }: RightSidebarProps) => {
  const onlineUsers = [
    { id: 1, name: "Ana M.", avatar: null, status: "online", vip: true },
    { id: 2, name: "Carlos R.", avatar: null, status: "online", vip: false },
    { id: 3, name: "Diana L.", avatar: null, status: "online", vip: true },
    { id: 4, name: "Eduardo P.", avatar: null, status: "away", vip: false },
    { id: 5, name: "Fernanda S.", avatar: null, status: "online", vip: true },
  ];

  const trendingTopics = [
    { tag: "#DreamSpaces", posts: "2.5K" },
    { tag: "#TAMVConcierto", posts: "1.8K" },
    { tag: "#MetaversoLatino", posts: "1.2K" },
  ];

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className={`transition-all duration-300 ${isOpen ? "w-80" : "w-16"}`} />

      <aside
        className={`fixed right-0 top-16 h-[calc(100vh-64px)] glass border-l border-border transition-all duration-300 z-40 ${
          isOpen ? "w-80" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-card border border-border hover:bg-primary/10 z-50"
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>

        <ScrollArea className="h-full px-2 py-4">
          {isOpen ? (
            <>
              {/* Trending Topics */}
              <div className="mb-6">
                <div className="flex items-center gap-2 px-3 mb-3">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold">Tendencias</h3>
                </div>
                <div className="space-y-2">
                  {trendingTopics.map((topic) => (
                    <Button
                      key={topic.tag}
                      variant="ghost"
                      className="w-full justify-between hover:bg-accent/10"
                    >
                      <span className="text-accent font-medium">{topic.tag}</span>
                      <span className="text-xs text-muted-foreground">{topic.posts}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Online Users */}
              <div>
                <div className="flex items-center justify-between px-3 mb-3">
                  <h3 className="text-sm font-semibold">En Línea</h3>
                  <Badge variant="secondary">{onlineUsers.length}</Badge>
                </div>

                <div className="space-y-2">
                  {onlineUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10 border-2 border-primary/50">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <Circle
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${
                            user.status === "online"
                              ? "fill-green-500 text-green-500"
                              : "fill-yellow-500 text-yellow-500"
                          }`}
                        />
                        {user.vip && (
                          <Crown className="absolute -top-1 -right-1 w-4 h-4 text-accent" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.status === "online" ? "Activo ahora" : "Ausente"}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 hover:bg-primary/10 hover:text-primary"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 hover:bg-secondary/10 hover:text-secondary"
                        >
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Digital Pet Widget */}
              <div className="px-3 py-4 rounded-lg bg-gradient-glow border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Tu Mascota Digital</h3>
                  <Heart className="w-4 h-4 text-destructive fill-destructive" />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-4xl">🦊</span>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Luna</p>
                    <p className="text-xs text-muted-foreground">Nivel 12 • Feliz</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Interactuar
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // Collapsed State - Icon Only
            <div className="flex flex-col items-center gap-4 py-4">
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <TrendingUp className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" className="w-10 h-10">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-secondary text-xs">
                  {onlineUsers.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Heart className="w-5 h-5 text-destructive" />
              </Button>
            </div>
          )}
        </ScrollArea>
      </aside>
    </>
  );
};

export default RightSidebar;
