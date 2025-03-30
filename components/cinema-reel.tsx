// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { motion, useAnimationControls } from "framer-motion";
// // import Image from "next/image";

// // // Sample images - in a real app, you would replace these with your actual images
// // const images = [
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// //   "/placeholder.svg?height=300&width=200",
// // ];

// // export default function EnhancedCinemaReel() {
// //   const controls = useAnimationControls();
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [isPlaying, setIsPlaying] = useState(true);
// //   const [currentSpeed, setCurrentSpeed] = useState<"slow" | "medium" | "fast">(
// //     "slow"
// //   );

// //   // Create a tripled array of images to ensure smooth looping
// //   const tripledImages = [...images, ...images, ...images];

// //   useEffect(() => {
// //     // Function to animate the reel with varying speeds
// //     const animateReel = async () => {
// //       while (true) {
// //         if (!isPlaying) {
// //           await new Promise((resolve) => setTimeout(resolve, 100));
// //           continue;
// //         }

// //         // Start slow
// //         setCurrentSpeed("slow");
// //         await controls.start({
// //           x: "-16.67%",
// //           transition: { duration: 10, ease: "easeInOut" },
// //         });

// //         // Speed up to medium
// //         setCurrentSpeed("medium");
// //         await controls.start({
// //           x: "-50%",
// //           transition: { duration: 8, ease: [0.4, 0.0, 0.2, 1] },
// //         });

// //         // Go fast
// //         setCurrentSpeed("fast");
// //         await controls.start({
// //           x: "-83.33%",
// //           transition: { duration: 5, ease: "linear" },
// //         });

// //         // Reset position without animation (seamless loop)
// //         controls.set({ x: "0%" });
// //       }
// //     };

// //     animateReel();

// //     // Cleanup animation on unmount
// //     return () => {
// //       controls.stop();
// //     };
// //   }, [controls, isPlaying]);

// //   const togglePlayPause = () => {
// //     setIsPlaying(!isPlaying);

// //     if (isPlaying) {
// //       controls.stop();
// //     } else {
// //       // Continue from current position
// //       controls.start({
// //         x: "-100%",
// //         transition: {
// //           duration:
// //             currentSpeed === "slow" ? 10 : currentSpeed === "medium" ? 8 : 5,
// //           ease: currentSpeed === "fast" ? "linear" : "easeInOut",
// //         },
// //       });
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center min-h-[60vh] p-8 bg-gray-900">
// //       <div
// //         ref={containerRef}
// //         className="relative w-full max-w-3xl h-[320px] overflow-hidden rounded-lg border-4 border-amber-800 bg-black shadow-2xl"
// //         style={{
// //           boxShadow:
// //             "0 0 30px rgba(251, 191, 36, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.6)",
// //         }}
// //       >
// //         {/* Film reel container */}
// //         <div className="absolute inset-0 overflow-hidden">
// //           {/* Top film sprocket holes */}
// //           <div className="absolute top-0 left-0 right-0 h-[20px] bg-black z-10 flex">
// //             {Array.from({ length: 60 }).map((_, i) => (
// //               <motion.div
// //                 key={`top-${i}`}
// //                 className="w-[15px] h-[15px] bg-black border-2 border-amber-800 rounded-full mx-[15px] my-[2.5px]"
// //                 animate={{
// //                   opacity: [0.5, 1, 0.5],
// //                   borderColor: ["#92400e", "#f59e0b", "#92400e"],
// //                 }}
// //                 transition={{
// //                   duration:
// //                     currentSpeed === "slow"
// //                       ? 2
// //                       : currentSpeed === "medium"
// //                       ? 1
// //                       : 0.5,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   delay: (i * 0.05) % 0.5,
// //                 }}
// //               />
// //             ))}
// //           </div>

// //           {/* Bottom film sprocket holes */}
// //           <div className="absolute bottom-0 left-0 right-0 h-[20px] bg-black z-10 flex">
// //             {Array.from({ length: 60 }).map((_, i) => (
// //               <motion.div
// //                 key={`bottom-${i}`}
// //                 className="w-[15px] h-[15px] bg-black border-2 border-amber-800 rounded-full mx-[15px] my-[2.5px]"
// //                 animate={{
// //                   opacity: [0.5, 1, 0.5],
// //                   borderColor: ["#92400e", "#f59e0b", "#92400e"],
// //                 }}
// //                 transition={{
// //                   duration:
// //                     currentSpeed === "slow"
// //                       ? 2
// //                       : currentSpeed === "medium"
// //                       ? 1
// //                       : 0.5,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   delay: (i * 0.05) % 0.5,
// //                 }}
// //               />
// //             ))}
// //           </div>

// //           {/* Film strip with images */}
// //           <motion.div
// //             className="absolute top-[20px] bottom-[20px] flex items-center"
// //             style={{ width: "300%" }} // Make it wide enough to contain all images
// //             animate={controls}
// //             initial={{ x: "0%" }}
// //           >
// //             {tripledImages.map((src, index) => (
// //               <div
// //                 key={index}
// //                 className="relative flex-shrink-0 w-[200px] h-[280px] mx-1 overflow-hidden border-2 border-amber-800"
// //               >
// //                 <Image
// //                   src={src || "/placeholder.svg"}
// //                   alt={`Film frame ${index}`}
// //                   fill
// //                   className="object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20 pointer-events-none" />

// //                 {/* Film grain effect */}
// //                 <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />

