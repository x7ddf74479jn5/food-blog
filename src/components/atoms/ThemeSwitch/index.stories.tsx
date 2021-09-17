import type { ComponentMeta, ComponentStory } from "@storybook/react";

import ThemeSwitch from ".";

export default {
  title: "Atoms/ThemeSwitch",
  component: ThemeSwitch,
} as ComponentMeta<typeof ThemeSwitch>;

const Template: ComponentStory<typeof ThemeSwitch> = (args) => <ThemeSwitch {...args} />;

export const Default = Template.bind({});
