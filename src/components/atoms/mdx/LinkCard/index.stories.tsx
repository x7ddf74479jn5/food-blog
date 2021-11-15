import { mockArticles } from "@mocks/data";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { LinkCard } from ".";

export default {
  title: "Atoms/mdx/LinkCard",
  component: LinkCard,
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
