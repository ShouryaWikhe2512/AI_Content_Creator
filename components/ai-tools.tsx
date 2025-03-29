"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Video,
  Music,
  ImageIcon,
  Laugh,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: FeatureCardProps[] = [
  {
    title: "Text to Video",
    description:
      "Transform your scripts into professional videos with AI-generated scenes, voiceovers, and animations.",
    icon: <Video className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Text to Music",
    description:
      "Create custom soundtracks and music from text descriptions. Set the mood, tempo, and style.",
    icon: <Music className="h-8 w-8" />,
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Thumbnail Creator",
    description:
      "Generate eye-catching thumbnails that increase click-through rates with our AI image generator.",
    icon: <ImageIcon className="h-8 w-8" />,
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Meme Generator",
    description:
      "Create viral-worthy memes in seconds. Just describe what you want, and our AI does the rest.",
    icon: <Laugh className="h-8 w-8" />,
    color: "from-yellow-500 to-orange-400",
  },
];

function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Create hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="feature-card transform-gpu">
      <Card className="bg-black/40 backdrop-blur-sm border border-purple-900/50 rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(157,78,221,0.3)] group">
        <CardContent className="p-6 h-full flex flex-col">
          <div
            className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-purple-100/70 mb-6 flex-grow">{description}</p>
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:bg-purple-950/30 group-hover:text-purple-400"
          >
            Try Now{" "}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              →
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AiTools() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        cardsRef.current?.querySelectorAll(".feature-card"),
        {
          opacity: 0,
          y: 50,
          stagger: 0.1,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
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
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative"
      id="features"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,78,221,0.1),transparent_70%)]"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            AI-Powered Content Creation
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-purple-100/80 max-w-3xl mx-auto"
          >
            Our platform offers multiple tools to help you create professional
            content in minutes, not hours. Explore our features below.
          </p>
        </div>

        {/* Desktop View - Grid */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-950/30"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-950/30"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
