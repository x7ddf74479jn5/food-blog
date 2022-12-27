import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories, mockTags } from "mocks/data";

import { SearchArea } from ".";
import { withContext } from ".storybook/mocks/context";
import { screenshotViewportVariants } from ".storybook/screenshot";

export default {
  component: SearchArea,
  title: "organisms/SearchArea",
} as ComponentMeta<typeof SearchArea>;

export const Default: ComponentStoryObj<typeof SearchArea> = {
  args: {
    categories: Object.values(mockCategories),
    tags: Object.values(mockTags),
  },
  decorators: [
    (storyFn) => {
      return withContext(storyFn());
    },
  ],
  parameters: {
    screenshot: {
      variants: screenshotViewportVariants,
    },
  },
};
