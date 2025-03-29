"use client";

import { useState } from "react";

export default function GhibliArtPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateGhibliArt() {
    setLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const response = await fetch("/api/generateGhibliArt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Frontend API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (typeof data.imageUrl === "string") {
        setImageUrl(data.imageUrl);
      } else {
        throw new Error("Invalid image URL received.");
      }
    } catch (error: any) {
      console.error("Error generating Ghibli-style image:", error);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Ghibli-Style Art Generator</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
        className="border p-2 rounded w-full max-w-md"
      />

      <button
        onClick={generateGhibliArt}
        disabled={loading || !prompt.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Art"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Ghibli-style Art"
            className="w-80 rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
