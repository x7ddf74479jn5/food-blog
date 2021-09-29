import { tags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { TTag } from "@/types";

import TagList from ".";

export default {
  title: "Molecules/TagList",
  component: TagList,
} as ComponentMeta<typeof TagList>;

const Template: ComponentStory<typeof TagList> = (args) => <TagList {...args} />;

export const Default = Template.bind({});
Default.args = { tags: [tags.rice, tags.komatsuna, tags.mozzarella, tags.preparation] as TTag[] };
