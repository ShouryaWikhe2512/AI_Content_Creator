"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function RoboAnimation() {
  return (
    <div className="relative flex justify-center mb-2">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          y: [0, -40, 0], // Reduced floating distance
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-3 bg-purple-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Bot className="w-24 h-24 text-purple-500" />
        </div>
      </motion.div>
    </div>
  );
}
