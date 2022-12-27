import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockCategories } from "mocks/data";

import Header from ".";
import { withContext } from ".storybook/mocks/context";
import { screenshotViewportVariants } from ".storybook/screenshot";

export default {
  component: Header,
  title: "organisms/Header",
} as ComponentMeta<typeof Header>;

export const Default: ComponentStoryObj<typeof Header> = {
  args: {
    categories: Object.values(mockCategories),
    siteTitle: "Title",
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
