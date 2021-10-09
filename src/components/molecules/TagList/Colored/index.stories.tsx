import { mockTags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { TTag } from "@/types";

import { TagListColored } from ".";

export default {
  title: "Molecules/TagList/Colored",
  component: TagListColored,
} as ComponentMeta<typeof TagListColored>;

const Template: ComponentStory<typeof TagListColored> = (args) => <TagListColored {...args} />;

export const Default = Template.bind({});
Default.args = { tags: [mockTags.rice, mockTags.komatsuna, mockTags.mozzarella, mockTags.preparation] as TTag[] };
