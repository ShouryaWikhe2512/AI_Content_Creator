"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import TypingAnimation from "./typing-animation";
import PixelatedImage from "./pixelated-image";
import GlitchEffect from "./glitch-effect";

export default function ThumbnailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const handleGenerate = () => {
    setGlitch(true);
    setIsGenerating(true);

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      setShowThumbnail(true);
      setGlitch(false);
    }, 3000);
  };

  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       className="w-full max-w-4xl"
  //     >
  //       <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
  //         AI Thumbnail Generator
  //       </h2>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         {/* AI Script Box */}
  //         <motion.div
  //           className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden"
  //           initial={{ y: 20 }}
  //           animate={{ y: 0 }}
  //           transition={{ delay: 0.2 }}
  //         >
  //           <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
  //           <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
  //             <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
  //             AI Script
  //           </h3>
  //           <div className="h-64 overflow-y-auto text-gray-300 font-mono text-sm relative">
  //             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-500/10 pointer-events-none" />
  //             <TypingAnimation
  //               text="# AI Thumbnail Generation Script

  // 1. Analyze input content
  // 2. Identify key visual elements
  // 3. Generate composition layout
  // 4. Apply style transfer algorithm
  // 5. Enhance visual hierarchy
  // 6. Optimize for target platform
  // 7. Render final thumbnail

  // Status: Ready to generate"
  //             />
  //           </div>
  //         </motion.div>

  //         {/* Thumbnail Preview Box */}
  //         <motion.div
  //           className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg relative"
  //           initial={{ y: 20 }}
  //           animate={{ y: 0 }}
  //           transition={{ delay: 0.4 }}
  //         >
  //           <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
  //           <h3 className="text-xl font-semibold text-white mb-4">
  //             Thumbnail Preview
  //           </h3>

  //           <div className="aspect-video bg-gray-900/80 rounded-lg overflow-hidden relative flex items-center justify-center">
  //             <AnimatePresence>
  //               {!showThumbnail && !isGenerating && (
  //                 <motion.div
  //                   initial={{ opacity: 1 }}
  //                   exit={{ opacity: 0 }}
  //                   className="text-gray-500 text-center p-4"
  //                 >
  //                   <p>Click generate to create a thumbnail</p>
  //                 </motion.div>
  //               )}

  //               {isGenerating && (
  //                 <motion.div
  //                   initial={{ opacity: 0 }}
  //                   animate={{ opacity: 1 }}
  //                   exit={{ opacity: 0 }}
  //                   className="absolute inset-0"
  //                 >
  //                   <div className="w-full h-full bg-gray-800 animate-pulse rounded-lg">
  //                     <div className="h-full w-full flex items-center justify-center">
  //                       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  //                     </div>
  //                   </div>
  //                 </motion.div>
  //               )}

  //               {showThumbnail && (
  //                 <PixelatedImage
  //                   src="/IMG-20230831-WA0024.jpg"
  //                   alt="Generated Thumbnail"
  //                 />
  //               )}
  //             </AnimatePresence>
  //           </div>
  //         </motion.div>
  //       </div>

  //       {/* Generate Button */}
  //       <div className="mt-8 flex justify-center">
  //         <GlitchEffect active={glitch}>
  //           <motion.button
  //             onClick={handleGenerate}
  //             disabled={isGenerating}
  //             className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-bold text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
  //             whileHover={{ scale: 1.05 }}
  //             whileTap={{ scale: 0.95 }}
  //           >
  //             <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  //             <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
  //             <span className="relative z-10 flex items-center">
  //               {isGenerating ? "Generating..." : "Generate Thumbnail"}
  //               {!isGenerating && <Sparkles className="ml-2 w-5 h-5" />}
  //             </span>
  //           </motion.button>
  //         </GlitchEffect>
  //       </div>
  //     </motion.div>
  //   );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-[#0f0020] via-[#1a002f] to-[#1d0036] relative overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0  blur-3xl opacity-30" />

      {/* Title */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7b00ff] via-[#003493] to-[#6601b9] drop-shadow-2xl text-center mb-10 tracking-wide">
        AI Thumbnail Generator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* AI Script Box */}
        <motion.div
          className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-blue-400 animate-pulse" />
            AI Script
          </h3>
          <div className="h-72 overflow-y-auto text-gray-300 font-mono text-sm relative border border-gray-700 rounded-lg p-4 bg-gray-900/50 shadow-inner">
            <TypingAnimation text="Create a dynamic and futuristic thumbnail for an ethical hacking course. The design should feature a dark, high-tech background with digital code, circuit patterns, and subtle glitch effects. Include a silhouette of a hacker in a hoodie working on an open laptop displaying binary code or cybersecurity icons. Use neon blue and green accents for contrast and modern appeal. Overlay bold, high-contrast text such as 'Learn Hacking' and 'Ethical Hacking Course' in a sleek, futuristic font. The overall style should be edgy, realistic, and visually engaging to attract tech-savvy learners." />{" "}
          </div>
        </motion.div>

        {/* Thumbnail Preview Box */}
        <motion.div
          className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
          <h3 className="text-2xl font-semibold text-white mb-4">
            Thumbnail Preview
          </h3>
          <div className="aspect-video bg-gray-900/80 rounded-xl overflow-hidden flex items-center justify-center border border-gray-700 relative shadow-inner">
            <AnimatePresence>
              {!showThumbnail && !isGenerating && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 text-center p-4"
                >
                  <p>Click generate to create a thumbnail</p>
                </motion.div>
              )}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
              {showThumbnail && (
                <PixelatedImage
                  src="/thumbnail2.jpg"
                  alt="Generated Thumbnail"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Generate Button */}
      <div className="mt-8 flex justify-center">
        <GlitchEffect active={glitch}>
          <motion.button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-lg shadow-xl border border-blue-400 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group transition-transform transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
            <span className="relative z-10 flex items-center">
              {isGenerating ? "Generating..." : "Generate Thumbnail"}
              {!isGenerating && (
                <Sparkles className="ml-2 w-6 h-6 text-yellow-300 animate-pulse" />
              )}
            </span>
          </motion.button>
        </GlitchEffect>
      </div>
    </motion.div>
  );
}
