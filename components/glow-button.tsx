"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function GlowButton({
  children,
  onClick,
  className = "",
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-bold overflow-hidden ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Pulsating border */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-blue-400/50"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: isHovered ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />

      {/* Button content */}
      <motion.div
        className="relative z-10"
        animate={{
          textShadow: isHovered ? "0 0 8px rgba(191, 219, 254, 0.8)" : "none",
        }}
      >
        {children}
      </motion.div>

      {/* Ripple effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ scale: 0, opacity: 0.5, x: "-50%", y: "-50%" }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ left: "50%", top: "50%", originX: 0.5, originY: 0.5 }}
        />
      )}
    </motion.button>
  );
}
