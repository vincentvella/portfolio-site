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
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "resume.vincevella.com",
          },
        ],
        destination: "https://www.vincevella.com/resume/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "resume.vincentvella.me",
          },
        ],
        destination: "https://www.vincentvella.me/resume/:path*",
        permanent: true,
      },
    ];
  },
};
