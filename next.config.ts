import type { NextConfig } from "next";
import { site } from "./src/config/site";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-cdn-fa.spotifycdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/podcast",
        destination: site.socials.podcast,
        permanent: false,
      },
      {
        source: "/articles",
        destination: "/devlogs",
        permanent: true,
      },
      {
        source: "/articles/:slug",
        destination: "/devlogs",
        permanent: true,
      },
      {
        source: "/research",
        destination: "/cinema",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/cinema",
        permanent: true,
      },
      {
        source: "/bookmarks",
        destination: "/cinema",
        permanent: true,
      },
      {
        source: "/books",
        destination: "/cinema",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
