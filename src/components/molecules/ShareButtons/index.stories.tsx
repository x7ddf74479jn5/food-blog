import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { ShareButtons } from ".";

export default {
  title: "molecules/ShareButtons",
  component: ShareButtons,
} as ComponentMeta<typeof ShareButtons>;

export const Vertical: ComponentStoryObj<typeof ShareButtons> = {
  args: {
    url: "url",
    title: "title",
  },
};
