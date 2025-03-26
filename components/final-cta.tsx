"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // This animation will be triggered when the robot completes its spiral
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            // Add a pulsing glow effect to the button
            gsap.to(buttonRef.current, {
              boxShadow: "0 0 30px rgba(157,78,221,0.7)",
              repeat: -1,
              yoyo: true,
              duration: 1.5,
            });
          },
        },
        "-=0.3"
      );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative"
      id="get-started"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,78,221,0.2),transparent_70%)]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Ready to Transform Your Content Creation?
        </h2>
        <p
          ref={descriptionRef}
          className="text-xl text-purple-100/80 mb-12 max-w-3xl mx-auto"
        >
          Join thousands of creators who are already using our AI platform to
          create stunning content in minutes. No technical skills required -
          just your imagination.
        </p>
        <div ref={buttonRef} className="inline-block">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-none rounded-full px-10 py-8 text-xl font-medium shadow-[0_0_15px_rgba(157,78,221,0.5)] hover:shadow-[0_0_25px_rgba(157,78,221,0.7)] transition-all duration-300"
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  );
}
