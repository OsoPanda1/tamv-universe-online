import { motion } from "framer-motion";

export const GradientOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -3 }}>
      {/* Primary Orb - Cyan */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(180 100% 50% / 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["-25%", "75%", "-25%"],
          y: ["-25%", "50%", "-25%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Orb - Purple */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 65% / 0.4) 0%, transparent 70%)",
          filter: "blur(50px)",
          right: "-10%",
          top: "20%",
        }}
        animate={{
          x: ["0%", "-50%", "0%"],
          y: ["0%", "30%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent Orb - Magenta */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(300 100% 60% / 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
          left: "50%",
          bottom: "-10%",
        }}
        animate={{
          x: ["-50%", "50%", "-50%"],
          y: ["0%", "-30%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(180 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(180 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};
