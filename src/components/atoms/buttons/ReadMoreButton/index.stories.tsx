import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReadMoreButton } from ".";

export default {
  title: "Atoms/buttons/ReadMoreButton",
  component: ReadMoreButton,
} as ComponentMeta<typeof ReadMoreButton>;

const Template: ComponentStory<typeof ReadMoreButton> = (args) => <ReadMoreButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleOnClick: () => {},
};
