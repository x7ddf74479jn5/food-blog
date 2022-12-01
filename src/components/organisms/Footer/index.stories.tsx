import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import Footer from ".";

export default {
  component: Footer,
  title: "organisms/Footer",
} as ComponentMeta<typeof Footer>;

export const Default: ComponentStoryObj<typeof Footer> = {
  args: {
    organization: "Pandashark",
    siteTitle: "Title",
  },
};
