import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import NextLink from ".";

export default {
  component: NextLink,
  title: "ui/NextLink",
} as ComponentMeta<typeof NextLink>;

export const Default: ComponentStoryObj<typeof NextLink> = {
  args: {
    className: "text-2xl font-bold text-green-500",
    href: "",
  },
};
