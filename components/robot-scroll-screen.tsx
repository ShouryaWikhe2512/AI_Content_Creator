// "use client";

// import type React from "react";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, Environment } from "@react-three/drei";
// import type * as THREE from "three";

// gsap.registerPlugin(ScrollTrigger);

// // Robot component that will be rendered in the 3D scene
// function Robot({ scrollProgress }: { scrollProgress: number }) {
//   const { scene } = useGLTF("/particle_ai_brain.glb");
//   const robotRef = useRef<THREE.Group>(null);
//   const { viewport } = useThree();

//   // Clone the duck model to use as our "robot"
//   useEffect(() => {
//     if (robotRef.current) {
//       // Initial position and scale
//       robotRef.current.scale.set(0.3, 0.3, 0.3);
//       robotRef.current.position.set(0, 5, 0); // Start above the screen
//     }
//   }, []);

//   // Animate the robot based on scroll position
//   useFrame(() => {
//     if (!robotRef.current) return;

//     // Map scroll progress (0-1) to different animation phases

//     // Phase 1: Fall from top (0-0.1)
//     if (scrollProgress < 0.1) {
//       const fallProgress = scrollProgress / 0.1;
//       robotRef.current.position.y = 5 - fallProgress * 6; // Fall from y=5 to y=-1
//       robotRef.current.position.x = 0;
//       robotRef.current.rotation.z = fallProgress * Math.PI * 2; // Spin while falling
//       robotRef.current.scale.set(0.3, 0.3, 0.3); // Initial size
//     }
//     // Phase 2: Move left (0.1-0.3)
//     else if (scrollProgress < 0.3) {
//       const leftProgress = (scrollProgress - 0.1) / 0.2;
//       robotRef.current.position.y = -1 + Math.sin(leftProgress * 10) * 0.1; // Slight bobbing
//       robotRef.current.position.x = -leftProgress * 3; // Move left
//       robotRef.current.rotation.y = Math.PI / 2; // Face left
//       robotRef.current.rotation.z = Math.sin(leftProgress * 10) * 0.1; // Slight tilt

//       // Grow slightly
//       const scale = 0.3 + leftProgress * 0.1;
//       robotRef.current.scale.set(scale, scale, scale);
//     }
//     // Phase 3: Move right (0.3-0.5)
//     else if (scrollProgress < 0.5) {
//       const rightProgress = (scrollProgress - 0.3) / 0.2;
//       robotRef.current.position.y = -1 + Math.sin(rightProgress * 10) * 0.1;
//       robotRef.current.position.x = -3 + rightProgress * 6; // Move from -3 to +3
//       robotRef.current.rotation.y = -Math.PI / 2; // Face right
//       robotRef.current.rotation.z = Math.sin(rightProgress * 10) * 0.1;

//       // Continue growing
//       const scale = 0.4 + rightProgress * 0.2;
//       robotRef.current.scale.set(scale, scale, scale);
//     }
//     // Phase 4: Grow and prepare for spiral (0.5-0.7)
//     else if (scrollProgress < 0.7) {
//       const growProgress = (scrollProgress - 0.5) / 0.2;
//       robotRef.current.position.y = -1 + growProgress * 0.5; // Slight rise
//       robotRef.current.position.x = 3 - growProgress * 3; // Move back to center
//       robotRef.current.rotation.y = -Math.PI / 2 + growProgress * Math.PI; // Turn to face forward

//       // Grow larger
//       const scale = 0.6 + growProgress * 0.4;
//       robotRef.current.scale.set(scale, scale, scale);
//     }
//     // Phase 5: Spiral motion (0.7-1.0)
//     else {
//       const spiralProgress = (scrollProgress - 0.7) / 0.3;
//       const spiralRadius = 2 * (1 - spiralProgress); // Spiral gets tighter
//       const spiralAngle = spiralProgress * Math.PI * 6; // Multiple rotations

//       robotRef.current.position.x = Math.cos(spiralAngle) * spiralRadius;
//       robotRef.current.position.z = Math.sin(spiralAngle) * spiralRadius;
//       robotRef.current.position.y = -0.5 + spiralProgress * 1.5; // Rise up during spiral

//       // Face the direction of movement
//       robotRef.current.rotation.y = Math.atan2(
//         Math.sin(spiralAngle + 0.1) - Math.sin(spiralAngle),
//         Math.cos(spiralAngle + 0.1) - Math.cos(spiralAngle)
//       );

//       // Final size
//       const scale = 1.0 + spiralProgress * 0.5;
//       robotRef.current.scale.set(scale, scale, scale);

//       // Add a slight tilt based on spiral motion
//       robotRef.current.rotation.z = Math.sin(spiralAngle * 2) * 0.2;
//     }
//   });

//   return (
//     <group ref={robotRef}>
//       <primitive object={scene.clone()} />
//     </group>
//   );
// }

// export default function RobotScrollScene({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       // Calculate scroll progress (0 to 1)
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.offsetHeight;
//       const winHeight = window.innerHeight;
//       const scrollPercent = scrollTop / (docHeight - winHeight);

//       setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div ref={containerRef} className="relative">
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
//         <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} intensity={1} color="#9d4edd" />
//           <pointLight
//             position={[-10, -10, -10]}
//             intensity={0.5}
//             color="#4361ee"
//           />
//           <Robot scrollProgress={scrollProgress} />
//           <Environment preset="night" />
//         </Canvas>
//       </div>
//       <div className="relative z-0">{children}</div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import type * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Robot({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF("/particle_ai_brain.glb");
  const robotRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (robotRef.current) {
      robotRef.current.scale.set(0.3, 0.3, 0.3);
      robotRef.current.position.set(0, 5, 0);
    }
  }, []);

  useFrame(() => {
    if (!robotRef.current) return;

    if (scrollProgress < 0.1) {
      const fallProgress = scrollProgress / 0.1;
      robotRef.current.position.y = 5 - fallProgress * 6;
      robotRef.current.rotation.z = fallProgress * Math.PI * 2;
    } else if (scrollProgress < 0.3) {
      const leftProgress = (scrollProgress - 0.1) / 0.2;
      robotRef.current.position.x = -leftProgress * 3;
      robotRef.current.rotation.y = Math.PI / 2;
    } else if (scrollProgress < 0.5) {
      const rightProgress = (scrollProgress - 0.3) / 0.2;
      robotRef.current.position.x = -3 + rightProgress * 6;
      robotRef.current.rotation.y = -Math.PI / 2;
    } else if (scrollProgress < 0.7) {
      const leftProgress = (scrollProgress - 0.5) / 0.2;
      robotRef.current.position.x = 3 - leftProgress * 6;
    } else if (scrollProgress < 0.9) {
      const rightProgress = (scrollProgress - 0.7) / 0.2;
      robotRef.current.position.x = -3 + rightProgress * 6;
      const scale = 0.6 + rightProgress * 0.4;
      robotRef.current.scale.set(scale, scale, scale);
    } else {
      robotRef.current.position.x = 4;
      robotRef.current.position.y = -2;
      robotRef.current.scale.set(1.0, 1.0, 1.0);
      robotRef.current.rotation.y += 0.002; // Slow rotation at final position
    }
  });

  return (
    <group ref={robotRef}>
      <primitive object={scene.clone()} />
    </group>
  );
}

export default function RobotScrollScene({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#9d4edd" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#4361ee"
          />
          <Robot scrollProgress={scrollProgress} />
          <Environment preset="night" />
        </Canvas>
      </div>
      <div className="relative z-0">{children}</div>
    </div>
  );
}
