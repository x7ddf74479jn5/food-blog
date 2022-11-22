import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockTags } from "mocks/data/tags";

import { TagButtonPlain } from ".";

export default {
  component: TagButtonPlain,
  title: "model/tag/TagButton/Plain",
} as ComponentMeta<typeof TagButtonPlain>;

export const Default: ComponentStoryObj<typeof TagButtonPlain> = {
  args: {
    hasLink: true,
    tag: mockTags.rice,
  },
};
