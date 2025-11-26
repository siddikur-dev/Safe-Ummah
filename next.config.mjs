/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'imgbb.com', 
      'i.ibb.co',
      'www.pik.in',
      'pik.in'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgbb.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'www.pik.in',
      },
      {
        protocol: 'https',
        hostname: 'pik.in',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;