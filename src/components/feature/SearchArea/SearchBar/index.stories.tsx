import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import SearchBar from ".";
import { withContext } from ".storybook/mocks/context";

export default {
  component: SearchBar,
  decorators: [
    (storyFn) => {
      return withContext(storyFn());
    },
  ],
  title: "feature/SearchArea/SearchBar",
} as ComponentMeta<typeof SearchBar>;

export const Default: ComponentStoryObj<typeof SearchBar> = {};
