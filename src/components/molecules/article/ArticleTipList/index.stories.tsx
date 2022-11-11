import { mockArticles } from "@mocks/data/articles";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleTipWithThumb } from ".";

export default {
  component: ArticleTipWithThumb,
  title: "molecules/article/ArticleTipWithThumb",
} as ComponentMeta<typeof ArticleTipWithThumb>;

const Template: ComponentStory<typeof ArticleTipWithThumb> = (args) => <ArticleTipWithThumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  article: mockArticles.stock,
};
