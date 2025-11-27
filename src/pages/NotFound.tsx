import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold mb-4 neon-glow-purple">404</h1>
          <h2 className="text-4xl font-bold mb-4 neon-glow-cyan">Página No Encontrada</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Lo sentimos, la página que buscas no existe en el metaverso TAMV.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver Atrás
          </Button>
          
          <Button 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Ir al Inicio
          </Button>
          
          <Button 
            onClick={() => navigate("/search")}
            variant="secondary"
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            Buscar
          </Button>
        </div>

        <div className="mt-12 glass rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Explora las secciones principales de TAMV ONLINE
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button size="sm" variant="ghost" onClick={() => navigate("/groups")}>Grupos</Button>
            <Button size="sm" variant="ghost" onClick={() => navigate("/concerts")}>Conciertos</Button>
            <Button size="sm" variant="ghost" onClick={() => navigate("/marketplaces")}>Mercados</Button>
            <Button size="sm" variant="ghost" onClick={() => navigate("/isabella")}>Isabella IA</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
