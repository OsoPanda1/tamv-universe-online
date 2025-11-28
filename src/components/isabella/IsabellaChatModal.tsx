import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Send,
  Lightbulb,
  Users,
  Music,
  MessageCircle,
} from "lucide-react";

interface IsabellaChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IsabellaChatModal = ({ isOpen, onClose }: IsabellaChatModalProps) => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "isabella",
      content: "¡Hola! Soy Isabella, tu asistente creativa en TAMV. Puedo ayudarte a generar ideas, encontrar colaboradores, optimizar tu contenido y mucho más. ¿En qué te puedo apoyar hoy?",
    },
  ]);
  const [input, setInput] = useState("");

  const shortcuts = [
    {
      icon: <Lightbulb className="w-4 h-4" />,
      text: "Generar idea de reto",
      action: "generar_reto",
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "Sugerir colaboración",
      action: "sugerir_collab",
    },
    {
      icon: <Music className="w-4 h-4" />,
      text: "Crear concierto sensorial",
      action: "concierto",
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      text: "Optimizar mi perfil",
      action: "optimizar_perfil",
    },
  ];

  const handleShortcut = (action: string) => {
    const responses: Record<string, string> = {
      generar_reto:
        "Te sugiero el reto 'Fusión Sensorial': crea una experiencia que combine audio, visual y texto de forma innovadora. Puedes colaborar con un músico y un artista visual. ¿Te gustaría que te ayude a estructurarlo?",
      sugerir_collab:
        "Basándome en tu actividad, detecté que podrías colaborar con @MusicTechMX (productor musical) y @VisualDreamer (artista 3D). Ambos están buscando proyectos de inmersión sensorial. ¿Te los presento?",
      concierto:
        "Para tu primer concierto sensorial, te recomiendo: 1) Define tu narrativa emocional (ej. viaje nocturno, despertar cósmico). 2) Selecciona 3-5 piezas musicales clave. 3) Diseña visuales reactivos. ¿En qué género musical te enfocas?",
      optimizar_perfil:
        "Tu perfil tiene potencial. Te sugiero: 1) Añadir más sobre tus especialidades creativas. 2) Compartir 2-3 proyectos destacados. 3) Conectar con al menos 5 creadores afines. ¿Empezamos?",
    };

    const response = responses[action] || "¿En qué más puedo ayudarte?";
    
    setMessages([
      ...messages,
      { role: "user", content: shortcuts.find((s) => s.action === action)?.text || "" },
      { role: "isabella", content: response },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // Simulated response
    setMessages([
      ...messages,
      { role: "user", content: userMessage },
      {
        role: "isabella",
        content:
          "Entiendo tu consulta. Basándome en tu actividad en TAMV, te sugiero explorar colaboraciones en Puentes Oníricos y participar en los retos activos. ¿Te gustaría que profundice en algún tema específico?",
      },
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span>Isabella IA · Asistente Creativa</span>
              <Badge className="ml-2 bg-emerald-500/90">En línea</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {shortcuts.map((shortcut, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="justify-start gap-2"
                  onClick={() => handleShortcut(shortcut.action)}
                >
                  {shortcut.icon}
                  <span className="text-xs">{shortcut.text}</span>
                </Button>
              ))}
            </div>
          )}

          {messages.map((msg, idx) => (
            <Card
              key={idx}
              className={`p-3 ${
                msg.role === "isabella"
                  ? "glass border border-primary/40 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                  : "bg-muted/50 border border-border/60 ml-auto max-w-[80%]"
              }`}
            >
              {msg.role === "isabella" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">Isabella</span>
                </div>
              )}
              <p className="text-sm">{msg.content}</p>
            </Card>
          ))}
        </div>

        <div className="px-6 pb-6 border-t border-border pt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Escribe tu mensaje a Isabella..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
