import type { ComponentMeta, ComponentStory } from "@storybook/react";

import TOC from ".";

export default {
  component: TOC,
  title: "Molecules/TOC",
} as ComponentMeta<typeof TOC>;

const Template: ComponentStory<typeof TOC> = (args) => (
  <div className="prose flex flex-row">
    <div id="js-toc-content" className="hidden">
      <h2>h2</h2>
      <h3>h3</h3>
    </div>
    <TOC {...args} />
  </div>
);

export const Default = Template.bind({});
