import { mockCategories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategoryListSide } from ".";

export default {
  title: "molecules/category/CategoryListSide",
  component: CategoryListSide,
} as ComponentMeta<typeof CategoryListSide>;

const Template: ComponentStory<typeof CategoryListSide> = (args) => <CategoryListSide {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: [mockCategories.rice, mockCategories.salad, mockCategories.tips],
  columns: "grid-cols-3 sm:grid-cols-5 md:grid-cols-1",
};

export const ArticlePage = Template.bind({});
ArticlePage.args = {
  ...Default.args,
  columns: "grid-cols-3 sm:grid-cols-5 md:grid-cols-3",
};
