import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { FooterView } from "./FooterView";

export default {
  component: FooterView,
  title: "organisms/Footer",
} as ComponentMeta<typeof FooterView>;

export const Default: ComponentStoryObj<typeof FooterView> = {
  args: {
    organization: "Pandashark",
  },
};
