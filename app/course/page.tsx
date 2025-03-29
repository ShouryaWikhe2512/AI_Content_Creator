"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl text-center border border-gray-700"
        >
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
          <p className="text-white">{error}</p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
            >
              Try Again
            </button>
            <a
              href="/edu"
              className="block w-full px-6 py-2 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-gray-700"
            >
              Back to Assessment
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 bg-white/10 backdrop-blur-lg px-10 py-8 rounded-3xl shadow-2xl border border-gray-700"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-500 drop-shadow-lg">
            Your Personalized Course Recommendations
          </h1>
          <p className="text-lg text-gray-300 mt-3">
            Based on your assessment results, we've curated the perfect courses
            for you
          </p>
        </motion.div>

        {profileAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Your Learning Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-5 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-blue-300">
                  Your Strengths
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileAnalysis.strengths.length > 0 ? (
                    profileAnalysis.strengths.map(
                      (strength: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-900/40 text-green-300 rounded-full text-sm font-medium border border-green-700"
                        >
                          {strength}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-gray-400">
                      No identified strengths yet. Complete more assessments to
                      discover them.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-amber-300">
                  Areas for Improvement
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileAnalysis.areas_for_improvement.length > 0 ? (
                    profileAnalysis.areas_for_improvement.map(
                      (area: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-900/40 text-amber-300 rounded-full text-sm font-medium border border-amber-700"
                        >
                          {area.replace("_", " ")}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-gray-400">
                      No areas for improvement identified yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/5 p-5 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-indigo-300">
                Recommended Learning Path
              </h3>
              <p className="text-gray-300">
                {profileAnalysis.recommended_learning_path}
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {course["Course Title"]}
                </h3>

                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm font-medium border border-blue-700">
                    {course.Difficulty}
                  </span>
                  <span className="px-3 py-1 bg-purple-900/40 text-purple-300 rounded-full text-sm font-medium border border-purple-700">
                    {course.Hours} hours
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{course.Rationale}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-indigo-300 mb-2">
                    Key Learning Outcomes:
                  </h4>
                  <ul className="space-y-1 ml-5 list-disc text-gray-300">
                    {course["Key Learning Outcomes"].map((outcome, i) => (
                      <li key={i}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={course.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
                >
                  View Course
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/edu"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-lg text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-gray-700"
          >
            Back to Assessment
          </a>
        </div>
      </div>
    </div>
  );
}
