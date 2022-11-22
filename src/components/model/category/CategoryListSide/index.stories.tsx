import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data/categories";

import { CategoryListSideView } from "./CategoryListSideView";

export default {
  component: CategoryListSideView,
  title: "model/category/CategoryListSide",
} as ComponentMeta<typeof CategoryListSideView>;

export const Default: ComponentStoryObj<typeof CategoryListSideView> = {
  args: {
    categories: [mockCategories.rice, mockCategories.salad, mockCategories.tips],
    columns: "grid-cols-3 sm:grid-cols-5 md:grid-cols-1",
  },
  decorators: [
    (Story) => (
      <div className="max-w-max">
        <Story />
      </div>
    ),
  ],
};

export const ArticlePage: ComponentStoryObj<typeof CategoryListSideView> = {
  args: {
    ...Default.args,
    columns: "grid-cols-3 md:grid-cols-5 lg:grid-cols-3",
  },
};
