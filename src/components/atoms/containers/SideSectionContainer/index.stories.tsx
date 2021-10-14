import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideSectionContainer } from ".";

export default {
  title: "Atoms/buttons/ButtonTag/Colored",
  component: SideSectionContainer,
} as ComponentMeta<typeof SideSectionContainer>;

const Template: ComponentStory<typeof SideSectionContainer> = (args) => (
  <SideSectionContainer {...args}>
    <ul className="flex flex-col gap-2">
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  </SideSectionContainer>
);

export const Default = Template.bind({});
Default.args = {
  header: "header",
};
