const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer =
  process.env.ANALYZE === "true" ? require("@next/bundle-analyzer")({ enabled: true }) : (config) => config;
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ["images.microcms-assets.io"],
  },
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  swcMinify: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
    nextScriptWorkers: true,
    browsersListForSwc: true,
    legacyBrowsers: false,
  },
  sentry: {
    hideSourceMaps: true,
  },
};

const withSentryConfig = (config) => {
  // withBundleAnalyzer とのバッティング回避
  if (process.env.ANALYZE === "true") return config;
  return require("@sentry/nextjs").withSentryConfig(config, {
    silent: false,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  });
};

module.exports = withPlugins([withSentryConfig, withBundleAnalyzer, withPWA], nextConfig);
