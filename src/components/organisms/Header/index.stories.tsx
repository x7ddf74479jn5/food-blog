import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data";

import { HeaderView } from "./HeaderView";
import { withRouterContext } from ".storybook/mocks/context";
import { device } from ".storybook/mocks/device";

export default {
  component: HeaderView,
  title: "organisms/Header",
} as ComponentMeta<typeof HeaderView>;

export const Desktop: ComponentStoryObj<typeof HeaderView> = {
  args: {
    categories: Object.values(mockCategories),
  },
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn, { asPath: "/" });
    },
  ],
};

export const Mobile: ComponentStoryObj<typeof HeaderView> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: device.mobile,
    },
  },
};
