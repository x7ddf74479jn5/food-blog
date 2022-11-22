import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import BackLinks from ".";
import { withRouterContext } from ".storybook/mocks/context";

export default {
  component: BackLinks,
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn(), { context: { pathname: "/" } });
    },
  ],
  title: "feature/BackLinks",
} as ComponentMeta<typeof BackLinks>;

export const Default: ComponentStoryObj<typeof BackLinks> = {
  args: {
    links: [
      { href: "test1", label: "ホームへ" },
      { href: "test2", label: "カテゴリー一覧へ" },
    ],
  },
};
