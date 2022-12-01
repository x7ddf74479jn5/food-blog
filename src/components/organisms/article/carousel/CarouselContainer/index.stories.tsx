import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockPickup, mockPopularArticles } from "mocks/data";

import { CarouselContainer } from ".";
import { device } from ".storybook/mocks/device";

export default {
  component: CarouselContainer,
  title: "organisms/article/carousel/CarouselContainer",
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
      defaultViewport: device.mobile,
    },
  },
};
