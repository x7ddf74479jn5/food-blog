import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Spinner from ".";

export default {
  component: Spinner,
  title: "Atoms/Spinner",
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <div className="fixed inset-0 flex h-screen w-full items-center justify-center ">
    <Spinner {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "w-32 h-32",
};
