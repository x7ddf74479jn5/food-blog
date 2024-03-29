import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories, mockTags } from "mocks/data";

import { SearchFilter } from ".";
import { withContext } from ".storybook/mocks/context";

export default {
  component: SearchFilter,
  title: "organisms/SearchArea/SearchFilter",
} as ComponentMeta<typeof SearchFilter>;

export const Default: ComponentStoryObj<typeof SearchFilter> = {
  args: {
    categories: Object.values(mockCategories),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onToggle: () => {},

    tags: Object.values(mockTags),
  },
  decorators: [
    (storyFn) => {
      return withContext(storyFn());
    },
  ],
};
