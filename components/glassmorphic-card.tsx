"use client";

import type React from "react";

import { motion } from "framer-motion";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassmorphicCard({
  children,
  className = "",
}: GlassmorphicCardProps) {
  return (
    <motion.div
      className={`relative rounded-xl backdrop-blur-lg bg-blue-950/30 border border-blue-500/20 shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>

      {/* Border glow */}
      <div className="absolute inset-0 rounded-xl border border-blue-400/20 opacity-50 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
