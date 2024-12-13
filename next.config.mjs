/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
        hostname: "digitalhippo.medhashismaiti.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
