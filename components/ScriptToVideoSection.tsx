// "use client";

// import { motion } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import DraggableText from "./DraggableText";

// const ScriptToVideoSection = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load(); // Ensure the video is reloaded when the component mounts
//     }
//   }, []);

//   const togglePlay = () => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       videoRef.current
//         .play()
//         .catch((error) => console.error("Playback error:", error));
//       setIsPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-gray-500 via-blue-900 to-black px-4 py-16 sm:px-8 md:px-16 text-white">
//       {/* Content Wrapper */}
//       <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl w-full">
//         {/* Script Box */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="p-6 sm:p-8 bg-gradient-to-b from-blue-800 to-gray-900 text-white text-lg leading-relaxed rounded-2xl shadow-2xl max-w-md text-center border border-blue-500 backdrop-blur-xl relative transform hover:scale-105 transition duration-300"
//         >
//           <p className="text-lg sm:text-xl">
//             Luna shivers under the moonlight, staring up at the towering fence.
//             Her stomach growls—food is just beyond reach.With a determined leap,
//             she claws at the wood… but slips back down. There must be another
//             way.
//           </p>
//           <div className="absolute -top-3 -right-3 bg-blue-600 px-3 py-1 text-xs font-bold uppercase rounded-full">
//             AI Script
//           </div>
//         </motion.div>

//         {/* Video Preview */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, delay: 0.3 }}
//           className="relative w-60 sm:w-72 md:w-80 h-96 bg-black rounded-2xl border-2 border-blue-500 overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
//         >
//           {/* Video Element */}
//           <video
//             ref={videoRef}
//             src="/videos/frame.mp4"
//             className="w-full h-full object-cover rounded-2xl"
//             loop
//             muted
//             playsInline
//             controls
//             autoPlay
//           />

//           {/* Play/Pause Button */}
//           <div
//             className="absolute inset-0 flex items-center justify-center bg-opacity-10 cursor-pointer"
//             onClick={togglePlay}
//           >
//             <button className="w-14 h-14   rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-80 transition duration-200">
//               <span className="text-white opacity-1 text-3xl font-bold">
//                 {isPlaying ? "⏸" : "▶"}
//               </span>
//             </button>
//           </div>

//           {/* Video Title */}
//           <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-bold backdrop-blur-lg p-2 rounded-b-2xl">
//             Luna's Rampage
//           </div>
//         </motion.div>
//       </div>

//       {/* Heading & Subtext */}
//       <div className="text-center mt-16">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
//         >
//           AI-Generated Video from Script 🎬
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="mt-2 text-gray-300 text-lg sm:text-xl"
//         >
//           Simply type your script, and AI will turn it into a stunning video!
//         </motion.p>
//       </div>
//     </section>
//   );
// };

// export default ScriptToVideoSection;

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface ScriptToVideoProps {
  script: string;
  videoSrc: string;
  staticVideoSrc: string;
}

