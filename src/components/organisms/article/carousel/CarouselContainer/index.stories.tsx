import { mockPickup, mockPopularArticles } from "@mocks/data";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { CarouselContainer } from ".";

export default {
  title: "organisms/article/carousel/CarouselContainer",
  component: CarouselContainer,
} as ComponentMeta<typeof CarouselContainer>;

export const Desktop: ComponentStoryObj<typeof CarouselContainer> = {
  args: {
    pickup: mockPickup,
    popularArticles: mockPopularArticles,
  },
};

export const Mobile: ComponentStoryObj<typeof CarouselContainer> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
};
