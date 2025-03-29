// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";

// const DraggableText = ({ text }: { text: string }) => {
//   return (
//     <motion.div
//       drag
//       dragConstraints={{ top: -300, bottom: 300, left: -300, right: 300 }} // Restrict movement
//       className="absolute cursor-pointer select-none text-3xl font-bold bg-gradient-to-r from-lime-400 via-cyan-300 to-green-500 text-transparent bg-clip-text"
//     >
//       {text}
//     </motion.div>
//   );
// };

// const Page = () => {
//   return (
//     <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
//       <DraggableText text="Move Me!" />
//       <DraggableText text="AI-Powered Creativity!" />
//       <DraggableText text="Hackathon-Winning Design!" />
//     </div>
//   );
// };

// export default Page;

"use client";

import { useEffect, useState } from "react";
import WavyBackground from "@/components/wavy-background";
import HeroContent from "@/components/hero-content";
import Header from "@/components/Header";

export default function Home() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    // Show cookie consent after a short delay
    const timer = setTimeout(() => {
      setShowCookieConsent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Wavy background */}
      <WavyBackground />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <HeroContent />
      </div>
    </main>
  );
}
