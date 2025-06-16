// "use client";

// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
// import { Suspense, useRef, useState } from "react";
// import * as THREE from "three";
// import Link from "next/link";
// import { Button, Container, Typography } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFrame } from "@react-three/fiber";
// // import Drone from "@/components/drone";
// import { RoboAnimation } from "@/components/robo-animation";
// import Navbar from "@/components/navbar";
// import BackgroundPaths from "@/components/BackgroundPaths";

// const BrainModel = ({
//   setShowPopup,
// }: {
//   setShowPopup: (show: boolean) => void;
// }) => {
//   const { scene } = useGLTF("/particle_ai_brain.glb");
//   const brainRef = useRef<THREE.Group>(null);

//   useFrame(() => {
//     if (brainRef.current) {
//       brainRef.current.rotation.y += 0.005;
//     }
//   });

//   return (
//     <primitive
//       ref={brainRef}
//       object={scene}
//       scale={0.8}
//       onPointerOver={() => setShowPopup(true)}
//       onPointerOut={() => setShowPopup(false)}
//     />
//   );
// };

// const StarField = () => {
//   return (
//     <Stars radius={50} depth={50} count={1500} factor={5} saturation={0} fade />
//   );
// };

// export default function GLBScene() {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-800 to-black flex flex-col items-center text-center">
//       <BackgroundPaths />
//       {/* Navbar covering full width */}
//       <Navbar />

//       <div className="flex flex-row w-full h-full items-center justify-between p-7 mt-5">
//         {/* Left Section - Content */}
//         <Container
//           maxWidth="md"
//           className="relative z-10 w-1/2 text-left -mt-50"
//         >
//           <motion.h1
//             className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 leading-tight "
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Elevate Your Creativity 🚀
//           </motion.h1>
//           <br />

//           <Typography variant="h6" className="mt-4 text-gray-300">
//             A next-gen platform empowering creators with AI-driven content
//             tools.
//           </Typography>
//           {/* Floating Drones */}

//           <div className="flex flex-col items-center mt-10 -ml-40">
//             <RoboAnimation />

//             <motion.div
//               className="-mt-15 flex justify-center"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#6366f1",
//                   padding: "10px 20px",
//                   fontSize: "1rem",
//                   borderRadius: "8px",
//                   boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
//                   ":hover": {
//                     backgroundColor: "#4f46e5",
//                     transform: "scale(1.05)",
//                     transition: "transform 0.2s ease-in-out",
//                   },
//                 }}
//               >
//                 Get Started
//               </Button>
//             </motion.div>
//           </div>
//         </Container>

//         {/* Right Section - Brain Model */}
//         <div className="relative w-3/4 h-full flex items-center justify-center">
//           <Canvas
//             camera={{ position: [0, 2, 5], fov: 50 }}
//             className="w-full h-full"
//           >
//             <Suspense fallback={null}>
//               <StarField />
//               <BrainModel setShowPopup={setShowPopup} />
//             </Suspense>
//             <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
//             <ambientLight intensity={0.5} />
//             <Environment preset="night" />
//             <OrbitControls enableZoom enablePan enableRotate autoRotate />
//           </Canvas>
//         </div>
//       </div>

//       {/* Pop-up Box (About Us) */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             className="absolute ml-7 top-1/2 right-1/4 transform -translate-y-1/2 bg-slate-800 bg-opacity-90 p-6 rounded-lg shadow-lg border border-gray-700 z-50"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Typography variant="h5" className="text-cyan-400 font-bold">
//               About Us
//             </Typography>
//             <Typography variant="body1" className="text-gray-300 mt-2">
//               Welcome to AlphaGen, the ultimate AI-powered platform designed
//               exclusively for content creators.
//               <br />
//               <br />
//               Whether you're a writer, designer, video editor, or social media
//               influencer, we empower you with cutting-edge AI tools to
//               streamline your creative process, spark innovation, and elevate
//               your content like never before. In a world where creativity meets
//               technology, we bridge the gap by offering AI-driven solutions that
//               enhance **writing, image generation, video editing, marketing, and
//               much more**—all in one place. <br /> <br />
//               With **intelligent automation, real-time collaboration, and
//               advanced customization**, you can focus on **what truly
//               matters—creating exceptional content that resonates.** Our mission
//               is simple: **Make creativity effortless, accessible, and
//               limitless.**
//             </Typography>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// "use client";

// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
// import { Suspense, useRef, useState } from "react";
// import * as THREE from "three";
// import Link from "next/link";
// import { Button, Container, Typography } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFrame } from "@react-three/fiber";
// // import Drone from "@/components/drone";
// import { RoboAnimation } from "@/components/robo-animation";
// import Navbar from "@/components/navbar";
// import BackgroundPaths from "@/components/BackgroundPaths";

// const BrainModel = ({
//   setShowPopup,
// }: {
//   setShowPopup: (show: boolean) => void;
// }) => {
//   const { scene } = useGLTF("/particle_ai_brain.glb");
//   const brainRef = useRef<THREE.Group>(null);

//   useFrame(() => {
//     if (brainRef.current) {
//       brainRef.current.rotation.y += 0.005;
//     }
//   });

//   return (
//     <primitive
//       ref={brainRef}
//       object={scene}
//       scale={0.8}
//       onPointerOver={() => setShowPopup(true)}
//       onPointerOut={() => setShowPopup(false)}
//     />
//   );
// };

// const StarField = () => {
//   return (
//     <Stars radius={50} depth={50} count={1500} factor={5} saturation={0} fade />
//   );
// };

// export default function GLBScene() {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-800 to-black flex flex-col items-center text-center">
//       <BackgroundPaths />
//       {/* Navbar covering full width */}
//       <Navbar />

//       <div className="flex flex-row w-full h-full items-center justify-between p-7 mt-5">
//         {/* Left Section - Content */}
//         <Container
//           maxWidth="md"
//           className="relative z-10 w-1/2 text-left -mt-50"
//         >
//           <motion.h1
//             className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 leading-tight "
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Elevate Your Creativity 🚀
//           </motion.h1>
//           <br />

//           <Typography variant="h6" className="mt-4 text-gray-300">
//             A next-gen platform empowering creators with AI-driven content
//             tools.
//           </Typography>
//           {/* Floating Drones */}

//           <div className="flex flex-col items-center mt-10 -ml-40">
//             <RoboAnimation />

//             <motion.div
//               className="-mt-15 flex justify-center"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#6366f1",
//                   padding: "10px 20px",
//                   fontSize: "1rem",
//                   borderRadius: "8px",
//                   boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
//                   ":hover": {
//                     backgroundColor: "#4f46e5",
//                     transform: "scale(1.05)",
//                     transition: "transform 0.2s ease-in-out",
//                   },
//                 }}
//               >
//                 Get Started
//               </Button>
//             </motion.div>
//           </div>
//         </Container>

//         {/* Right Section - Brain Model */}
//         <div className="relative w-3/4 h-full flex items-center justify-center">
//           <Canvas
//             camera={{ position: [0, 2, 5], fov: 50 }}
//             className="w-full h-full"
//           >
//             <Suspense fallback={null}>
//               <StarField />
//               <BrainModel setShowPopup={setShowPopup} />
//             </Suspense>
//             <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
//             <ambientLight intensity={0.5} />
//             <Environment preset="night" />
//             <OrbitControls enableZoom enablePan enableRotate autoRotate />
//           </Canvas>
//         </div>
//       </div>

//       {/* Pop-up Box (About Us) */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             className="absolute ml-7 top-1/2 right-1/4 transform -translate-y-1/2 bg-slate-800 bg-opacity-90 p-6 rounded-lg shadow-lg border border-gray-700 z-50"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Typography variant="h5" className="text-cyan-400 font-bold">
//               About Us
//             </Typography>
//             <Typography variant="body1" className="text-gray-300 mt-2">
//               Welcome to AlphaGen, the ultimate AI-powered platform designed
//               exclusively for content creators.
//               <br />
//               <br />
//               Whether you're a writer, designer, video editor, or social media
//               influencer, we empower you with cutting-edge AI tools to
//               streamline your creative process, spark innovation, and elevate
//               your content like never before. In a world where creativity meets
//               technology, we bridge the gap by offering AI-driven solutions that
//               enhance **writing, image generation, video editing, marketing, and
//               much more**—all in one place. <br /> <br />
//               With **intelligent automation, real-time collaboration, and
//               advanced customization**, you can focus on **what truly
//               matters—creating exceptional content that resonates.** Our mission
//               is simple: **Make creativity effortless, accessible, and
//               limitless.**
//             </Typography>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import AiEducationSection from "@/components/ai-education-section";
import DraggableText from "@/components/DraggableText";
import Header from "@/components/Header";
import HomeComponent from "@/components/Home";
import MemeGenerator from "@/components/MemeGenerator";
import Navbar from "@/components/navbar";
import ReelSyncUploader from "@/components/ReelSyncUploader";
import RobotScrollScene from "@/components/robot-scroll-screen";
import EnhancedScriptToVideo from "@/components/ScriptToVideoSection";
import ScriptToVideoSection from "@/components/ScriptToVideoSection";
import ThumbnailGenerator from "@/components/thumbnail-generator";
import EnhancedVideoCarousel from "@/components/video-carousel";
import VideoCarousel from "@/components/videoCarousel";
import { use } from "react";

