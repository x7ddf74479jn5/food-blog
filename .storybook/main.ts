import path from "node:path";

const toPath = (_path: string) => path.resolve(__dirname, _path);

/**
 * @type {import('@storybook/nextjs/types').StorybookConfig}
 */
const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-addon-performance",
    "storybook-dark-mode",
    "storycap",
  ],
  staticDirs: ["../mocks/data/images"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        modules: [...config.resolve.modules, toPath("../")],

        alias: {
          ...config.resolve.alias,
          "@": toPath("../src"),
        },
      },
    };
  },
  docs: {
    autodocs: true,
  },
};

module.exports = config;
