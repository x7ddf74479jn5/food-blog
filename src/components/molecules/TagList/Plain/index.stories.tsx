import { tags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { TTag } from "@/types";

import { TagListPlain } from ".";

export default {
  title: "Molecules/TagList/TagListPlain",
  component: TagListPlain,
} as ComponentMeta<typeof TagListPlain>;

const Template: ComponentStory<typeof TagListPlain> = (args) => <TagListPlain {...args} />;

export const Default = Template.bind({});
Default.args = { tags: [tags.rice, tags.komatsuna, tags.mozzarella, tags.preparation] as TTag[] };
