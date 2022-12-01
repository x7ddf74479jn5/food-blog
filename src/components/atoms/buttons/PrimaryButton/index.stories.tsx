import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { FaChevronDown } from "react-icons/fa";

import { PrimaryButton } from ".";

export default {
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
    },
  },
  component: PrimaryButton,
  title: "atoms/buttons/PrimaryButton",
} as ComponentMeta<typeof PrimaryButton>;

export const Medium: ComponentStoryObj<typeof PrimaryButton> = {
  args: {
    label: "Label",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
    size: "md",
  },
};

export const Small: ComponentStoryObj<typeof PrimaryButton> = {
  args: {
    ...Medium.args,
    size: "sm",
  },
};

export const MediumWithIcon: ComponentStoryObj<typeof PrimaryButton> = {
  args: {
    ...Medium.args,
    Icon: <FaChevronDown />,
  },
};

export const SmallWithIcon: ComponentStoryObj<typeof PrimaryButton> = {
  args: {
    ...Small.args,
    Icon: <FaChevronDown />,
  },
};
