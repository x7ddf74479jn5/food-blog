import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { withRouterContext } from "../../../../.storybook/mocks/context";
import BackLinks from ".";

export default {
  title: "molecules/BackLinks",
  component: BackLinks,
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn, { asPath: "/" });
    },
  ],
} as ComponentMeta<typeof BackLinks>;

const Template: ComponentStory<typeof BackLinks> = (args) => <BackLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    { href: "test1", label: "ホームへ" },
    { href: "test2", label: "カテゴリー一覧へ" },
  ],
};
