"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypingAnimation({
  text,
  className = "",
  speed = 40,
  onComplete,
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
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse"></span>
      )}
    </div>
  );
}
