const withBundleAnalyzer =
  process.env.ANALYZE === "true" ? require("@next/bundle-analyzer")({ enabled: true }) : (config) => config;

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
    nextScriptWorkers: true,
    scrollRestoration: true,
  },
  images: {
    domains: ["images.microcms-assets.io"],
  },
  pageExtensions: ["page.tsx", "page.ts"],
  poweredByHeader: false,
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: process.env.NODE_ENV !== "production",
    widenClientFileUpload: true,
  },
  swcMinify: true,
};

const withPWA = require("next-pwa")({
  buildExcludes: [/middleware-manifest.json$/],
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
});

const withSentryConfig = (config) => {
  // withBundleAnalyzer とのバッティング回避
  if (process.env.ANALYZE === "true") return config;
  return require("@sentry/nextjs").withSentryConfig(config, {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    dryRun: process.env.NODE_ENV !== "production",
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: false,
  });
};

const withPlugins = (defaultConfig) => {
  const plugins = [withBundleAnalyzer, withSentryConfig, withPWA];
  return plugins.reduce((acc, plugin) => plugin(acc), defaultConfig);
};

module.exports = withPlugins(nextConfig);
