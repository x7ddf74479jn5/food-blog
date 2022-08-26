import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { Skelton } from ".";

export default {
  title: "atoms/Skelton",
  component: Skelton,
} as ComponentMeta<typeof Skelton>;

export const Default: ComponentStoryObj<typeof Skelton> = {
  args: {
    className: "h-4 w-32",
  },
};
