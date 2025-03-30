"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WavyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Generate fewer waves with lower amplitude
    const waves = Array.from({ length: 5 }, (_, i) => ({
      amplitude: canvas.height * (0.015 + i * 0.02), // Lower amplitude
      frequency: 0.002 + i * 0.0004, // Different frequencies
      phase: (i * Math.PI) / 4, // Phase offset
      speed: 0.009 + i * 0.00015, // Adjusted speeds
      color: `rgba(147, 51, 234, ${0.7 + i * 0.07})`, // Brighter colors
      lineWidth: 3 + i * 0.3, // Varying thickness
      yPosition: canvas.height * (0.25 + i * 0.15),
    }));

    // Create glowing background
    const createGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#080808"); // Deep black
      gradient.addColorStop(1, "#1a002f"); // Dark purple glow
      return gradient;
    };

    // Draw wave function with increased glow
    const drawWave = (wave: (typeof waves)[0], time: number) => {
      ctx.beginPath();
      ctx.lineWidth = wave.lineWidth;
      ctx.strokeStyle = wave.color;
      ctx.shadowColor = wave.color;
      ctx.shadowBlur = 35; // Increased glow effect

      for (let x = 0; x <= canvas.width; x += 6) {
        const y =
          wave.yPosition +
          wave.amplitude *
            Math.sin(x * wave.frequency + wave.phase + time * wave.speed);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    };

    // Animation loop
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = (Date.now() - startTime) * 0.05; // Speed multiplier

      // Clear canvas
      ctx.fillStyle = createGradientBackground();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave) => drawWave(wave, currentTime));

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start GSAP animation
    gsap.to(waves, {
      amplitude: "+=5", // Subtle amplitude increase
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: "sine.inOut",
    });

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
