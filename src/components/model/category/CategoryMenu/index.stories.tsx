import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data/categories";

import { CategoryMenu } from ".";
import { withRouterContext } from ".storybook/mocks/context";

export default {
  component: CategoryMenu,
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn());
    },
  ],
  title: "molecules/category/CategoryMenu",
} as ComponentMeta<typeof CategoryMenu>;

export const Default: ComponentStoryObj<typeof CategoryMenu> = {
  args: { categories: Object.values(mockCategories) },
};
