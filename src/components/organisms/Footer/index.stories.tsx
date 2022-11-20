import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { FooterView } from "./FooterView";

export default {
  title: "organisms/Footer",
  component: FooterView,
} as ComponentMeta<typeof FooterView>;

export const Default: ComponentStoryObj<typeof FooterView> = {
  args: {
    organization: "Pandashark",
  },
};
