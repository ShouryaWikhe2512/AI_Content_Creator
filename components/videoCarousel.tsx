"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface VideoCarouselProps {
  videos: string[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 1.5, ease: "power2.inOut" },
    });

    videos.forEach((_, index) => {
      tl.to(videoRefs.current[index], {
        scale: 1.2,
        opacity: 1,
        x: 0,
        onStart: () => {
          videoRefs.current[index]?.play().catch(() => {});
        },
      }).to(
        videoRefs.current[index],
        {
          scale: 1,
          opacity: 0.5,
          x: "-100%",
          onComplete: () => {
            videoRefs.current[index]?.pause();
          },
        },
        "+=3"
      );
    });
  }, [videos]);

  return (
    <div
      ref={containerRef}
      className="relative flex overflow-hidden w-full h-[600px] justify-center items-center"
    >
      {videos.map((video, index) => (
        <video
          key={index}
          ref={(el) => {
            if (el) videoRefs.current[index] = el;
          }}
          src={video}
          className="absolute w-full h-full object-cover opacity-0 transform scale-100"
          muted
          playsInline
        />
      ))}
    </div>
  );
};

export default VideoCarousel;
