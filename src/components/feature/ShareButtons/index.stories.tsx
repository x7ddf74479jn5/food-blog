import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { ShareButtons } from ".";
import { device } from ".storybook/mocks/device";

export default {
  component: ShareButtons,
  title: "fewature/ShareButtons",
} as ComponentMeta<typeof ShareButtons>;

export const Desktop: ComponentStoryObj<typeof ShareButtons> = {
  args: {
    className: "flex-col",
    title: "title",
    url: "url",
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
