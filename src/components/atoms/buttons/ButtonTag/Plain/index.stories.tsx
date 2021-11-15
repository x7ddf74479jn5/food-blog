import { mockTags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ButtonTagPlain } from ".";

export default {
  title: "Atoms/buttons/ButtonTag/Plain",
  component: ButtonTagPlain,
} as ComponentMeta<typeof ButtonTagPlain>;

const Template: ComponentStory<typeof ButtonTagPlain> = (args) => <ButtonTagPlain {...args} />;

export const Default = Template.bind({});
Default.args = {
  tag: mockTags.rice,
  hasLink: true,
};
