import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/start",
        destination: "/build-with-us",
        permanent: false,
      },
      {
        source: "/pitches",
        destination: "/projects",
        permanent: false,
      },
      {
        source: "/commission",
        destination: "/build-with-us",
        permanent: false,
      },
      {
        source: "/audit",
        destination: "/build-with-us",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/build-with-us",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
