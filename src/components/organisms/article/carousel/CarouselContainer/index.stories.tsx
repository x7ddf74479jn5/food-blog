import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockPickup, mockPopularArticles } from "mocks/data";

import { CarouselContainer } from ".";
import { screenshotViewportVariants } from ".storybook/screenshot";

export default {
  component: CarouselContainer,
  title: "organisms/article/carousel/CarouselContainer",
} as ComponentMeta<typeof CarouselContainer>;

export const Default: ComponentStoryObj<typeof CarouselContainer> = {
  args: {
    pickup: mockPickup,
    popularArticles: mockPopularArticles,
  },
  parameters: {
    screenshot: {
      variants: screenshotViewportVariants,
    },
  },
};
