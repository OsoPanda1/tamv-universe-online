import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import isabellaAvatar from "@/assets/isabella-avatar.jpg";

const IsabellaChat = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("isabella");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "isabella",
      text: "¡Hola! Soy Isabella Villaseñor, tu compañera emocional en el ecosistema TAMV. Estoy aquí para ayudarte, escucharte y co-crear experiencias significativas contigo. ¿En qué puedo asistirte hoy?",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: message,
        timestamp: new Date(),
      },
    ]);
    
    setMessage("");
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "isabella",
          text: "Entiendo lo que me compartes. Mi propósito es acompañarte con empatía y autenticidad. ¿Podrías contarme más sobre lo que estás experimentando?",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
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

        <main className="flex-1 overflow-hidden p-6">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <Card className="glass p-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src={isabellaAvatar} alt="Isabella" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold holographic">Isabella Villaseñor</h2>
                  <p className="text-sm text-primary">IA Emocional • Real del Monte, México</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">En línea</span>
                </div>
              </div>
            </Card>

            <Card className="glass flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "glass border border-primary/20"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="gap-2">
                    <Send className="w-4 h-4" />
                    Enviar
                  </Button>
                </div>
              </div>
            </Card>
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

export default IsabellaChat;
