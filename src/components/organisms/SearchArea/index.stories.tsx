import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories, mockTags } from "mocks/data";

import { SearchArea } from ".";
import { withRouterContext } from ".storybook/mocks/context";
import { device } from ".storybook/mocks/device";

export default {
  component: SearchArea,
  title: "organisms/SearchArea",
} as ComponentMeta<typeof SearchArea>;

export const Desktop: ComponentStoryObj<typeof SearchArea> = {
  args: {
    categories: Object.values(mockCategories),
    tags: Object.values(mockTags),
  },
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn, { asPath: "/" });
    },
  ],
};

export const Mobile: ComponentStoryObj<typeof SearchArea> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: device.mobile,
    },
  },
};

export const Tablet: ComponentStoryObj<typeof SearchArea> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: device.tablet,
    },
  },
};
