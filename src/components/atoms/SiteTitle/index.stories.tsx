import { mockConfig } from "@mocks/data/config";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SiteTitle } from ".";

export default {
  title: "Atoms/buttons/SiteTitle",
  component: SiteTitle,
} as ComponentMeta<typeof SiteTitle>;

const Template: ComponentStory<typeof SiteTitle> = (args) => <SiteTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  siteTitle: mockConfig.siteTitle,
  size: "text-2xl",
};