const Page = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#17002f] via-[#1a002f] to-[#080808]
text-white animate-fadeIn overflow-y-scroll "
    >
      {/* Navbar Space */}
      {/* <header className="h-20 bg-gradient-to-r from-blue-900/80 via-blue-600/80 to-blue-900/80 backdrop-blur-lg shadow-2xl rounded-b-3xl border-b border-blue-500/50 flex items-center justify-center px-10 animate-fadeIn">
       <div className="w-full max-w-6xl flex justify-center">
@@ -29,238 +28,84 @@ const Page = () => {
     </header> */}
      {/* <RobotScrollScene> */}
      <Header />
      <HomeComponent />

      {/* Video Carousel Placeholder */}
      <section
        className="relative w-[90%] max-w-6xl h-[650px] flex items-center justify-center mx-auto my-20 animate-fadeInUp 
        rounded-3xl overflow-hidden shadow-[0px_0px_40px_rgba(138,43,226,0.5)] border border-purple-500 
        backdrop-blur-lg p-15 transition-all duration-500 
        hover:shadow-[0px_0px_70px_rgba(138,43,226,0.8)] scale-100 hover:scale-[1.03]"
      >
        {/* Inner Glow & Radial Light */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(138,43,226,0.2),_transparent)] 
before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(138,43,226,0.15),transparent)]"
        >
          {/* Particle Effect */}{" "}
          <div className="absolute inset-0 pointer-events-none">
            {/* Video Carousel */}
            <EnhancedVideoCarousel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex flex-col items-center w-full min-h-screen ">
        {/* Full-width ScriptToVideoSection */}
        <div className="w-full">
          <main className="min-h-screen bg-gradient-to-b from-[#17002f] via-[#1a002f] to-[#1a002f] ">
            <div className="container mx-auto ">
              <EnhancedScriptToVideo
                script="Generate a short video of an astronaut dancing on the moon. The scene should feature a realistic lunar surface with subtle craters and textured regolith, while Earth looms in the distant background. The astronaut, wearing a sleek, futuristic space suit with a reflective visor, performs energetic, gravity-defying dance moves."
                videoSrc="/videos/An_awe-inspiring_view_of_an_astronaut_walking_on_t_6cfd78f7-3a6a-43cf-804a-a10cfc918d25.mp4"
                staticVideoSrc="/videos/close_view_of_astronaut_floating_in_space_f75ae1dc-92c1-4460-bd6e-987e9d3d3fca.mp4"
              />
            </div>
          </main>
          <ReelSyncUploader />
          <MemeGenerator />
          <ThumbnailGenerator />
          <AiEducationSection />
        </div>

        {/* Features Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
          <div className="p-10 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:col-span-2 mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              📸 Create Thumbnail with Text
            </h2>
            <p className="text-gray-400 mb-6">
              Generate eye-catching thumbnails with custom text in seconds.
            </p>
            <img
              src="/images/thumbnail-example.jpg"
              alt="Thumbnail Example"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          </div>

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
          <div className="p-8 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold mb-4">🎬 Video from Script</h2>
            <p className="text-gray-400 mb-6">
              Upload a script, and we'll automatically generate a video for you.
            </p>
            <video className="w-full h-48 rounded-md mb-4" controls>
              <source src="/videos/sample-script-video.mp4" type="video/mp4" />
            </video>
          </div>


         <div className="p-12 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:col-span-2 mx-auto">
           <h2 className="text-4xl font-bold mb-6">🎵 Upload Music & Clips</h2>
           <p className="text-gray-400 mb-6">
@@ -286,22 +131,9 @@ const Page = () => {
             className="w-full h-48 object-cover rounded-md mb-4"
           />
         </div>
        </div>
        </div> */}
      </main>
      {/* </RobotScrollScene> */}
    </div>
  );
};

export default Page;
