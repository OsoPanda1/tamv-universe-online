import { MatrixRain } from "./MatrixRain";
import { ParticleField } from "./ParticleField";
import { GradientOrbs } from "./GradientOrbs";

interface ImmersiveBackgroundProps {
  variant?: "full" | "subtle" | "minimal";
}

export const ImmersiveBackground = ({ variant = "full" }: ImmersiveBackgroundProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, hsl(240 15% 8%) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, hsl(270 20% 6%) 0%, transparent 50%),
            hsl(240 10% 4%)
          `,
        }}
      />

      {/* Animated orbs */}
      <GradientOrbs />

      {/* Particle field */}
      {(variant === "full" || variant === "subtle") && <ParticleField />}

      {/* Matrix rain - only on full mode */}
      {variant === "full" && <MatrixRain />}

      {/* Scanline effect */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 100% 50% / 0.1) 2px, hsl(180 100% 50% / 0.1) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 10% 4% / 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default ImmersiveBackground;
