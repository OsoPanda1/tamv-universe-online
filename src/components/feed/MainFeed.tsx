import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Video, FileText, Plus, Sparkles, Zap, Trophy, Target, Users, Wallet } from "lucide-react";
import PostCard from "./PostCard";
import VideoGrid from "./VideoGrid";
import PhotoGallery from "./PhotoGallery";
import { QALiveCard } from "@/components/home/QALiveCard";
import { RecommendedForYouCarousel } from "@/components/home/RecommendedForYouCarousel";
import { ChallengesSection } from "@/components/home/ChallengesSection";
import { DailyMissionWidget } from "@/components/home/DailyMissionWidget";
import { MonetizationOverviewSection } from "@/components/home/MonetizationOverviewSection";
import { PuentesOniricosPanel } from "@/components/puentes/PuentesOniricosPanel";
import { ReferralLeague } from "@/components/referrals/ReferralLeague";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QA_LIVE_EVENTS } from "@/data/qaEvents";
import { RECOMMENDATIONS } from "@/data/recommendations";
import { CHALLENGES } from "@/data/challenges";
import { REFERRAL_LEADERS } from "@/data/referrals";
import { matchCollaborators, MOCK_USERS } from "@/modules/puentesOniricos/matching";

interface MainFeedProps {
  activeSection: string;
}

const MainFeed = ({ activeSection }: MainFeedProps) => {
  const navigate = useNavigate();

  // Handle navigation to different sections
  const handleSectionNavigation = (section: string) => {
    const routes: Record<string, string> = {
      groups: "/groups",
      channels: "/channels",
      concerts: "/concerts",
      dreams: "/dreamspaces",
      auctions: "/auctions",
      marketplace: "/marketplaces",
      kaos: "/kaos",
      lives: "/lives",
      streaming: "/streaming",
      store: "/virtual-store",
      wallet: "/wallet",
      university: "/universidad",
      settings: "/settings",
      music: "/music",
    };

    if (routes[section]) {
      navigate(routes[section]);
    }
  };

  if (activeSection !== "feed") {
    // Navigate to appropriate route for non-feed sections
    handleSectionNavigation(activeSection);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center glass border-primary/20">
            <h2 className="text-2xl font-bold holographic mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-muted-foreground mb-6">
              Cargando experiencia inmersiva...
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6" data-tour-target="composer">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 glass border border-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Bienvenido al <span className="holographic">Metaverso TAMV</span>
              </h1>
              <p className="text-muted-foreground">
                Tu santuario digital de experiencias inmersivas, creatividad y conexión humana.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
                <Sparkles className="w-4 h-4" />
                Explorar
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Zap className="w-4 h-4" />
                Crear Contenido
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Conexiones", value: "2,458", color: "text-primary" },
            { icon: Trophy, label: "Logros", value: "24", color: "text-accent" },
            { icon: Target, label: "Misiones", value: "3/5", color: "text-secondary" },
            { icon: Wallet, label: "Balance", value: "$1,250", color: "text-emerald-400" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl glass border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Q&A Live Events */}
        <QALiveCard event={QA_LIVE_EVENTS[0] || null} />

        {/* Daily Mission Widget */}
        <DailyMissionWidget />

        {/* Recommendations Carousel */}
        <RecommendedForYouCarousel items={RECOMMENDATIONS} />

        {/* Create Post Card */}
        <Card className="p-4 glass border-primary/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">U</span>
            </div>
            <input
              type="text"
              placeholder="¿Qué estás pensando?"
              className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Foto</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-secondary/10 hover:text-secondary">
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Video</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10 hover:text-accent">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Post</span>
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </Card>

        {/* Challenges Section */}
        <ChallengesSection challenges={CHALLENGES} />

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6 glass">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary/20">Todo</TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-primary/20">Videos</TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-primary/20">Fotos</TabsTrigger>
            <TabsTrigger value="posts" className="data-[state=active]:bg-primary/20">Publicaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <PostCard
              author="María González"
              timestamp="Hace 2 horas"
              content="¡Increíble experiencia en el último concierto sensorial de TAMV! La tecnología y el arte se fusionaron perfectamente 🎵✨"
              likes={234}
              comments={45}
              shares={12}
            />
            <VideoGrid />
            <PostCard
              author="Carlos Ruiz"
              timestamp="Hace 5 horas"
              content="Nuevo proyecto en Dream Spaces disponible. ¿Quién se anima a colaborar? 🌙🎨"
              likes={189}
              comments={32}
              shares={8}
            />
            <PhotoGallery />
          </TabsContent>

          <TabsContent value="videos">
            <VideoGrid />
          </TabsContent>

          <TabsContent value="photos">
            <PhotoGallery />
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <PostCard
              author="Ana Martínez"
              timestamp="Hace 1 hora"
              content="Explorando las nuevas funcionalidades del KAOS System. ¡La IA está revolucionando la creación de contenido!"
              likes={156}
              comments={28}
              shares={15}
            />
            <PostCard
              author="Diego Fernández"
              timestamp="Hace 3 horas"
              content="Acabo de completar mi primera subasta en TAMV. Sistema súper intuitivo y seguro 💎"
              likes={203}
              comments={41}
              shares={19}
            />
          </TabsContent>
        </Tabs>

        {/* Puentes Oníricos - Collaborative Matching */}
        <div data-tour-target="puentesOniricos">
          <PuentesOniricosPanel matches={matchCollaborators(MOCK_USERS)} />
        </div>

        {/* Monetization Overview */}
        <MonetizationOverviewSection />

        {/* Referral League */}
        <ReferralLeague leaders={REFERRAL_LEADERS} currentUserRank={42} currentUserInvites={127} />
      </div>
    </div>
  );
};

export default MainFeed;
