import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { ShareButtons } from ".";
import { screenshotViewportVariants } from ".storybook/screenshot";

export default {
  component: ShareButtons,
  title: "molecules/ShareButtons",
} as ComponentMeta<typeof ShareButtons>;

export const Default: ComponentStoryObj<typeof ShareButtons> = {
  args: {
    className: "flex-col",
    title: "title",
    url: "url",
  },
  parameters: {
    screenshot: {
      variants: screenshotViewportVariants,
    },
  },
};
