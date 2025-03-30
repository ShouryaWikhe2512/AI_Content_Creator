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
};

module.exports = nextConfig;
