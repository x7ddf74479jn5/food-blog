import path from "node:path";
import webpack from "webpack";

const toPath = (_path: string) => path.resolve(__dirname, _path);

/**
 * @type {import('@storybook/react/types').StorybookConfig}
 */
const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-a11y",
    "storybook-addon-performance",
    "storybook-dark-mode",
    "storycap",
  ],
  staticDirs: ["../mocks/data/images"],
  core: {
    builder: {
      name: "webpack5",
      options: {
        fsCache: true,
      },
    },
  },
  framework: "@storybook/react",
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
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
      plugins: [
        ...config.plugins,
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    };
  },
};

module.exports = config;