// //                 {/* Scratches effect */}
// //                 <motion.div
// //                   className="absolute inset-0 pointer-events-none"
// //                   style={{
// //                     backgroundImage:
// //                       "url('/placeholder.svg?height=10&width=2'), url('/placeholder.svg?height=20&width=1')",
// //                     backgroundRepeat: "no-repeat, no-repeat",
// //                     backgroundPosition: "center, 70% 30%",
// //                   }}
// //                   animate={{
// //                     opacity: [0, 0.1, 0],
// //                     y: [0, 100],
// //                   }}
// //                   transition={{
// //                     duration: 0.5,
// //                     repeat: Number.POSITIVE_INFINITY,
// //                     repeatType: "loop",
// //                     repeatDelay: Math.random() * 5,
// //                   }}
// //                 />
// //               </div>
// //             ))}
// //           </motion.div>
// //         </div>

// //         {/* Vintage vignette effect */}
// //         <div
// //           className="absolute inset-0 pointer-events-none"
// //           style={{
// //             background:
// //               "radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.7) 100%)",
// //           }}
// //         />

// //         {/* Film projector light effect */}
// //         <motion.div
// //           className="absolute inset-0 pointer-events-none opacity-30"
// //           style={{
// //             background:
// //               "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, transparent 100%)",
// //           }}
// //           animate={{
// //             opacity: [0.3, 0.4, 0.3],
// //           }}
// //           transition={{
// //             duration: 2,
// //             repeat: Number.POSITIVE_INFINITY,
// //             repeatType: "reverse",
// //           }}
// //         />

// //         {/* Dust particles effect */}
// //         <div className="absolute inset-0 pointer-events-none">
// //           {Array.from({ length: 20 }).map((_, i) => (
// //             <motion.div
// //               key={`dust-${i}`}
// //               className="absolute w-[2px] h-[2px] bg-white rounded-full"
// //               style={{
// //                 left: `${Math.random() * 100}%`,
// //                 top: `${Math.random() * 100}%`,
// //               }}
// //               animate={{
// //                 opacity: [0, 0.8, 0],
// //                 y: [0, 100],
// //                 x: [0, Math.random() * 20 - 10],
// //               }}
// //               transition={{
// //                 duration: 1 + Math.random() * 2,
// //                 repeat: Number.POSITIVE_INFINITY,
// //                 repeatDelay: Math.random() * 3,
// //               }}
// //             />
// //           ))}
// //         </div>

// //         {/* Play/Pause button */}
// //         <button
// //           onClick={togglePlayPause}
// //           className="absolute bottom-8 right-8 z-20 bg-amber-800/80 hover:bg-amber-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200"
// //         >
// //           {isPlaying ? (
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="24"
// //               height="24"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <rect x="6" y="4" width="4" height="16"></rect>
// //               <rect x="14" y="4" width="4" height="16"></rect>
// //             </svg>
// //           ) : (
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="24"
// //               height="24"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <polygon points="5 3 19 12 5 21 5 3"></polygon>
// //             </svg>
// //           )}
// //         </button>

// //         {/* Speed indicator */}
// //         <div className="absolute top-8 left-8 z-20 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-mono">
// //           Speed:{" "}
// //           {currentSpeed === "slow"
// //             ? "Slow"
// //             : currentSpeed === "medium"
// //             ? "Medium"
// //             : "Fast"}
// //         </div>
// //       </div>

// //       <div className="mt-6 text-amber-200 text-center max-w-lg ">
// //         <h2 className="text-2xl font-bold mb-2">Vintage Cinema Reel</h2>
// //         <p className="text-amber-200/80">
// //           Experience the nostalgic feel of classic cinema with this smoothly
// //           animated film reel. Watch as it transitions from slow to fast and back
// //           again in a seamless loop.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

const images = [
  "/Screenshot 2025-03-29 184320.png",
  "/Screenshot 2025-03-29 184340.png",
  "/Screenshot 2025-03-29 184410.png",
  "/Screenshot 2025-03-29 184420.png",
  "/Screenshot 2025-03-29 184427.png",
  "/Screenshot 2025-03-29 184441.png",
  "/Screenshot 2025-03-29 193954.png",
  "/Screenshot 2025-03-29 194019.png",
  "/Screenshot 2025-03-29 194035.png",
  "/Screenshot 2025-03-29 194043.png",
  "/Screenshot 2025-03-29 194050.png",
];

export default function CinemaReel() {
  const controls = useAnimationControls();
  const tripledImages = [...images, ...images, ...images];

  useEffect(() => {
    const animateReel = async () => {
      while (true) {
        await controls.start({
          x: "-100%",
          transition: { duration: 10, ease: "linear" },
        });
        controls.set({ x: "0%" });
      }
    };
    animateReel();
  }, [controls]);

  return (
    <div className="relative w-full max-w-5xl h-[320px] overflow-hidden rounded-lg border-4 border-amber-800">
      {/* Top film sprocket holes */}
      <div className="absolute top-0 left-0 right-0 h-[20px] bg-black flex">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="w-[15px] h-[15px] bg-black border-2 border-amber-800 rounded-full mx-[15px] my-[2.5px]"
          />
        ))}
      </div>

      {/* Bottom film sprocket holes */}
      <div className="absolute bottom-0 left-0 right-0 h-[20px] bg-black flex">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="w-[15px] h-[15px] bg-black border-2 border-amber-800 rounded-full mx-[15px] my-[2.5px]"
          />
        ))}
      </div>

      {/* Film strip with images */}
      <motion.div
        className="absolute top-[20px] bottom-[20px] flex items-center"
        style={{ width: "400%" }}
        animate={controls}
        initial={{ x: "0%" }}
      >
        {tripledImages.map((src, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[250px] h-[280px] mx-2 border-2 border-amber-800"
          >
            <Image
              src={src}
              alt={`Film frame ${index}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
          </div>
        ))}
      </motion.div>

      {/* Vintage vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.7) 100%)",
        }}
      />

      {/* Film projector light effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, transparent 100%)",
        }}
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Dust particles effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, 100],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
