"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Edit } from "lucide-react";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import GetAppIcon from "@mui/icons-material/GetApp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const TextToMeme = () => {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [memeData, setMemeData] = useState<{
    topText: string;
    memeUrl: string;
    bottomText: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateMeme() {
    if (!topic.trim()) {
      setError("Please enter a topic for your meme.");
      return;
    }

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

  const handleClear = () => {
    setTopic("");
    setMemeData(null);
    setError(null);
  };

  const handleDownload = () => {
    if (!memeData?.memeUrl) return;

    const link = document.createElement("a");
    link.href = memeData.memeUrl;
    link.download = `alphagen-meme-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditInWebEditor = () => {
    if (memeData?.memeUrl) {
      // Build query parameters with meme image URL and caption texts
      const params = new URLSearchParams();
      params.append("imageUrl", memeData.memeUrl);
      params.append("topText", memeData.topText || "");
      params.append("bottomText", memeData.bottomText || "");

      // Navigate to web-editor with parameters
      router.push(`/web-editor?${params.toString()}`);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden text-white bg-black">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#14036b] via-[#3825a0] to-[#2a1069]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated Background Lines - subtle wave effect */}
      <div className="absolute inset-0 -z-5 overflow-hidden opacity-60">
        {/* Horizontal wavy lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-[1px] bg-purple-500/20"
              style={{
                top: `${5 + i * 13}%`,
                transform: `rotate(${
                  (i % 2 === 0 ? -0.5 : 0.5) + Math.random() * 0.5
                }deg)`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* Diagonal wavy lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`d-${i}`}
              className="absolute h-[200%] w-[1px] bg-purple-500/10"
              style={{
                left: `${15 + i * 25}%`,
                top: "-50%",
                transform: `rotate(${45 + i * 2}deg)`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Radial Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse z-0" />

      {/* Colored Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-fuchsia-400 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-400 opacity-30 rounded-full blur-[120px]" />
      </div>

      {/* Top Navbar */}
      <div className="relative z-20 w-full">
        <div className="bg-black/20 backdrop-blur-md border-b border-white/5 px-6 py-3">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto">
            {/* Logo - Left Side */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative flex items-center justify-center">
                <Image
                  src="/Logo.png"
                  alt="AlphaGen Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight">
                Alpha<span className="text-purple-500">Gen</span>
              </span>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <Link
                href="/dashboard"
                className="text-white hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <HomeIcon fontSize="small" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Examples
              </Link>
            </div>

            {/* Right Side Elements */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-black/30 border border-white/5 rounded-full px-4 py-1.5 w-64">
                <SearchIcon className="text-gray-400 text-sm mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-gray-400"
                />
              </div>

              {/* Help/Question Mark */}
              <button className="text-gray-300 hover:text-white transition-colors">
                <HelpOutlineIcon className="text-sm" />
              </button>

              {/* Notifications */}
              <button className="text-gray-300 hover:text-white transition-colors relative">
                <NotificationsIcon className="text-sm" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center p-[2px]">
                  <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center overflow-hidden">
                    <AccountCircleIcon className="text-white" />
                  </div>
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  Guest
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-purple-300 via-purple-200 to-blue-400 bg-clip-text drop-shadow-lg"
            >
              AI Meme Generator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-2"
            >
              Enter a topic and get a hilarious AI-generated meme instantly!
            </motion.p>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-200/30"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Create Your Meme
              </h2>

              {/* Topic Input */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">
                  What's your meme about?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a meme topic..."
                  className="w-full p-3 text-lg bg-transparent border border-purple-200/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all min-h-[250px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      e.preventDefault();
                      generateMeme();
                    }
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={generateMeme}
                  disabled={loading || !topic.trim()}
                  className="flex-1 min-w-[120px] flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <EmojiEmotionsIcon className="mr-1" />
                      <span>Generate Meme</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center space-x-2 bg-black/40 text-white py-3 px-6 rounded-lg font-medium hover:bg-black/60 transition-all duration-200"
                >
                  <DeleteIcon className="mr-1" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                  {error}
                </div>
              )}
            </motion.div>

            {/* Output Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-200/30 flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Generated Meme
              </h2>

              {/* Meme Display Area */}
              <div className="flex-1 flex flex-col justify-center items-center bg-black/40 rounded-lg overflow-hidden border border-purple-500/20 mb-4 p-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">Creating your meme...</p>
                  </div>
                ) : memeData ? (
                  <div className="text-center">
                    <p className="font-bold text-lg mb-2">{memeData.topText}</p>
                    <div className="relative">
                      <img
                        src={memeData.memeUrl}
                        alt="Generated meme"
                        className="max-w-full max-h-[400px] rounded-lg mx-auto border border-purple-400/30"
                      />
                    </div>
                    <p className="font-bold text-lg mt-2">
                      {memeData.bottomText}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 py-20">
                    <EmojiEmotionsIcon
                      style={{ fontSize: 64 }}
                      className="mb-4 opacity-40"
                    />
                    <p>Your generated meme will appear here</p>
                  </div>
                )}
              </div>

              {/* Actions for generated meme */}
              {memeData && (
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleEditInWebEditor}
                    className="flex items-center space-x-1 bg-purple-600/80 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    <span>Edit in Web Editor</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-1 bg-purple-600/60 hover:bg-purple-600/80 text-white py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <GetAppIcon fontSize="small" className="mr-1" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex items-center space-x-1 bg-black/40 hover:bg-black/60 text-white py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <RefreshIcon fontSize="small" className="mr-1" />
                    <span>Try Another</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2023 AlphaGen. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextToMeme;
