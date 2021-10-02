import { tags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { TTag } from "@/types";

import { TagListColored } from ".";

export default {
  title: "Molecules/TagList/Colored",
  component: TagListColored,
} as ComponentMeta<typeof TagListColored>;

const Template: ComponentStory<typeof TagListColored> = (args) => <TagListColored {...args} />;

export const Default = Template.bind({});
Default.args = { tags: [tags.rice, tags.komatsuna, tags.mozzarella, tags.preparation] as TTag[] };
