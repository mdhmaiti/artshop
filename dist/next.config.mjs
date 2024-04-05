/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "artshop-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
