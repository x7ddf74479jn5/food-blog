import "@/styles/global.css";
import "./index.css";

import { withPerformance } from "storybook-addon-performance";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { StoryFn } from "@storybook/react";
import React from "react";

import "./mocks/NextImage";

export const withWrapper = (Story: StoryFn) => (
  <div style={{ maxWidth: "42rem" }}>
    <Story />
  </div>
);

const customViewports = {
  pchd: {
    name: "PC HD",
    styles: {
      width: "1280px",
      height: "720px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: { ...INITIAL_VIEWPORTS, ...customViewports },
  },
};

export const decorators = [withWrapper, withPerformance];
