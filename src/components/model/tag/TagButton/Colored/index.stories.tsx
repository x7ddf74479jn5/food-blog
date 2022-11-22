import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockTags } from "mocks/data/tags";

import { TagButtonColored } from ".";

export default {
  component: TagButtonColored,
  title: "model/tag/TagButton/Colored",
} as ComponentMeta<typeof TagButtonColored>;

export const Default: ComponentStoryObj<typeof TagButtonColored> = { args: { tag: mockTags.rice } };
