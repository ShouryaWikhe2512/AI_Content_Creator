// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  FileDown,
  RefreshCw,
  Calendar,
  Check,
  Loader2,
} from "lucide-react";

// Sidebar component (reused from other pages)
const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-[#14112d] min-h-screen border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image src="/Logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-white">
            Alpha<span className="text-purple-400">Gen</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          <Link
            href="/Dashboard"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
            </div>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/analytics-chatbot"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span>Analytics Chatbot</span>
          </Link>

          <Link
            href="/analytics-report"
            className="flex items-center gap-3 p-3 rounded-lg bg-purple-600 text-white transition-all"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <span>Analytics Report</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

// Report option interface
interface ReportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const YouTubeAnalyticsReport = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timeRange, setTimeRange] = useState<number>(30);

  // Report options
  const reportOptions: ReportOption[] = [
    {
      id: "performance",
      title: "Channel Performance",
      description:
        "Overall channel metrics, growth trends, and key performance indicators",
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ),
    },
    {
      id: "content",
      title: "Content Analysis",
      description:
        "In-depth analysis of your videos, top performers, and content strategy recommendations",
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      ),
    },
    {
      id: "audience",
      title: "Audience Insights",
      description:
        "Demographics, viewing habits, and audience engagement patterns",
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      id: "comprehensive",
      title: "Comprehensive Report",
      description:
        "All-inclusive analysis with performance metrics, content analysis, and audience insights",
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("comprehensive");

  const handleGenerateReport = async () => {
    try {
      setGenerating(true);
      setError(null);
      setSuccess(false);

      // Make API request to generate report
      const response = await fetch(
        `http://localhost:8000/analytics/generate-report?analysis_type=youtube_analytics&time_range=${timeRange}&report_type=${selectedOption}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to generate report. Status: ${response.status}`
        );
      }

      // If response is a blob (PDF)
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;

      // Set the download attribute with the filename
      const filename = `youtube-analytics-report-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      link.setAttribute("download", filename);

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to generate report");
      console.error("API Error:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0c0a1d] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#14112d]/60 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="md:hidden text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold">YouTube Analytics Report</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-red-400 via-purple-300 to-blue-400 bg-clip-text drop-shadow-lg"
              >
                YouTube Analytics Report Generator
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
              >
                Generate comprehensive PDF reports of your YouTube channel
                performance
              </motion.p>
            </div>

            {/* Report Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#14112d]/60 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Select Report Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedOption === option.id
                        ? "bg-purple-600/30 border-2 border-purple-500"
                        : "bg-black/30 border border-purple-500/20 hover:bg-purple-500/10"
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div
                      className={`text-purple-400 mt-1 ${
                        selectedOption === option.id ? "text-purple-300" : ""
                      }`}
                    >
                      {option.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{option.title}</h3>
                        {selectedOption === option.id && (
                          <Check className="w-4 h-4 ml-2 text-purple-300" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Time Range Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#14112d]/60 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                <h2 className="text-xl font-semibold">Time Range</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 7, label: "Last 7 Days" },
                  { value: 30, label: "Last 30 Days" },
                  { value: 90, label: "Last 90 Days" },
                  { value: 180, label: "Last 6 Months" },
                ].map((range) => (
                  <button
                    key={range.value}
                    className={`py-2 px-4 rounded-lg transition-all duration-200 ${
                      timeRange === range.value
                        ? "bg-purple-600 text-white"
                        : "bg-black/30 text-gray-300 hover:bg-purple-500/20"
                    }`}
                    onClick={() => setTimeRange(range.value)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={handleGenerateReport}
                disabled={generating}
                className={`flex items-center justify-center mx-auto px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                  generating
                    ? "bg-purple-700/50 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileDown className="w-5 h-5 mr-2" />
                    Generate & Download PDF Report
                  </>
                )}
              </button>

              {error && (
                <p className="mt-4 text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  {error}
                </p>
              )}

              {success && (
                <p className="mt-4 text-green-400 bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                  Report generated and downloaded successfully!
                </p>
              )}
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-700/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">
                About YouTube Analytics Reports
              </h3>
              <p className="text-gray-300">
                Our AI-powered reports analyze your YouTube channel performance
                and provide actionable insights to help grow your audience.
                Reports include visualizations, trend analysis, and
                recommendations customized to your content strategy.
              </p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-400">Format</p>
                  <p className="text-purple-400 font-medium">PDF Document</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-400">Data Source</p>
                  <p className="text-purple-400 font-medium">YouTube API</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-400">AI Enhanced</p>
                  <p className="text-purple-400 font-medium">Yes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeAnalyticsReport;
