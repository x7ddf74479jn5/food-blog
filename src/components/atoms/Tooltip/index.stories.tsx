import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Tooltip from "./index";

export default {
  title: "Atoms/buttons/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <button className="p-1 text-black dark:text-white bg-green-500 rounded">children</button>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  label: "label",
};
