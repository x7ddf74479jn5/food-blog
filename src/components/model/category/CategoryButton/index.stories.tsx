import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data/categories";

import { CategoryButton } from ".";

export default {
  component: CategoryButton,
  title: "model/category/CategoryButton",
} as ComponentMeta<typeof CategoryButton>;

export const Default: ComponentStoryObj<typeof CategoryButton> = {
  args: { category: mockCategories.rice },
};
