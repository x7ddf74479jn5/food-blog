import { mockCategories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategoryMenu } from ".";

export default {
  title: "molecules/CategoryMenu",
  component: CategoryMenu,
} as ComponentMeta<typeof CategoryMenu>;

const Template: ComponentStory<typeof CategoryMenu> = (args) => (
  <div className="w-48 h-48">
    <CategoryMenu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  categories: [mockCategories.rice, mockCategories.salad, mockCategories.tips],
  columns: "grid-cols-3 sm:grid-cols-5 md:grid-cols-1",
};
