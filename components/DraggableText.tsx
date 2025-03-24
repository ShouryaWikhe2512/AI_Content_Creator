"use client";

import { motion } from "framer-motion";

const DraggableText = ({ text }: { text: string }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ top: -10, bottom: 50, left: -700, right: 300 }} // Restrict movement
      initial={{ x: "-50%", y: "15%" }} // Start at the center
      className="absolute top-1/2 left-1/2 cursor-pointer select-none text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-lime-400 via-cyan-300 to-green-500 text-transparent bg-clip-text"
    >
      {text}
    </motion.div>
  );
};

export default DraggableText;
