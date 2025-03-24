// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return <SignUp />;
// }
"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden px-4 sm:px-6">
      {/* Animated AI Glow Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"></div>

      {/* Floating AI Particles - Scaled Down for Mobile */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-blue-500 opacity-50 rounded-full blur-3xl top-10 left-10"
      ></motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-pink-500 opacity-40 rounded-full blur-3xl bottom-10 right-10"
      ></motion.div>

      {/* Sign-Up Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md sm:max-w-lg bg-black/40 border border-white/20 shadow-lg backdrop-blur-md rounded-2xl p-6 sm:p-10"
      >
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          🚀 Join <span className="text-blue-400">AI Creator Hub</span>
        </h1>

        <p className="text-gray-300 text-center text-sm sm:text-base mb-4">
          Create your account and start generating amazing AI-powered content!
        </p>

        {/* Clerk Sign-Up Component */}
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#6366f1", // AI-inspired color for buttons & links
              colorBackground: "black",
              colorText: "white",
              colorInputBackground: "rgba(255,255,255,0.1)",
              colorInputText: "white",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
