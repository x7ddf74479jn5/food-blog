import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { ShareButtons } from ".";

export default {
  title: "molecules/ShareButtons",
  component: ShareButtons,
} as ComponentMeta<typeof ShareButtons>;

export const Desktop: ComponentStoryObj<typeof ShareButtons> = {
  args: {
    url: "url",
    title: "title",
  },
  parameters: {
    viewport: {
      defaultViewport: "pchd",
    },
  },
};
export const Mobile: ComponentStoryObj<typeof ShareButtons> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
};
