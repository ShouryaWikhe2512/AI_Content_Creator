"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

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

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const username = "Guest";

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Welcome, {username}
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Get an overview of your tools and analytics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "Text to Video",
                  icon: (
                    <TextSnippetIcon className="text-yellow-400 text-4xl" />
                  ),
                  desc: "Convert your text prompts into engaging videos.",
                },
                {
                  title: "Video Syncing",
                  icon: <AnalyticsIcon className="text-purple-400 text-4xl" />,
                  desc: "Synchronize your video tracks effortlessly.",
                  onClick: () => setCurrentView("video"),
                },
                {
                  title: "Video Editor",
                  icon: <VideoLibraryIcon className="text-blue-400 text-4xl" />,
                  desc: "Edit and enhance your videos with powerful tools.",
                  onClick: () => setCurrentView("video"),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  onClick={item.onClick}
                  className={`bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl transition-transform hover:scale-105 ${
                    item.onClick ? "cursor-pointer" : ""
                  }`}
                >
                  {item.icon}
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-300">{item.desc}</p>
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
            <p className="mt-4 text-lg text-gray-300">
              Explore our video creation and editing features.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <TextSnippetIcon className="text-yellow-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Text to Video
                </h3>
                <p className="mt-2 text-gray-300">
                  Convert your ideas into video content.
                </p>
              </motion.div>
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <VideoLibraryIcon className="text-blue-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Video Editor
                </h3>
                <p className="mt-2 text-gray-300">
                  Edit your videos with intuitive tools.
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
            <p className="mt-4 text-lg text-gray-300">
              Generate original music from your text ideas.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-12">
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <MusicNoteIcon className="text-pink-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Text to Music
                </h3>
                <p className="mt-2 text-gray-300">
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
            <p className="mt-4 text-lg text-gray-300">
              Create stunning visuals from text descriptions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <ImageSearchIcon className="text-green-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Text to Image
                </h3>
                <p className="mt-2 text-gray-300">
                  Generate images directly from your ideas.
                </p>
              </motion.div>
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <EditIcon className="text-blue-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Image Editor
                </h3>
                <p className="mt-2 text-gray-300">
                  Refine your images with powerful editing tools.
                </p>
              </motion.div>
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <PaletteIcon className="text-purple-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Thumbnail & Art
                </h3>
                <p className="mt-2 text-gray-300">
                  Create custom thumbnails and artwork.
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
            <p className="mt-4 text-lg text-gray-300">
              Dive deep into your content performance across platforms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <AssessmentIcon className="text-red-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  YouTube Analytics
                </h3>
                <p className="mt-2 text-gray-300">
                  Monitor your channel's performance on YouTube.
                </p>
              </motion.div>
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <InsertChartIcon className="text-green-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Instagram Analytics
                </h3>
                <p className="mt-2 text-gray-300">
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
            <p className="mt-4 text-lg text-gray-300">
              Enhance your skills with interactive tests and curated courses.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <QuizIcon className="text-orange-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Give Test
                </h3>
                <p className="mt-2 text-gray-300">
                  Assess your knowledge with challenging tests.
                </p>
              </motion.div>
              <motion.div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl cursor-pointer">
                <SchoolIcon className="text-blue-400 text-4xl" />
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Recommended Courses
                </h3>
                <p className="mt-2 text-gray-300">
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
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#17002f] via-[#1a002f] to-[#1a002f]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Colored Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-500 opacity-40 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500 opacity-40 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500 opacity-40 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside className="sm:w-1/5 p-6 space-y-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl m-4 shadow-xl">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center">
            My Dashboard
          </h2>
          <nav className="space-y-6">
            {[
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
              <button
                key={index}
                onClick={() => setCurrentView(view)}
                className="flex items-center justify-center space-x-3 text-lg hover:text-purple-400 transition-transform hover:scale-105 w-full cursor-pointer"
              >
                {icon} <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="space-y-6">
            <button className="flex items-center justify-center space-x-3 text-lg hover:text-purple-400 w-full cursor-pointer">
              <SettingsIcon /> <span>Settings</span>
            </button>
            <button className="flex items-center justify-center space-x-3 text-lg text-red-500 hover:text-red-400 w-full cursor-pointer">
              <LogoutIcon /> <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">{renderContent()}</main>
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
      `}</style>
    </div>
  );
};

export default Dashboard;
