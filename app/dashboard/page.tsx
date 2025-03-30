"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Sidebar Icons
import VideocamIcon from "@mui/icons-material/Videocam";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

// Widgets Icons
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import EditIcon from "@mui/icons-material/Edit";
import PaletteIcon from "@mui/icons-material/Palette";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import QuizIcon from "@mui/icons-material/Quiz";

// Navbar Icons
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import LandscapeIcon from "@mui/icons-material/Landscape";

// Import additional icon if needed
import YouTubeIcon from "@mui/icons-material/YouTube";

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const username = "Guest";
  const router = useRouter();

  // Function to navigate to feature pages
  const navigateToFeature = (path: string) => {
    router.push(path);
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Welcome, {username}
            </h1>
            <p className="mt-4 text-lg text-gray-300 mb-12">
              Get an overview of your tools and analytics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Music Video Sync",
                  icon: <MusicVideoIcon style={{ fontSize: "54px" }} />,
                  desc: "Sync your music to create engaging videos.",
                  onClick: () => navigateToFeature("/musicvidsync"),
                },
                {
                  title: "Text to Image",
                  icon: <ImageSearchIcon style={{ fontSize: "54px" }} />,
                  desc: "Convert your text prompts into stunning images.",
                  onClick: () => navigateToFeature("/text-to-image"),
                },
                {
                  title: "Text to Meme",
                  icon: <EmojiEmotionsIcon style={{ fontSize: "54px" }} />,
                  desc: "Generate memes from your text ideas.",
                  onClick: () => navigateToFeature("/text-to-meme"),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  onClick={item.onClick}
                  whileHover={{ scale: 1.03 }}
                  className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
                >
                  <div className="mb-5 text-purple-400">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case "video":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Video Tools
            </h1>
            <p className="mt-4 text-lg text-gray-300 mb-12">
              Explore our video creation and editing features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/musicvidsync")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <MusicVideoIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Music Video Sync
                </h3>
                <p className="mt-3 text-gray-300">
                  Create perfectly synchronized videos with music
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <TextSnippetIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Text to Video
                </h3>
                <p className="mt-3 text-gray-300">
                  Convert your ideas into video content.
                </p>
              </motion.div>
            </div>
          </div>
        );
      case "music":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Music Tools
            </h1>
            <p className="mt-4 text-lg text-gray-300 mb-12">
              Generate original music from your text ideas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <MusicNoteIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Text to Music
                </h3>
                <p className="mt-3 text-gray-300">
                  Transform your words into beautiful melodies.
                </p>
              </motion.div>
            </div>
          </div>
        );
      case "image":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Image Tools
            </h1>
            <p className="mt-4 text-lg text-gray-300 mb-12">
              Create stunning visuals from text descriptions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/text-to-image")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <ImageSearchIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Text to Image
                </h3>
                <p className="mt-3 text-gray-300">
                  Generate images directly from your ideas.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/text-to-meme")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <EmojiEmotionsIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Text to Meme
                </h3>
                <p className="mt-3 text-gray-300">
                  Create hilarious memes from text prompts.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/text-to-gibbly")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <LandscapeIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Ghibli-Style Art Generator
                </h3>
                <p className="mt-3 text-gray-300">
                  Create dreamy Ghibli-inspired artwork.
                </p>
              </motion.div>

              {/* New YouTube Thumbnail Generator Option */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/text-to-thumbnail")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <YouTubeIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  YouTube Thumbnail Generator
                </h3>
                <p className="mt-3 text-gray-300">
                  Create eye-catching thumbnails for your videos.
                </p>
              </motion.div>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Analytics
            </h1>
            <p className="mt-4 text-lg text-gray-300 mb-12">
              Dive deep into your content performance across platforms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/analytics")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <AssessmentIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  YouTube Analytics
                </h3>
                <p className="mt-3 text-gray-300">
                  Monitor your channel's performance on YouTube.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/analytics-chatbot")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <QuizIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  YouTube Analytics Chatbot
                </h3>
                <p className="mt-3 text-gray-300">
                  Ask questions about your YouTube performance.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/analytics-report")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <InsertChartIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  YouTube Analytics Report
                </h3>
                <p className="mt-3 text-gray-300">
                  Generate and download comprehensive PDF reports.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <InsertChartIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Instagram Analytics
                </h3>
                <p className="mt-3 text-gray-300">
                  Track engagement and growth on Instagram.
                </p>
              </motion.div>
            </div>
          </div>
        );
      case "learnings":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Learnings
            </h1>
            <p className="mt-4 text-lg text-gray-300 mb-12">
              Enhance your skills with interactive tests and curated courses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/edu")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <QuizIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Skill Assessment
                </h3>
                <p className="mt-3 text-gray-300">
                  Assess your knowledge with challenging tests.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => navigateToFeature("/course")}
                className="backdrop-blur-xl bg-gradient-to-b from-purple-900/10 to-black/20 border border-purple-500/20 p-8 rounded-xl text-center flex flex-col items-center shadow-[0_4px_20px_rgba(128,90,213,0.15)] cursor-pointer hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="mb-5 text-purple-400">
                  <SchoolIcon style={{ fontSize: "54px" }} />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Recommended Courses
                </h3>
                <p className="mt-3 text-gray-300">
                  Discover courses tailored to your interests and goals.
                </p>
              </motion.div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Welcome, {username}
            </h1>
          </div>
        );
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

        {/* Animated wave container */}
        <div className="absolute inset-0 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className="opacity-30"
          >
            <defs>
              <linearGradient
                id="wave-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {Array.from({ length: 3 }).map((_, i) => (
              <path
                key={`wave-${i}`}
                d="M-100 55 C 150 90, 350 15, 500 55 C 650 90, 850 15, 1000 55 L 1000 150 L -100 150 Z"
                fill="none"
                stroke="url(#wave-gradient)"
                strokeWidth="1"
                style={{
                  transform: `translateY(${i * 200}px) scale(2)`,
                  opacity: 0.5 - i * 0.1,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

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
              <a
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Examples
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Pricing
              </a>
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

      <div className="relative z-10 flex flex-col sm:flex-row pt-4">
        {/* Floating Sidebar */}
        <div className="sm:w-1/5 sm:sticky sm:top-4 sm:h-[calc(100vh-5rem)] sm:self-start">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sm:h-full p-6 space-y-6 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl m-4 shadow-xl
                      shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
          >
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            <nav className="space-y-6">
              {[
                {
                  label: "Dashboard",
                  icon: <RocketLaunchIcon />,
                  view: "dashboard",
                },
                { label: "Video", icon: <VideocamIcon />, view: "video" },
                { label: "Music", icon: <MusicNoteIcon />, view: "music" },
                { label: "Image", icon: <ImageIcon />, view: "image" },
                {
                  label: "Analytics",
                  icon: <AnalyticsIcon />,
                  view: "analytics",
                },
                { label: "Learnings", icon: <SchoolIcon />, view: "learnings" },
              ].map(({ label, icon, view }, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCurrentView(view)}
                  className={`flex items-center space-x-3 text-lg w-full p-3 rounded-lg transition-all duration-200
                              ${
                                currentView === view
                                  ? "bg-purple-500/20 text-white font-medium"
                                  : "bg-white/5 text-white hover:bg-white/10"
                              }`}
                >
                  <div className="w-8 flex justify-center text-purple-400">
                    {icon}
                  </div>
                  <span>{label}</span>
                  {currentView === view && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-6 bg-purple-500 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
            <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 text-lg text-white w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-8 flex justify-center text-purple-400">
                  <SettingsIcon />
                </div>
                <span>Settings</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 text-lg text-red-400 hover:text-red-300 w-full p-3 rounded-lg bg-red-500/5 hover:bg-red-500/10 transition-all duration-200"
              >
                <div className="w-8 flex justify-center">
                  <LogoutIcon />
                </div>
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-7">
          <div className="bg-gradient-to-b from-purple-900/5 to-black/20 backdrop-blur-md border border-purple-500/10 rounded-xl p-6 shadow-lg h-[97%] overflow-y-auto">
            {renderContent()}
          </div>

          {/* Page Credits */}
          <div className="mt-8 text-center text-xs text-gray-300">
            <p>© 2023 AlphaGen. All rights reserved.</p>
          </div>
        </main>
      </div>

      {/* Inline CSS for Keyframes */}
      <style jsx>{`
        @keyframes waveAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        :global(body) {
          background: #0f0121;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
