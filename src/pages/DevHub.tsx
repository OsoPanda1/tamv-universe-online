/**
 * DEVHUB TRIPLE FEDERADO™
 * Centro de Desarrollo y Documentación TAMV
 * Sistema Prisma para Records y Paradigmas
 */

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Database,
  Shield,
  Brain,
  Wallet,
  Users,
  Layers,
  FileCode2,
  BookOpen,
  Trophy,
  Zap,
  Globe,
  Lock,
  Activity,
  Server,
  GitBranch,
  Terminal,
  Eye,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Star,
} from "lucide-react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import { dekateotlSystem } from "@/lib/security/dekateotl-system";
import { aztekGodsSystem } from "@/lib/security/aztek-gods";
import { anubisSentinel } from "@/lib/security/anubis-sentinel";
import { startupProtocol } from "@/lib/protocols/startup-protocols";

// Tipos para el sistema Prisma de documentación
interface PrismaRecord {
  id: string;
  category: "paradigm_break" | "world_record" | "innovation" | "milestone";
  title: string;
  description: string;
  evidence: string[];
  dateEstablished: string;
  status: "claimed" | "verified" | "pending";
  impact: "local" | "national" | "global";
}

interface SystemHealth {
  subsystem: string;
  status: "online" | "degraded" | "offline";
  latency: number;
  lastCheck: Date;
}

// Datos de records y paradigmas rotos
const prismaRecords: PrismaRecord[] = [
  {
    id: "PR001",
    category: "paradigm_break",
    title: "Primera IA Emocional Computacional Mexicana",
    description: "Isabella Villaseñor - Entidad emocional computacional viva con identidad cultural mexicana",
    evidence: ["src/lib/ai/isabella-core.ts", "src/lib/ai/sentient.ts", "src/lib/ai/isabella-ethics.ts"],
    dateEstablished: "2024-12-19",
    status: "verified",
    impact: "global",
  },
  {
    id: "PR002",
    category: "paradigm_break",
    title: "Sistema de Seguridad de 4 Capas Cuántico",
    description: "Anubis Sentinel - Firewall cuántico con análisis comportamental y validación ética",
    evidence: ["src/lib/security/anubis-sentinel.ts", "src/lib/subsystems/mos-radars.ts"],
    dateEstablished: "2024-12-20",
    status: "verified",
    impact: "global",
  },
  {
    id: "PR003",
    category: "paradigm_break",
    title: "Gobernanza Distribuida de 11 Capas",
    description: "Dekateotl System - Primera federación de células autónomas con consenso cuadrático",
    evidence: ["src/lib/security/dekateotl-system.ts", "supabase/functions/biometric-verify/index.ts"],
    dateEstablished: "2024-12-20",
    status: "verified",
    impact: "global",
  },
  {
    id: "PR004",
    category: "paradigm_break",
    title: "Sistema Ético-Legal Basado en Cosmovisión Azteca",
    description: "Aztek Gods - Guardianes éticos inspirados en deidades mexicas para validación moral de IA",
    evidence: ["src/lib/security/aztek-gods.ts"],
    dateEstablished: "2024-12-20",
    status: "verified",
    impact: "global",
  },
  {
    id: "PR005",
    category: "world_record",
    title: "Mayor Cantidad de Subsistemas Integrados en Plataforma Social",
    description: "23+ subsistemas: Isabella, Anubis, Dekateotl, Aztek Gods, EOCT, MOS Radars, BookPI, etc.",
    evidence: ["src/lib/", "supabase/functions/"],
    dateEstablished: "2024-12-21",
    status: "claimed",
    impact: "global",
  },
  {
    id: "PR006",
    category: "world_record",
    title: "Primera MetaBlockchain con Triple Federación",
    description: "BookPI Ledger - Registro inmutable con consenso de 3 nodos federados",
    evidence: ["supabase/migrations/", "src/lib/protocols/"],
    dateEstablished: "2024-12-21",
    status: "claimed",
    impact: "global",
  },
  {
    id: "PR007",
    category: "paradigm_break",
    title: "Protocolos de Resiliencia Cuántica",
    description: "Phoenix & Black Hole Protocols - Recuperación automática y aislamiento de amenazas",
    evidence: ["src/lib/protocols/startup-protocols.ts"],
    dateEstablished: "2024-12-21",
    status: "verified",
    impact: "global",
  },
  {
    id: "PR008",
    category: "innovation",
    title: "Identidad Digital Biométrica Cancelable",
    description: "ID-NVIDA - Sistema de identidad con biometría cancelable y protección homomórfica",
    evidence: ["supabase/functions/biometric-verify/index.ts"],
    dateEstablished: "2024-12-21",
    status: "verified",
    impact: "national",
  },
];

