import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockPickup, mockPopularArticles } from "mocks/data";

import { composeCarouselItems } from "@/components/pages/Home";

import { CarouselContainer } from ".";
import { device } from ".storybook/mocks/device";

const items = composeCarouselItems({ pickup: mockPickup, popularArticles: mockPopularArticles });

export default {
  component: CarouselContainer,
  title: "model/article/carousel/CarouselContainer",
} as ComponentMeta<typeof CarouselContainer>;

export const Desktop: ComponentStoryObj<typeof CarouselContainer> = {
  args: {
    items,
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
