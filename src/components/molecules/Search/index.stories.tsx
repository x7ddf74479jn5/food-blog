import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { withContext } from "../../../../.storybook/mocks/context";
import Search from ".";

export default {
  title: "Molecules/Search",
  component: Search,
  decorators: [
    (storyFn) => {
      return withContext(storyFn);
    },
  ],
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
