import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { HeadingOne } from ".";

export default {
  title: "Atoms/texts/HeadingOne",
  component: HeadingOne,
  argTypes: {
    date: { control: { type: "date" } },
  },
} as ComponentMeta<typeof HeadingOne>;

const Template: ComponentStory<typeof HeadingOne> = (args) => <HeadingOne>{args.children}</HeadingOne>;

export const Default = Template.bind({});
Default.args = {
  children: "Heading 1",
};
