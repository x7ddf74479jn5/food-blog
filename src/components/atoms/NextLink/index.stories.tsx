import type { ComponentMeta, ComponentStory } from "@storybook/react";

import NextLink from ".";

export default {
  title: "Atoms/NextLink",
  component: NextLink,
} as ComponentMeta<typeof NextLink>;

const Template: ComponentStory<typeof NextLink> = (args) => <NextLink {...args}>Link</NextLink>;

export const Default = Template.bind({});
Default.args = {
  href: "",
  className: "text-2xl font-bold text-green-500",
};
