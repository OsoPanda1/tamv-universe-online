import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Brain, Target } from "lucide-react";
import kaosBg from "@/assets/kaos-background.jpg";
import neuralNet from "@/assets/neural-network.jpg";

const KAOS = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("kaos");

  const kaosMetrics = [
    { label: "Chaos Score", value: "87.3%", icon: Zap, color: "text-cyan-400" },
    { label: "Pattern Recognition", value: "94.2%", icon: Brain, color: "text-purple-400" },
    { label: "Prediction Accuracy", value: "91.8%", icon: Target, color: "text-pink-400" },
    { label: "Neural Complexity", value: "96.5%", icon: Sparkles, color: "text-cyan-400" },
  ];

  const predictions = [
    { id: 1, title: "Tendencia Emergente en Música", confidence: 94, category: "Cultura" },
    { id: 2, title: "Patrón de Interacción Social", confidence: 89, category: "Social" },
    { id: 3, title: "Predicción de Contenido Viral", confidence: 92, category: "Contenido" },
    { id: 4, title: "Análisis de Comportamiento", confidence: 87, category: "Usuario" },
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

        <main className="flex-1 overflow-y-auto p-6 relative">
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${kaosBg})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 neon-glow-cyan">Sistema KAOS</h1>
              <p className="text-muted-foreground">Motor de Teoría del Caos y Predicción Cuántica</p>
            </div>

            {/* Métricas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kaosMetrics.map((metric) => (
                <Card key={metric.label} className="glass p-6 hover:shadow-neon-cyan transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    <Badge variant="outline" className="border-primary">{metric.label}</Badge>
                  </div>
                  <div className="text-3xl font-bold neon-glow-purple">{metric.value}</div>
                </Card>
              ))}
            </div>

            {/* Visualización Neural */}
            <Card className="glass mb-8 overflow-hidden">
              <div className="relative aspect-video">
                <img src={neuralNet} alt="Neural Network" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold mb-2 neon-glow-cyan">Red Neural KAOS</h3>
                  <p className="text-sm text-muted-foreground">
                    Procesando patrones fractales y dinámicas no lineales
                  </p>
                </div>
              </div>
            </Card>

            {/* Predicciones */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 neon-glow-purple">Predicciones Activas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {predictions.map((prediction) => (
                  <Card key={prediction.id} className="glass p-6 hover:shadow-neon-purple transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{prediction.category}</Badge>
                      <span className="text-2xl font-bold text-cyan-400">{prediction.confidence}%</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{prediction.title}</h3>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button className="w-full gap-2" variant="default">
                <Sparkles className="w-4 h-4" />
                Generar Predicción
              </Button>
              <Button className="w-full gap-2" variant="outline">
                <Brain className="w-4 h-4" />
                Analizar Patrones
              </Button>
              <Button className="w-full gap-2" variant="secondary">
                <Zap className="w-4 h-4" />
                Iniciar Simulación
              </Button>
            </div>
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

export default KAOS;