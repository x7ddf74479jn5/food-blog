import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { withContext } from "../../../../.storybook/mocks/context";
import SearchBar from ".";

export default {
  title: "Molecules/Search",
  component: SearchBar,
  decorators: [
    (storyFn) => {
      return withContext(storyFn);
    },
  ],
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
