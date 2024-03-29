import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeProvider } from "next-themes";

import { ThemeSwitch } from ".";

export default {
  component: ThemeSwitch,
  title: "molecules/ThemeSwitch",
} as ComponentMeta<typeof ThemeSwitch>;

const Template: ComponentStory<typeof ThemeSwitch> = (args) => (
  <ThemeProvider enableSystem>
    <ThemeSwitch {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
