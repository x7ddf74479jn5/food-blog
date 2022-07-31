const path = require("path");

const toPath = (_path) => path.resolve(__dirname, _path);

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
    // FIXME: conflict with @storybook/addon-postcss
    // "storybook-addon-next",
    "storybook-addon-performance",
    "storybook-tailwind-dark-mode",
  ],
  staticDirs: ["../public"],
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
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
        alias: {
          ...config.resolve.alias,
          "@": toPath("../src"),
          "@styles": toPath("../src/styles"),
          "@pages": toPath("../src/pages"),
          "@types": toPath("../src/types"),
          "@components": toPath("../src/components"),
          "@context": toPath("../src/context"),
          "@utils": toPath("../src/utils"),
          "@mocks": toPath("../mocks"),
        },
        // roots: ["node_modules", toPath("../mocks/data")],
      },
    };
  },
};

module.exports = config;
