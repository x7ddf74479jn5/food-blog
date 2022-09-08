import { mockWriters } from "@mocks/data";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { Avatar } from ".";

export default {
  title: "atoms/Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const { avatar, name } = mockWriters.pandashark;

export const Default: ComponentStoryObj<typeof Avatar> = {
  args: {
    src: avatar.url,
    alt: name,
    width: 32,
    height: 32,
  },
};
