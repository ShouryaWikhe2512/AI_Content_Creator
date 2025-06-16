"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Icons and UI components
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import CompareIcon from "@mui/icons-material/Compare";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

// Import charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

// Types
interface YouTubeAnalyticsResponse {
  success: boolean;
  channel: {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    country: string | null;
    publishedAt: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    banner: string | null;
    keywords: string | null;
    stats: {
      viewCount: number;
      subscriberCount: number;
      videoCount: number;
      commentCount: number;
    };
    topics: string[];
    status: {
      privacyStatus: string;
      isLinked: boolean;
      longUploadsStatus: string;
      madeForKids: boolean | null;
    };
  };
  summary: {
    kind: string;
    columnHeaders: Array<{
      name: string;
      columnType: string;
      dataType: string;
    }>;
    rows: Array<any[]>;
  };
  comparison: {
    [key: string]: {
      current: number;
      previous: number;
      change: number;
      pct_change: number;
    };
  };
  daily_performance: {
    dates: string[];
    metrics: {
      views: number[];
      estimatedMinutesWatched: number[];
      averageViewDuration: number[];
      likes: number[];
      subscribersGained: number[];
      subscribersLost: number[];
      shares: number[];
      comments: number[];
    };
  };
  traffic_sources: {
    kind: string;
    columnHeaders: Array<{
      name: string;
      columnType: string;
      dataType: string;
    }>;
    rows: any[];
  };
  top_videos: {
    kind: string;
    columnHeaders: Array<{
      name: string;
      columnType: string;
      dataType: string;
    }>;
    rows: any[];
  };
  demographics: {
    kind: string;
    columnHeaders: Array<{
      name: string;
      columnType: string;
      dataType: string;
    }>;
    rows: any[];
  };
  geography: {
    kind: string;
    columnHeaders: Array<{
      name: string;
      columnType: string;
      dataType: string;
    }>;
    rows: any[];
  };
  devices: {
    kind: string;
    columnHeaders: Array<{
      name: string;
      columnType: string;
      dataType: string;
    }>;
    rows: any[];
  };
  playlists: {
    kind: string;
    etag: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: Array<{
      kind: string;
      etag: string;
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          default: { url: string; width: number; height: number };
          medium: { url: string; width: number; height: number };
          high: { url: string; width: number; height: number };
          standard?: { url: string; width: number; height: number };
          maxres?: { url: string; width: number; height: number };
        };
        channelTitle: string;
        localized: {
          title: string;
          description: string;
        };
      };
      status: {
        privacyStatus: string;
      };
      contentDetails: {
        itemCount: number;
      };
    }>;
  };
  time_of_day?: { error: string };
  subscriber_behavior?: { error: string };
  search_keywords?: { error: string };
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

