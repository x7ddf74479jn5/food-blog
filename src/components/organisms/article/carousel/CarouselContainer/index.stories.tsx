import { mockPickup, mockPopularArticles } from "@mocks/data";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { CarouselContainer } from ".";

export default {
  title: "organisms/CarouselContainer",
  component: CarouselContainer,
} as ComponentMeta<typeof CarouselContainer>;

export const Default: ComponentStoryObj<typeof CarouselContainer> = {
  args: {
    pickup: mockPickup,
    popularArticles: mockPopularArticles,
  },
};
