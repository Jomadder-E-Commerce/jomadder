/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cbu01.alicdn.com',
      'cf.bstatic.com',
      'cbu01-overseas.1688.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cbu01.alicdn.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cbu01-overseas.1688.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'deshmart.com',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;