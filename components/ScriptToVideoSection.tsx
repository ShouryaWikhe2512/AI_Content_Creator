"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import DraggableText from "./DraggableText";

const ScriptToVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ensure the video is reloaded when the component mounts
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-black via-blue-900 to-black px-4 py-16 sm:px-8 md:px-16 text-white">
      {/* Content Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl w-full">
        {/* Script Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="p-6 sm:p-8 bg-gradient-to-b from-blue-800 to-gray-900 text-white text-lg leading-relaxed rounded-2xl shadow-2xl max-w-md text-center border border-blue-500 backdrop-blur-xl relative transform hover:scale-105 transition duration-300"
        >
          <p className="text-lg sm:text-xl">
            Luna shivers under the moonlight, staring up at the towering fence.
            Her stomach growls—food is just beyond reach.With a determined leap,
            she claws at the wood… but slips back down. There must be another
            way.
          </p>
          <div className="absolute -top-3 -right-3 bg-blue-600 px-3 py-1 text-xs font-bold uppercase rounded-full">
            AI Script
          </div>
        </motion.div>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-60 sm:w-72 md:w-80 h-96 bg-black rounded-2xl border-2 border-blue-500 overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src="/videos/frame.mp4"
            className="w-full h-full object-cover rounded-2xl"
            loop
            muted
            playsInline
            controls
            autoPlay
          />

          {/* Play/Pause Button */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-opacity-10 cursor-pointer"
            onClick={togglePlay}
          >
            <button className="w-14 h-14   rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-80 transition duration-200">
              <span className="text-white opacity-1 text-3xl font-bold">
                {isPlaying ? "⏸" : "▶"}
              </span>
            </button>
          </div>

          {/* Video Title */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-bold backdrop-blur-lg p-2 rounded-b-2xl">
            Luna's Rampage
          </div>
        </motion.div>
      </div>

      {/* Heading & Subtext */}
      <div className="text-center mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
        >
          AI-Generated Video from Script 🎬
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-2 text-gray-300 text-lg sm:text-xl"
        >
          Simply type your script, and AI will turn it into a stunning video!
        </motion.p>
      </div>
    </section>
  );
};

export default ScriptToVideoSection;
