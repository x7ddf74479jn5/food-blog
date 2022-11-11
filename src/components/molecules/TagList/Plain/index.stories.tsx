import { mockTags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { TagListPlain } from ".";

export default {
  component: TagListPlain,
  title: "Molecules/TagList/Plain",
} as ComponentMeta<typeof TagListPlain>;

const Template: ComponentStory<typeof TagListPlain> = (args) => <TagListPlain {...args} />;

export const Default = Template.bind({});
Default.args = {
  hasLink: true,
  tags: [mockTags.rice, mockTags.komatsuna, mockTags.mozzarella, mockTags.preparation],
};
