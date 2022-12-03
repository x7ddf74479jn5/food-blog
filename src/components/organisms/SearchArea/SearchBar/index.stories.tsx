import type { ComponentMeta, ComponentStory } from "@storybook/react";

import SearchBar from ".";
import { withContext } from ".storybook/mocks/context";

export default {
  component: SearchBar,
  decorators: [
    (storyFn) => {
      return withContext(storyFn());
    },
  ],
  title: "organisms/SearchArea/SearchBar",
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
