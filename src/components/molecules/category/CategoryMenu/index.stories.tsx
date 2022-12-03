import type { ComponentMeta, ComponentStory } from "@storybook/react";
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

const Template: ComponentStory<typeof CategoryMenu> = (args) => <CategoryMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: Object.values(mockCategories),
};
