// page.tsx
"use client";

import { useState } from "react";

export default function TextToVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateVideo() {
    setLoading(true);
    setVideoUrl(null);
    setError(null);

    try {
      const response = await fetch("/api/generateVideo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Frontend API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video");
      }

      if (typeof data.videoUrl === "string") {
        setVideoUrl(data.videoUrl);
      } else {
        throw new Error("Invalid video URL received.");
      }
    } catch (error: any) {
      console.error("Error generating video:", error);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Text-to-Video Generator</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
        className="border p-2 rounded w-full max-w-md"
      />

      <button
        onClick={generateVideo}
        disabled={loading || !prompt.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {videoUrl && (
        <div className="mt-4">
          <video controls className="w-80 rounded-lg shadow-lg">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
