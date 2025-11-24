/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "images.unsplash.com",
      "i.ibb.co",
      "i.ibb.co.com"
    ],
  },
};

export default nextConfig;
