import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Video, FileText, Plus } from "lucide-react";
import PostCard from "./PostCard";
import VideoGrid from "./VideoGrid";
import PhotoGallery from "./PhotoGallery";

interface MainFeedProps {
  activeSection: string;
}

const MainFeed = ({ activeSection }: MainFeedProps) => {
  if (activeSection !== "feed") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold holographic mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-muted-foreground">
              Esta sección está en desarrollo. Pronto podrás disfrutar de todas las funcionalidades.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Create Post Card */}
        <Card className="p-4 mb-6 glass">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
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
              <Button variant="ghost" size="sm" className="gap-2">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Foto</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Video</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Post</span>
              </Button>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="all">Todo</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="posts">Publicaciones</TabsTrigger>
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
      </div>
    </div>
  );
};

export default MainFeed;
