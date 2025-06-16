// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "yt3.ggpht.com", // YouTube profile images
//       "i.ytimg.com", // YouTube video thumbnails
//       "lh3.googleusercontent.com", // Google profile pictures
//     ],
//   },
// };

// // next.config.js
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// module.exports = nextConfig;

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "yt3.ggpht.com", // YouTube profile images
      "i.ytimg.com", // YouTube video thumbnails
      "lh3.googleusercontent.com", // Google profile pictures
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
