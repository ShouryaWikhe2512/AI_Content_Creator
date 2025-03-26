"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const ThumbnailGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleGenerateThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 250;

    // Background gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#1e3a8a");
    gradient.addColorStop(1, "#9333ea");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Thumbnail text
    ctx.fillStyle = "white";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("AI-Generated Thumbnail", canvas.width / 2, canvas.height / 2);

    // Convert canvas to image
    setImage(canvas.toDataURL("image/png"));
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-gray-700 via-blue-900 to-black px-4 py-16 text-white">
      <motion.div
        className="flex flex-col items-center gap-8 max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
        >
          AI Thumbnail Generator 🖼️
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-2 text-gray-300 text-lg sm:text-xl"
        >
          Generate a stunning AI-powered thumbnail with a single click!
        </motion.p>

        {/* Canvas & Thumbnail Display */}
        <motion.div
          className="relative w-80 h-48 bg-black rounded-lg border-2 border-blue-500 shadow-lg overflow-hidden flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <canvas ref={canvasRef} className="absolute" hidden></canvas>
          {image ? (
            <motion.img
              src={image}
              alt="Generated Thumbnail"
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          ) : (
            <p className="text-gray-400">Click the button to generate</p>
          )}
        </motion.div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerateThumbnail}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-500 transition-all"
        >
          Generate Thumbnail
        </motion.button>
      </motion.div>
    </section>
  );
};

export default ThumbnailGenerator;
