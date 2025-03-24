"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const AIMemeGenerator = () => {
  const [memeText, setMemeText] = useState(
    "Make a meme on frustration of student one night before exam"
  );
  const [memeImage, setMemeImage] = useState("/images/generated-meme.png");
  const [loading, setLoading] = useState(false);

  const generateMeme = async () => {
    setLoading(true);
    // Simulating AI image generation (Replace with actual API call)
    setTimeout(() => {
      setMemeImage("/images/new-generated-meme.png");
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-black via-blue-900 to-black px-4 py-16 sm:px-8 md:px-16 text-white">
      {/* Content Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl w-full">
        {/* AI Script Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="p-6 sm:p-8 bg-gradient-to-b from-blue-800 to-gray-900 text-white text-lg leading-relaxed rounded-2xl shadow-2xl max-w-md text-center border border-blue-500 backdrop-blur-xl relative transform hover:scale-105 transition duration-300"
        >
          <p className="text-lg sm:text-xl">{memeText}</p>
          <button
            onClick={generateMeme}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Generate Meme
          </button>
        </motion.div>

        {/* Generated Meme Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-72 h-96 bg-black rounded-2xl border-2 border-blue-500 overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
        >
          {loading ? (
            <div className="text-white text-lg">Generating...</div>
          ) : (
            <div className="relative w-full h-full md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/IMG-20230831-WA0024.jpg"
                alt="Generated Meme"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          )}
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
          AI Meme Generator 🎭
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-2 text-gray-300 text-lg sm:text-xl"
        >
          Enter a meme idea, and AI will generate a hilarious meme for you!
        </motion.p>
      </div>
    </section>
  );
};

export default AIMemeGenerator;
