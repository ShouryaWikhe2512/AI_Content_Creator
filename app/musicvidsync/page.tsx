"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GetAppIcon from "@mui/icons-material/GetApp";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";

interface UploadStatus {
  status: "idle" | "uploading" | "processing" | "completed" | "error";
  progress: number;
  message: string;
  jobId?: string;
  videoUrl?: string;
}

export default function VideoSyncPage() {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    status: "idle",
    progress: 0,
    message: "Ready to upload",
  });
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

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

  // Reset all state
  const handleReset = () => {
    setAudioFile(null);
    setVideoFiles([]);
    setError(null);
    setUploadStatus({
      status: "idle",
      progress: 0,
      message: "Ready to upload",
    });
    if (uploadStatus.videoUrl) {
      window.URL.revokeObjectURL(uploadStatus.videoUrl);
    }
  };

  // Upload files and start processing
  const handleUpload = async () => {
    if (!audioFile || videoFiles.length === 0) {
      setError("Please upload both audio and video files");
      return;
    }

    // Cleanup previous video URL if exists
    if (uploadStatus.videoUrl) {
      window.URL.revokeObjectURL(uploadStatus.videoUrl);
    }

    try {
      setUploadStatus({
        status: "uploading",
        progress: 0,
        message: "Uploading files...",
      });
      setError(null);

      const formData = new FormData();
      formData.append("music", audioFile, audioFile.name);

      videoFiles.forEach((file) => {
        formData.append("videos", file, file.name);
      });

      const response = await fetch(
        "http://127.0.0.1:8000/creative/sync-videos",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
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

      // Update the video URL in state for preview
      setUploadStatus((prev) => ({
        ...prev,
        videoUrl: url,
      }));

      // Create download link
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

  // Cleanup video URL when component unmounts or when starting new upload
  useEffect(() => {
    return () => {
      if (uploadStatus.videoUrl) {
        window.URL.revokeObjectURL(uploadStatus.videoUrl);
      }
    };
  }, [uploadStatus.videoUrl]);

  return (
    <div className="w-full min-h-screen relative overflow-hidden text-white bg-black">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#14036b] via-[#3825a0] to-[#2a1069]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated Background Lines */}
      <div className="absolute inset-0 -z-5 overflow-hidden opacity-60">
        {/* Horizontal wavy lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-[1px] bg-purple-500/20"
              style={{
                top: `${5 + i * 13}%`,
                transform: `rotate(${
                  (i % 2 === 0 ? -0.5 : 0.5) + Math.random() * 0.5
                }deg)`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* Diagonal wavy lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`d-${i}`}
              className="absolute h-[200%] w-[1px] bg-purple-500/10"
              style={{
                left: `${15 + i * 25}%`,
                top: "-50%",
                transform: `rotate(${45 + i * 2}deg)`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Colored Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-red-400 opacity-30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-[120px]" />
      </div>

      {/* Top Navbar */}
      <div className="relative z-20 w-full">
        <div className="bg-black/20 backdrop-blur-md border-b border-white/5 px-6 py-3">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto">
            {/* Logo - Left Side */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative flex items-center justify-center">
                <Image
                  src="/Logo.png"
                  alt="AlphaGen Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight">
                Alpha<span className="text-purple-500">Gen</span>
              </span>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <Link
                href="/dashboard"
                className="text-white hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <HomeIcon fontSize="small" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Examples
              </Link>
            </div>

            {/* Right Side Elements */}
            <div className="flex items-center space-x-4">
              {/* Help Icon */}
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <HelpOutlineIcon className="text-sm" />
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="text-gray-300 hover:text-white transition-colors"
                title="Reset"
              >
                <RefreshIcon className="text-sm" />
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center p-[2px]">
                  <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center overflow-hidden">
                    <AccountCircleIcon className="text-white" />
                  </div>
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  Creator
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Tooltip */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 z-50 bg-black/80 backdrop-blur-lg p-4 rounded-lg border border-purple-500/30 shadow-lg max-w-md"
          >
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <CloseIcon fontSize="small" />
            </button>
            <h3 className="text-purple-400 font-semibold mb-2 flex items-center">
              <HelpIcon className="mr-2" fontSize="small" />
              How to Use Video Sync
            </h3>
            <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>Upload an MP3 audio file that will be your soundtrack</li>
              <li>
                Upload one or more MP4 video files to sync with your audio
              </li>
              <li>Click "Start Processing" to begin the synchronization</li>
              <li>When processing is complete, download your synced videos</li>
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-transparent leading-tight bg-gradient-to-r from-red-400 via-purple-300 to-blue-400 bg-clip-text drop-shadow-lg"
            >
              Music Video Synchronization
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
            >
              Upload your music and videos to create perfectly synchronized
              content
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Audio Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300/20"
            >
              <div className="flex items-center mb-4">
                <MusicNoteIcon className="text-purple-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">
                  Upload Music (MP3)
                </h2>
              </div>

              <div
                {...getAudioRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  audioFile
                    ? "border-green-500/50 bg-green-900/10"
                    : "border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/20"
                }`}
              >
                <input {...getAudioInputProps()} />
                {audioFile ? (
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircleIcon className="text-green-500 text-3xl mb-2" />
                    <span className="text-green-400 font-medium">
                      {audioFile.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-300">
                    <CloudUploadIcon className="text-4xl text-purple-400 mb-2" />
                    <p className="font-medium">
                      Drag and drop your MP3 file here
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      or click to select
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Video Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300/20"
            >
              <div className="flex items-center mb-4">
                <VideoLibraryIcon className="text-blue-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">
                  Upload Videos (MP4)
                </h2>
              </div>

              <div
                {...getVideoRootProps()}
                className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-900/20 transition-colors"
              >
                <input {...getVideoInputProps()} />
                <div className="text-gray-300">
                  <CloudUploadIcon className="text-4xl text-blue-400 mb-2" />
                  <p className="font-medium">
                    Drag and drop your MP4 files here
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    or click to select (multiple files allowed)
                  </p>
                </div>
              </div>

              {/* Video Files List */}
              {videoFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-300 mb-2">
                    {videoFiles.length} video
                    {videoFiles.length !== 1 ? "s" : ""} selected:
                  </p>
                  <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
                    {videoFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-black/40 rounded-lg mb-2 border border-purple-500/20"
                      >
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <InsertDriveFileIcon className="text-blue-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300 truncate">
                            {file.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-400">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVideo(index);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <CloseIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg"
              >
                <div className="flex items-center">
                  <ErrorOutlineIcon className="text-red-500 mr-2" />
                  <p className="text-red-400">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={handleUpload}
              disabled={
                !audioFile ||
                videoFiles.length === 0 ||
                uploadStatus.status === "uploading" ||
                uploadStatus.status === "processing"
              }
              className={`px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all duration-200 flex items-center ${
                !audioFile || videoFiles.length === 0
                  ? "bg-gray-700/50 cursor-not-allowed"
                  : uploadStatus.status === "uploading" ||
                    uploadStatus.status === "processing"
                  ? "bg-purple-600/70 cursor-wait"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              }`}
            >
              {uploadStatus.status === "uploading" ||
              uploadStatus.status === "processing" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {uploadStatus.status === "uploading"
                    ? "Uploading..."
                    : "Processing..."}
                </>
              ) : (
                <>
                  <CloudUploadIcon className="mr-2" />
                  Start Processing
                </>
              )}
            </button>
          </motion.div>

          {/* Progress Section */}
          <AnimatePresence>
            {(uploadStatus.status === "uploading" ||
              uploadStatus.status === "processing") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300/20 mb-8"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">
                      {uploadStatus.message}
                    </span>
                    <span className="text-sm font-medium text-purple-400">
                      {uploadStatus.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadStatus.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 text-center italic">
                    This may take several minutes depending on the size of your
                    files
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Download Button and Preview Section */}
          <AnimatePresence>
            {uploadStatus.status === "completed" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-green-500/30 text-center"
                >
                  <CheckCircleIcon className="text-green-500 text-5xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Processing Complete!
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    Your videos have been successfully synchronized with your
                    audio track.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center mx-auto"
                  >
                    <GetAppIcon className="mr-2" />
                    <span>Download Synchronized Video</span>
                  </button>
                </motion.div>

                {/* Video Preview Section - Uncomment if implementing preview */}
                {/* {uploadStatus.videoUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300/20"
                  >
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <PlayArrowIcon className="mr-2 text-purple-400" />
                      Video Preview
                    </h2>
                    <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-purple-500/30">
                      <video
                        src={uploadStatus.videoUrl}
                        controls
                        className="w-full h-full"
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </motion.div>
                )} */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Section */}
          {uploadStatus.status === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8 bg-gradient-to-r from-purple-700/30 to-blue-700/30 rounded-xl p-6 border border-purple-400/20 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600/50 rounded-full flex items-center justify-center">
                    <CheckCircleIcon
                      className="text-purple-200"
                      fontSize="small"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Perfect Audio-Video Sync
                    </h4>
                    <p className="text-sm text-gray-300">
                      Professionally synchronized audio with video content
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600/50 rounded-full flex items-center justify-center">
                    <CheckCircleIcon
                      className="text-purple-200"
                      fontSize="small"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Batch Processing
                    </h4>
                    <p className="text-sm text-gray-300">
                      Sync multiple videos with the same audio track
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600/50 rounded-full flex items-center justify-center">
                    <CheckCircleIcon
                      className="text-purple-200"
                      fontSize="small"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      High Quality Output
                    </h4>
                    <p className="text-sm text-gray-300">
                      Maintains original video resolution and quality
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600/50 rounded-full flex items-center justify-center">
                    <CheckCircleIcon
                      className="text-purple-200"
                      fontSize="small"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Fast Processing
                    </h4>
                    <p className="text-sm text-gray-300">
                      Optimized algorithms for quicker results
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Usage Examples */}
          {uploadStatus.status === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/10"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Perfect For
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/30 rounded-lg p-4 text-center border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center mb-3">
                    <MusicNoteIcon className="text-purple-300" />
                  </div>
                  <h4 className="text-sm font-medium text-white">Musicians</h4>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center mb-3">
                    <VideoLibraryIcon className="text-blue-300" />
                  </div>
                  <h4 className="text-sm font-medium text-white">
                    Content Creators
                  </h4>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="h-6 w-6 text-green-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-white">Marketers</h4>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="h-6 w-6 text-red-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-white">Creatives</h4>
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQ Section */}
          {uploadStatus.status === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/10"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <div className="border-b border-purple-500/20 pb-4">
                  <h4 className="text-purple-300 font-medium mb-2">
                    What types of files are supported?
                  </h4>
                  <p className="text-sm text-gray-300">
                    Currently, we support MP3 for audio files and MP4 for video
                    files. Support for other formats is coming soon.
                  </p>
                </div>

                <div className="border-b border-purple-500/20 pb-4">
                  <h4 className="text-purple-300 font-medium mb-2">
                    How long does processing take?
                  </h4>
                  <p className="text-sm text-gray-300">
                    Processing time depends on the length and size of your
                    files. Most videos are processed within a few minutes.
                  </p>
                </div>

                <div className="border-b border-purple-500/20 pb-4">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Is there a file size limit?
                  </h4>
                  <p className="text-sm text-gray-300">
                    Yes, there is a 200MB limit per file. For larger files,
                    please contact our support team.
                  </p>
                </div>

                <div>
                  <h4 className="text-purple-300 font-medium mb-2">
                    Can I sync multiple videos with one audio file?
                  </h4>
                  <p className="text-sm text-gray-300">
                    Yes, you can upload multiple video files to sync with a
                    single audio track. Each video will be processed separately.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          {uploadStatus.status === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-12 bg-gradient-to-r from-purple-700/50 to-blue-700/50 rounded-xl p-8 border border-purple-400/20 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to create synchronized videos?
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                Start uploading your files now and transform your content with
                perfectly synchronized audio and video.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() =>
                    document.getElementById("audio-upload")?.click()
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg flex items-center"
                >
                  <MusicNoteIcon className="mr-2" />
                  Upload Audio
                </button>
                <button
                  onClick={() =>
                    document.getElementById("video-upload")?.click()
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg flex items-center"
                >
                  <VideoLibraryIcon className="mr-2" />
                  Upload Videos
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 bg-black/20 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 relative">
                <Image
                  src="/Logo.png"
                  alt="AlphaGen Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">
                Alpha<span className="text-purple-500">Gen</span>
              </span>
              <span className="text-xs text-gray-500">
                © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Settings
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add this type definition for the expected HTML element references
declare global {
  interface HTMLElementTagNameMap {
    "audio-upload": HTMLElement;
    "video-upload": HTMLElement;
  }
}
