"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BuildIcon from "@mui/icons-material/Build";
import RouteIcon from "@mui/icons-material/Route";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// Define types for our data structures
interface CourseRecommendation {
  "Course Title": string;
  Difficulty: string;
  Hours: number;
  Link: string;
  Rationale: string;
  "Key Learning Outcomes": string[];
}

interface ProfileAnalysis {
  strengths: string[];
  areas_for_improvement: string[];
  recommended_learning_path: string;
}

interface ApiResponse {
  recommendations: CourseRecommendation[];
  profile_analysis: ProfileAnalysis;
}

export default function CourseRecommendation() {
  const [recommendations, setRecommendations] = useState<
    CourseRecommendation[]
  >([]);
  const [profileAnalysis, setProfileAnalysis] =
    useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        setError(null);

        // Make the API call to get recommendations
        const response = await fetch(
          "http://127.0.0.1:8000/edu/course-recommendation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // You can pass any needed parameters here
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Validate the response data to ensure it has the expected structure
        if (
          !data ||
          !data.recommendations ||
          !Array.isArray(data.recommendations) ||
          !data.profile_analysis
        ) {
          throw new Error(
            "Invalid response format from the API. Please try again later."
          );
        }

        // Check if recommendations array is empty
        if (data.recommendations.length === 0) {
          throw new Error(
            "No course recommendations available. Our AI model might be having trouble processing your profile."
          );
        }

        setRecommendations(data.recommendations);
        setProfileAnalysis(data.profile_analysis);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching recommendations:", error);
        setError(
          error.message ||
            "Failed to load course recommendations. Please try again later."
        );
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  // Map difficulty to colors
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-900/40 text-green-300 border-green-500/50";
      case "intermediate":
        return "bg-blue-900/40 text-blue-300 border-blue-500/50";
      case "advanced":
        return "bg-purple-900/40 text-purple-300 border-purple-500/50";
      case "expert":
        return "bg-red-900/40 text-red-300 border-red-500/50";
      default:
        return "bg-gray-900/40 text-gray-300 border-gray-500/50";
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

      {/* Animated Background Lines */}
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

      {/* Colored Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-red-400 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-[120px]" />
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
                href="/edu"
                className="text-white hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <SchoolIcon fontSize="small" />
                <span>Assessment</span>
              </Link>
              <Link
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Features
              </Link>
            </div>

            {/* Right Side Elements */}
            <div className="flex items-center space-x-4">
              {/* Help Icon */}
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <HelpOutlineIcon className="text-sm" />
              </button>

              {/* Refresh Button */}
              <button
                onClick={() => window.location.reload()}
                className="text-gray-300 hover:text-white transition-colors"
                title="Refresh recommendations"
              >
                <RefreshIcon className="text-sm" />
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center p-[2px]">
                  <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center overflow-hidden">
                    <AccountCircleIcon className="text-white" />
                  </div>
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  Student
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Tooltip */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 z-50 bg-black/80 backdrop-blur-lg p-4 rounded-lg border border-purple-500/30 shadow-lg max-w-md"
          >
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-purple-400 font-semibold mb-2 flex items-center">
              <SchoolIcon className="mr-2" fontSize="small" />
              Course Recommendations Guide
            </h3>
            <ul className="text-sm text-gray-300 space-y-2 ml-4 list-disc">
              <li>
                These courses are personalized based on your assessment results
              </li>
              <li>The difficulty level is matched to your current knowledge</li>
              <li>Click on "View Course" to visit the course page</li>
              <li>
                Return to Assessment to retake the test and get new
                recommendations
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-gray-300 text-lg">
              Loading your personalized recommendations...
            </p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-red-400/30 max-w-2xl mx-auto text-center"
          >
            <div className="text-red-400 mb-4 text-5xl">
              <ErrorOutlineIcon sx={{ fontSize: 60 }} />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Error Loading Recommendations
            </h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                <RefreshIcon fontSize="small" />
                <span>Try Again</span>
              </button>
              <Link
                href="/edu"
                className="flex items-center justify-center space-x-2 bg-black/30 border border-purple-500/30 hover:bg-purple-900/20 text-white py-2 px-4 rounded-lg transition-all duration-200 mt-3 sm:mt-0"
              >
                <ArrowBackIcon fontSize="small" />
                <span>Back to Assessment</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-red-400 via-purple-300 to-blue-400 bg-clip-text drop-shadow-lg"
              >
                Your Learning Recommendations
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
              >
                Personalized courses based on your assessment results
              </motion.p>
            </div>

            {/* Profile Analysis */}
            {profileAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-300/20 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <AutoGraphIcon className="mr-3 text-purple-400" />
                  Your Learning Profile
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/30 border border-purple-500/30 rounded-xl p-5">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                      <StarIcon
                        className="mr-2 text-yellow-400"
                        fontSize="small"
                      />
                      Your Strengths
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profileAnalysis.strengths.length > 0 ? (
                        profileAnalysis.strengths.map((strength, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm font-medium border border-green-500/50"
                          >
                            {strength}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400">
                          Complete more assessments to discover your strengths.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-black/30 border border-purple-500/30 rounded-xl p-5">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                      <BuildIcon
                        className="mr-2 text-orange-400"
                        fontSize="small"
                      />
                      Areas for Growth
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profileAnalysis.areas_for_improvement.length > 0 ? (
                        profileAnalysis.areas_for_improvement.map(
                          (area, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange-900/30 text-orange-300 rounded-full text-sm font-medium border border-orange-500/50"
                            >
                              {area.replace("_", " ")}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-gray-400">
                          No specific areas for improvement identified yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-purple-500/30 rounded-xl p-5">
                  <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                    <RouteIcon
                      className="mr-2 text-blue-400"
                      fontSize="small"
                    />
                    Recommended Learning Path
                  </h3>
                  <p className="text-gray-300">
                    {profileAnalysis.recommended_learning_path}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Course Recommendations */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MenuBookIcon className="mr-3 text-purple-400" />
              Recommended Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {recommendations.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-300/20 shadow-lg hover:shadow-purple-500/10 hover:border-purple-300/30 transition-all"
                >
                  <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {course["Course Title"]}
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                          course.Difficulty
                        )}`}
                      >
                        {course.Difficulty}
                      </span>
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/50 flex items-center">
                        <AccessTimeIcon
                          className="mr-1"
                          sx={{ fontSize: 16 }}
                        />
                        {course.Hours} hours
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{course.Rationale}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
                        <CheckCircleIcon className="mr-2" fontSize="small" />
                        Key Learning Outcomes:
                      </h4>
                      <ul className="space-y-1 ml-5 text-gray-300">
                        {course["Key Learning Outcomes"].map((outcome, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={course.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg"
                    >
                      View Course
                      <ArrowForwardIcon className="ml-2" fontSize="small" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Back button */}
            <div className="flex justify-center mt-8">
              <Link
                href="/edu"
                className="inline-flex items-center px-6 py-3 bg-black/30 border border-purple-500/30 hover:bg-purple-900/20 text-white font-medium rounded-lg transition-colors"
              >
                <ArrowBackIcon className="mr-2" fontSize="small" />
                Back to Assessment
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 bg-black/20 backdrop-blur-sm mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 relative">
                <Image
                  src="/Logo.png"
                  alt="AlphaGen Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">
                Alpha<span className="text-purple-500">Gen</span>
              </span>
              <span className="text-xs text-gray-500">
                © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Settings
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
