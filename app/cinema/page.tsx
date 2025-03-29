// import EnhancedCinemaReel from "@/components/cinema-reel";

// export default function EnhancedPage() {
//   return (
//     <main className="min-h-screen bg-gray-900">
//       <div className="container mx-auto py-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-8">
//           Enhanced Cinema Reel Animation
//         </h1>
//         <p className="text-center text-amber-200/80 max-w-2xl mx-auto mb-12">
//           An immersive cinema reel with advanced effects, smooth transitions,
//           and interactive controls.
//         </p>

//         <EnhancedCinemaReel />
//       </div>
//     </main>
//   );
// }

"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

interface UploadStatus {
  status: "idle" | "uploading" | "processing" | "completed" | "error";
  progress: number;
  message: string;
  jobId?: string;
}

export default function VideoSyncPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    status: "idle",
    progress: 0,
    message: "Ready to upload",
  });
  const [error, setError] = useState<string | null>(null);

  // Handle audio file drop
  const onAudioDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "audio/mpeg") {
      setAudioFile(file);
      setError(null);
    } else {
      setError("Please upload a valid MP3 file");
    }
  }, []);

  // Handle video files drop
  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(
      (file) => file.type === "video/mp4"
    );
    if (validFiles.length === acceptedFiles.length) {
      setVideoFiles((prev) => [...prev, ...validFiles]);
      setError(null);
    } else {
      setError("Please upload valid MP4 files");
    }
  }, []);

  // Configure dropzones
  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } =
    useDropzone({
      onDrop: onAudioDrop,
      accept: { "audio/mpeg": [".mp3"] },
      maxFiles: 1,
    });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      onDrop: onVideoDrop,
      accept: { "video/mp4": [".mp4"] },
      multiple: true,
    });

  // Remove video file
  const removeVideo = (index: number) => {
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload files and start processing
  const handleUpload = async () => {
    if (!audioFile || videoFiles.length === 0) {
      setError("Please upload both audio and video files");
      return;
    }

    try {
      setUploadStatus({
        status: "uploading",
        progress: 0,
        message: "Uploading files...",
      });
      setError(null);

      const formData = new FormData();
      formData.append("music", audioFile, audioFile.name); // ✅ Correct field name

      videoFiles.forEach((file) => {
        formData.append("videos", file, file.name);
      });

      const response = await fetch(
        "http://127.0.0.1:8000/creative/sync-videos",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json", // ✅ Important for API compatibility
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start processing");
      }

      const data = await response.json();
      setUploadStatus({
        status: "processing",
        progress: 0,
        message: "Processing videos...",
        jobId: data.job_id,
      });

      // Start polling for status
      pollStatus(data.job_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setUploadStatus({
        status: "error",
        progress: 0,
        message: "Upload failed",
      });
    }
  };

  // Poll processing status
  const pollStatus = async (jobId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/creative/status/${jobId}`
        );
        if (!response.ok) {
          throw new Error("Failed to check status");
        }

        const data = await response.json();

        if (data.status === "completed") {
          clearInterval(pollInterval);
          setUploadStatus({
            status: "completed",
            progress: 100,
            message: "Processing complete!",
            jobId,
          });
        } else if (data.status === "failed") {
          clearInterval(pollInterval);
          setError("Processing failed");
          setUploadStatus({
            status: "error",
            progress: 0,
            message: "Processing failed",
            jobId,
          });
        } else {
          setUploadStatus((prev) => ({
            ...prev,
            progress: data.progress || prev.progress,
            message: data.message || prev.message,
          }));
        }
      } catch (err) {
        clearInterval(pollInterval);
        setError(err instanceof Error ? err.message : "Failed to check status");
        setUploadStatus({
          status: "error",
          progress: 0,
          message: "Status check failed",
          jobId,
        });
      }
    }, 2000); // Poll every 2 seconds
  };

  // Download processed video
  const handleDownload = async () => {
    if (!uploadStatus.jobId) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/creative/download/${uploadStatus.jobId}`
      );
      if (!response.ok) {
        throw new Error("Failed to download video");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "synchronized-video.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download video");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Video Synchronization
          </h1>
          <p className="text-gray-600">
            Upload your music and videos to create synchronized content
          </p>
        </header>

        <div className="space-y-8">
          {/* Audio Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Music (MP3)
            </h2>
            <div
              {...getAudioRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                audioFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50"
              }`}
            >
              <input {...getAudioInputProps()} />
              {audioFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-green-700">{audioFile.name}</span>
                </div>
              ) : (
                <div className="text-gray-600">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2">Drag and drop your MP3 file here</p>
                  <p className="text-sm text-gray-500">or click to select</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Videos (MP4)
            </h2>
            <div
              {...getVideoRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <input {...getVideoInputProps()} />
              <div className="text-gray-600">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2">Drag and drop your MP4 files here</p>
                <p className="text-sm text-gray-500">or click to select</p>
              </div>
            </div>

            {/* Video Files List */}
            {videoFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {videoFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeVideo(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Upload Button */}
          <div className="flex justify-center">
            <button
              onClick={handleUpload}
              disabled={
                !audioFile ||
                videoFiles.length === 0 ||
                uploadStatus.status === "uploading" ||
                uploadStatus.status === "processing"
              }
              className={`px-6 py-3 rounded-lg font-medium text-white shadow-md transition-all duration-200 ${
                !audioFile || videoFiles.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : uploadStatus.status === "uploading" ||
                    uploadStatus.status === "processing"
                  ? "bg-indigo-400 cursor-wait"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {uploadStatus.status === "uploading"
                ? "Uploading..."
                : uploadStatus.status === "processing"
                ? "Processing..."
                : "Start Processing"}
            </button>
          </div>

          {/* Progress Section */}
          <AnimatePresence>
            {(uploadStatus.status === "uploading" ||
              uploadStatus.status === "processing") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {uploadStatus.message}
                    </span>
                    <span className="text-sm font-medium text-indigo-600">
                      {uploadStatus.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadStatus.progress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Download Button */}
          {uploadStatus.status === "completed" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download Processed Video</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
