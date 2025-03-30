"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";
import "@pqina/pintura/pintura.css";

// Add custom CSS for dashboard-like styling
const customStyles = `
  /* Global styling */
  body {
    background: #070112; /* Much darker background */
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
  
  /* Circle gradient overlay */
  .circle-gradient {
    position: absolute;
    width: 80vh;
    height: 80vh;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(10, 6, 40, 0) 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: -5;
  }
  
  /* Updated gradient to match the dashboard's dark purple theme */
  .PinturaRoot {
    background: linear-gradient(135deg, #0e0e24 0%, #2a1069 100%) !important;
    color: white !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 0 25px rgba(147, 51, 234, 0.3) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
  
  /* Custom styles for matching dashboard look */
  .app-container {
    min-height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .background-gradient {
    position: absolute;
    inset: 0;
    z-index: -10;
    background: linear-gradient(to bottom, #0a0217, #140336, #0a0217);
  }
  
  .main-content {
    padding: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .editor-container {
    background: linear-gradient(to bottom, rgba(147, 51, 234, 0.05), rgba(0, 0, 0, 0.2));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(147, 51, 234, 0.1);
    border-radius: 12px;
    height: 90vh;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(128, 90, 213, 0.15);
  }
  
  /* Navbar styling */
  .navbar {
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 0.75rem 1.5rem;
    position: relative;
    z-index: 20;
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6527b9, #9333ea);
    border-radius: 50%;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
  }
  
  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 9999px;
    padding: 0.375rem 1rem;
    width: 16rem;
  }
  
  .search-input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    color: white;
    font-size: 0.875rem;
  }
  
  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(to right, #6527b9, #9333ea);
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Navbar component
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Logo - Left Side */}
        <div className="logo-section">
          <Link href="/Dashboard" className="logo-section">
            <div className="logo">
              <Image
                src="/Logo.png"
                alt="AlphaGen Logo"
                width={40}
                height={40}
              />
            </div>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              Alpha<span style={{ color: "#9333ea" }}>Gen</span>
            </span>
          </Link>
        </div>

        {/* Nav Links - Center */}
        <div className="nav-links">
          <Link
            href="/Dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Features
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            How it Works
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Examples
          </a>
        </div>

        {/* Right Side Elements */}
        <div className="nav-right">
          {/* Search Bar */}
          <div className="search-bar">
            <span
              style={{ color: "rgba(255, 255, 255, 0.4)", marginRight: "8px" }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>

          {/* Help Icon */}
          <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>❓</span>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>🔔</span>
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "8px",
                height: "8px",
                backgroundColor: "#9333ea",
                borderRadius: "50%",
              }}
            ></span>
          </div>

          {/* Profile */}
          <div className="user-profile">
            <div className="avatar">
              <div className="avatar-inner">
                <span style={{ color: "white" }}>👤</span>
              </div>
            </div>
            <span>Guest</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WebEditor: React.FC = () => {
  const [inlineResult, setInlineResult] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000"
  );

  useEffect(() => {
    setIsClient(true);

    // Get image URL from query parameter if available
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get("imageUrl");
      if (urlParam) {
        setImageUrl(decodeURIComponent(urlParam));
      }
    }
  }, []);

  // Create custom editor config with dark blue gradient and proper theming
  const editorConfig = {
    ...getEditorDefaults(),
    theme: {
      // Use the dark theme as base
      base: "dark",
      // Override with custom colors
      colors: {
        backgroundPrimary: "linear-gradient(135deg, #0a0a2e 0%, #1e1884 100%)",
        foreground: "#ffffff",
        controlForeground: "#ffffff",
        controlActiveForeground: "#ffffff",
        controlActiveBackground: "rgba(255, 255, 255, 0.2)",
      },
    },
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden text-white bg-black">
      {/* Global CSS */}
      <style>{customStyles}</style>

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

      {/* Circle gradient overlay */}
      <div className="circle-gradient"></div>

      {/* Colored Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-fuchsia-400 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-400 opacity-30 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <Navbar />

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
              Image Editor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
            >
              Create and edit professional images with our powerful editor.
            </motion.p>
          </div>

          {/* Editor Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="editor-container"
          >
            {isClient && (
              <PinturaEditor
                {...editorConfig}
                src={imageUrl}
                onProcess={(res: { dest: Blob }) =>
                  setInlineResult(URL.createObjectURL(res.dest))
                }
              />
            )}
          </motion.div>

          {/* Processed Image Result */}
          {inlineResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 bg-black/30 backdrop-blur-md border border-purple-500/20 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Processed Result
              </h2>
              <img
                src={inlineResult}
                alt="Processed result"
                className="max-w-full rounded-lg"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2024 AlphaGen. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebEditor;
