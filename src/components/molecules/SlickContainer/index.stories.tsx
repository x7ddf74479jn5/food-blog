import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SlickContainer } from ".";

export default {
  title: "Molecules/SlickContainer",
  component: SlickContainer,
} as ComponentMeta<typeof SlickContainer>;

const Template: ComponentStory<typeof SlickContainer> = (args) => (
  <SlickContainer {...args}>
    {[...Array(3)].map((_, index) => (
      <div className="grid h-20 w-20 border-4 border-gray-600 bg-gray-500" key={index}>
        <div className="place-self-center text-center">Item</div>
      </div>
    ))}
  </SlickContainer>
);

export const Default = Template.bind({});
