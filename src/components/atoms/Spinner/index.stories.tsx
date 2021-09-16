import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Spinner from ".";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
