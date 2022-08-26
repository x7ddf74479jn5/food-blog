import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoadMoreButton } from ".";

export default {
  title: "atoms/buttons/LoadMoreButton",
  component: LoadMoreButton,
} as ComponentMeta<typeof LoadMoreButton>;

const Template: ComponentStory<typeof LoadMoreButton> = (args) => <LoadMoreButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
