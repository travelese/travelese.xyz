/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `${process.env.VERCEL_URL}/api/auth`
      : "http://localhost:3000/api/auth",
  },
};

export default nextConfig;
