import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Thumbnail from ".";

export default {
  title: "Atoms/Thumbnail",
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>;

const Template: ComponentStory<typeof Thumbnail> = (args) => <Thumbnail {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "default id",
  title: "default title",
  src: ".storybook/mocks/images/how-to-make-stock-from-kelp-and-bonito-flakes.jpeg",
};
