import { mockTags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { TagListPlain } from ".";

export default {
  title: "Molecules/TagList/TagListPlain",
  component: TagListPlain,
} as ComponentMeta<typeof TagListPlain>;

const Template: ComponentStory<typeof TagListPlain> = (args) => <TagListPlain {...args} />;

export const Default = Template.bind({});
Default.args = { tags: [mockTags.rice, mockTags.komatsuna, mockTags.mozzarella, mockTags.preparation] };
