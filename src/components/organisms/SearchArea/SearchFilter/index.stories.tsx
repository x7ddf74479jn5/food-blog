import { mockCategories, mockTags } from "@mocks/data";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { SearchFilter } from ".";
import { withRouterContext } from ".storybook/mocks/context";

export default {
  title: "organisms/SearchArea/SearchFilter",
  component: SearchFilter,
} as ComponentMeta<typeof SearchFilter>;

export const Default: ComponentStoryObj<typeof SearchFilter> = {
  args: {
    categories: Object.values(mockCategories),
    tags: Object.values(mockTags),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onToggle: () => {},
  },
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn, { asPath: "/" });
    },
  ],
};
