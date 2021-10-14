import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Spinner from ".";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <div className="flex fixed inset-0 justify-center items-center w-full h-screen ">
    <Spinner {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "w-32 h-32",
};
