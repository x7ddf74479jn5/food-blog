import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Pagination from ".";

export default {
  component: Pagination,
  title: "molecules/Pagination",
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const HasNextPage = Template.bind({});
HasNextPage.args = {
  hasNextPage: true,
  isValidating: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};

export const IsValidating = Template.bind({});
IsValidating.args = {
  hasNextPage: true,
  isValidating: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
