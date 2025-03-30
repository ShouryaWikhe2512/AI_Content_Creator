// // "use client";
// // import { motion } from "framer-motion";
// // import { Upload } from "lucide-react";
// // import EnhancedCinemaReel from "./cinema-reel";

// // export default function ReelSyncUploader() {
// //   return (
// //     <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-900 to-black p-6">
// //       {/* Static Image Instead of Upload Box */}
// //       <motion.div
// //         initial={{ opacity: 0, y: -50, scale: 0.9 }}
// //         animate={{ opacity: 1, y: 0, scale: 1 }}
// //         whileHover={{ scale: 1.05 }}
// //         transition={{ duration: 0.8, ease: "easeOut" }}
// //         className="relative w-80 h-44 bg-black/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden"
// //       >
// //         <motion.img
// //           src="/static/video-thumbnail.jpg" // Replace with your image path
// //           alt="Video Placeholder"
// //           className="w-full h-full object-cover rounded-3xl"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 1 }}
// //         />
// //       </motion.div>

// //       <EnhancedCinemaReel />

// //       {/* Title & Subtitle */}
// //       <motion.h1
// //         initial={{ opacity: 0, y: 30, scale: 0.9 }}
// //         animate={{ opacity: 1, y: 0, scale: 1 }}
// //         transition={{ duration: 1, delay: 0.6 }}
// //         className="mt-6 text-3xl sm:text-5xl font-extrabold text-center leading-tight"
// //       >
// //         <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
// //           Upload Music & Clips,
// //         </span>
// //         <br />
// //         <motion.span
// //           initial={{ opacity: 0, scale: 0.8 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 1.2, delay: 1 }}
// //           className="bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg"
// //         >
// //           Get A Beat-Synced Reel!
// //         </motion.span>
// //       </motion.h1>

// //       <motion.p
// //         className="text-gray-300 text-base sm:text-lg text-center mt-3 max-w-2xl mx-auto px-4"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 1.2, delay: 1.3 }}
// //       >
// //         Simply upload your reel music and short clips—our AI-powered platform
// //         will
// //         <span className="text-blue-400 font-semibold"> auto-sync </span>
// //         them to the beats for a seamless edit!
// //       </motion.p>
// //     </div>
// //   );
// // }

"use client";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import EnhancedCinemaReel from "./cinema-reel";

export default function ReelSyncUploader() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-transparent   text-white overflow-hidden">
      {/* Floating Nebula Background */}
      <motion.div
        className="absolute inset-0  blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Floating Light Flares */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-[100px]"
        animate={{ x: [0, 40, -40, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-cyan-400 rounded-full opacity-30 blur-[120px]"
        animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Holographic Upload Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-150 h-75 bg-black/30 backdrop-blur-lg rounded-3xl 
        shadow-[0px_0px_100px_rgba(173,97,255,0.7)] border border-[#9b5de5]/40 
        overflow-hidden mb-10 mt-20"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(173,97,255,0.3),_transparent)] z-0" />

        {/* Video */}
        <motion.video
          src="/videos/videoplayback (2).mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl brightness-125 contrast-110 
          shadow-[0px_0px_100px_rgba(173,97,255,0.8)] scale-100 hover:scale-[1.04] transition-all duration-500"
        />

        {/* Inner Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b5de5]/20 via-transparent to-[#ff8c00]/10" />
      </motion.div>

      <EnhancedCinemaReel />

      {/* Dynamic Title with Music Wave Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-10 text-4xl sm:text-6xl font-extrabold text-center leading-tight tracking-wide"
      >
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-500">
          Upload Music & Clips,
        </span>
        <br />
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-500 to-red-500"
        >
          Get A Beat-Synced Reel!
        </motion.span>
      </motion.h1>

      {/* Music Wave Animated Text */}
      <motion.div
        className="flex space-x-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        {["█", "█", "█", "█", "█", "█", "█"].map((bar, index) => (
          <motion.span
            key={index}
            className="text-cyan-400 text-4xl sm:text-5xl font-bold"
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.6 + index * 0.1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            {bar}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle with Cyberpunk Glow */}
      <motion.p
        className="text-white text-lg sm:text-xl text-center mt-16 max-w-3xl px-4 mb-10 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.8 }}
      >
        Upload your <span className="text-blue-100 font-semibold">music</span>{" "}
        and <span className="text-indigo-100 font-semibold">clips</span>—our{" "}
        <span className="text-pink-100 font-bold">AI syncs</span> them to the
        beat for a{" "}
        <span className="text-cyan-100 font-extrabold">seamless</span> edit. Let
        the <span className="text-purple-100 font-bold">future</span> of editing
      </motion.p>
    </div>
  );
}
