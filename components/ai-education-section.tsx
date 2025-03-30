"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Lightbulb,
  Code,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import TypingAnimation from "./typing-animation_";
import GlowButton from "./glow-button";
import GlassmorphicCard from "./glassmorphic-card";
import CourseRecommendation from "./course-recommendation";

// Define test questions
const testQuestions = [
  {
    category: "Creativity",
    icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
    question:
      "Which approach would you take when faced with a completely novel problem?",
    options: [
      "Apply established methodologies from similar domains",
      "Brainstorm multiple unconventional solutions",
      "Research existing solutions and adapt them",
      "Break down the problem into smaller, manageable parts",
    ],
    correctAnswer: 1,
  },
  {
    category: "Strategic Thinking",
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    question:
      "When planning a complex project with limited resources, what's your first step?",
    options: [
      "Identify the most critical deliverables and prioritize them",
      "Gather more resources before beginning",
      "Start with the easiest tasks to build momentum",
      "Create a detailed timeline for all possible tasks",
    ],
    correctAnswer: 0,
  },
  {
    category: "Technical Proficiency",
    icon: <Code className="w-5 h-5 text-blue-400" />,
    question:
      "What's the most efficient approach to debugging a complex system?",
    options: [
      "Rewrite the problematic components from scratch",
      "Add extensive logging throughout the system",
      "Isolate components and test them individually",
      "Compare with previous working versions",
    ],
    correctAnswer: 2,
  },
];

