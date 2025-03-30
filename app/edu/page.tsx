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
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

export default function Page() {
  interface Question {
    question: string;
    options: string[];
    correct_answer: string;
    characteristic: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [charScore, setCharScore] = useState<Record<string, number>>({});
  const [topCharacteristic, setTopCharacteristic] = useState<string>("");
  const [weakestCharacteristic, setWeakestCharacteristic] =
    useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [currentDomain, setCurrentDomain] = useState(0);
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState<string[]>([]);
  const [questionsByDomain, setQuestionsByDomain] = useState<
    Record<string, Question[]>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://127.0.0.1:8000/edu/mcq-test");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Validate the response data structure
        if (
          !data ||
          !data.response ||
          !data.response.questions ||
          !Array.isArray(data.response.questions)
        ) {
          throw new Error(
            "Invalid response format from the API. Please try again later."
          );
        }

        // Check if questions array is empty
        if (data.response.questions.length === 0) {
          throw new Error(
            "No assessment questions available. Please try again later."
          );
        }

        const allQuestions = data.response.questions;

        // Validate each question has the required fields
        for (const question of allQuestions) {
          if (
            !question.question ||
            !question.options ||
            !Array.isArray(question.options) ||
            !question.correct_answer ||
            !question.characteristic
          ) {
            throw new Error(
              "Invalid question format in API response. Please try again later."
            );
          }
        }

        setQuestions(allQuestions);

        // Group questions by domain (characteristic)
        const domainMap: Record<string, Question[]> = {};
        allQuestions.forEach((q: Question) => {
          if (!domainMap[q.characteristic]) {
            domainMap[q.characteristic] = [];
          }
          domainMap[q.characteristic].push(q);
        });

        setQuestionsByDomain(domainMap);
        setDomains(Object.keys(domainMap));
      } catch (error: any) {
        console.error("Fetch error:", error);
        setError(
          error.message ||
            "Failed to load assessment questions. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Maps indexes to A, B, C, D
  const optionLabels = ["A", "B", "C", "D"];

  // Handle answer selection
  function handleAnswerSelect(question: string, selectedOption: string) {
    setAnswers((prev) => ({
      ...prev,
      [question]: selectedOption,
    }));
  }

  // Next domain handler
  function nextDomain() {
    if (currentDomain < domains.length - 1) {
      setCurrentDomain((prev) => prev + 1);
    }
  }

  // Previous domain handler
  function prevDomain() {
    if (currentDomain > 0) {
      setCurrentDomain((prev) => prev - 1);
    }
  }

  // Check answers & calculate score
  function checkAnswers() {
    let correctCount = 0;
    let characteristicCount: Record<string, number> = {};

    // Initialize all characteristics with 0
    questions.forEach((q) => {
      if (!characteristicCount[q.characteristic]) {
        characteristicCount[q.characteristic] = 0;
      }
    });

    questions.forEach((q) => {
      if (answers[q.question] === q.correct_answer) {
        correctCount++;

        // Count correct answers per characteristic
        characteristicCount[q.characteristic] += 1;
      }
    });

    setScore(correctCount);
    setCharScore(characteristicCount);

    // Find the strongest characteristic
    const characteristics = Object.keys(characteristicCount);
    if (characteristics.length > 0) {
      let topChar = characteristics.reduce(
        (a, b) => (characteristicCount[a] > characteristicCount[b] ? a : b),
        characteristics[0]
      );
      setTopCharacteristic(topChar);

      // Find the weakest characteristic
      let weakestChar = characteristics.reduce(
        (a, b) => (characteristicCount[a] < characteristicCount[b] ? a : b),
        characteristics[0]
      );
      setWeakestCharacteristic(weakestChar);
    }
  }

  // Submit results to skill ratings API
  async function submitSkillRatings() {
    try {
      setSubmitStatus("Submitting...");
      setError(null);

      // Define the payload type with string index signature
      type SkillRatingsPayload = {
        creative: string;
        engagement: string;
        technical_proficiency: string;
        strategic_thinking: string;
        clarity: string;
      };

      // Initialize all fields with "0" to ensure complete data submission
      const payload: SkillRatingsPayload = {
        creative: "0",
        engagement: "0",
        technical_proficiency: "0",
        strategic_thinking: "0",
        clarity: "0",
      };

      // Map characteristic names from the assessment to API field names
      const characteristicToApiField: Record<
        string,
        keyof SkillRatingsPayload
      > = {
        creativity: "creative",
        engagement: "engagement",
        technical_proficiency: "technical_proficiency",
        strategic_thinking: "strategic_thinking",
        clarity: "clarity",
      };

      // Update payload with actual scores
      Object.entries(charScore).forEach(([characteristic, score]) => {
        const normalizedChar = characteristic.toLowerCase().trim();
        const apiField = characteristicToApiField[normalizedChar];

        if (apiField && apiField in payload) {
          payload[apiField] = score.toString();
          console.log(`Mapped ${characteristic} (${score}) to ${apiField}`);
        } else {
          console.warn(
            `No mapping found for characteristic: ${characteristic}`
          );
        }
      });

      console.log("Submitting skill ratings payload:", payload);

      const response = await fetch("http://127.0.0.1:8000/edu/skill-ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Validate response if needed
      const data = await response.json();
      if (!data || data.error) {
        throw new Error(
          data.error || "Error submitting skills. Please try again."
        );
      }

      setSubmitStatus("Skills rating submitted successfully!");
    } catch (error: any) {
      console.error("API error:", error);
      setSubmitStatus(`Failed to submit: ${error.message}`);
    }
  }

  // Calculate progress
  const progress =
    questions.length > 0
      ? Math.round((Object.keys(answers).length / questions.length) * 100)
      : 0;

  // Get current domain questions
  const currentDomainName = domains[currentDomain] || "";
  const currentDomainQuestions = questionsByDomain[currentDomainName] || [];

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
                title="Reload assessment"
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
              <CancelIcon fontSize="small" />
            </button>
            <h3 className="text-purple-400 font-semibold mb-2 flex items-center">
              <SchoolIcon className="mr-2" fontSize="small" />
              Assessment Guide
            </h3>
            <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>
                Answer all the questions in each domain to the best of your
                ability
              </li>
              <li>
                Navigate between domains using the Previous and Next buttons
              </li>
              <li>
                After completing all domains, click "Finish Test" to see your
                results
              </li>
              <li>
                Submit your skills rating to get personalized course
                recommendations
              </li>
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-red-400 via-purple-300 to-blue-400 bg-clip-text drop-shadow-lg"
            >
              Educational Assessment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
            >
              Test your knowledge and discover your strengths
            </motion.p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-gray-300 text-lg">
                Loading assessment questions...
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
                Error Loading Assessment
              </h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
                >
                  <RefreshIcon fontSize="small" />
                  <span>Try Again</span>
                </button>
              </div>
            </motion.div>
          ) : score === null ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-purple-300/20"
            >
              {/* Progress bar */}
              <div className="w-full bg-black/30 h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="p-6">
                {/* Domain navigation info */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-300">
                    Domain {currentDomain + 1} of {domains.length}:{" "}
                    <span className="font-medium text-purple-400">
                      {currentDomainName}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-purple-400">
                    {progress}% Complete
                  </span>
                </div>

                {domains.length > 0 && (
                  <div>
                    {/* Current domain questions */}
                    <motion.div
                      key={currentDomain}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8"
                    >
                      <h2 className="text-xl font-bold text-white mb-5 pb-2 border-b border-purple-500/30">
                        {currentDomainName} Domain
                      </h2>

                      <div className="space-y-8">
                        {currentDomainQuestions.map((q, questionIndex) => (
                          <div
                            key={questionIndex}
                            className="p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/20"
                          >
                            <h3 className="text-lg font-semibold text-white mb-3">
                              <span className="inline-block w-8 h-8 bg-purple-600/50 rounded-full text-center leading-8 mr-2">
                                {questionIndex + 1}
                              </span>
                              {q.question}
                            </h3>
                            <div className="space-y-3 ml-4 mt-4">
                              {q.options.map((option, optIndex) => {
                                const label = optionLabels[optIndex];
                                const isSelected =
                                  answers[q.question] === label;

                                return (
                                  <button
                                    key={optIndex}
                                    onClick={() =>
                                      handleAnswerSelect(q.question, label)
                                    }
                                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                      isSelected
                                        ? "bg-purple-900/50 border border-purple-500/80 text-white"
                                        : "bg-black/30 border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-900/20"
                                    }`}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full mr-3 ${
                                          isSelected
                                            ? "bg-purple-600 text-white"
                                            : "bg-black/50 text-gray-300 border border-gray-600"
                                        }`}
                                      >
                                        {label}
                                      </div>
                                      <span className="text-gray-200">
                                        {option}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={prevDomain}
                        disabled={currentDomain === 0}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                          currentDomain === 0
                            ? "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                            : "bg-black/40 text-white border border-purple-500/30 hover:bg-purple-900/20"
                        }`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 10H5M5 10L10 15M5 10L10 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Previous Domain</span>
                      </button>

                      {currentDomain < domains.length - 1 ? (
                        <button
                          onClick={nextDomain}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center space-x-2"
                        >
                          <span>Next Domain</span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 10H15M15 10L10 5M15 10L10 15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={checkAnswers}
                          className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg flex items-center space-x-2"
                        >
                          <SportsScoreIcon fontSize="small" className="mr-2" />
                          <span>Finish Test</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-300/20 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <AssessmentIcon className="mr-3 text-purple-400" />
                Your Assessment Results
              </h2>

              {/* Score box */}
              <div className="bg-black/30 border border-purple-500/30 rounded-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-400 mb-1">Your Score</p>
                    <p className="text-3xl font-bold text-white">
                      {score}{" "}
                      <span className="text-xl text-purple-300">
                        / {questions.length}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {Math.round(
                        ((score || 0) / Math.max(questions.length, 1)) * 100
                      )}
                      % correct answers
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 w-32 h-32 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#2A2A3F"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradientScore)"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={
                          2 *
                          Math.PI *
                          45 *
                          (1 - (score || 0) / Math.max(questions.length, 1))
                        }
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient
                          id="gradientScore"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#8054FA" />
                          <stop offset="100%" stopColor="#4F82F7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {Math.round(
                          ((score || 0) / Math.max(questions.length, 1)) * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Characteristics */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <TrendingUpIcon className="mr-2 text-blue-400" />
                  Your Domain Proficiency
                </h3>
                {Object.keys(charScore).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(charScore).map(([char, count]) => (
                      <div
                        key={char}
                        className={`p-4 rounded-lg border ${
                          char === topCharacteristic
                            ? "bg-green-900/20 border-green-500/50"
                            : char === weakestCharacteristic
                            ? "bg-orange-900/20 border-orange-500/50"
                            : "bg-black/40 border-purple-500/30"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p
                              className={`font-medium text-base ${
                                char === topCharacteristic
                                  ? "text-green-400"
                                  : char === weakestCharacteristic
                                  ? "text-orange-400"
                                  : "text-white"
                              }`}
                            >
                              {char}
                            </p>
                            <div className="flex items-center mt-1">
                              {char === topCharacteristic && (
                                <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded-full mr-2 border border-green-500/50">
                                  Strongest
                                </span>
                              )}
                              {char === weakestCharacteristic && (
                                <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded-full mr-2 border border-orange-500/50">
                                  Needs Improvement
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-white">
                              {count}
                            </span>
                            <span className="text-xs text-gray-400">
                              {Math.round(
                                (count /
                                  (questionsByDomain[char]?.length || 1)) *
                                  100
                              )}
                              % correct
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-black/30 rounded-lg border border-red-500/30">
                    <p className="text-red-400">
                      No domain scores available. There might have been an issue
                      processing your answers.
                    </p>
                  </div>
                )}
              </div>

              {/* Recommendations and Insights */}
              <div className="mt-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <EmojiEventsIcon className="mr-2 text-yellow-400" />
                  Your Personalized Insights
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/30 rounded-lg p-5 border border-purple-500/30">
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                      <CheckCircleIcon
                        className="mr-2 text-green-400"
                        fontSize="small"
                      />
                      Strengths
                    </h4>
                    <p className="text-gray-300 mb-4">
                      You excel in{" "}
                      <span className="text-green-400 font-medium">
                        {topCharacteristic}
                      </span>{" "}
                      with a solid understanding of core concepts.
                    </p>
                    <div className="text-sm text-gray-400">
                      <p>
                        Recommendation: Continue advancing your skills in this
                        area to become an expert.
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-5 border border-purple-500/30">
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                      <MenuBookIcon
                        className="mr-2 text-orange-400"
                        fontSize="small"
                      />
                      Areas for Growth
                    </h4>
                    <p className="text-gray-300 mb-4">
                      You might benefit from more practice in{" "}
                      <span className="text-orange-400 font-medium">
                        {weakestCharacteristic}
                      </span>
                      .
                    </p>
                    <div className="text-sm text-gray-400">
                      <p>
                        Recommendation: Focus on improving this area with
                        targeted learning resources.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-5 border border-purple-500/30">
                  <h4 className="text-lg font-medium text-white mb-3">
                    Overall Assessment
                  </h4>
                  <p className="text-gray-300">
                    Based on your performance, you've demonstrated a good
                    understanding of{" "}
                    {Math.round(((score || 0) / questions.length) * 100)}% of
                    the assessed content.
                    {(score || 0) / questions.length > 0.7
                      ? " Your strong performance indicates readiness for advanced topics."
                      : (score || 0) / questions.length > 0.4
                      ? " You have a solid foundation but could benefit from reviewing specific areas."
                      : " Consider revisiting fundamental concepts to strengthen your understanding."}
                  </p>
                </div>
              </div>

              {/* Submit to API button */}
              <div className="mt-8">
                <button
                  onClick={submitSkillRatings}
                  disabled={submitStatus === "Submitting..."}
                  className={`w-full py-3 px-4 rounded-lg transition-all duration-200 ${
                    submitStatus === "Submitting..."
                      ? "bg-gray-600/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  } text-white font-medium shadow-md`}
                >
                  {submitStatus === "Submitting..." ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Skill Ratings"
                  )}
                </button>

                {submitStatus && submitStatus !== "Submitting..." && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 rounded-lg ${
                      submitStatus.includes("Failed")
                        ? "bg-red-900/30 text-red-400 border border-red-500/50"
                        : "bg-green-900/30 text-green-400 border border-green-500/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus.includes("Failed") ? (
                        <ErrorOutlineIcon
                          className="text-red-400 mr-2"
                          fontSize="small"
                        />
                      ) : (
                        <CheckCircleIcon
                          className="text-green-400 mr-2"
                          fontSize="small"
                        />
                      )}
                      {submitStatus}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* View Recommendations button - Only show when submission is successful */}
              {submitStatus.includes("successfully") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href="/course"
                    className="mt-4 w-full py-3 px-4 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    <SchoolIcon className="mr-2" />
                    View Course Recommendations
                  </a>
                </motion.div>
              )}

              {/* If there was an API error, show a retry button */}
              {submitStatus.includes("Failed") && (
                <button
                  onClick={submitSkillRatings}
                  className="mt-3 w-full py-2 px-4 border border-red-500/50 text-red-400 bg-black/20 rounded-lg hover:bg-red-900/20 transition-colors"
                >
                  <RefreshIcon className="mr-1" fontSize="small" />
                  Try Submitting Again
                </button>
              )}

              {/* Restart Test button */}
              <button
                onClick={() => {
                  setScore(null);
                  setAnswers({});
                  setCharScore({});
                  setCurrentDomain(0);
                  setSubmitStatus("");
                }}
                className="mt-4 w-full py-2 px-4 border border-purple-500/30 text-white bg-black/20 rounded-lg hover:bg-purple-900/20 transition-colors"
              >
                Take Another Test
              </button>
            </motion.div>
          )}
        </div>
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
