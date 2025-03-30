// "use client";
// import AiEducationSection from "@/components/ai-education-section";
// import DraggableText from "@/components/DraggableText";
// import Header from "@/components/Header";
// import HomeComponent from "@/components/Home";
// import MemeGenerator from "@/components/MemeGenerator";
// import Navbar from "@/components/navbar";
// import ReelSyncUploader from "@/components/ReelSyncUploader";
// import RobotScrollScene from "@/components/robot-scroll-screen";
// import EnhancedScriptToVideo from "@/components/ScriptToVideoSection";
// import ScriptToVideoSection from "@/components/ScriptToVideoSection";
// import ThumbnailGenerator from "@/components/thumbnail-generator";
// import EnhancedVideoCarousel from "@/components/video-carousel";
// import VideoCarousel from "@/components/videoCarousel";
// import { use } from "react";

// const Page = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-500 to-black text-white animate-fadeIn">
//       {/* Navbar Space */}
//       {/* <header className="h-20 bg-gradient-to-r from-blue-900/80 via-blue-600/80 to-blue-900/80 backdrop-blur-lg shadow-2xl rounded-b-3xl border-b border-blue-500/50 flex items-center justify-center px-10 animate-fadeIn">
//         <div className="w-full max-w-6xl flex justify-center">
//           <Navbar />
//         </div>
//       </header> */}
//       {/* <RobotScrollScene> */}
//       <Header />
//       <HomeComponent />

//       <div className="text-7xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-cyan-400 to-green-700 text-center my-16 animate-fadeIn drop-shadow-lg mb-5 mt-20">
//         <DraggableText text="AI-Powered!  " />
//       </div>
//       <br />
//       <div className="text-6xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-cyan-400 to-green-700 text-center my-18 animate-fadeIn drop-shadow-lg mt-8 ">
//         Creativity: Edit, Generate & Analyze!
//       </div>
//       <div className="text-1xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-cyan-400 to-green-700 text-center -mt-13 animate-fadeIn drop-shadow-lg mb-1">
//         A one stop solution for everything.
//       </div>

//       {/* Video Carousel Placeholder */}

//       <section
//         className="relative w-[90%] max-w-6xl h-[650px] flex items-center justify-center mr-40 my-20 animate-fadeInUp rounded-3xl mx-auto overflow-hidden shadow-[0px_0px_40px_rgba(0,255,255,0.3)] border border-lime-500 backdrop-blur-lg p-15
//   transition-all duration-500 hover:shadow-[0px_0px_60px_rgba(0,255,255,0.5)] scale-100 hover:scale-[1.02]"
//       >
//         {/* Inner Glow & Radial Light */}
//         <div
//           className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)]
//        before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]"
//         >
//           {/* Particle Effect */}{" "}
//           <div className="absolute inset-0 pointer-events-none">
//             {/* Video Carousel */}
//             <EnhancedVideoCarousel />;
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <main className="flex flex-col items-center w-full min-h-screen bg-black px-6 py-14">
//         {/* Full-width ScriptToVideoSection */}
//         <div className="w-full">
//           <main className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black py-12">
//             <div className="container mx-auto px-4">
//               <EnhancedScriptToVideo
//                 script="Generate a futuristic cityscape with flying cars, holographic billboards, and neon lights reflecting off glass skyscrapers. The scene should be set at night with a cyberpunk aesthetic."
//                 videoSrc="/videos/hero.mp4"
//                 staticVideoSrc="/videos/frame.mp4"
//               />
//             </div>
//           </main>
//           <ReelSyncUploader />
//           <MemeGenerator />
//           <ThumbnailGenerator />
//           <AiEducationSection />
//         </div>

//         {/* Features Section */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
//           <div className="p-10 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:col-span-2 mx-auto">
//             <h2 className="text-4xl font-bold mb-6">
//               📸 Create Thumbnail with Text
//             </h2>
//             <p className="text-gray-400 mb-6">
//               Generate eye-catching thumbnails with custom text in seconds.
//             </p>
//             <img
//               src="/images/thumbnail-example.jpg"
//               alt="Thumbnail Example"
//               className="w-full h-64 object-cover rounded-md mb-4"
//             />
//           </div>

//           <div className="p-8 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105">
//             <h2 className="text-3xl font-bold mb-4">🎬 Video from Script</h2>
//             <p className="text-gray-400 mb-6">
//               Upload a script, and we'll automatically generate a video for you.
//             </p>
//             <video className="w-full h-48 rounded-md mb-4" controls>
//               <source src="/videos/sample-script-video.mp4" type="video/mp4" />
//             </video>
//           </div>

//           <div className="p-12 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:col-span-2 mx-auto">
//             <h2 className="text-4xl font-bold mb-6">🎵 Upload Music & Clips</h2>
//             <p className="text-gray-400 mb-6">
//               Enhance your videos by adding background music and clips.
//             </p>
//             <img
//               src="/images/music-upload.jpg"
//               alt="Music Upload"
//               className="w-full h-56 object-cover rounded-md mb-4"
//             />
//           </div>

//           <div className="p-8 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:max-w-lg mx-auto">
//             <h2 className="text-3xl font-bold mb-4">
//               😂 Instant Meme Generator
//             </h2>
//             <p className="text-gray-400 mb-6">
//               Create funny memes instantly with AI-powered tools.
//             </p>
//             <img
//               src="/images/meme-generator.jpg"
//               alt="Meme Generator"
//               className="w-full h-48 object-cover rounded-md mb-4"
//             />
//           </div>
//         </div> */}
//       </main>
//       {/* </RobotScrollScene> */}
//     </div>
//   );
// };

// export default Page;

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
