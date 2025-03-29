"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchEffectProps {
  children: React.ReactNode;
  active: boolean;
  intensity?: number;
  duration?: number;
}

export default function GlitchEffect({
  children,
  active,
  intensity = 5,
  duration = 0.5,
}: GlitchEffectProps) {
  const [glitchVariants, setGlitchVariants] = useState({
    x: 0,
    y: 0,
    skewX: 0,
    filter: "none",
  });

  useEffect(() => {
    if (!active) return;

    const startTime = Date.now();
    let animationFrame: number;

    const updateGlitch = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / (duration * 1000);

      if (progress >= 1) {
        setGlitchVariants({
          x: 0,
          y: 0,
          skewX: 0,
          filter: "none",
        });
        return;
      }

      // Create random glitch effect
      if (Math.random() > 0.7) {
        setGlitchVariants({
          x: (Math.random() - 0.5) * intensity,
          y: (Math.random() - 0.5) * intensity,
          skewX: (Math.random() - 0.5) * intensity,
          filter:
            Math.random() > 0.8 ? "hue-rotate(90deg) saturate(200%)" : "none",
        });
      } else {
        setGlitchVariants({
          x: 0,
          y: 0,
          skewX: 0,
          filter: "none",
        });
      }

      animationFrame = requestAnimationFrame(updateGlitch);
    };

    animationFrame = requestAnimationFrame(updateGlitch);

    return () => {
      cancelAnimationFrame(animationFrame);
      setGlitchVariants({
        x: 0,
        y: 0,
        skewX: 0,
        filter: "none",
      });
    };
  }, [active, intensity, duration]);

  return (
    <motion.div
      animate={glitchVariants}
      transition={{ duration: 0.05 }}
      className="relative"
    >
      {children}

      {active && (
        <>
          <motion.div
            className="absolute inset-0 opacity-30 mix-blend-screen z-10 pointer-events-none"
            animate={{
              x: (Math.random() - 0.5) * intensity * 2,
              opacity: [0, 0.3, 0],
              backgroundColor: ["#ff00ff", "#00ffff", "transparent"],
            }}
            transition={{ duration: 0.2, repeat: 2, repeatType: "mirror" }}
          />
          <motion.div
            className="absolute inset-0 opacity-30 mix-blend-screen z-10 pointer-events-none"
            animate={{
              x: (Math.random() - 0.5) * intensity * -2,
              opacity: [0, 0.3, 0],
              backgroundColor: ["#00ffff", "#ff00ff", "transparent"],
            }}
            transition={{ duration: 0.15, repeat: 3, repeatType: "mirror" }}
          />
        </>
      )}
    </motion.div>
  );
}
