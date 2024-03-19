// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   env: {
//     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:
//       process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         pathname: "**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '5mb', // Adjust the limit as needed (in bytes)
  },
};

export default nextConfig;
