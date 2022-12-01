import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import Pagination from ".";

export default {
  component: Pagination,
  title: "feature/Pagination",
} as ComponentMeta<typeof Pagination>;

export const HasNextPage: ComponentStoryObj<typeof Pagination> = {
  args: {
    hasNextPage: true,
    isValidating: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
};

export const IsValidating: ComponentStoryObj<typeof Pagination> = {
  args: {
    hasNextPage: true,
    isValidating: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
};
