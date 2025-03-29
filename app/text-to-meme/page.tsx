"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

export default function MemeGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [memeData, setMemeData] = useState<{
    topText: string;
    memeUrl: string;
    bottomText: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateMeme() {
    setLoading(true);
    setMemeData(null);
    setError(null);

    try {
      const response = await fetch("/api/generateMeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (!response.ok || !data.memeUrl) {
        throw new Error(data.error || "Failed to generate meme");
      }

      setMemeData({
        topText: data.topText || "",
        memeUrl: data.memeUrl,
        bottomText: data.bottomText || "",
      });
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex bg-black text-white p-10 overflow-hidden">
      <Sidebar />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2b0055] to-[#400080] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse" />

      <div className="flex w-full max-w-6xl mx-auto z-10 gap-10 items-center justify-center ml-40">
        {/* AI Input Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-1/2 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-purple-200 transition-all duration-300 min-h-[250px] max-h-[650px] overflow-y-auto"
        >
          <h1 className="text-4xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-purple-300 via-purple-200 to-blue-400 bg-clip-text drop-shadow-lg text-center">
            AI Meme Generator
          </h1>
          <p className="text-gray-300 mt-2 text-lg text-center">
            Enter a topic and get a hilarious AI-generated meme instantly!
          </p>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a meme topic..."
            className="w-full p-3 mt-4 text-lg bg-transparent border border-purple-200 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all duration-300 min-h-[350px] max-h-[375px] overflow-x-auto"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                generateMeme();
              }
            }}
          />

          <button
            onClick={generateMeme}
            disabled={loading || !topic.trim()}
            className="mt-4 px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 bg-fuchsia-400 hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 w-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Meme"}
          </button>
        </motion.div>

        {/* Generated Meme Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-1/2 flex justify-center items-center bg-white/10 backdrop-blur-lg rounded-xl border border-purple-200 shadow-lg h-96 -mr-60"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          {memeData ? (
            <div className="text-center">
              <p className="font-bold text-lg">{memeData.topText}</p>
              <img
                src={memeData.memeUrl}
                alt="Generated Meme"
                className="w-180 rounded-lg shadow-lg border border-purple-400 mx-auto"
              />
              <p className="font-bold text-lg">{memeData.bottomText}</p>
            </div>
          ) : (
            <p className="text-gray-400 text-xl text-center">
              Your generated meme will appear here.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
