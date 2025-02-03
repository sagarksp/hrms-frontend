/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'roster.gtel.in',
        'api.dicebear.com',
        'res.cloudinary.com',
        'img.freepik.com',
        'cdn-icons-png.flaticon.com',
        'wibro.in',
        'www.gtel.in', // Add this domain for the logo
        'localhost',
        'api.gtel.in',
      ], // Add the allowed image domains here
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Match requests to /api/*
          destination: 'https://roster.gtel.in/api/:path*', // Proxy to the external API
        },
      ];
    },
  };
  
  export default nextConfig;
  
  














// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['roster.gtel.in','api.dicebear.com','res.cloudinary.com','img.freepik.com', 'cdn-icons-png.flaticon.com', 'wibro.in', 'www.gtel.in','localhost','api.gtel.in'], // Add the allowed image domains here
//     },
// };

// export default nextConfig;
