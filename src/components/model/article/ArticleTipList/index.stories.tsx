import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockArticles } from "mocks/data/articles";

import { ArticleTipWithThumb } from ".";

export default {
  component: ArticleTipWithThumb,
  title: "model/article/ArticleTipWithThumb",
} as ComponentMeta<typeof ArticleTipWithThumb>;

const Template: ComponentStory<typeof ArticleTipWithThumb> = (args) => <ArticleTipWithThumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  article: mockArticles.stock,
};
