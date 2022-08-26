import { mockCategories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ButtonCategory } from ".";

export default {
  title: "atoms/buttons/ButtonCategory",
  component: ButtonCategory,
} as ComponentMeta<typeof ButtonCategory>;

const Template: ComponentStory<typeof ButtonCategory> = (args) => <ButtonCategory {...args} />;

export const Default = Template.bind({});
Default.args = { category: mockCategories.rice };