// Channel Info Card Component
const ChannelInfoCard = ({
  channel,
}: {
  channel: YouTubeAnalyticsResponse["channel"];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-purple-200/30 mb-8"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden relative border-2 border-purple-500">
          <Image
            src={channel.thumbnails.medium.url}
            alt={channel.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">
            {channel.title}
          </h2>
          {channel.customUrl && (
            <p className="text-gray-300 text-sm mb-2">{channel.customUrl}</p>
          )}
          {channel.description && (
            <p className="text-gray-300 text-sm mb-4">
              {channel.description || "No description"}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400">Videos</p>
              <p className="text-lg font-semibold text-white">
                {formatNumber(channel.stats.videoCount)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Subscribers</p>
              <p className="text-lg font-semibold text-white">
                {formatNumber(channel.stats.subscriberCount)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Total Views</p>
              <p className="text-lg font-semibold text-white">
                {formatNumber(channel.stats.viewCount)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Comments</p>
              <p className="text-lg font-semibold text-white">
                {formatNumber(channel.stats.commentCount)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">Channel created</p>
          <p className="text-sm text-white">
            {new Date(channel.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">Status</p>
          <p className="text-sm text-white capitalize">
            {channel.status.privacyStatus}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Overview Cards based on comparison data
const OverviewCards = ({
  comparison,
}: {
  comparison: YouTubeAnalyticsResponse["comparison"];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Views Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-purple-200/30"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Total Views</h3>
          <VisibilityIcon className="text-blue-400" fontSize="small" />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(comparison.views.current)}
            </div>
            <div
              className={`text-xs ${
                comparison.views.pct_change > 0
                  ? "text-green-400"
                  : comparison.views.pct_change < 0
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {comparison.views.pct_change > 0
                ? "↑"
                : comparison.views.pct_change < 0
                ? "↓"
                : "→"}
              {Math.abs(comparison.views.pct_change).toFixed(1)}% vs. previous
            </div>
          </div>
        </div>
      </motion.div>

      {/* Watch Time Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-purple-200/30"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Watch Time</h3>
          <AccessTimeIcon className="text-purple-400" fontSize="small" />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatTime(comparison.estimatedMinutesWatched.current * 60)}
            </div>
            <div
              className={`text-xs ${
                comparison.estimatedMinutesWatched.pct_change > 0
                  ? "text-green-400"
                  : comparison.estimatedMinutesWatched.pct_change < 0
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {comparison.estimatedMinutesWatched.pct_change > 0
                ? "↑"
                : comparison.estimatedMinutesWatched.pct_change < 0
                ? "↓"
                : "→"}
              {Math.abs(comparison.estimatedMinutesWatched.pct_change).toFixed(
                1
              )}
              % vs. previous
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subscribers Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-purple-200/30"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-300 text-sm font-medium">
            Subscribers Gained
          </h3>
          <PeopleIcon className="text-red-400" fontSize="small" />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(comparison.subscribersGained.current)}
            </div>
            <div
              className={`text-xs ${
                comparison.subscribersGained.pct_change > 0
                  ? "text-green-400"
                  : comparison.subscribersGained.pct_change < 0
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {comparison.subscribersGained.pct_change > 0
                ? "↑"
                : comparison.subscribersGained.pct_change < 0
                ? "↓"
                : "→"}
              {Math.abs(comparison.subscribersGained.pct_change).toFixed(1)}%
              vs. previous
            </div>
          </div>
        </div>
      </motion.div>

      {/* Engagement Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-purple-200/30"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Engagement</h3>
          <ThumbUpIcon className="text-yellow-400" fontSize="small" />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(comparison.likes.current)}
            </div>
            <div className="text-xs text-gray-400">
              {formatNumber(comparison.comments.current)} comments,{" "}
              {formatNumber(comparison.shares.current)} shares
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Performance Trends Chart
const PerformanceTrendsChart = ({
  dailyData,
}: {
  dailyData: YouTubeAnalyticsResponse["daily_performance"];
}) => {
  // Transform the data into the format needed for the chart
  const chartData = dailyData.dates.map((date, index) => ({
    date: date,
    views: dailyData.metrics.views[index],
    watch_time: dailyData.metrics.estimatedMinutesWatched[index],
    likes: dailyData.metrics.likes[index],
    subscribers:
      dailyData.metrics.subscribersGained[index] -
      dailyData.metrics.subscribersLost[index],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Views Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-purple-200/30"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Views Trend</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#444"
                opacity={0.2}
              />
              <XAxis
                dataKey="date"
                stroke="#aaa"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(128, 90, 213, 0.5)",
                  borderRadius: "8px",
                  color: "white",
                }}
                formatter={(value: any) => [formatNumber(value), "Views"]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString();
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                name="Views"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Subscribers Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-purple-200/30"
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          Subscriber Growth
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#444"
                opacity={0.2}
              />
              <XAxis
                dataKey="date"
                stroke="#aaa"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(128, 90, 213, 0.5)",
                  borderRadius: "8px",
                  color: "white",
                }}
                formatter={(value: any) => [value, "Net Subscribers"]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString();
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="subscribers"
                name="Net Subscribers"
                stroke="#ff8042"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

// Playlists Section
const PlaylistsSection = ({
  playlists,
}: {
  playlists: YouTubeAnalyticsResponse["playlists"];
}) => {
  // Filter out only public playlists
  const publicPlaylists = playlists.items.filter(
    (playlist) => playlist.status.privacyStatus === "public"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-purple-200/30 mb-8"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        Public Playlists ({publicPlaylists.length})
      </h3>

      {publicPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-black/30 rounded-lg overflow-hidden border border-purple-300/20 hover:border-purple-300/40 transition-all"
            >
              <div className="aspect-video relative">
                <Image
                  src={
                    playlist.snippet.thumbnails.medium?.url ||
                    playlist.snippet.thumbnails.default.url
                  }
                  alt={playlist.snippet.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-white line-clamp-2 mb-1">
                  {playlist.snippet.title}
                </h4>
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>{playlist.contentDetails.itemCount} videos</span>
                  <span>
                    {new Date(
                      playlist.snippet.publishedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No public playlists found
        </div>
      )}
    </motion.div>
  );
};

// Empty Data Message Component
const EmptyDataMessage = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-200/10">
    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{message}</p>
  </div>
);

// Format functions (need to be at global scope)
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

// Add a TimeRangeDisplay component to clearly show the current selection
const TimeRangeDisplay = ({ days }: { days: number }) => {
  // Calculate date range based on current date and selected days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        endDate.getFullYear() !== date.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="text-sm text-gray-300 mt-1">
      <span className="font-medium">Current period:</span>{" "}
      {formatDate(startDate)} - {formatDate(endDate)}
    </div>
  );
};

// Main Component
const YouTubeAnalytics: React.FC = () => {
  const router = useRouter();

  // Hardcoded access token
  const STATIC_ACCESS_TOKEN =
    "ya29.a0AeXRPp43AFaiaSyTF_u-uGzXYfOQyd_bxEVu7QkynQvVnRqi9HDNY6hgB0xkkG_hKDyopWrbkng5DZsVDQVmTQY8VTKNkqy76FM_t2zJE3wVxHmeTzFOSUUNqZfDRUjKOOrmePuHRTVAgOF6iF3GduxiBEUzyygdPEHvygNzaCgYKAfMSARMSFQHGX2MiNxhSzzwxGmGJWRZDv-I-5Q0175";

  // State definitions
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [accessToken, setAccessToken] = useState<string>(STATIC_ACCESS_TOKEN);
  const [userData, setUserData] = useState<{
    name: string;
    picture: string;
  }>({ name: "YouTube User", picture: "" });
  const [analyticsData, setAnalyticsData] =
    useState<YouTubeAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<number>(30);
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [includeDemographics, setIncludeDemographics] = useState<boolean>(true);
  const [includeGeography, setIncludeGeography] = useState<boolean>(true);
  const [includeDeviceData, setIncludeDeviceData] = useState<boolean>(true);

  // Fetch data on mount
  useEffect(() => {
    fetchAnalytics(STATIC_ACCESS_TOKEN, timeRange);
  }, [timeRange]);

  // Fetch analytics data
  const fetchAnalytics = async (token: string, days: number = timeRange) => {
    try {
      setLoading(true);
      setError(null);

      // Use the provided days parameter instead of timeRange state directly
      const response = await fetch(
        `http://localhost:8000/youtube/dashboard?access_token=${token}&days=${days}&include_geography=${includeGeography}&include_demographics=${includeDemographics}&include_device_data=${includeDeviceData}&comparison_period=${showComparison}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch analytics data. Status: " + response.status
        );
      }

      const data: YouTubeAnalyticsResponse = await response.json();

      if (!data.success) {
        throw new Error("API returned unsuccessful response");
      }

      setAnalyticsData(data);

      // Set user data from channel info
      setUserData({
        name: data.channel.title,
        picture: data.channel.thumbnails.medium.url,
      });
    } catch (err: any) {
      setError(err.message || "Failed to load analytics data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAnalytics(STATIC_ACCESS_TOKEN, timeRange);
  };

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
        {/* Background elements - keeping these from your original code */}
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
                href="/edu"
                className="text-white hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <SchoolIcon fontSize="small" />
                <span>Assessment</span>
              </Link>
            </div>

            {/* Right Side Elements */}
            <div className="flex items-center space-x-4">
              {/* Help/Question Mark */}
              <button className="text-gray-300 hover:text-white transition-colors">
                <HelpOutlineIcon className="text-sm" />
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="text-gray-300 hover:text-white transition-colors"
                disabled={loading}
              >
                <RefreshIcon
                  className={`text-sm ${loading ? "animate-spin" : ""}`}
                />
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center p-[2px]">
                    <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center overflow-hidden">
                      <AccountCircleIcon className="text-white" />
                    </div>
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    {userData.name || "YouTube User"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              YouTube Analytics Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mt-3"
            >
              Get detailed insights into your YouTube channel performance
            </motion.p>
          </div>

          {/* Content based on loading/error state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-gray-300 text-lg">
                Loading your analytics data...
              </p>
            </div>
          ) : error ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-red-400/30 max-w-2xl mx-auto text-center">
              <div className="text-red-400 mb-4 text-5xl">!</div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Error Loading Analytics
              </h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
                >
                  <RefreshIcon fontSize="small" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          ) : analyticsData ? (
            <>
              {/* Dashboard Controls */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex flex-wrap gap-3">
                  <select
                    value={timeRange}
                    onChange={(e) => {
                      const newTimeRange = parseInt(e.target.value);
                      setTimeRange(newTimeRange);
                      // Fetch with new time range is now handled by the useEffect
                    }}
                    className="bg-black/30 border border-purple-500/30 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="7">Last 7 Days</option>
                    <option value="28">Last 28 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                  </select>

                  <button
                    className={`flex items-center space-x-1 p-2 rounded-lg text-sm ${
                      showComparison
                        ? "bg-purple-600 text-white"
                        : "bg-black/30 text-gray-300"
                    }`}
                    onClick={() => {
                      setShowComparison(!showComparison);
                      // Refresh data when comparison toggle changes
                      fetchAnalytics(STATIC_ACCESS_TOKEN, timeRange);
                    }}
                  >
                    <CompareIcon fontSize="small" />
                    <span>Comparison</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className={`flex items-center space-x-1 p-2 rounded-lg text-sm ${
                      includeDemographics
                        ? "bg-purple-600 text-white"
                        : "bg-black/30 text-gray-300"
                    }`}
                    onClick={() => setIncludeDemographics(!includeDemographics)}
                  >
                    <PeopleIcon fontSize="small" />
                    <span>Demographics</span>
                  </button>

                  <button
                    className={`flex items-center space-x-1 p-2 rounded-lg text-sm ${
                      includeGeography
                        ? "bg-purple-600 text-white"
                        : "bg-black/30 text-gray-300"
                    }`}
                    onClick={() => setIncludeGeography(!includeGeography)}
                  >
                    <span>Geography</span>
                  </button>

                  <button
                    className={`flex items-center space-x-1 p-2 rounded-lg text-sm ${
                      includeDeviceData
                        ? "bg-purple-600 text-white"
                        : "bg-black/30 text-gray-300"
                    }`}
                    onClick={() => setIncludeDeviceData(!includeDeviceData)}
                  >
                    <DevicesIcon fontSize="small" />
                    <span>Devices</span>
                  </button>

                  <button
                    onClick={handleRefresh}
                    className="flex items-center space-x-1 bg-black/40 hover:bg-black/60 text-white p-2 rounded-lg text-sm transition-all duration-200"
                  >
                    <RefreshIcon fontSize="small" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Time Range Display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-4 bg-black/20 p-3 rounded-lg backdrop-blur-sm border border-purple-500/20"
              >
                <TimeRangeDisplay days={timeRange} />
                {timeRange === 7 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Showing weekly analytics data with daily breakdown
                  </p>
                )}
                {(timeRange === 28 || timeRange === 30) && (
                  <p className="text-xs text-gray-400 mt-1">
                    Showing monthly analytics data with daily breakdown
                  </p>
                )}
                {timeRange === 90 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Showing quarterly analytics data with daily breakdown
                  </p>
                )}
              </motion.div>

              {/* Channel Info Card */}
              <ChannelInfoCard channel={analyticsData.channel} />

              {/* Overview Cards */}
              <OverviewCards comparison={analyticsData.comparison} />

              {/* Performance Trends Chart */}
              <PerformanceTrendsChart
                dailyData={analyticsData.daily_performance}
              />

              {/* Engagement Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-purple-200/30 mb-8"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Engagement Breakdown
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Likes */}
                  <div className="bg-white/5 rounded-lg p-4 border border-purple-300/10">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-gray-300 text-sm">Likes</h4>
                      <ThumbUpIcon
                        className="text-yellow-400"
                        fontSize="small"
                      />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatNumber(analyticsData.comparison.likes.current)}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="bg-white/5 rounded-lg p-4 border border-purple-300/10">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-gray-300 text-sm">Comments</h4>
                      <CommentIcon
                        className="text-green-400"
                        fontSize="small"
                      />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatNumber(analyticsData.comparison.comments.current)}
                    </div>
                  </div>

                  {/* Shares */}
                  <div className="bg-white/5 rounded-lg p-4 border border-purple-300/10">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-gray-300 text-sm">Shares</h4>
                      <ShareIcon className="text-purple-400" fontSize="small" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatNumber(analyticsData.comparison.shares.current)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Playlists Section */}
              <PlaylistsSection playlists={analyticsData.playlists} />

              {/* Documentation & Help Banner */}
              <div className="bg-gradient-to-r from-purple-700/50 to-violet-800/50 rounded-xl p-5 shadow-lg border border-purple-400/20 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Need help with your YouTube strategy?
                    </h3>
                    <p className="text-purple-100 max-w-2xl">
                      Get personalized recommendations to grow your channel
                      based on these analytics. We can help with content
                      planning, audience targeting, and engagement strategies.
                    </p>
                  </div>
                  <button className="bg-white text-purple-800 hover:bg-purple-100 px-6 py-3 rounded-lg font-medium transition-all shadow-lg">
                    Get Recommendations
                  </button>
                </div>
              </div>

              <div className="text-center text-sm text-gray-400 pb-6">
                <p>
                  Data is pulled from YouTube Analytics API using static access
                  token. Last refreshed: {new Date().toLocaleString()}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 bg-black/20 backdrop-blur-sm mt-8">
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
};

export default YouTubeAnalytics;
