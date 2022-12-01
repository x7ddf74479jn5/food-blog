import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import TextDate from ".";

export default {
  argTypes: {
    date: { control: { type: "date" } },
  },
  component: TextDate,
  title: "ui/texts/TextDate",
} as ComponentMeta<typeof TextDate>;

export const Default: ComponentStoryObj<typeof TextDate> = {
  args: {
    date: new Date("2020-01-01"),
  },
};
