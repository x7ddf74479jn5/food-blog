import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { mockConfig } from "mocks/data/config";

import { SiteTitleView } from "./SiteTitleView";

export default {
  component: SiteTitleView,
  title: "ui/SiteTitle",
} as ComponentMeta<typeof SiteTitleView>;

export const Large: ComponentStoryObj<typeof SiteTitleView> = {
  args: {
    siteTitle: mockConfig.siteTitle,
    size: "lg",
  },
};

export const Small: ComponentStoryObj<typeof SiteTitleView> = {
  args: {
    siteTitle: mockConfig.siteTitle,
    size: "sm",
  },
};
