import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockTags } from "mocks/data/tags";

import { ButtonTagColored } from ".";

export default {
  component: ButtonTagColored,
  title: "atoms/buttons/ButtonTag/Colored",
} as ComponentMeta<typeof ButtonTagColored>;

const Template: ComponentStory<typeof ButtonTagColored> = (args) => <ButtonTagColored {...args} />;

export const Default = Template.bind({});
Default.args = { tag: mockTags.rice };
