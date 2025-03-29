"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

export default function HeroContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 mt-27">
      <h1
        ref={headingRef}
        className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
      >
        <span className="block text-white">AI-Powered!</span>
        <span className="block text-purple-200">
          {" "}
          Creativity: Edit, Generate & Analyze!
        </span>
      </h1>

      <p
        ref={subheadingRef}
        className="mx-auto mt-6 max-w-xl text-center text-lg text-gray-300"
      >
        A one stop solution for everything
      </p>

      <div ref={buttonRef} className="mt-10">
        <Button className="rounded-full bg-purple-600 px-8 py-6 text-lg hover:bg-purple-700">
          Start creating
        </Button>
      </div>
    </div>
  );
}
