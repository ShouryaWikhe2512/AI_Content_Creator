"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br f from-slate-800 via-blue-800 to-slate-900  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center bg-white/10 backdrop-blur-lg px-10 py-8 rounded-3xl shadow-2xl border border-gray-700"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-500 drop-shadow-lg"
            >
              🚀 Educational Assessment
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-gray-300 mt-3"
            >
              Test your knowledge and discover your strengths
            </motion.p>

            {error ? (
              <div className="mt-6">
                <div className="p-4 bg-red-900/30 backdrop-blur-sm text-red-300 rounded-xl border border-red-700 mb-4 text-left">
                  <p className="font-medium mb-1">Error Loading Assessment</p>
                  <p className="text-sm">{error}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-transform"
                >
                  Try Again 🔄
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-transform"
              >
                Start Test 🚀
              </motion.button>
            )}
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? null : score === null ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-indigo-600 h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="p-6">
              {/* Domain navigation info */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">
                  Domain {currentDomain + 1} of {domains.length}:{" "}
                  <span className="font-medium text-indigo-700">
                    {currentDomainName}
                  </span>
                </span>
                <span className="text-sm font-medium text-indigo-600">
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
                    <h2 className="text-xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                      {currentDomainName} Domain
                    </h2>

                    <div className="space-y-8">
                      {currentDomainQuestions.map((q, questionIndex) => (
                        <div
                          key={questionIndex}
                          className="p-4 bg-gray-50 rounded-lg"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            {questionIndex + 1}. {q.question}
                          </h3>
                          <div className="space-y-3 ml-4">
                            {q.options.map((option, optIndex) => {
                              const label = optionLabels[optIndex];
                              const isSelected = answers[q.question] === label;

                              return (
                                <button
                                  key={optIndex}
                                  onClick={() =>
                                    handleAnswerSelect(q.question, label)
                                  }
                                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                    isSelected
                                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700"
                                      : "bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full mr-3 ${
                                        isSelected
                                          ? "bg-indigo-500 text-white"
                                          : "bg-gray-200 text-gray-700"
                                      }`}
                                    >
                                      {label}
                                    </div>
                                    <span>{option}</span>
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
                      className={`px-4 py-2 rounded-md ${
                        currentDomain === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      }`}
                    >
                      Previous Domain
                    </button>

                    {currentDomain < domains.length - 1 ? (
                      <button
                        onClick={nextDomain}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Next Domain
                      </button>
                    ) : (
                      <button
                        onClick={checkAnswers}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Finish Test
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
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Test Results
            </h2>

            {/* Score box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 mb-1">Your Score</p>
                  <p className="text-3xl font-bold text-indigo-900">
                    {score}{" "}
                    <span className="text-xl text-indigo-400">
                      / {questions.length}
                    </span>
                  </p>
                </div>
                <div className="w-24 h-24 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e0e7ff"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#4f46e5"
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
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-indigo-900">
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Domain Scores
              </h3>
              {Object.keys(charScore).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(charScore).map(([char, count]) => (
                    <div
                      key={char}
                      className={`p-4 rounded-lg border ${
                        char === topCharacteristic
                          ? "bg-green-50 border-green-200"
                          : char === weakestCharacteristic
                          ? "bg-orange-50 border-orange-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p
                            className={`font-medium text-base ${
                              char === topCharacteristic
                                ? "text-green-700"
                                : char === weakestCharacteristic
                                ? "text-orange-700"
                                : "text-gray-800"
                            }`}
                          >
                            {char}
                          </p>
                          <div className="flex items-center mt-1">
                            {char === topCharacteristic && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
                                Strongest
                              </span>
                            )}
                            {char === weakestCharacteristic && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mr-2">
                                Needs Improvement
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-700">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    No domain scores available. There might have been an issue
                    processing your answers.
                  </p>
                </div>
              )}
            </div>

            {/* Submit to API button */}
            <div className="mt-8">
              <button
                onClick={submitSkillRatings}
                disabled={submitStatus === "Submitting..."}
                className={`w-full py-3 px-4 rounded-lg transition-all duration-200 ${
                  submitStatus === "Submitting..."
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
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
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-green-50 text-green-800 border border-green-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className={`h-5 w-5 mr-2 ${
                        submitStatus.includes("Failed")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {submitStatus.includes("Failed") ? (
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      )}
                    </svg>
                    {submitStatus}
                  </div>
                </motion.div>
              )}
            </div>

            {/* View Recommendations button - Only show when submission is successful */}
            {submitStatus.includes("successfully") && (
              <a
                href="/course"
                className="mt-4 w-full py-3 px-4 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                View Course Recommendations
              </a>
            )}

            {/* If there was an API error, show a retry button */}
            {submitStatus.includes("Failed") && (
              <button
                onClick={submitSkillRatings}
                className="mt-3 w-full py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
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
              className="mt-4 w-full py-2 px-4 border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Take Another Test
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
