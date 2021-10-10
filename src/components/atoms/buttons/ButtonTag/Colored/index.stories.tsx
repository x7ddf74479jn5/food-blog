import { mockTags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ButtonTagColored } from ".";

export default {
  title: "Atoms/buttons/ButtonTag/Colored",
  component: ButtonTagColored,
} as ComponentMeta<typeof ButtonTagColored>;

const Template: ComponentStory<typeof ButtonTagColored> = (args) => <ButtonTagColored {...args} />;

export const Default = Template.bind({});
Default.args = { tag: mockTags.rice };
