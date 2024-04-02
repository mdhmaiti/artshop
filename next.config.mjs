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
      // {
      //   protocol: "https",
      //   hostname: "digitalhippo-production.up.railway.app",
      // },
    ],
  },
};

export default nextConfig;
