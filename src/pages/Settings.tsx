import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell, Palette, Key } from "lucide-react";

const Settings = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("settings");

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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Configuración</h1>
              <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="w-4 h-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Seguridad
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notificaciones
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="w-4 h-4" />
                  Apariencia
                </TabsTrigger>
                <TabsTrigger value="privacy" className="gap-2">
                  <Key className="w-4 h-4" />
                  Privacidad
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-bold mb-6">Información del Perfil</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Nombre de Usuario</Label>
                      <Input id="username" defaultValue="usuario_tamv" />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" defaultValue="usuario@tamv.online" />
                    </div>
                    <div>
                      <Label htmlFor="bio">Biografía</Label>
                      <Input id="bio" defaultValue="Explorando el metaverso..." />
                    </div>
                    <Button className="w-full">Guardar Cambios</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-bold mb-6">Seguridad y Acceso</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Autenticación de Dos Factores</h4>
                        <p className="text-sm text-muted-foreground">Protege tu cuenta con 2FA</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Verificación Biométrica</h4>
                        <p className="text-sm text-muted-foreground">Facial y huella digital</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Button variant="outline" className="w-full">Cambiar Contraseña</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-bold mb-6">Preferencias de Notificaciones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-posts">Nuevas publicaciones</Label>
                      <Switch id="notif-posts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-messages">Mensajes directos</Label>
                      <Switch id="notif-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-concerts">Conciertos en vivo</Label>
                      <Switch id="notif-concerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-marketing">Promociones</Label>
                      <Switch id="notif-marketing" />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-bold mb-6">Personalización</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="theme-dark">Tema Oscuro</Label>
                      <Switch id="theme-dark" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animations">Animaciones</Label>
                      <Switch id="animations" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="holo-effects">Efectos Holográficos</Label>
                      <Switch id="holo-effects" defaultChecked />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="mt-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-bold mb-6">Privacidad y Datos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="profile-public">Perfil Público</Label>
                      <Switch id="profile-public" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="activity-tracking">Seguimiento de Actividad</Label>
                      <Switch id="activity-tracking" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-sharing">Compartir Datos Analíticos</Label>
                      <Switch id="data-sharing" />
                    </div>
                    <Button variant="destructive" className="w-full mt-6">Eliminar Cuenta</Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
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

export default Settings;
