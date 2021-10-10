import type { ComponentMeta, ComponentStory } from "@storybook/react";

import BackLinks from ".";

export default {
  title: "molecules/BackLinks",
  component: BackLinks,
} as ComponentMeta<typeof BackLinks>;

const Template: ComponentStory<typeof BackLinks> = (args) => <BackLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    { href: "test1", label: "ホームへ" },
    { href: "test2", label: "カテゴリー一覧へ" },
  ],
};
