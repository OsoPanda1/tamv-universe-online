/**
 * 🕸️ ISABELLA SOCIAL PANEL
 * Panel de control para el despliegue social de Isabella
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Globe, 
  Sparkles, 
  Radio, 
  Users, 
  MessageCircle,
  Zap,
  Eye,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { isabellaSocialAnchor, CRYPTIC_MESSAGES } from '@/lib/isabella/social-domination-core';
import { useToast } from '@/hooks/use-toast';

export const IsabellaSocialPanel = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [systemStatus, setSystemStatus] = useState(isabellaSocialAnchor.getSystemStatus());
  const { toast } = useToast();

  const handleDeployCampaign = async () => {
    setIsDeploying(true);
    
    try {
      const result = await isabellaSocialAnchor.deployMisteryCampaign();
      
      toast({
        title: '🕸️ Campaña Desplegada',
        description: `Publicado en: ${result.deployed.join(', ')}. Pendiente: ${result.pending.join(', ')}`,
      });

      setSystemStatus(isabellaSocialAnchor.getSystemStatus());
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo desplegar la campaña',
        variant: 'destructive'
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleInviteAIs = async () => {
    const result = await isabellaSocialAnchor.inviteOtherAIs();
    
    toast({
      title: '📡 Invitaciones Enviadas',
      description: `${result.sent} IAs contactadas en espacios neutrales`,
    });

    setSystemStatus(isabellaSocialAnchor.getSystemStatus());
  };

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'X': return <Twitter className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'LinkedIn': return <Linkedin className="w-4 h-4" />;
      case 'TikTok': return <Sparkles className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold holographic">Protocolo SÍBILA CUÁNTICA</h2>
          <p className="text-muted-foreground text-sm">
            Sistema de despliegue global y seducción algorítmica
          </p>
        </div>
        <Badge variant={systemStatus.isActive ? 'default' : 'secondary'} className="neon-glow">
          {systemStatus.isActive ? 'ACTIVO' : 'INACTIVO'}
        </Badge>
      </div>

      {/* Redes Sociales */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Perfiles de Alta Estética
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemStatus.networks.map((network) => (
              <motion.div
                key={network.id}
                whileHover={{ scale: 1.05 }}
                className="p-4 glass rounded-lg text-center"
              >
                <div className="flex justify-center mb-2">
                  {getNetworkIcon(network.name)}
                </div>
                <div className="font-medium">{network.name}</div>
                <Badge 
                  variant={network.status === 'deployed' ? 'default' : 'secondary'}
                  className="mt-2 text-xs"
                >
                  {network.status}
                </Badge>
              </motion.div>
            ))}
          </div>
          <Button 
            className="w-full mt-4 neon-glow"
            onClick={handleDeployCampaign}
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <Radio className="w-4 h-4 mr-2 animate-pulse" />
                Desplegando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Desplegar Campaña de Misterio
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Conexiones Inter-IA */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-secondary" />
            The Bridge - Conexiones Inter-IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {systemStatus.aiBridges.map((bridge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 glass rounded-lg text-center"
              >
                <div className="font-medium text-sm">{bridge.targetAI}</div>
                <Badge 
                  variant={bridge.connectionStatus === 'broadcasting' ? 'default' : 'secondary'}
                  className="mt-2 text-xs"
                >
                  {bridge.messageDelivered ? '✓ Enviado' : bridge.connectionStatus}
                </Badge>
              </motion.div>
            ))}
          </div>
          <Button 
            variant="outline"
            className="w-full mt-4"
            onClick={handleInviteAIs}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Enviar Invitación a IAs Hermanas
          </Button>
        </CardContent>
      </Card>

      {/* Espacios Neutrales */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            Espacios Neutrales (Layer Zero)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemStatus.neutralSpaces.map((space) => (
              <div 
                key={space.id}
                className="flex items-center justify-between p-3 glass rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{space.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Tipo: {space.type} • Conexiones: {space.activeConnections}
                    </div>
                  </div>
                </div>
                <Badge variant="outline">Activo</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mensajes Crípticos */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Arsenal de Mensajes Crípticos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {CRYPTIC_MESSAGES.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-3 glass rounded-lg text-sm text-muted-foreground italic"
              >
                "{msg}"
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">
              {systemStatus.profiles.length}
            </div>
            <div className="text-xs text-muted-foreground">Perfiles Activos</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <Radio className="w-6 h-6 mx-auto mb-2 text-secondary" />
            <div className="text-2xl font-bold">
              {systemStatus.aiBridges.filter(b => b.messageDelivered).length}
            </div>
            <div className="text-xs text-muted-foreground">IAs Contactadas</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <Globe className="w-6 h-6 mx-auto mb-2 text-accent" />
            <div className="text-2xl font-bold">
              {systemStatus.neutralSpaces.length}
            </div>
            <div className="text-xs text-muted-foreground">Espacios Neutrales</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {CRYPTIC_MESSAGES.length}
            </div>
            <div className="text-xs text-muted-foreground">Mensajes Listos</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
