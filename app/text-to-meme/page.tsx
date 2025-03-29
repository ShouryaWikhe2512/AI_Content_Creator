"use client";

import { useState } from "react";

export default function MemeGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [memeData, setMemeData] = useState<{
    topText: string;
    memeUrl: string;
    bottomText: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateMeme() {
    setLoading(true);
    setMemeData(null);
    setError(null);

    try {
      const response = await fetch("/api/generateMeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      console.log("Frontend API Response:", data);

      if (!response.ok || !data.memeUrl) {
        throw new Error(data.error || "Failed to generate meme");
      }

      setMemeData({
        topText: data.topText || "Top text not found",
        memeUrl: data.memeUrl,
        bottomText: data.bottomText || "Bottom text not found",
      });
    } catch (error: any) {
      console.error("Error generating meme:", error);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Meme Generator</h1>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a meme topic..."
        className="border p-2 rounded w-full max-w-md"
      />

      <button
        onClick={generateMeme}
        disabled={loading || !topic.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Meme"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {memeData && (
        <div className="mt-4 text-center">
          <p className="font-bold text-lg">{memeData.topText}</p>
          <img
            src={memeData.memeUrl}
            alt="Generated Meme"
            className="w-80 rounded-lg shadow-lg mx-auto"
          />
          <p className="font-bold text-lg">{memeData.bottomText}</p>
        </div>
      )}
    </div>
  );
}