// Define course recommendations
const courseRecommendations = {
  Creativity: [
    {
      title: "Design Thinking Masterclass",
      description:
        "Learn how to approach problems with innovative thinking and creative solutions.",
      level: "Intermediate",
      duration: "6 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Creative Problem Solving",
      description:
        "Develop techniques to think outside the box and generate unique ideas.",
      level: "Beginner",
      duration: "4 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  "Strategic Thinking": [
    {
      title: "Strategic Decision Making",
      description:
        "Master the art of making decisions with long-term vision and strategic impact.",
      level: "Advanced",
      duration: "8 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Systems Thinking Approach",
      description:
        "Learn to see patterns and interconnections in complex systems.",
      level: "Intermediate",
      duration: "5 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  "Technical Proficiency": [
    {
      title: "Advanced Software Architecture",
      description:
        "Design robust, scalable software systems with modern architectural patterns.",
      level: "Advanced",
      duration: "10 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Full-Stack Development Bootcamp",
      description:
        "Comprehensive training in modern web development technologies.",
      level: "Intermediate",
      duration: "12 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
};

export default function AiEducationSection() {
  const [currentState, setCurrentState] = useState<
    "intro" | "test" | "results"
  >("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<{ [key: string]: number }>({});
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const startTest = () => {
    setCurrentState("test");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults({});
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsTypingComplete(false);
    } else {
      // Calculate results
      const newResults: { [key: string]: number } = {};
      testQuestions.forEach((q, index) => {
        const category = q.category;
        const isCorrect = newAnswers[index] === q.correctAnswer;
        newResults[category] =
          (newResults[category] || 0) + (isCorrect ? 1 : 0);
      });
      setResults(newResults);
      setCurrentState("results");
    }
  };

  useEffect(() => {
    if (currentState === "results") {
      const timer = setTimeout(() => {
        setShowRecommendations(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#17002f] via-[#1a002f] to-[#080808] text-white">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full filter blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-repeat opacity-5"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            AI-Powered Skill Assessment
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto">
            Discover your strengths and unlock your potential with our
            cutting-edge AI assessment
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-5xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassmorphicCard className="p-8 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                      <Brain className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-100">
                      Why Take This Test?
                    </h2>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <p className="text-blue-100/90">
                      Our AI-powered assessment identifies your unique strengths
                      and areas for growth across three critical dimensions:
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <Lightbulb className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-300">
                            Creativity
                          </h3>
                          <p className="text-sm text-blue-100/70">
                            Measure your ability to generate innovative
                            solutions and think outside conventional boundaries.
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <Brain className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-300">
                            Strategic Thinking
                          </h3>
                          <p className="text-sm text-blue-100/70">
                            Evaluate how you approach complex problems and make
                            decisions with long-term impact.
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <Code className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-300">
                            Technical Proficiency
                          </h3>
                          <p className="text-sm text-blue-100/70">
                            Assess your technical knowledge and problem-solving
                            capabilities in practical scenarios.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <GlowButton onClick={startTest} className="w-full">
                      <span className="flex items-center justify-center">
                        Take the Test <ChevronRight className="ml-2 w-5 h-5" />
                      </span>
                    </GlowButton>
                  </div>
                </GlassmorphicCard>

                <GlassmorphicCard className="p-8 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-100">
                      AI-Powered Insights
                    </h2>
                  </div>

                  <div className="relative flex-grow">
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-blue-500/10 rounded-full filter blur-xl"></div>
                    <div className="absolute bottom-10 -left-5 w-16 h-16 bg-purple-500/10 rounded-full filter blur-xl"></div>

                    <div className="relative z-10 p-4 border border-blue-500/20 bg-blue-900/20 rounded-lg mb-6">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <p className="text-xs text-blue-300">AI Assistant</p>
                      </div>
                      <TypingAnimation
                        text="I'll analyze your responses to identify your unique strengths and provide personalized course recommendations to help you excel in your career."
                        className="text-sm text-blue-100/80"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm text-blue-100/80">
                          Receive personalized course recommendations
                        </p>
                      </div>

                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm text-blue-100/80">
                          Identify your cognitive strengths
                        </p>
                      </div>

                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm text-blue-100/80">
                          Discover areas for growth and improvement
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-center text-blue-100/70">
                      <span className="text-purple-300 font-semibold">93%</span>{" "}
                      of users report improved career focus after taking our
                      assessment
                    </p>
                  </div>
                </GlassmorphicCard>
              </div>
            </motion.div>
          )}

          {currentState === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl"
            >
              <GlassmorphicCard className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center mr-3">
                    {testQuestions[currentQuestionIndex].icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300">
                      {testQuestions[currentQuestionIndex].category}
                    </h3>
                    <p className="text-xs text-blue-400/70">
                      Question {currentQuestionIndex + 1} of{" "}
                      {testQuestions.length}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-32 h-2 bg-blue-900/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{
                          width: `${
                            ((currentQuestionIndex + 1) /
                              testQuestions.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <TypingAnimation
                    text={testQuestions[currentQuestionIndex].question}
                    className="text-xl text-blue-100"
                    speed={20}
                    onComplete={() => setIsTypingComplete(true)}
                  />
                </div>

                <AnimatePresence>
                  {isTypingComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-3"
                    >
                      {testQuestions[currentQuestionIndex].options.map(
                        (option, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <button
                              onClick={() => handleAnswer(index)}
                              className="w-full p-4 rounded-lg border border-blue-500/20 bg-blue-900/20 hover:bg-blue-800/30 hover:border-blue-400/40 transition-all duration-300 text-left group"
                            >
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full border border-blue-500/40 flex items-center justify-center mr-3 group-hover:border-blue-400 group-hover:bg-blue-900/40 transition-all duration-300">
                                  <span className="text-sm text-blue-400">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                </div>
                                <p className="text-blue-100/90 group-hover:text-blue-100 transition-colors duration-300">
                                  {option}
                                </p>
                              </div>
                            </button>
                          </motion.div>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassmorphicCard>
            </motion.div>
          )}

          {currentState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-5xl"
            >
              <GlassmorphicCard className="p-8">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 mb-4"
                  >
                    <Sparkles className="w-8 h-8 text-blue-300" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-100 mb-2">
                    Your Assessment Results
                  </h2>
                  <p className="text-blue-100/70 max-w-2xl mx-auto">
                    Based on your responses, our AI has analyzed your strengths
                    and areas for improvement
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {Object.keys(results).map((category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="p-6 rounded-lg bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20 h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            {category === "Creativity" && (
                              <Lightbulb className="w-5 h-5 text-yellow-400" />
                            )}
                            {category === "Strategic Thinking" && (
                              <Brain className="w-5 h-5 text-purple-400" />
                            )}
                            {category === "Technical Proficiency" && (
                              <Code className="w-5 h-5 text-blue-400" />
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-blue-100">
                            {category}
                          </h3>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-blue-300">Score</span>
                            <span className="text-xs font-medium text-blue-300">
                              {results[category]}/1
                            </span>
                          </div>
                          <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(results[category] / 1) * 100}%`,
                              }}
                              transition={{
                                duration: 0.8,
                                delay: 0.5 + index * 0.2,
                              }}
                            ></motion.div>
                          </div>
                        </div>

                        <p className="text-sm text-blue-100/70">
                          {results[category] === 1
                            ? `You demonstrate strong ${category.toLowerCase()} skills.`
                            : `There's room to improve your ${category.toLowerCase()} skills.`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {showRecommendations && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-blue-100 mb-4">
                          Recommended Courses
                        </h3>
                        <p className="text-blue-100/70 mb-6">
                          Based on your assessment, our AI has curated these
                          personalized course recommendations to help you excel
                        </p>

                        <div className="space-y-6">
                          {Object.keys(results).map((category) => (
                            <div key={category}>
                              <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                  {category === "Creativity" && (
                                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                                  )}
                                  {category === "Strategic Thinking" && (
                                    <Brain className="w-4 h-4 text-purple-400" />
                                  )}
                                  {category === "Technical Proficiency" && (
                                    <Code className="w-4 h-4 text-blue-400" />
                                  )}
                                </div>
                                <h4 className="text-md font-semibold text-blue-200">
                                  {category} Courses
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {courseRecommendations[category].map(
                                  (course, index) => (
                                    <CourseRecommendation
                                      key={index}
                                      course={course}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center mt-8">
                        <GlowButton
                          onClick={() => setCurrentState("intro")}
                          className="px-8"
                        >
                          Take Test Again
                        </GlowButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassmorphicCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
