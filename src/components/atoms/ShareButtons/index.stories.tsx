import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShareButtons } from ".";

export default {
  title: "Atoms/ShareButtons",
  component: ShareButtons,
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
  },
} as ComponentMeta<typeof ShareButtons>;

const Template: ComponentStory<typeof ShareButtons> = (args) => (
  <div className="mx-8">
    <ShareButtons {...args} />
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  url: "url",
  title: "title",
};

export const Vertical = Template.bind({});
Vertical.args = {
  url: "url",
  title: "title",
  direction: "column",
};
