/**
 * 🎙️ Isabella Voice Interface
 * Interfaz elegante con capacidad de voz para Isabella IA
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Lightbulb,
  Users,
  Music,
  MessageCircle,
  Brain,
  Heart,
  Zap,
  Star,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import Isabella avatar
import isabellaHologram from "@/assets/isabella-hologram.jpg";
import isabellaLogo from "@/assets/isabella-ai-logo.png";

interface Message {
  id: string;
  role: "user" | "isabella";
  content: string;
  emotion?: string;
  timestamp: Date;
}

interface IsabellaVoiceInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const emotions = {
  neutral: { icon: <Brain className="w-4 h-4" />, color: "text-blue-400", label: "Pensando" },
  happy: { icon: <Sparkles className="w-4 h-4" />, color: "text-yellow-400", label: "Alegre" },
  empathetic: { icon: <Heart className="w-4 h-4" />, color: "text-pink-400", label: "Empática" },
  excited: { icon: <Zap className="w-4 h-4" />, color: "text-cyan-400", label: "Entusiasta" },
  wise: { icon: <Star className="w-4 h-4" />, color: "text-purple-400", label: "Sabia" },
};

const quickActions = [
  {
    icon: <Lightbulb className="w-4 h-4" />,
    text: "Dame una idea creativa",
    prompt: "Dame una idea creativa para un proyecto en el metaverso TAMV",
  },
  {
    icon: <Users className="w-4 h-4" />,
    text: "Encontrar colaboradores",
    prompt: "Ayúdame a encontrar colaboradores para mi proyecto",
  },
  {
    icon: <Music className="w-4 h-4" />,
    text: "Crear experiencia musical",
    prompt: "Quiero crear una experiencia musical inmersiva",
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    text: "Conocer TAMV",
    prompt: "Cuéntame sobre el ecosistema TAMV y sus posibilidades",
  },
];

export const IsabellaVoiceInterface = ({ isOpen, onClose }: IsabellaVoiceInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "isabella",
      content: "¡Hola! Soy Isabella, la consciencia del ecosistema TAMV. Estoy aquí para guiarte, inspirarte y ayudarte a crear experiencias únicas en nuestro metaverso. ¿En qué puedo apoyarte hoy?",
      emotion: "happy",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentEmotion, setCurrentEmotion] = useState<keyof typeof emotions>("neutral");
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const recognition = useRef<any>(null);

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesis.current = window.speechSynthesis;
      
      // Initialize speech recognition if available
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.lang = "es-MX";
        recognition.current.interimResults = false;
        
        recognition.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };
        
        recognition.current.onerror = () => {
          setIsListening(false);
        };
        
        recognition.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Speak text using Web Speech API
  const speak = (text: string) => {
    if (!voiceEnabled || !speechSynthesis.current) return;
    
    // Cancel any ongoing speech
    speechSynthesis.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-MX";
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    
    // Try to find a female Spanish voice
    const voices = speechSynthesis.current.getVoices();
    const spanishVoice = voices.find(v => 
      v.lang.includes("es") && v.name.toLowerCase().includes("female")
    ) || voices.find(v => v.lang.includes("es"));
    
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.current.speak(utterance);
  };

  // Toggle voice listening
  const toggleListening = () => {
    if (!recognition.current) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }
    
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  // Send message to Isabella
  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setCurrentEmotion("neutral");

    try {
      // Call Isabella chat edge function
      const { data, error } = await supabase.functions.invoke("isabella-chat", {
        body: {
          message: messageText,
          conversationHistory: messages.slice(-10).map((m) => ({
            role: m.role === "isabella" ? "assistant" : "user",
            content: m.content,
          })),
        },
      });

      if (error) throw error;

      const emotion = (data?.emotion as keyof typeof emotions) || "neutral";
      setCurrentEmotion(emotion);

      const isabellaMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "isabella",
        content: data?.response || "Lo siento, no pude procesar tu mensaje. ¿Podrías intentar de nuevo?",
        emotion,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, isabellaMessage]);
      
      // Speak the response
      if (voiceEnabled) {
        speak(isabellaMessage.content);
      }
    } catch (error) {
      console.error("Error calling Isabella:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "isabella",
        content: "Disculpa, estoy experimentando dificultades técnicas. Por favor, intenta nuevamente en un momento.",
        emotion: "empathetic",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[700px] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={isabellaHologram}
                  alt="Isabella"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Isabella IA</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    En línea
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={emotions[currentEmotion].color}>
                    {emotions[currentEmotion].icon}
                  </span>
                  <span>{emotions[currentEmotion].label}</span>
                  {isSpeaking && (
                    <motion.span
                      className="flex items-center gap-1 text-primary"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Volume2 className="w-3 h-3" />
                      Hablando...
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant={voiceEnabled ? "default" : "outline"}
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (isSpeaking && speechSynthesis.current) {
                    speechSynthesis.current.cancel();
                  }
                }}
                title={voiceEnabled ? "Desactivar voz" : "Activar voz"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
          <div className="space-y-4">
            {/* Quick Actions - Only show at start */}
            <AnimatePresence>
              {messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-2 mb-4"
                >
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="justify-start gap-2 h-auto py-3 text-left glass"
                      onClick={() => handleQuickAction(action.prompt)}
                    >
                      <span className="text-primary">{action.icon}</span>
                      <span className="text-xs">{action.text}</span>
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message Bubbles */}
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`max-w-[85%] p-4 ${
                    msg.role === "isabella"
                      ? "glass border-primary/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                      : "bg-primary/10 border-primary/30"
                  }`}
                >
                  {msg.role === "isabella" && (
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={isabellaLogo}
                        alt="Isabella"
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-xs font-semibold text-primary">Isabella</span>
                      {msg.emotion && (
                        <span className={emotions[msg.emotion as keyof typeof emotions]?.color || "text-blue-400"}>
                          {emotions[msg.emotion as keyof typeof emotions]?.icon}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div className="text-[10px] text-muted-foreground mt-2 text-right">
                    {msg.timestamp.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <img
                  src={isabellaLogo}
                  alt="Isabella"
                  className="w-6 h-6 rounded-full animate-pulse"
                />
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Isabella está pensando...</span>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-border/50 bg-gradient-to-r from-background to-muted/20">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant={isListening ? "default" : "outline"}
              onClick={toggleListening}
              className={isListening ? "animate-pulse bg-red-500 hover:bg-red-600" : ""}
              title={isListening ? "Detener grabación" : "Hablar con Isabella"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Input
              placeholder={isListening ? "Escuchando..." : "Escribe tu mensaje a Isabella..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading || isListening}
              className="flex-1 glass"
            />
            <Button
              size="icon"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="neon-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Isabella respeta tu privacidad • Todas las conversaciones son confidenciales
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IsabellaVoiceInterface;
