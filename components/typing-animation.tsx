"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
}

export default function TypingAnimation({
  text,
  speed = 30,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className="whitespace-pre-wrap">
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </div>
  );
}
