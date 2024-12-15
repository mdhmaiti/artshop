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
        protocol: "http",
        hostname: "digitalhippo.medhashismaiti.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "digitalhippo.medhashismaiti.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
