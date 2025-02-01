import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google 프로필 이미지
      'avatars.githubusercontent.com', // GitHub 프로필 이미지
    ],
  },
};

export default nextConfig;
