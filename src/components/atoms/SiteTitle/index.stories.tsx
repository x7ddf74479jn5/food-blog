import { mockConfig } from "@mocks/data/config";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SiteTitle } from ".";

export default {
  title: "Atoms/SiteTitle",
  component: SiteTitle,
} as ComponentMeta<typeof SiteTitle>;

const Template: ComponentStory<typeof SiteTitle> = (args) => <SiteTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: mockConfig.siteTitle,
  size: "text-2xl",
};
