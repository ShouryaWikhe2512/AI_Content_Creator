"use client";

import { useEffect, useState } from "react";
import WavyBackground from "@/components/wavy-background";
import HeroContent from "@/components/hero-content";
import Header from "@/components/Header";

export default function HomeComponent() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieConsent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Wavy background */}
      <WavyBackground />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <HeroContent />
      </div>
    </div>
  );
}
