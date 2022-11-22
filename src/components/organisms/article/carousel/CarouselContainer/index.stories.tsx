import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockPickup, mockPopularArticles } from "mocks/data";

import { useCarousel } from "@/components/pages/Home";

import { CarouselContainer } from ".";
import { device } from ".storybook/mocks/device";

// eslint-disable-next-line react-hooks/rules-of-hooks
const items = useCarousel({ pickup: mockPickup, popularArticles: mockPopularArticles });

export default {
  component: CarouselContainer,
  title: "organisms/article/carousel/CarouselContainer",
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
