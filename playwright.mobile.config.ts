import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

import baseConfig from "./playwright.config";

const config: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: "./tests/e2e/mobile",
  projects: [
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 13"],
      },
    },
  ],
};

export default config;
