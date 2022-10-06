import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { ShareButtons } from ".";
import { device } from ".storybook/mocks/device";

export default {
  title: "molecules/ShareButtons",
  component: ShareButtons,
} as ComponentMeta<typeof ShareButtons>;

export const Desktop: ComponentStoryObj<typeof ShareButtons> = {
  args: {
    url: "url",
    title: "title",
    className: "flex-col",
  },
};
export const Mobile: ComponentStoryObj<typeof ShareButtons> = {
  args: { ...Desktop.args, className: "flex-row" },
  parameters: {
    viewport: {
      defaultViewport: device.mobile,
    },
  },
};
