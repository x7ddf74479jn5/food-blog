import { categories } from "@mocks/data/categories";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { TCategory } from "@/types";

import ButtonCategory from ".";

export default {
  title: "Atoms/buttons/ButtonCategory",
  component: ButtonCategory,
} as ComponentMeta<typeof ButtonCategory>;

const Template: ComponentStory<typeof ButtonCategory> = (args) => <ButtonCategory {...args} />;

export const Default = Template.bind({});
Default.args = { category: categories.rice as TCategory };
