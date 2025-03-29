// MusicGenClient.tsx
import React, { useState } from "react";
import axios from "axios";
import "./MusicGenClient.css";

const API_BASE_URL = "https://eager-books-sniff.loca.lt/"; // Replace with your localtunnel URL from Colab

const MusicGenClient: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const [modelSize, setModelSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMusic = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      setAudioUrl(null);

      const response = await axios.post<{ audio_url: string }>(
        `${API_BASE_URL}/generate`,
        {
          prompt,
          duration,
          model_size: modelSize,
        }
      );

      setAudioUrl(`${API_BASE_URL}${response.data.audio_url}`);
    } catch (err: any) {
      console.error("Error generating music:", err);
      setError(err.response?.data?.detail || "Failed to generate music");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="music-generator">
      <h1>AI Music Generator</h1>

      <div className="input-form">
        <div className="form-group">
          <label htmlFor="prompt">Describe your music:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="For example: A masterpiece of sound that blends EDM energy with reggae grooves..."
            rows={4}
            disabled={isGenerating}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration: {duration} seconds</label>
          <input
            id="duration"
            type="range"
            min="5"
            max="60"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            disabled={isGenerating}
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelSize">Model Size:</label>
          <select
            id="modelSize"
            value={modelSize}
            onChange={(e) =>
              setModelSize(e.target.value as "small" | "medium" | "large")
            }
            disabled={isGenerating}
          >
            <option value="small">Small (Faster)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="large">Large (Better Quality)</option>
          </select>
        </div>

        <button
          onClick={generateMusic}
          disabled={isGenerating || !prompt.trim()}
          className={isGenerating ? "generating" : ""}
        >
          {isGenerating ? "Generating..." : "Generate Music"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isGenerating && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating your music... This may take a minute.</p>
        </div>
      )}

      {audioUrl && (
        <div className="audio-player">
          <h3>Your Generated Music:</h3>
          <audio controls src={audioUrl} />
          <a
            href={audioUrl}
            download="generated-music.wav"
            className="download-button"
          >
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
};

export default MusicGenClient;
