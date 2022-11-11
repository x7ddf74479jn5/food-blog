import type { ComponentMeta, ComponentStory } from "@storybook/react";

import NextLink from ".";

export default {
  component: NextLink,
  title: "Atoms/NextLink",
} as ComponentMeta<typeof NextLink>;

const Template: ComponentStory<typeof NextLink> = (args) => <NextLink {...args}>Link</NextLink>;

export const Default = Template.bind({});
Default.args = {
  className: "text-2xl font-bold text-green-500",
  href: "",
};
