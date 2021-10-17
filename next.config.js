const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
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
      dest: "public",
      runtimeCaching,
    },
  })
);
