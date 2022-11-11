import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockCategories } from "mocks/data/categories";

import { withRouterContext } from "../../../../../.storybook/mocks/context";
import { CategoryMenu } from ".";

export default {
  component: CategoryMenu,
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn, { asPath: "/" });
    },
  ],
  title: "molecules/category/CategoryMenu",
} as ComponentMeta<typeof CategoryMenu>;

const Template: ComponentStory<typeof CategoryMenu> = (args) => <CategoryMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: Object.values(mockCategories),
};
