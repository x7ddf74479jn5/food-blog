import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { LoadMoreButton } from ".";

export default {
  component: LoadMoreButton,
  title: "feature/Pagination/LoadMoreButton",
} as ComponentMeta<typeof LoadMoreButton>;

export const Default: ComponentStoryObj<typeof LoadMoreButton> = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
};
