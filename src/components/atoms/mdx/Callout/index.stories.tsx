import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Callout } from ".";

export default {
  title: "Atoms/mdx/Callout",
  component: Callout,
} as ComponentMeta<typeof Callout>;

const Template: ComponentStory<typeof Callout> = (args) => (
  <div className="max-w-lg">
    <Callout {...args}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia reiciendis maiores iusto quaerat a, autem
      commodi perspiciatis, minus corrupti neque aperiam explicabo doloribus quae qui numquam repellat est dolorum! Ex.
    </Callout>
  </div>
);

export const Default = Template.bind({});
