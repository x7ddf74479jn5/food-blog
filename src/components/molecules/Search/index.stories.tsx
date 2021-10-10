import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Search from ".";

export default {
  title: "Molecules/Search",
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
