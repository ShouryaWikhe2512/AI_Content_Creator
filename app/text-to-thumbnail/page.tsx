"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Download, RefreshCw } from "lucide-react";

const ThumbnailGenerator = () => {
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#14036b] via-[#3825a0] to-[#2a1069] text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Alpha<span className="text-purple-400">Gen</span> Thumbnail Creator
          </h1>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className="hover:text-purple-300 transition-colors"
            >
              Dashboard
            </Link>
            <Link href="#" className="hover:text-purple-300 transition-colors">
              Gallery
            </Link>
            <Link href="#" className="hover:text-purple-300 transition-colors">
              Help
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-400">
            YouTube Thumbnail Generator
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Create eye-catching thumbnails for your videos with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300/20"
          >
            <h3 className="text-2xl font-semibold mb-6">
              Create Your Thumbnail
            </h3>

            <div className="space-y-6">
              {/* Video Title */}
              <div>
                <label className="block text-gray-300 mb-2">Video Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Enter your video title"
                  className="w-full p-3 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Video Description */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Video Description (Optional)
                </label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Add additional context for your thumbnail"
                  className="w-full p-3 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[100px]"
                />
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-gray-300 mb-2">
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

              {/* Generate Button */}
              <button
                onClick={generateThumbnail}
                disabled={loading || !videoTitle.trim()}
                className="w-full py-3 px-6 mt-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <span>Generate Thumbnail</span>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300/20"
          >
            <h3 className="text-2xl font-semibold mb-6">Generated Thumbnail</h3>

            {/* Thumbnail Display */}
            <div className="w-full aspect-video bg-black/40 rounded-lg flex items-center justify-center overflow-hidden border border-purple-500/20 mb-6">
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
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <Image
                      src="/Logo.png"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="opacity-70"
                    />
                  </div>
                  <p className="text-xl text-gray-400">
                    Your thumbnail will appear here
                  </p>
                  <p className="text-sm mt-2 text-gray-500">
                    Optimal resolution: 1280×720 pixels
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Details */}
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
                  <p className="text-gray-400 text-xs mt-2">
                    File ID: {thumbnail.file_id}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setThumbnail(null);
                      setDownloadError(null);
                    }}
                    className="py-2 px-4 bg-gray-600/50 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
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
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-white/10 text-center text-gray-400">
        <p>© 2024 AlphaGen AI. All rights reserved.</p>
      </footer>

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse" />
      </div>
    </div>
  );
};

export default ThumbnailGenerator;
