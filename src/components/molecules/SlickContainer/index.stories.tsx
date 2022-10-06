import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { SlickContainer } from ".";
import { device } from ".storybook/mocks/device";

export default {
  title: "molecules/SlickContainer",
  component: SlickContainer,
} as ComponentMeta<typeof SlickContainer>;

export const Desktop: ComponentStoryObj<typeof SlickContainer> = {
  args: {
    children: [...Array(3)].map((_, index) => (
      <div className="grid h-20 w-20 border-4 border-gray-600 bg-gray-500" key={index}>
        <div className="place-self-center text-center">Item</div>
      </div>
    )),
  },
};

export const Mobile: ComponentStoryObj<typeof SlickContainer> = {
  ...Desktop,
  parameters: {
    viewport: {
      defaultViewport: device.mobile,
    },
  },
};
