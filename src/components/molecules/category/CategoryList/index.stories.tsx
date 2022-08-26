import { mockCategories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategoryList } from ".";

export default {
  title: "molecules/category/CategoryList",
  component: CategoryList,
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args) => <CategoryList {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: Object.values(mockCategories),
  width: 128,
  height: 128,
};
