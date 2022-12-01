import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockTags } from "mocks/data/tags";

import { ButtonTagPlain } from ".";

export default {
  component: ButtonTagPlain,
  title: "atoms/buttons/ButtonTag/Plain",
} as ComponentMeta<typeof ButtonTagPlain>;

const Template: ComponentStory<typeof ButtonTagPlain> = (args) => <ButtonTagPlain {...args} />;

export const Default = Template.bind({});
Default.args = {
  hasLink: true,
  tag: mockTags.rice,
};
