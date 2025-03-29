"use client";

import { useState } from "react";

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateImage() {
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
      console.log("Frontend API Response:", data); // Debugging

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (typeof data.imageUrl === "string") {
        setImageUrl(data.imageUrl);
      } else {
        throw new Error("Invalid image URL received.");
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Text-to-Image Generator</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
        className="border p-2 rounded w-full max-w-md"
      />

      <button
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Generated"
            className="w-80 rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
