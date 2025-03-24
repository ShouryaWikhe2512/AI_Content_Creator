"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";

export default function ReelSyncUploader() {
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setVideoFile(fileURL);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-900 to-black p-6">
      {/* Video Upload Box */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative w-200 h-100 bg-black/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 flex items-center justify-center overflow-hidden ${
          dragActive ? "border-blue-400 shadow-blue-500/50 scale-105" : ""
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {/* Video Display or Placeholder */}
        {videoFile ? (
          <video
            ref={videoRef}
            src={videoFile}
            className="w-full h-full object-cover rounded-3xl"
            autoPlay
            loop
            muted
          />
        ) : (
          <motion.div
            className="flex flex-col items-center text-white text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Upload className="w-12 h-12 text-blue-400" />
            <p className="text-lg font-semibold mt-2">Drag & Drop Clips</p>
            <span className="text-xs text-gray-400">or click to upload</span>
          </motion.div>
        )}
      </motion.div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
      />

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="relative w-[500px] sm:w-[600px] h-28 mt-10 bg-black/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/10 flex items-center justify-center"
      >
        <div className="flex space-x-2 overflow-hidden px-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-20 h-16 bg-gray-800 rounded-lg overflow-hidden"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 10px rgba(0,0,255,0.5)",
              }}
            >
              <img
                src={`https://source.unsplash.com/100x100/?video,${i}`}
                alt={`Clip ${i}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Sync Line */}
        <motion.div
          className="absolute left-1/2 w-[2px] h-full bg-blue-400"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Title & Subtitle */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-6 text-3xl sm:text-5xl font-extrabold text-center leading-tight"
      >
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
          Upload Music & Clips,
        </span>
        <br />
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          Get A Beat-Synced Reel!
        </motion.span>
      </motion.h1>
      <br />
      <p className="text-gray-300 text-base sm:text-lg text-center mt-3 max-w-2xl mx-auto px-4">
        Simply upload your reel music and short clips—our AI-powered platform
        will
        <span className="text-blue-400 font-semibold"> auto-sync </span>
        them to the beats for a seamless edit!
      </p>
    </div>
  );
}
