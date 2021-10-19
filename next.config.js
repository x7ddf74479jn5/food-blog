const withBundleAnalyzer =
  process.env.ANALYZE === "true" ? require("@next/bundle-analyzer")({ enabled: true }) : (config) => config;
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withBundleAnalyzer(
  withPWA({
    i18n: { locales: ["ja"], defaultLocale: "ja" },
    reactStrictMode: true,
    typescript: { ignoreDevErrors: true },
    poweredByHeader: false,
    images: {
      domains: ["images.microcms-assets.io"],
    },
    pageExtensions: ["page.tsx", "page.ts"],
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public",
      runtimeCaching,
    },
  })
);
