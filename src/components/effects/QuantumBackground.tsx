/**
 * 🌌 Quantum Background Effects
 * Efectos 3D inmersivos para el metaverso TAMV
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Floating Orb Component
const FloatingOrb = ({ delay = 0, size = 200, color = "primary" }: { 
  delay?: number; 
  size?: number;
  color?: "primary" | "secondary" | "accent";
}) => {
  const colorMap = {
    primary: "hsl(180 100% 50% / 0.1)",
    secondary: "hsl(270 100% 65% / 0.1)",
    accent: "hsl(300 100% 60% / 0.1)",
  };

  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]}, transparent)`,
      }}
      initial={{
        x: Math.random() * 100 - 50 + "%",
        y: Math.random() * 100 - 50 + "%",
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        x: [
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
        ],
        y: [
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
        ],
        scale: [0.5, 1, 0.5],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Neural Network Grid
const NeuralGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > dimensions.width) node.vx *= -1;
        if (node.y < 0 || node.y > dimensions.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i === j) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(180, 100%, 50%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(180, 100%, 50%, 0.5)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// Holographic Scan Lines
const ScanLines = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        hsla(180, 100%, 50%, 0.03) 2px,
        hsla(180, 100%, 50%, 0.03) 4px
      )`,
      animation: "scanline 8s linear infinite",
    }}
  />
);

// Aurora Wave Effect
const AuroraWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(
            45deg,
            transparent 0%,
            hsla(180, 100%, 50%, 0.05) 25%,
            hsla(270, 100%, 65%, 0.08) 50%,
            hsla(300, 100%, 60%, 0.05) 75%,
            transparent 100%
          )
        `,
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
);

// Main Quantum Background Component
export const QuantumBackground = ({ 
  variant = "full" 
}: { 
  variant?: "full" | "subtle" | "minimal" 
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, hsl(240 15% 8%) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, hsl(270 20% 8%) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(180 10% 5% / 0.5) 0%, transparent 70%),
            hsl(240 10% 4%)
          `,
        }}
      />

      {/* Floating orbs */}
      {variant !== "minimal" && (
        <>
          <FloatingOrb delay={0} size={400} color="primary" />
          <FloatingOrb delay={3} size={300} color="secondary" />
          <FloatingOrb delay={6} size={350} color="accent" />
          <FloatingOrb delay={9} size={250} color="primary" />
        </>
      )}

      {/* Neural network grid */}
      {variant === "full" && <NeuralGrid />}

      {/* Aurora wave */}
      {variant !== "minimal" && <AuroraWave />}

      {/* Scan lines */}
      <ScanLines />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 10% 4% / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default QuantumBackground;
