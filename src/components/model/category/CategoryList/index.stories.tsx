import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data/categories";

import { CategoryListView } from "./CategoryListView";

export default {
  component: CategoryListView,
  title: "model/category/CategoryList",
} as ComponentMeta<typeof CategoryListView>;

export const Desktop: ComponentStoryObj<typeof CategoryListView> = {
  args: {
    categories: Object.values(mockCategories),
    height: 128,
    width: 128,
  },
};
