// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import Image from "next/image";

// const AIMemeGenerator = () => {
//   const [memeText, setMemeText] = useState(
//     "Make a meme on frustration of student one night before exam"
//   );
//   const [memeImage, setMemeImage] = useState("/images/generated-meme.png");
//   const [loading, setLoading] = useState(false);

//   const generateMeme = async () => {
//     setLoading(true);
//     // Simulating AI image generation (Replace with actual API call)
//     setTimeout(() => {
//       setMemeImage("/images/new-generated-meme.png");
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-black via-blue-900 to-black px-4 py-16 sm:px-8 md:px-16 text-white">
//       {/* Content Wrapper */}
//       <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl w-full">
//         {/* AI Script Box */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="p-6 sm:p-8 bg-gradient-to-b from-blue-800 to-gray-900 text-white text-lg leading-relaxed rounded-2xl shadow-2xl max-w-md text-center border border-blue-500 backdrop-blur-xl relative transform hover:scale-105 transition duration-300"
//         >
//           <p className="text-lg sm:text-xl">{memeText}</p>
//           <button
//             onClick={generateMeme}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
//           >
//             Generate Meme
//           </button>
//         </motion.div>

//         {/* Generated Meme Preview */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, delay: 0.3 }}
//           className="relative w-72 h-96 bg-black rounded-2xl border-2 border-blue-500 overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
//         >
//           {loading ? (
//             <div className="text-white text-lg">Generating...</div>
//           ) : (
//             <div className="relative w-full h-full md:h-80 rounded-2xl overflow-hidden">
//               <Image
//                 src="/IMG-20230831-WA0024.jpg"
//                 alt="Generated Meme"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-2xl"
//               />
//             </div>
//           )}
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
//           AI Meme Generator 🎭
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="mt-2 text-gray-300 text-lg sm:text-xl"
//         >
//           Enter a meme idea, and AI will generate a hilarious meme for you!
//         </motion.p>
//       </div>
//     </section>
//   );
// };

// export default AIMemeGenerator;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const memes = [
  {
    id: 1,
    src: "/meme.jpg",
    alt: "AI Meme 1",
    caption: "When the AI finally understands your prompt...",
  },
  {
    id: 2,
    src: "/meme4.jpg",
    alt: "AI Meme 2",
    caption: "Me waiting for my AI to generate the perfect image...",
  },
  {
    id: 3,
    src: "/meme.jpg",
    alt: "AI Meme 3",
    caption: "AI: I made exactly what you asked for. Me: Did you though?",
  },
  {
    id: 4,
    src: "/meme4.jpg",

    alt: "AI Meme 4",
    caption: "When your AI generates something better than expected...",
  },
  {
    id: 5,
    src: "/IMG-20230831-WA0024.jpg",
    alt: "AI Meme 5",
    caption: "AI trying to understand my poorly written prompt...",
  },
];

export default function MemeGenerator() {
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = memes[currentMemeIndex].caption;
  const [isTyping, setIsTyping] = useState(false);

  // Particle explosion effect
  const [showParticles, setShowParticles] = useState(false);

  // Function to handle meme change
  const changeMeme = () => {
    setShowMeme(false);
    setTypedText("");
    setIsTyping(false);

    setTimeout(() => {
      setCurrentMemeIndex((prev) => (prev + 1) % memes.length);
      startCountdown();
    }, 300);
  };

  // Function to start countdown
  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowMeme(true);
          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 1000);
          setTimeout(() => setIsTyping(true), 500);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [isTyping, fullText]);

  // Start with countdown on first load
  useEffect(() => {
    startCountdown();
  }, []);

  // Particle explosion component
  function Particles() {
    const particles = Array.from({ length: 30 }, (_, i) => i);

    return (
      <div className="relative w-full h-full">
        {particles.map((i) => {
          const randomX = Math.random() * 200 - 100;
          const randomY = Math.random() * 200 - 100;
          const size = Math.random() * 10 + 5;
          const duration = Math.random() * 0.5 + 0.5;
          const delay = Math.random() * 0.2;

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full bg-gradient-to-b from-[#17002f] via-[#1a002f] to-[#080808]"
              style={{ width: size, height: size }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: randomX,
                y: randomY,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 ">
      {/* Content Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center ">
        {/* Left Section - AI Script and Button */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6 min-h-[16rem] ">
          {/* AI Script Box */}
          <motion.div
            className="w-full p-4 bg-gray-800 rounded-lg border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]  min-h-[20rem]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <Sparkles className="text-cyan-400 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-white">AI Script</h3>
            </div>
            <p className="text-gray-300 min-h-[3rem]">{typedText}</p>
          </motion.div>

          {/* Generate New Meme Button */}
          <motion.button
            className="w-1/2 py-3 px-6 ml-35 rounded-lg bg-gradient-to-r from-lime-600 via-green-500 to-emerald-700


  text-white font-bold shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-shadow"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={changeMeme}
          >
            Generate New Meme
          </motion.button>
        </div>

        {/* Right Section - Meme Display */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <div
            className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={changeMeme}
          >
            {/* Neon Border Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_20px_rgba(139,92,246,0.8)] animate-pulse">
              <div className="absolute inset-0 bg-gray-900 rounded-lg m-[1px]"></div>
            </div>

            {/* Smooth Meme Transition */}
            <motion.img
              key={currentMemeIndex} // This ensures animation on meme change
              src={memes[currentMemeIndex].src}
              alt={memes[currentMemeIndex].alt}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }} // Start invisible
              animate={{ opacity: 1 }} // Fade in
              exit={{ opacity: 0 }} // Fade out when changing
              transition={{ duration: 0.5 }} // Smooth transition
            />

            {/* Countdown display */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  key="countdown"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <span className="text-8xl font-bold text-white">
                    {countdown}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Explosion particles */}
            <AnimatePresence>
              {showParticles && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                  <Particles />
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOOM text */}
            <AnimatePresence>
              {showParticles && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                >
                  <span className="text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    BOOM! Here&apos;s Your Meme
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Meme Generator Title - Styled for Impact */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#933bf0] via-[#1255d1] to-[#860ee8]  text-5xl md:text-5xl font-extrabold mt-7 text-center drop-shadow-[0_0_15px_rgba(139,92,246,0.8)] ">
        MemeGen 🔥
      </h1>
      <p className="text-gray-300 text-xl md:text-xl text-center mt-2">
        AI-powered meme magic, one click away! 🚀
      </p>
    </div>
  );
}