export default function EnhancedScriptToVideo({
  script = "Generate a futuristic cityscape with flying cars, holographic billboards, and neon lights reflecting off glass skyscrapers. The scene should be set at night with a cyberpunk aesthetic.",
  videoSrc = "/placeholder.svg?height=720&width=1280",
  staticVideoSrc = "/placeholder.svg?height=720&width=1280",
}: ScriptToVideoProps) {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [glitchLetters, setGlitchLetters] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoControls = useAnimation();

  // Create audio context for typing sounds
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/typing-sound.mp3");
      audioRef.current.volume = 0.2;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const text = script;

    // Reset state when script changes
    setTypedText("");
    setIsTypingComplete(false);
    setIsGenerating(false);
    setGenerationProgress(0);

    const typeNextCharacter = () => {
      if (i < text.length) {
        // Variable typing speed
        const isBreak = text[i] === "." || text[i] === "," || text[i] === "!";
        const delay = isBreak ? 500 : Math.random() * 50 + 30;

        setTimeout(() => {
          setTypedText(text.substring(0, i + 1));

          // Play typing sound
          if (audioRef.current) {
            // Clone the audio to allow overlapping sounds
            const sound = audioRef.current.cloneNode() as HTMLAudioElement;
            sound.volume = 0.05;
            sound.play().catch((e) => console.log("Audio play failed:", e));
          }

          i++;
          typeNextCharacter();
        }, delay);
      } else {
        setIsTypingComplete(true);

        // Start video generation after typing is complete
        setTimeout(() => {
          startVideoGeneration();
        }, 1000);
      }
    };

    typeNextCharacter();

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (typedText.length > 0) {
        const randomIndices = [];
        const glitchCount = Math.floor(Math.random() * 3) + 1;

        for (let j = 0; j < glitchCount; j++) {
          const randomIndex = Math.floor(Math.random() * typedText.length);
          randomIndices.push(randomIndex);
        }

        setGlitchLetters(randomIndices);

        // Reset glitch after a short delay
        setTimeout(() => {
          setGlitchLetters([]);
        }, 150);
      }
    }, 2000);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(glitchInterval);
    };
  }, [script]);

  // Video generation simulation
  const startVideoGeneration = () => {
    setIsGenerating(true);

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5 + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Show the video
        videoControls.start({
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 1, ease: "easeOut" },
        });
      }
      setGenerationProgress(progress);
    }, 200);
  };

  return (
    <div
      ref={containerRef}
      className="max-w-6xl mx-auto p-8   rounded-xl border bg-transparent  border-gray-800"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-transparent ">
        {/* Left side - Script input */}
        <div className="relative">
          {/* AI Script Label */}
          <motion.div
            className="absolute -top-4 -left-4 z-10 bg-transparent  backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500"
            animate={{
              y: [0, -5, 0],
              boxShadow: [
                "0 0 10px rgba(6, 182, 212, 0.5)",
                "0 0 20px rgba(6, 182, 212, 0.7)",
                "0 0 10px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-cyan-500 font-bold">AI SCRIPT</span>

              {/* Sound wave animation */}
              <div className="flex items-center h-4 gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-cyan-500"
                    animate={{
                      height: [2, 12, 5, 8, 2],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Script Box */}
          <motion.div
            className="relative h-full bg-black/60 backdrop-blur-md p-6 rounded-xl border border-cyan-800 overflow-hidden"
            animate={
              isTypingComplete
                ? {
                    boxShadow: [
                      "0 0 0px rgba(6, 182, 212, 0)",
                      "0 0 20px rgba(6, 182, 212, 0.5)",
                      "0 0 10px rgba(6, 182, 212, 0.3)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          >
            {/* Futuristic decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-1 bg-cyan-500/50"></div>
            <div className="absolute top-0 left-0 w-1 h-20 bg-cyan-500/50"></div>
            <div className="absolute bottom-0 right-0 w-20 h-1 bg-cyan-500/50"></div>
            <div className="absolute bottom-0 right-0 w-1 h-20 bg-cyan-500/50"></div>

            {/* Typewriter text */}
            <div className="text-cyan-50 font-mono text-lg leading-relaxed">
              {typedText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className={
                    glitchLetters.includes(index) ? "text-cyan-300" : ""
                  }
                  animate={
                    glitchLetters.includes(index)
                      ? {
                          opacity: [1, 0, 1, 0, 1],
                          x: [0, 1, -1, 0],
                        }
                      : {}
                  }
                >
                  {char}
                </motion.span>
              ))}
              {cursorVisible && !isTypingComplete && (
                <span className="text-cyan-500 animate-pulse">|</span>
              )}
            </div>

            {/* Overlay grid pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-full grid grid-cols-12 grid-rows-12">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-[0.5px] border-cyan-500/20"
                  ></div>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isTypingComplete ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-xs text-cyan-300 font-mono">
                {isTypingComplete ? "SCRIPT READY" : "PROCESSING..."}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right side - Video output */}
        <div className="space-y-8">
          {/* Main Video with Holographic Frame */}
          <div className="relative">
            {/* Holographic border */}
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-70 blur-sm"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.99, 1.01, 0.99],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Video container */}
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/50">
              {/* Video */}
              <motion.video
                className="w-full h-auto aspect-video object-cover"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={videoControls}
              />

              {/* Generation overlay */}
              <AnimatePresence>
                {isGenerating && generationProgress < 100 && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="text-cyan-500 font-mono text-lg mb-4">
                      GENERATING VIDEO
                    </div>

                    {/* Progress bar */}
                    <div className="w-3/4 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>

                    <div className="text-cyan-300 font-mono text-sm mt-2">
                      {Math.floor(generationProgress)}% COMPLETE
                    </div>

                    {/* Processing animation */}
                    <div className="mt-6 flex gap-3">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-cyan-500"
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* HUD elements */}
              <div className="absolute top-4 left-4 text-xs text-cyan-400 font-mono">
                RENDERING:{" "}
                {isGenerating ? `${Math.floor(generationProgress)}%` : "100%"}
              </div>
              <div className="absolute top-4 right-4 text-xs text-cyan-400 font-mono">
                AI MODEL: GPT-5 VISUAL
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-cyan-400 font-mono">
                RESOLUTION: 4K ULTRA
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-cyan-400 font-mono">
                FPS: 60
              </div>

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500/70" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-500/70" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-500/70" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500/70" />

              {/* Scanning lines */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"
                style={{ height: "200%" }}
                animate={{
                  y: ["-100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          {/* Static Video Box */}
          <div className="relative">
            {/* Static border */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-50 blur-sm" />

            {/* Video container */}
            <div className="relative rounded-lg overflow-hidden border border-blue-500/50">
              {/* Video */}
              <video
                className="w-full h-auto aspect-video object-cover opacity-90"
                src={staticVideoSrc}
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

              {/* Label */}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-blue-400 font-mono">
                REFERENCE FOOTAGE
              </div>

              {/* Data points */}
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-blue-400 font-mono">
                SOURCE: NEURAL DATABASE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
