import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { FaChevronDown } from "react-icons/fa";

import { PrimaryButton } from ".";

export default {
  title: "atoms/buttons/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof PrimaryButton>;

export const Medium: ComponentStoryObj<typeof PrimaryButton> = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
    label: "Label",
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
