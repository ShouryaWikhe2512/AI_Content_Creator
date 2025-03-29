"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

export default function TextToMusicPage() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateMusic() {
    if (!prompt.trim()) return;
    setLoading(true);
    setAudioUrl(null);
    setError(null);

    try {
      const response = await fetch("/api/generateMusic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to generate music");
      setAudioUrl(data.audioUrl);
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 overflow-hidden">
      {/* Floating Particles */}
      <Sidebar />

      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2b0055] to-[#400080] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-xl md:text-6xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-purple-300 via-purple-200 to-blue-200 bg-clip-text drop-shadow-lg">
          AI-Powered Music Generator
        </h1>
        <p className="text-gray-300 mt-3 text-lg max-w-lg mx-auto">
          Transform your words into mesmerizing music with AI-generated
          soundtracks.
        </p>
      </motion.div>

      {/* Input & Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-purple-500 w-full max-w-md text-center z-10"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter lyrics or description..."
          className="w-full p-3 bg-transparent border border-purple-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onKeyDown={(e) => e.key === "Enter" && generateMusic()}
        />

        <button
          onClick={generateMusic}
          disabled={loading || !prompt.trim()}
          className="mt-4 px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 w-full"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Generate Music"}
        </button>
      </motion.div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Generated Music */}
      {audioUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 z-10"
        >
          <audio
            controls
            className="w-80 rounded-lg shadow-lg border border-purple-400"
          >
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>
      )}
    </div>
  );
}
