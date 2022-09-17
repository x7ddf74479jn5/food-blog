import { mockCategories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { CategoryList } from ".";

export default {
  title: "molecules/category/CategoryList",
  component: CategoryList,
} as ComponentMeta<typeof CategoryList>;

export const Desktop: ComponentStoryObj<typeof CategoryList> = {
  args: {
    categories: Object.values(mockCategories),
    width: 128,
    height: 128,
  },
};
