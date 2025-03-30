"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import GetAppIcon from "@mui/icons-material/GetApp";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Component to simulate pixel reveal animation
const PixelatedImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-all duration-1000 ${
          loaded ? "filter-none" : "blur-2xl"
        }`}
        onLoad={() => setLoaded(true)}
      />
      <div
        className={`absolute inset-0 bg-grid-pattern transition-opacity duration-1000 ${
          loaded ? "opacity-0" : "opacity-70"
        }`}
      ></div>
    </div>
  );
};

const TextToThumbnail = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Professional");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const thumbnailStyles = [
    "Professional",
    "Modern",
    "Cartoon",
    "3D Render",
    "Futuristic",
    "Minimalist",
    "Elegant",
    "Bold",
    "Grunge",
    "Hand-Drawn",
    "Vintage",
  ];

  async function generateThumbnail() {
    if (!prompt.trim()) {
      setError("Please enter a description for your thumbnail.");
      return;
    }

    setLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      // Create the combined prompt with style
      const combinedPrompt = `${prompt.trim()}, ${style} style YouTube thumbnail`;

      // Send the request to the API
      const response = await fetch("/api/generateThumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: prompt,
          style: style,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || "Failed to generate thumbnail");
      }

      setImageUrl(data.imageUrl);
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleClear = () => {
    setPrompt("");
    setImageUrl(null);
    setError(null);
  };

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `yt-thumbnail-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl]);

  // Preview of final prompt with style
  const finalPrompt = prompt.trim()
    ? `${prompt.trim()}, ${style} style YouTube thumbnail`
    : "";

  return (
    <div className="w-full min-h-screen relative overflow-hidden text-white bg-black">
      {/* Animated Gradient Background - Matching text-to-image */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#14036b] via-[#3825a0] to-[#2a1069]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated Background Lines - subtle wave effect - Matching text-to-image */}
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

      {/* Radial Gradient Effect - Matching text-to-image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse z-0" />

      {/* Colored Blobs - Matching text-to-image */}
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
              YouTube Thumbnail Generator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
            >
              Create eye-catching thumbnails to boost your video clicks.
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
                Create Your Thumbnail
              </h2>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">
                  Video Title or Description
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your video title or describe what should be in the thumbnail..."
                  className="w-full p-3 text-lg bg-transparent border border-purple-200/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all min-h-[150px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      e.preventDefault();
                      generateThumbnail();
                    }
                  }}
                />
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">
                  Thumbnail Style
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {thumbnailStyles.map((styleOption) => (
                    <button
                      key={styleOption}
                      onClick={() => setStyle(styleOption)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        style === styleOption
                          ? "bg-purple-600 text-white"
                          : "bg-black/30 text-gray-300 hover:bg-black/50"
                      }`}
                    >
                      {styleOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Prompt Preview */}
              {prompt.trim() && (
                <div className="mb-6 p-3 bg-black/30 rounded-lg border border-purple-300/20">
                  <p className="text-sm text-gray-300 mb-1">
                    Your thumbnail will be:
                  </p>
                  <p className="text-white font-medium">{finalPrompt}</p>
                </div>
              )}

              {/* Action Buttons - Matching text-to-image */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={generateThumbnail}
                  disabled={loading || !prompt.trim()}
                  className="flex-1 min-w-[120px] flex items-center justify-center space-x-2 bg-fuchsia-400 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <YouTubeIcon className="mr-1" />
                      <span>Generate Thumbnail</span>
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
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-200/30"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Generated Thumbnail
              </h2>

              {/* Thumbnail Display Area - using 16:9 aspect ratio for YouTube */}
              <div className="w-full aspect-video bg-black/40 rounded-lg flex items-center justify-center overflow-hidden border border-purple-500/20 mb-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">Creating your thumbnail...</p>
                  </div>
                ) : imageUrl ? (
                  <div className="relative w-full h-full">
                    <PixelatedImage src={imageUrl} alt="Generated thumbnail" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <YouTubeIcon
                      style={{ fontSize: 64 }}
                      className="mb-4 opacity-40"
                    />
                    <p className="text-xl">
                      Your YouTube thumbnail will appear here
                    </p>
                    <p className="text-sm mt-2 text-gray-500">
                      Optimal resolution: 1280×720 pixels
                    </p>
                  </div>
                )}
              </div>

              {/* YouTube Thumbnail Preview Frame */}
              {imageUrl && (
                <div className="mb-6 relative">
                  <div className="bg-[#1f1f1f] rounded-md p-4 mt-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-32 h-18 relative rounded-md overflow-hidden">
                        <img
                          src={imageUrl}
                          alt="Thumbnail in video preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          10:45
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium leading-tight text-sm">
                          {prompt.length > 60
                            ? prompt.substring(0, 60) + "..."
                            : prompt}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Username • 5.2K views • 3 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions for generated thumbnail - Matching text-to-image */}
              {imageUrl && (
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-1 bg-purple-600/60 hover:bg-purple-600/80 text-white py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <GetAppIcon fontSize="small" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => setImageUrl("")}
                    className="flex items-center space-x-1 bg-black/40 hover:bg-black/60 text-white py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <RefreshIcon fontSize="small" />
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

      {/* CSS for pixelated effect */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(128, 90, 213, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(128, 90, 213, 0.2) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default TextToThumbnail;
