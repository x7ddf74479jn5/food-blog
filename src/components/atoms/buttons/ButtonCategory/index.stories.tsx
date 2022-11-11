import { mockCategories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ButtonCategory } from ".";

export default {
  component: ButtonCategory,
  title: "atoms/buttons/ButtonCategory",
} as ComponentMeta<typeof ButtonCategory>;

const Template: ComponentStory<typeof ButtonCategory> = (args) => <ButtonCategory {...args} />;

export const Default = Template.bind({});
Default.args = { category: mockCategories.rice };
