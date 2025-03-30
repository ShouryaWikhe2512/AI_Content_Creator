"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Download, RefreshCw, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

// MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import ImageIcon from "@mui/icons-material/Image";

const ThumbnailGenerator = () => {
  const router = useRouter();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [style, setStyle] = useState("Modern, Professional");
  const [thumbnail, setThumbnail] = useState<{
    title_text: string;
    subtitle_text: string;
    image_url: string;
    download_url: string;
    file_id: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const thumbnailStyles = [
    "Modern, Professional",
    "Bold, Colorful",
    "Minimalist",
    "Cinematic",
    "Retro",
    "Educational",
    "Gaming",
    "Tech",
    "Corporate",
    "Creative",
  ];

  const generateThumbnail = async () => {
    if (!videoTitle.trim()) {
      setError("Please enter a video title");
      return;
    }

    setLoading(true);
    setError(null);
    setThumbnail(null);
    setDownloadError(null);

    try {
      const response = await fetch("http://localhost:8000/creative/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_title: videoTitle,
          video_description: videoDescription,
          style,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate thumbnail");
      }

      const data = await response.json();
      setThumbnail(data);
    } catch (err) {
      setError("Error generating thumbnail. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadThumbnail = async () => {
    if (!thumbnail?.file_id) return;

    setDownloadLoading(true);
    setDownloadError(null);

    try {
      // Create direct download URL using file_id
      const downloadUrl = `http://localhost:8000/creative/download/${thumbnail.file_id}`;

      // Fetch the image - this will check if it exists first
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to download image");
      }

      // Get the image as a blob
      const imageBlob = await response.blob();

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(imageBlob);

      // Create an anchor element and trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `thumbnail-${thumbnail.file_id}.jpg`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err: any) {
      setDownloadError(err.message || "Error downloading thumbnail");
      console.error(err);
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleEditInWebEditor = () => {
    if (thumbnail?.image_url) {
      const encodedImageUrl = encodeURIComponent(thumbnail.image_url);
      router.push(`/web-editor?imageUrl=${encodedImageUrl}`);
    }
  };

  const handleClear = () => {
    setVideoTitle("");
    setVideoDescription("");
    setThumbnail(null);
    setError(null);
    setDownloadError(null);
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
              YouTube Thumbnail Generator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-2"
            >
              Create eye-catching thumbnails for your videos with AI
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

              <div className="space-y-6">
                {/* Video Title */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-medium">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter your video title"
                    className="w-full p-3 text-lg bg-transparent border border-purple-200/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Video Description */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-medium">
                    Video Description (Optional)
                  </label>
                  <textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Add additional context for your thumbnail"
                    className="w-full p-3 text-lg bg-transparent border border-purple-200/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[140px] resize-none"
                  />
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Thumbnail Style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {thumbnailStyles.map((thumbnailStyle) => (
                      <button
                        key={thumbnailStyle}
                        onClick={() => setStyle(thumbnailStyle)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          style === thumbnailStyle
                            ? "bg-purple-600 text-white"
                            : "bg-black/30 text-gray-300 hover:bg-black/50"
                        }`}
                      >
                        {thumbnailStyle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={generateThumbnail}
                    disabled={loading || !videoTitle.trim()}
                    className="flex-1 min-w-[120px] flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-1" />
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
              </div>
            </motion.div>

            {/* Output Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-200/30 flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Generated Thumbnail
              </h2>

              {/* Thumbnail Display Area */}
              <div className="flex-1 flex flex-col justify-center items-center bg-black/40 rounded-lg overflow-hidden border border-purple-500/20 mb-4 p-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-400">Creating your thumbnail...</p>
                  </div>
                ) : thumbnail ? (
                  <div className="relative w-full h-full">
                    <img
                      src={thumbnail.image_url}
                      alt="Generated thumbnail"
                      className="max-width-full max-h-[400px] rounded-lg mx-auto border border-purple-400/30"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 py-20">
                    <ImageIcon
                      style={{ fontSize: 64 }}
                      className="mb-4 opacity-40"
                    />
                    <p className="text-xl">Your thumbnail will appear here</p>
                    <p className="text-sm mt-2 text-gray-500">
                      Optimal resolution: 1280×720 pixels
                    </p>
                  </div>
                )}
              </div>

              {/* Thumbnail Details & Actions */}
              {thumbnail && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-medium text-lg">
                      {thumbnail.title_text}
                    </h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {thumbnail.subtitle_text}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={handleEditInWebEditor}
                      className="flex items-center space-x-1 bg-purple-600/80 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      <span>Edit in Web Editor</span>
                    </button>
                    <button
                      onClick={downloadThumbnail}
                      className="flex items-center space-x-1 bg-purple-600/60 hover:bg-purple-600/80 text-white py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      <GetAppIcon fontSize="small" className="mr-1" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={handleClear}
                      className="flex items-center space-x-1 bg-black/40 hover:bg-black/60 text-white py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      <span>Try Another</span>
                    </button>
                  </div>

                  {/* Download Error Message */}
                  {downloadError && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm mt-4">
                      {downloadError}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2024 AlphaGen AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailGenerator;
