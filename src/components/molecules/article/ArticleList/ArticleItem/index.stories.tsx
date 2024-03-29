import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockArticles } from "mocks/data/articles";

import { ArticleItem } from ".";

export default {
  component: ArticleItem,
  title: "molecules/article/ArticleList/ArticleItem",
} as ComponentMeta<typeof ArticleItem>;

const Template: ComponentStory<typeof ArticleItem> = (args) => (
  <div className="h-96 w-96">
    <ArticleItem {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  article: mockArticles.stock,
};
