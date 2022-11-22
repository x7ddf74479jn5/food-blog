import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleSkelton } from ".";

export default {
  component: ArticleSkelton,
  title: "article/ArticleSkeltonList/ArticleSkelton",
} as ComponentMeta<typeof ArticleSkelton>;

const Template: ComponentStory<typeof ArticleSkelton> = (args) => (
  <div className="h-96 w-96">
    <ArticleSkelton {...args} />
  </div>
);

export const Default = Template.bind({});
