/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aspirev-backend-bhe7g2fdabbycbap.eastus-01.azurewebsites.net",
      },
      {
        protocol: "https",
        hostname: "invikt-backend.onrender.com",
      },
      {
        protocol: "https",
        hostname: "**.blob.core.windows.net",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
