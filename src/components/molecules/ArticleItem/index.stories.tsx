import { mockArticles } from "@mocks/data/articles";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleItem } from ".";

export default {
  title: "molecules/ArticleItem",
  component: ArticleItem,
} as ComponentMeta<typeof ArticleItem>;

const Template: ComponentStory<typeof ArticleItem> = (args) => (
  <div className="w-96 h-96">
    <ArticleItem {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  article: mockArticles.stock,
};
