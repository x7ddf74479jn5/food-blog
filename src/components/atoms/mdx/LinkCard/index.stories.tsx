import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockArticles } from "mocks/data";

import { LinkCard } from ".";

export default {
  component: LinkCard,
  title: "Atoms/mdx/LinkCard",
} as ComponentMeta<typeof LinkCard>;

const Template: ComponentStory<typeof LinkCard> = (args) => (
  <div className="max-w-lg">
    <LinkCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  article: mockArticles.stock,
};
