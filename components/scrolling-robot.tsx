"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import type * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Robot({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF("/particle_ai_brain.glb");
  const robotRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Clone the duck model to use as our "robot"
  useEffect(() => {
    if (robotRef.current) {
      robotRef.current.scale.set(0.5, 0.5, 0.5);
      robotRef.current.position.set(2, -1, 0);
    }
  }, []);

  // Animate the robot based on scroll position
  useFrame(() => {
    if (robotRef.current) {
      // Move the robot along a path as the user scrolls
      const scrollProgress = scrollY / 1000; // Normalize scroll value

      // Make the robot walk in a path
      robotRef.current.position.x = 2 * Math.cos(scrollProgress * 2);
      robotRef.current.position.z = Math.sin(scrollProgress * 2);

      // Rotate the robot to face the direction it's walking
      robotRef.current.rotation.y = -Math.atan2(
        Math.cos(scrollProgress * 2 + 0.1) - Math.cos(scrollProgress * 2),
        Math.sin(scrollProgress * 2 + 0.1) - Math.sin(scrollProgress * 2)
      );

      // Add a bobbing motion to simulate walking
      robotRef.current.position.y = -1 + Math.sin(scrollProgress * 10) * 0.05;

      // Add a slight tilt as it walks
      robotRef.current.rotation.z = Math.sin(scrollProgress * 10) * 0.05;
    }
  });

  return (
    <group ref={robotRef}>
      <primitive object={scene.clone()} />
    </group>
  );
}

export default function ScrollingRobot({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Robot scrollY={scrollY} />
          <Environment preset="night" />
        </Canvas>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
