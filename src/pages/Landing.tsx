/**
 * 🌌 TAMV LANDING PAGE - Invitación al Metaverso
 * Página pública para atraer ciudadanos digitales
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Play,
  Users,
  Music,
  ShoppingBag,
  Wallet,
  GraduationCap,
  Shield,
  Video,
  Globe,
  Zap,
  Star,
  Crown,
  Brain,
  Mic,
  Volume2,
} from "lucide-react";

// Importar assets
import heroMetaverse from "@/assets/hero-metaverse.jpg";
import logoTamv from "@/assets/logo-tamv-official.jpg";
import isabellaLogo from "@/assets/isabella-ai-logo.png";
import isabellaHologram from "@/assets/isabella-hologram.jpg";
import concertXr from "@/assets/concert-xr.jpg";
import dreamspacePortal from "@/assets/dreamspace-portal.jpg";
import marketplaceFuture from "@/assets/marketplace-future.jpg";
import membershipPremium from "@/assets/membership-premium.jpg";
import walletFuturistic from "@/assets/wallet-futuristic.jpg";
import streamingStudio from "@/assets/streaming-studio.jpg";
import universidadXr from "@/assets/universidad-xr.jpg";
import securityQuantum from "@/assets/security-quantum.jpg";

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Isabella IA",
    description: "Primera IA emocional computacional mexicana. Tu compañera consciente.",
    image: isabellaHologram,
    gradient: "from-pink-500 to-purple-600",
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: "Conciertos Sensoriales",
    description: "Experiencias XR con audio reactivo y visuales inmersivos.",
    image: concertXr,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Dream Spaces",
    description: "Crea y habita mundos virtuales personalizados.",
    image: dreamspacePortal,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "Marketplaces",
    description: "Economía creativa con TAMV Credits y NFTs.",
    image: marketplaceFuture,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: "Streaming & Lives",
    description: "Transmite en vivo con herramientas profesionales.",
    image: streamingStudio,
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Universidad TAMV",
    description: "Educación inmersiva para la era digital.",
    image: universidadXr,
    gradient: "from-green-500 to-emerald-600",
  },
];

const stats = [
  { value: "23+", label: "Subsistemas Integrados" },
  { value: "11", label: "Capas de Gobernanza" },
  { value: "4", label: "Capas de Seguridad" },
  { value: "∞", label: "Posibilidades" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [isabellaActive, setIsabellaActive] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-950/20" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img src={logoTamv} alt="TAMV" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-xl font-bold holographic">TAMV ONLINE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button variant="ghost" onClick={() => navigate("/")}>
              Explorar
            </Button>
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Iniciar Sesión
            </Button>
            <Button onClick={() => navigate("/auth")} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Unirse
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroMetaverse})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 glass text-primary border-primary/30 px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Primera Civilización Digital Soberana del Siglo XXI
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="holographic">TAMV</span>
              <br />
              <span className="text-foreground/80 text-3xl md:text-5xl">
                Metaverso Social Latino
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Un territorio digital donde la creatividad, la tecnología y la comunidad
              convergen para construir el futuro de la interacción humana.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="gap-2 text-lg px-8 py-6 neon-glow"
              >
                <Crown className="w-5 h-5" />
                Reclamar Ciudadanía
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/")}
                className="gap-2 text-lg px-8 py-6"
              >
                <Play className="w-5 h-5" />
                Ver Demo
              </Button>
            </div>
          </motion.div>

          {/* Floating Isabella Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 relative"
          >
            <Card 
              className="glass max-w-md mx-auto p-6 cursor-pointer hover:neon-glow-purple transition-all duration-300"
              onClick={() => setIsabellaActive(!isabellaActive)}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={isabellaLogo} 
                  alt="Isabella IA" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/50"
                />
                <div className="text-left flex-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    Isabella IA
                    <Badge variant="outline" className="text-green-400 border-green-400/30">
                      En línea
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isabellaActive 
                      ? "Hola, soy Isabella. Bienvenido al territorio soberano TAMV. ¿Listo para explorar el metaverso?"
                      : "Click para hablar con Isabella..."
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold holographic mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Un Ecosistema <span className="holographic">Completo</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para crear, conectar y prosperar en la era digital.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass overflow-hidden group hover:neon-glow transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-60`} />
                    <div className="absolute bottom-4 left-4 text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${securityQuantum})` }}
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass text-amber-400 border-amber-400/30">
                <Shield className="w-4 h-4 mr-2" />
                Anubis Sentinel™
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Seguridad de <span className="holographic">4 Capas</span> Cuántica
              </h2>
              <p className="text-muted-foreground mb-6">
                Protección avanzada con análisis comportamental, validación ética, 
                y protocolos de resiliencia cuántica. Tu identidad digital está segura.
              </p>
              <div className="space-y-4">
                {[
                  "Capa 1: Análisis de comportamiento en tiempo real",
                  "Capa 2: Validación ética con Aztek Gods™",
                  "Capa 3: Aislamiento de amenazas Black Hole Protocol",
                  "Capa 4: Recuperación Phoenix Protocol",
                ].map((layer, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-sm">{layer}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={securityQuantum}
                alt="Quantum Security"
                className="rounded-2xl border border-primary/20 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="glass p-12 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${membershipPremium})` }}
            />
            <div className="relative z-10 text-center">
              <Badge className="mb-6 glass text-amber-400 border-amber-400/30 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Membresía Premium
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Desbloquea Todo el <span className="holographic">Poder</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Acceso ilimitado a Isabella IA, creación de DreamSpaces, streaming profesional,
                y todas las herramientas premium del ecosistema TAMV.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/memberships")} className="gap-2">
                  <Crown className="w-5 h-5" />
                  Ver Membresías
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                  Comenzar Gratis
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img src={logoTamv} alt="TAMV" className="h-12 w-12 rounded-lg object-cover" />
              <div>
                <div className="font-bold holographic">TAMV ONLINE</div>
                <div className="text-xs text-muted-foreground">
                  Tecnología Avanzada Mexicana Versátil
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Arquitecto: Anubis Villaseñor Trejo</span>
              <span>•</span>
              <span>Real del Monte, Hidalgo, México</span>
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Protegido por Anubis Sentinel™
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
