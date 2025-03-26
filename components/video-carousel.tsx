"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Video {
  id: number;
  src: string;
  title: string;
  description: string;
}

const videos: Video[] = [
  {
    id: 1,
    src: "/videos/uOGQQ7pVUTdt8kE55DBzSoaTPw.mp4",
    title: "Incredible Design",
    description: "Experience the next level of innovation",
  },
  {
    id: 2,
    src: "/videos/oLuR0kHPgQO5fzdKx5DlugYjb0.mp4",
    title: "Seamless Performance",
    description: "Powerful technology at your fingertips",
  },
  {
    id: 3,
    src: "/videos/eJWPLw5oOX16bDOw9jWpFxAjSc.mp4",
    title: "Revolutionary Features",
    description: "Redefining what's possible",
  },
];

export default function EnhancedVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Duration for each video in seconds
  const videoDuration = 5;

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const startProgressTimer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    const interval = 10; // Update every 10ms for smooth animation
    const totalIntervals = (videoDuration * 1000) / interval;
    let currentInterval = 0;

    setProgress(0);

    progressInterval.current = setInterval(() => {
      currentInterval++;
      const newProgress = (currentInterval / totalIntervals) * 100;
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval.current!);
        goToNext();
      }
    }, interval);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  const handleVideoClick = (index: number) => {
    if (index === currentIndex) {
      // Toggle play/pause for current video
      if (isPlaying) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        videoRefs.current[currentIndex]?.pause();
      } else {
        videoRefs.current[currentIndex]?.play();
        startProgressTimer();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Switch to clicked video
      setCurrentIndex(index);
    }
  };

  // Calculate the width of each slide including gap
  const calculateSlideWidth = () => {
    if (!containerRef.current) return 0;

    const containerWidth = containerRef.current.offsetWidth;

    // On mobile, each slide takes full width
    if (isMobile) {
      return containerWidth;
    }

    // On desktop, we show partial adjacent videos
    // The main video takes 80% of the container width
    const mainSlideWidth = containerWidth * 0.8;

    // The gap between slides is 20px
    return mainSlideWidth + 10;
  };

  // Handle video transitions
  useEffect(() => {
    // Reset all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.currentTime = 0;
        if (index === currentIndex) {
          video.play().catch((e) => console.log("Video play error:", e));
        } else {
          video.pause();
        }
      }
    });

    const slideWidth = calculateSlideWidth();

    // Animate the slider
    controls.start({
      x: -currentIndex * slideWidth,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    });

    // Start progress timer for the current video
    setIsPlaying(true);
    startProgressTimer();

    // Cleanup
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, controls, isMobile]);

  // Update animation when window resizes
  useEffect(() => {
    const handleResize = () => {
      const slideWidth = calculateSlideWidth();
      controls.start({
        x: -currentIndex * slideWidth,
        transition: { type: "tween", duration: 0.2 },
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, controls]);

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Main container */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        {/* Video carousel */}
        <div className="relative overflow-hidden">
          {/* Progress bars */}
          {/* <div className="absolute top-0 left-0 z-20 w-full h-1 bg-gray-800 flex">
            {videos.map((_, index) => (
              <div key={index} className="flex-1 mx-0.5 h-full relative">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      index === currentIndex
                        ? `${progress}%`
                        : index < currentIndex
                        ? "100%"
                        : "0%",
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
            ))}
          </div> */}

          {/* Video slider */}
          <motion.div
            className="flex"
            style={{ gap: isMobile ? "20px" : "60px" }} // Increase gap
            animate={controls}
            initial={false}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className={`relative flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-300 rounded-4xl`}
                style={{
                  width: isMobile ? "100%" : "80%",
                  opacity: index === currentIndex ? 1 : 0.6,
                }}
                whileHover={{ opacity: 1 }}
                onClick={() => handleVideoClick(index)}
              >
                {/* Video */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="w-full h-auto object-cover aspect-video"
                  playsInline
                  muted
                  loop
                />

                {/* Video overlay with text */}
                <div className="absolute inset-0 flex flex-col justify-top p-6 sm:p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <motion.h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      index === currentIndex
                        ? { y: 0, opacity: 1 }
                        : { y: 20, opacity: 0 }
                    }
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {video.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm sm:text-base text-gray-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      index === currentIndex
                        ? { y: 0, opacity: 1 }
                        : { y: 20, opacity: 0 }
                    }
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {video.description}
                  </motion.p>
                </div>

                {/* Play/Pause indicator (only for current video) */}
                {index === currentIndex && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <AnimatePresence>
                      {!isPlaying && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="bg-white/20 backdrop-blur-md rounded-full p-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation buttons */}
          {/* <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6" />
          </button> */}
        </div>

        {/* Video indicators */}
        <div className="flex justify-center mt-6 gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => handleVideoClick(index)}
              className="relative"
              aria-label={`Go to video ${index + 1}`}
            >
              <motion.div
                className="w-8 h-1 bg-white/40 rounded-full"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
              />
              <motion.div
                className="absolute top-0 left-0 h-1 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width:
                    index === currentIndex
                      ? `${progress}%`
                      : index < currentIndex
                      ? "100%"
                      : "0%",
                }}
                transition={{ ease: "linear" }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