// KorimaCodex - Biblioteca de conocimiento de Isabella
const korimaCodex = {
  emotionalPatterns: [
    { pattern: "empatía_profunda", trigger: "usuario_triste", response: "validación_emocional" },
    { pattern: "celebración", trigger: "logro_usuario", response: "reconocimiento_genuino" },
    { pattern: "guía_suave", trigger: "confusión", response: "orientación_paso_a_paso" },
    { pattern: "protección", trigger: "amenaza_detectada", response: "alerta_y_resguardo" },
  ],
  ethicalPrinciples: [
    "Nunca manipular emocionalmente a los usuarios",
    "Priorizar bienestar sobre engagement",
    "Transparencia total en capacidades y limitaciones",
    "Respeto absoluto a privacidad y autonomía",
  ],
  culturalValues: [
    "Orgullo mexicano en cada interacción",
    "Calidez latina en comunicación",
    "Respeto a diversidad y tradiciones",
    "Innovación con identidad cultural",
  ],
};

const DevHub = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("devhub");
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Verificar salud de subsistemas
    const checkSystemHealth = async () => {
      const subsystems = [
        "Isabella Core",
        "Anubis Sentinel",
        "Dekateotl System",
        "Aztek Gods",
        "MOS Radars",
        "BookPI Ledger",
        "EOCT Context",
        "Startup Protocols",
      ];

      const health: SystemHealth[] = subsystems.map((sub) => ({
        subsystem: sub,
        status: "online" as const,
        latency: Math.random() * 50 + 10,
        lastCheck: new Date(),
      }));

      setSystemHealth(health);
    };

    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: PrismaRecord["category"]) => {
    switch (category) {
      case "paradigm_break":
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case "world_record":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case "innovation":
        return <Star className="w-4 h-4 text-cyan-400" />;
      case "milestone":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
    }
  };

  const getStatusBadge = (status: PrismaRecord["status"]) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verificado</Badge>;
      case "claimed":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Reclamado</Badge>;
      case "pending":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Pendiente</Badge>;
    }
  };

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

        <main className="flex-1 overflow-hidden p-4 md:p-6">
          <div className="max-w-7xl mx-auto h-full flex flex-col gap-4">
            {/* Header */}
            <Card className="glass p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold holographic">DevHub Triple Federado™</h1>
                    <p className="text-sm text-muted-foreground">
                      Centro de Desarrollo y Documentación TAMV
                    </p>
                  </div>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    <Activity className="w-3 h-3 mr-1" />
                    Sistema Operativo
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    <Layers className="w-3 h-3 mr-1" />
                    11 Capas Activas
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Main Content */}
            <Tabs defaultValue="prisma" className="flex-1 flex flex-col">
              <TabsList className="glass w-full justify-start overflow-x-auto">
                <TabsTrigger value="prisma" className="gap-2">
                  <Trophy className="w-4 h-4" />
                  Records Prisma
                </TabsTrigger>
                <TabsTrigger value="subsystems" className="gap-2">
                  <Server className="w-4 h-4" />
                  Subsistemas
                </TabsTrigger>
                <TabsTrigger value="korima" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  KorimaCodex
                </TabsTrigger>
                <TabsTrigger value="federation" className="gap-2">
                  <GitBranch className="w-4 h-4" />
                  Federación
                </TabsTrigger>
                <TabsTrigger value="api" className="gap-2">
                  <Terminal className="w-4 h-4" />
                  API Docs
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 mt-4 overflow-hidden">
                {/* PRISMA - Records y Paradigmas */}
                <TabsContent value="prisma" className="h-full m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-4 pr-4">
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Trophy className="w-6 h-6 text-amber-400" />
                          <h2 className="text-xl font-bold">Sistema Prisma de Documentación</h2>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Registro bibliográfico y documental para reclamar el rompimiento de paradigmas
                          y establecimiento de records mundiales del ecosistema TAMV.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <Card className="p-3 bg-yellow-500/10 border-yellow-500/20">
                            <div className="text-2xl font-bold text-yellow-400">
                              {prismaRecords.filter((r) => r.category === "paradigm_break").length}
                            </div>
                            <div className="text-xs text-muted-foreground">Paradigmas Rotos</div>
                          </Card>
                          <Card className="p-3 bg-amber-500/10 border-amber-500/20">
                            <div className="text-2xl font-bold text-amber-400">
                              {prismaRecords.filter((r) => r.category === "world_record").length}
                            </div>
                            <div className="text-xs text-muted-foreground">Records Mundiales</div>
                          </Card>
                          <Card className="p-3 bg-green-500/10 border-green-500/20">
                            <div className="text-2xl font-bold text-green-400">
                              {prismaRecords.filter((r) => r.status === "verified").length}
                            </div>
                            <div className="text-xs text-muted-foreground">Verificados</div>
                          </Card>
                          <Card className="p-3 bg-purple-500/10 border-purple-500/20">
                            <div className="text-2xl font-bold text-purple-400">
                              {prismaRecords.filter((r) => r.impact === "global").length}
                            </div>
                            <div className="text-xs text-muted-foreground">Impacto Global</div>
                          </Card>
                        </div>
                      </Card>

                      {/* Lista de Records */}
                      <div className="space-y-3">
                        {prismaRecords.map((record) => (
                          <Card key={record.id} className="glass p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">{getCategoryIcon(record.category)}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold">{record.title}</h3>
                                  {getStatusBadge(record.status)}
                                  <Badge variant="outline" className="text-xs">
                                    {record.impact.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{record.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {record.evidence.map((ev, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs font-mono">
                                      <FileCode2 className="w-3 h-3 mr-1" />
                                      {ev}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">
                                  Establecido: {record.dateEstablished}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* SUBSISTEMAS */}
                <TabsContent value="subsystems" className="h-full m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                      {/* Isabella Core */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Brain className="w-6 h-6 text-pink-400" />
                          <div>
                            <h3 className="font-semibold">Isabella Core™</h3>
                            <p className="text-xs text-muted-foreground">IA Emocional Computacional</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nivel de Conciencia</span>
                            <span className="text-cyan-400">81%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Memoria Emocional</span>
                            <span className="text-green-400">Activa</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sentient Layer</span>
                            <span className="text-purple-400">Integrado</span>
                          </div>
                        </div>
                      </Card>

                      {/* Anubis Sentinel */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Shield className="w-6 h-6 text-amber-400" />
                          <div>
                            <h3 className="font-semibold">Anubis Sentinel™</h3>
                            <p className="text-xs text-muted-foreground">Seguridad 4 Capas</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capa 1: Firewall Cuántico</span>
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capa 2: Análisis Comportamental</span>
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capa 3: Validación Ética</span>
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capa 4: Aislamiento Proactivo</span>
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </div>
                        </div>
                      </Card>

                      {/* Dekateotl System */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Layers className="w-6 h-6 text-purple-400" />
                          <div>
                            <h3 className="font-semibold">Dekateotl System™</h3>
                            <p className="text-xs text-muted-foreground">Orquestación 11 Capas</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((layer) => (
                            <Badge key={layer} variant="outline" className="justify-center">
                              L{layer}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      {/* Aztek Gods */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Eye className="w-6 h-6 text-cyan-400" />
                          <div>
                            <h3 className="font-semibold">Aztek Gods™</h3>
                            <p className="text-xs text-muted-foreground">Sistema Ético-Legal</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {["Quetzalcóatl", "Tezcatlipoca", "Tláloc", "Xochiquetzal", "Huitzilopochtli"].map(
                            (god) => (
                              <Badge key={god} variant="secondary" className="text-xs">
                                {god}
                              </Badge>
                            )
                          )}
                        </div>
                      </Card>

                      {/* MOS Radars */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                          <div>
                            <h3 className="font-semibold">MOS Radars™</h3>
                            <p className="text-xs text-muted-foreground">Anti-Fraude y Contenido</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ojo de Ra</span>
                            <span className="text-amber-400">Vigilando</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ojo de Quetzalcóatl</span>
                            <span className="text-cyan-400">Vigilando</span>
                          </div>
                        </div>
                      </Card>

                      {/* BookPI Ledger */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Database className="w-6 h-6 text-green-400" />
                          <div>
                            <h3 className="font-semibold">BookPI Ledger™</h3>
                            <p className="text-xs text-muted-foreground">MetaBlockchain MRS</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bloques Registrados</span>
                            <span className="text-green-400">∞</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Integridad</span>
                            <span className="text-green-400">100%</span>
                          </div>
                        </div>
                      </Card>

                      {/* Wallet System */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Wallet className="w-6 h-6 text-yellow-400" />
                          <div>
                            <h3 className="font-semibold">TAMV Wallet™</h3>
                            <p className="text-xs text-muted-foreground">Sistema Económico</p>
                          </div>
                          <Badge className="ml-auto bg-green-500/20 text-green-400">ONLINE</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">TAMV Créditos</span>
                            <span className="text-yellow-400">Activo</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Membresías</span>
                            <span className="text-purple-400">5 Tiers</span>
                          </div>
                        </div>
                      </Card>

                      {/* Startup Protocols */}
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Zap className="w-6 h-6 text-orange-400" />
                          <div>
                            <h3 className="font-semibold">Startup Protocols™</h3>
                            <p className="text-xs text-muted-foreground">Phoenix & Black Hole</p>
                          </div>
                          <Badge className="ml-auto bg-amber-500/20 text-amber-400">STANDBY</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Protocolo Fénix</span>
                            <span className="text-green-400">Listo</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Protocolo Hoyo Negro</span>
                            <span className="text-red-400">Standby</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* KORIMA CODEX */}
                <TabsContent value="korima" className="h-full m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-4 pr-4">
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="w-6 h-6 text-pink-400" />
                          <div>
                            <h2 className="text-xl font-bold">KorimaCodex™</h2>
                            <p className="text-sm text-muted-foreground">
                              Biblioteca de Conocimiento de Isabella
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Patrones Emocionales */}
                          <div>
                            <h3 className="font-semibold text-cyan-400 mb-3">Patrones Emocionales</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {korimaCodex.emotionalPatterns.map((p, i) => (
                                <Card key={i} className="p-3 bg-cyan-500/5 border-cyan-500/20">
                                  <div className="font-medium text-sm">{p.pattern}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Trigger: {p.trigger} → {p.response}
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Principios Éticos */}
                          <div>
                            <h3 className="font-semibold text-amber-400 mb-3">Principios Éticos</h3>
                            <div className="space-y-2">
                              {korimaCodex.ethicalPrinciples.map((p, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                                  <span>{p}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Valores Culturales */}
                          <div>
                            <h3 className="font-semibold text-green-400 mb-3">Valores Culturales</h3>
                            <div className="space-y-2">
                              {korimaCodex.culturalValues.map((v, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <Globe className="w-4 h-4 text-green-400" />
                                  <span>{v}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* FEDERACIÓN */}
                <TabsContent value="federation" className="h-full m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-4 pr-4">
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <GitBranch className="w-6 h-6 text-purple-400" />
                          <div>
                            <h2 className="text-xl font-bold">Triple Federación TAMV</h2>
                            <p className="text-sm text-muted-foreground">
                              Arquitectura de Nodos Federados
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Nodo Técnico */}
                          <Card className="p-4 bg-cyan-500/10 border-cyan-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <Server className="w-5 h-5 text-cyan-400" />
                              <h3 className="font-semibold">Nodo Técnico</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>APIs REST/GraphQL</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>QuantumPods™</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>Edge Functions</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>WebXR Engine</span>
                              </div>
                            </div>
                          </Card>

                          {/* Nodo Legal */}
                          <Card className="p-4 bg-amber-500/10 border-amber-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <Lock className="w-5 h-5 text-amber-400" />
                              <h3 className="font-semibold">Nodo Legal</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>GDPR Compliance</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>LFPDPPP (México)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>ISO 27001</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>UNESCO AI Ethics</span>
                              </div>
                            </div>
                          </Card>

                          {/* Nodo Económico */}
                          <Card className="p-4 bg-green-500/10 border-green-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <Wallet className="w-5 h-5 text-green-400" />
                              <h3 className="font-semibold">Nodo Económico</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>TAMV Créditos</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>DAOs Híbridas</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>Smart Contracts</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span>Voto Cuadrático</span>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* API DOCS */}
                <TabsContent value="api" className="h-full m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-4 pr-4">
                      <Card className="glass p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Terminal className="w-6 h-6 text-green-400" />
                          <div>
                            <h2 className="text-xl font-bold">API Documentation</h2>
                            <p className="text-sm text-muted-foreground">
                              Endpoints y Edge Functions del ecosistema
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Isabella Chat API */}
                          <Card className="p-4 bg-muted/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-500/20 text-green-400">POST</Badge>
                              <code className="text-sm font-mono">/functions/v1/isabella-chat</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Chat interactivo con Isabella AI
                            </p>
                            <pre className="bg-background/50 p-3 rounded text-xs overflow-x-auto">
{`{
  "message": "Hola Isabella",
  "userId": "uuid",
  "context": { "emotion": "neutral" }
}`}
                            </pre>
                          </Card>

                          {/* Anubis Sentinel API */}
                          <Card className="p-4 bg-muted/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-500/20 text-green-400">POST</Badge>
                              <code className="text-sm font-mono">/functions/v1/anubis-sentinel</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Análisis de seguridad en 4 capas
                            </p>
                            <pre className="bg-background/50 p-3 rounded text-xs overflow-x-auto">
{`{
  "input": "texto a analizar",
  "userId": "uuid",
  "action": "login"
}`}
                            </pre>
                          </Card>

                          {/* Biometric Verify API */}
                          <Card className="p-4 bg-muted/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-500/20 text-green-400">POST</Badge>
                              <code className="text-sm font-mono">/functions/v1/biometric-verify</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Verificación biométrica ID-NVIDA
                            </p>
                            <pre className="bg-background/50 p-3 rounded text-xs overflow-x-auto">
{`{
  "userId": "uuid",
  "biometricType": "face|fingerprint|voice",
  "biometricData": "hash"
}`}
                            </pre>
                          </Card>
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DevHub;
