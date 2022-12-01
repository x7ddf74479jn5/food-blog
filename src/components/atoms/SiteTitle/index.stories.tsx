import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockConfig } from "mocks/data/config";

import { SiteTitle } from ".";

export default {
  component: SiteTitle,
  title: "Atoms/SiteTitle",
} as ComponentMeta<typeof SiteTitle>;

const Template: ComponentStory<typeof SiteTitle> = (args) => <SiteTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "text-2xl",
  title: mockConfig.siteTitle,
};
