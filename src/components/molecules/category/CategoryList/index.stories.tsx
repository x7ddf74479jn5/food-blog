import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data/categories";

import { CategoryList } from ".";

export default {
  component: CategoryList,
  title: "molecules/category/CategoryList",
} as ComponentMeta<typeof CategoryList>;

export const Desktop: ComponentStoryObj<typeof CategoryList> = {
  args: {
    categories: Object.values(mockCategories),
    height: 128,
    width: 128,
  },
};
