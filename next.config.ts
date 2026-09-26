import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kokosinspace.com" }],
        destination: "https://kokosinspace.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
