import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Tooltip from "./index";

export default {
  component: Tooltip,
  title: "atoms/Tooltip",
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <button className="rounded bg-green-500 p-1 text-black dark:text-white">children</button>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  label: "label",
};
