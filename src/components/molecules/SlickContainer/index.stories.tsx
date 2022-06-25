import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaLightbulb } from "react-icons/fa";

import { SlickContainer } from ".";

export default {
  title: "Molecules/SlickContainer",
  component: SlickContainer,
} as ComponentMeta<typeof SlickContainer>;

const Template: ComponentStory<typeof SlickContainer> = (args) => <SlickContainer {...args}>children</SlickContainer>;

export const Default = Template.bind({});
Default.args = {
  description: "description",
  title: "title",
  Icon: <FaLightbulb className="text-yellow-400" />,
  href: "/",
};
