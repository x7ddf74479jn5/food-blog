import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockTags } from "mocks/data/tags";

import type { TTag } from "@/types";

import { TagListColored } from ".";

export default {
  component: TagListColored,
  title: "Molecules/TagList/Colored",
} as ComponentMeta<typeof TagListColored>;

export const Default: ComponentStoryObj<typeof TagListColored> = {
  args: { tags: [mockTags.rice, mockTags.komatsuna, mockTags.mozzarella, mockTags.preparation] as TTag[] },
};
