import "@/styles/global.css";
import "./index.css";

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { StoryFn } from "@storybook/react";
import React from "react";
import { withPerformance } from "storybook-addon-performance";
import { withScreenshot } from "storycap";

import "./mocks/NextImage";

export const withWrapper = (Story: StoryFn) => (
  <div style={{ maxWidth: "42rem" }}>
    <Story />
  </div>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    darkClass: "dark",
    stylePreview: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  screenshot: {
    viewport: {
      width: 375,
      height: 668,
    },
    fullPage: false,
  },
};

export const decorators = [withWrapper, withPerformance, withScreenshot];
