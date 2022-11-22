import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockTags } from "mocks/data/tags";

import { TagListPlain } from ".";

export default {
  component: TagListPlain,
  title: "Molecules/TagList/Plain",
} as ComponentMeta<typeof TagListPlain>;

export const Default: ComponentStoryObj<typeof TagListPlain> = {
  args: {
    hasLink: true,
    tags: [mockTags.rice, mockTags.komatsuna, mockTags.mozzarella, mockTags.preparation],
  },
};
