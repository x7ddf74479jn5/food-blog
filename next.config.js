const withBundleAnalyzer =
  process.env.ANALYZE === "true" ? require("@next/bundle-analyzer")({ enabled: true }) : (config) => config;
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer(
  withPWA({
    i18n: { locales: ["ja"], defaultLocale: "ja" },
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
      domains: ["images.microcms-assets.io"],
    },
    pageExtensions: ["page.tsx", "page.ts"],
    pwa: {
      disable: process.env.NODE_ENV !== "production",
      dest: "public",
      runtimeCaching,
      buildExcludes: [/middleware-manifest.json$/],
    },
    swcMinify: true,
    experimental: {
      scrollRestoration: true,
    },
  })
);
