import type { ComponentMeta, ComponentStory } from "@storybook/react";

import TextDate from ".";

export default {
  argTypes: {
    date: { control: { type: "date" } },
  },
  component: TextDate,
  title: "Atoms/texts/TextDate",
} as ComponentMeta<typeof TextDate>;

const Template: ComponentStory<typeof TextDate> = (args) => <TextDate {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: new Date("2020-01-01"),
};
