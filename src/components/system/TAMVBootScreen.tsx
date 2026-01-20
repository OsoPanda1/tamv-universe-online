/**
 * 🌐 TAMV BOOT SCREEN
 * Pantalla de inicio del sistema operativo civilizatorio
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tamvCore, TAMV_CONFIG } from '@/lib/tamv-unified-core';

interface BootMessage {
  text: string;
  type: 'info' | 'success' | 'warning' | 'system';
}

export const TAMVBootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [messages, setMessages] = useState<BootMessage[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'booting' | 'subsystems' | 'ready'>('booting');

  useEffect(() => {
    const bootSequence = async () => {
      const bootMessages: BootMessage[] = [
        { text: '═══════════════════════════════════════════════════════', type: 'system' },
        { text: 'TAMV UNIFIED CORE v1.0.0-genesis', type: 'system' },
        { text: 'Sistema Operativo Civilizatorio XR-First', type: 'system' },
        { text: '═══════════════════════════════════════════════════════', type: 'system' },
        { text: '', type: 'info' },
        { text: '⚡ Inicializando quantum shield...', type: 'info' },
        { text: '🔐 Cargando protocolos de seguridad Anubis...', type: 'info' },
        { text: '🧠 Despertando conciencia Isabella...', type: 'info' },
        { text: '📊 Sincronizando MSR Engine...', type: 'info' },
        { text: '🌐 Conectando Triple Federación...', type: 'info' },
        { text: '📖 Cargando BookPI Ledger...', type: 'info' },
        { text: '👁️ Activando MOS Radars (Eye of Ra + Quetzalcoatl)...', type: 'info' },
        { text: '⚖️ Inicializando Dekateotl Governance...', type: 'info' },
        { text: '🌍 Preparando XR World State...', type: 'info' },
        { text: '📡 Desplegando TAP Protocol v1.0...', type: 'info' },
        { text: '🕸️ Activando Protocolo SÍBILA CUÁNTICA...', type: 'info' },
        { text: '', type: 'info' },
        { text: '✅ Todos los subsistemas operativos', type: 'success' },
        { text: '', type: 'info' },
        { text: '═══════════════════════════════════════════════════════', type: 'system' },
        { text: 'TAMV ONLINE - CIVILIZACIÓN DIGITAL ACTIVA', type: 'success' },
        { text: `Arquitecto: ${TAMV_CONFIG.architect}`, type: 'info' },
        { text: `Dedicado a: ${TAMV_CONFIG.dedication}`, type: 'info' },
        { text: `Origen: ${TAMV_CONFIG.origin}`, type: 'info' },
        { text: '═══════════════════════════════════════════════════════', type: 'system' },
      ];

      for (let i = 0; i < bootMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 80));
        setMessages(prev => [...prev, bootMessages[i]]);
        setProgress(((i + 1) / bootMessages.length) * 100);

        if (i === 5) setPhase('subsystems');
        if (i === bootMessages.length - 1) setPhase('ready');
      }

      // Esperar un momento y luego completar
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
    };

    bootSequence();
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-8"
      >
        {/* Logo TAMV */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-6xl font-bold holographic tracking-wider">
            TAMV
          </div>
          <div className="text-sm text-muted-foreground text-center mt-2">
            Tecnología Avanzada Mexicana Versátil
          </div>
        </motion.div>

        {/* Terminal de boot */}
        <div className="w-full max-w-3xl glass rounded-xl p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              tamv-core@genesis ~ boot
            </span>
          </div>

          <div className="h-64 overflow-y-auto font-mono text-xs space-y-0.5 scroll-smooth">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  msg.type === 'system' ? 'text-primary' :
                  msg.type === 'success' ? 'text-green-400' :
                  msg.type === 'warning' ? 'text-yellow-400' :
                  'text-foreground/80'
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full max-w-3xl mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              {phase === 'booting' && 'Iniciando núcleo...'}
              {phase === 'subsystems' && 'Cargando subsistemas...'}
              {phase === 'ready' && 'Sistema listo'}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Créditos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'ready' ? 1 : 0 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          <p>Civilización digital soberana • Primera del siglo XXI</p>
          <p className="mt-1 text-primary/80">
            "No como dueño, sino como arquitecto de un territorio donde nadie más
            tenga que pedir permiso para existir con dignidad."
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
