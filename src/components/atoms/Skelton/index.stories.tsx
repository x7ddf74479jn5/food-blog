import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { Skelton } from ".";

export default {
  component: Skelton,
  title: "atoms/Skelton",
} as ComponentMeta<typeof Skelton>;

export const Default: ComponentStoryObj<typeof Skelton> = {
  args: {
    className: "h-4 w-32",
  },
};
