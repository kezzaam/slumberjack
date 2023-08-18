/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other Next.js configuration options...
  
    // Add the `env` key to specify the downloadPath
    env: {
      downloadPath: '\\%USERPROFILE%\\Downloads',
    },
  };
  
  module.exports = nextConfig;
  