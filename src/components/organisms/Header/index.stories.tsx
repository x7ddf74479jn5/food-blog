import { mockCategories } from "@mocks/data";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import Header from ".";
import { withRouterContext } from ".storybook/mocks/context";
import { device } from ".storybook/mocks/device";

export default {
  component: Header,
  title: "organisms/Header",
} as ComponentMeta<typeof Header>;

export const Desktop: ComponentStoryObj<typeof Header> = {
  args: {
    categories: Object.values(mockCategories),
    siteTitle: "Title",
  },
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn, { asPath: "/" });
    },
  ],
};

export const Mobile: ComponentStoryObj<typeof Header> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: device.mobile,
    },
  },
};
