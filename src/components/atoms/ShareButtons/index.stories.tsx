import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShareButtons } from ".";

export default {
  title: "Atoms/buttons/ShareButtons",
  component: ShareButtons,
} as ComponentMeta<typeof ShareButtons>;

const Template: ComponentStory<typeof ShareButtons> = (args) => (
  <div className="mx-8">
    <ShareButtons {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  url: "url",
  title: "title",
  twitterId: "twitterId",
};
