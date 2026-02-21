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
        pathname: "/**/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "resume.vincevella.com",
          },
        ],
        destination: "https://vincevella.com/resume",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "resume.vincentvella.me",
          },
        ],
        destination: "https://vincentvella.me/resume",
        permanent: true,
      },
    ];
  },
};
