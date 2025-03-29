"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PixelatedImageProps {
  src: string;
  alt: string;
  pixelSize?: number;
  animationDuration?: number;
}

export default function PixelatedImage({
  src,
  alt,
  pixelSize = 20,
  animationDuration = 1.5,
}: PixelatedImageProps) {
  const [pixels, setPixels] = useState<
    { x: number; y: number; delay: number }[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Create a grid of pixels
    const newPixels = [];
    const columns = Math.ceil(16 * 1.5);
    const rows = Math.ceil(9 * 1.5);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        // Calculate a delay based on distance from center for an interesting reveal pattern
        const centerX = columns / 2;
        const centerY = rows / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const maxDistance =
          Math.sqrt(Math.pow(columns, 2) + Math.pow(rows, 2)) / 2;
        const delay =
          (distanceFromCenter / maxDistance) * (animationDuration * 0.8);

        newPixels.push({ x, y, delay });
      }
    }

    // Shuffle the pixels for a more random reveal
    newPixels.sort(() => Math.random() - 0.5);

    setPixels(newPixels);
    setLoaded(true);
  }, [animationDuration]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background image (blurred) */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-50 scale-110"
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* Pixelated overlay */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(16 * 1.5)}, 1fr)`,
          gridTemplateRows: `repeat(${Math.ceil(9 * 1.5)}, 1fr)`,
        }}
      >
        {loaded &&
          pixels.map((pixel, index) => (
            <motion.div
              key={index}
              className="bg-cover bg-center"
              style={{
                gridColumn: pixel.x + 1,
                gridRow: pixel.y + 1,
                backgroundImage: `url(${src})`,
                backgroundSize: `${Math.ceil(16 * 1.5) * 100}% ${
                  Math.ceil(9 * 1.5) * 100
                }%`,
                backgroundPosition: `${
                  (pixel.x / (Math.ceil(16 * 1.5) - 1)) * 100
                }% ${(pixel.y / (Math.ceil(9 * 1.5) - 1)) * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: pixel.delay,
                ease: "easeOut",
              }}
            />
          ))}
      </div>

      {/* Actual image (hidden for accessibility) */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="opacity-0 absolute pointer-events-none"
      />
    </div>
  );
}
