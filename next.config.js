// https://nextjs.org/docs/api-reference/next.config.js/introduction
/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/06126mmge7q6/**",
      },
      {
        protocol: "https",
        hostname: "asset.brandfetch.io",
        port: "",
        pathname: "/idO5iUBn-d/**",
      },
    ],
  },
};
