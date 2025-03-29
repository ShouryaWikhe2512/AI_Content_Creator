// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
// import { Sidebar } from "@/components/sidebar";

// export default function TextToImagePage() {
//   const [prompt, setPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function generateImage() {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setImageUrl(null);
//     setError(null);

//     try {
//       const response = await fetch("/api/generateImage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.error || "Failed to generate image");
//       setImageUrl(data.imageUrl);
//     } catch (error: any) {
//       setError(error.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 overflow-hidden">
//       {/* Floating Particles */}
//       <Sidebar />

//       <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2b0055] to-[#400080] opacity-90" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse" />

//       {/* Title */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center z-10"
//       >
//         <h1 className="text-xl md:text-6xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-purple-300 via-purple-200 to-blue-200 bg-clip-text drop-shadow-lg">
//           AI-Powered Image Generator
//         </h1>
//         <p className="text-gray-300 mt-3 text-lg max-w-lg mx-auto">
//           Transform your imagination into stunning visuals with just a few
//           words.
//         </p>
//       </motion.div>

//       {/* Input & Button */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, delay: 0.3 }}
//         className="mt-10 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-purple-500 w-full max-w-md text-center z-10"
//       >
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Describe your vision..."
//           className="w-full p-3 bg-transparent border border-purple-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           onKeyDown={(e) => e.key === "Enter" && generateImage()}
//         />

//         <button
//           onClick={generateImage}
//           disabled={loading || !prompt.trim()}
//           className="mt-4 px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 w-full"
//         >
//           {loading ? <Loader2 className="animate-spin" /> : "Generate Image"}
//         </button>
//       </motion.div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//       {/* Generated Image */}
//       {imageUrl && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-8 z-10"
//         >
//           <img
//             src={imageUrl}
//             alt="Generated"
//             className="w-80 rounded-lg shadow-lg border border-purple-400"
//           />
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import PixelatedImage from "@/components/pixelated-image";

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateImage() {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to generate image");
      setImageUrl(data.imageUrl);
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex bg-black text-white p-10 overflow-hidden">
      <Sidebar />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2b0055] to-[#400080] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#6600cc33_10%,transparent_80%)] animate-pulse" />

      <div className="flex w-full max-w-6xl mx-auto z-10 gap-10 items-center justify-center ml-40">
        {/* AI Input Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-1/2 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-purple-200 transition-all duration-300 min-h-[250px] max-h-[650px] overflow-y-auto"
        >
          <h1 className="text-4xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-purple-300 via-purple-200 to-blue-400 bg-clip-text drop-shadow-lg text-center">
            AI-Powered Image Generator
          </h1>
          <p className="text-gray-300 mt-3 text-lg text-center">
            Transform your words into visuals.
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision..."
            className="w-full p-3 mt-4 text-lg bg-transparent border border-purple-200 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all duration-300 min-h-[330px] max-h-[400px] overflow-y-auto"
            rows={3} // Starts small, expands with text
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateImage();
              }
            }}
          />

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="mt-4 px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 bg-fuchsia-400 hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50  w-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Image"}
          </button>
        </motion.div>

        {/* Generated Image Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-1/2 flex justify-center items-center bg-white/10 backdrop-blur-lg rounded-xl border border-purple-200 shadow-lg  h-96 -mr-60"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          {imageUrl ? (
            <PixelatedImage src={imageUrl} alt="Generated" />
          ) : (
            <p className="text-gray-400 text-xl text-center">
              Your generated image will appear here.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
