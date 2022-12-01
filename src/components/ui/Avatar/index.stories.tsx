import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockWriters } from "mocks/data";

import { Avatar } from ".";

export default {
  component: Avatar,
  title: "ui/Avatar",
} as ComponentMeta<typeof Avatar>;

const { avatar, name } = mockWriters.pandashark;

export const Default: ComponentStoryObj<typeof Avatar> = {
  args: {
    alt: name,
    height: 32,
    src: avatar.url,
    width: 32,
  },
};
