import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoadMoreButton } from ".";

export default {
  component: LoadMoreButton,
  title: "molecules/Pagination/LoadMoreButton",
} as ComponentMeta<typeof LoadMoreButton>;

const Template: ComponentStory<typeof LoadMoreButton> = (args) => <LoadMoreButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
