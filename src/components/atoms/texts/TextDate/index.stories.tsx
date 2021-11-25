import type { ComponentMeta, ComponentStory } from "@storybook/react";

import TextDate from ".";

export default {
  title: "Atoms/texts/TextDate",
  component: TextDate,
  argTypes: {
    date: { control: { type: "date" } },
  },
} as ComponentMeta<typeof TextDate>;

const Template: ComponentStory<typeof TextDate> = (args) => <TextDate {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: new Date("2020-01-01"),
};
