import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleSkelton } from ".";

export default {
  title: "molecules/ArticleSkelton",
  component: ArticleSkelton,
} as ComponentMeta<typeof ArticleSkelton>;

const Template: ComponentStory<typeof ArticleSkelton> = (args) => (
  <div className="w-96 h-96">
    <ArticleSkelton {...args} />
  </div>
);

export const Default = Template.bind({});
