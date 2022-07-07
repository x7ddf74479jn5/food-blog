import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaLightbulb } from "react-icons/fa";

import { SlickContainer } from ".";

export default {
  title: "Molecules/SlickContainer",
  component: SlickContainer,
} as ComponentMeta<typeof SlickContainer>;

const Template: ComponentStory<typeof SlickContainer> = (args) => (
  <SlickContainer {...args}>
    {[...Array(3)].map((_, index) => (
      <div className="grid w-20 h-20 bg-gray-500 border-4 border-gray-600" key={index}>
        <div className="place-self-center text-center">Item</div>
      </div>
    ))}
  </SlickContainer>
);

export const Default = Template.bind({});
Default.args = {
  description: "description",
  title: "title",
  Icon: <FaLightbulb className="text-yellow-400" />,
  href: "/",
};
