import { tags } from "@mocks/data/tags";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { TTag } from "@/types";

import ButtonTag from ".";

export default {
  title: "Atoms/buttons/ButtonTag",
  component: ButtonTag,
} as ComponentMeta<typeof ButtonTag>;

const Template: ComponentStory<typeof ButtonTag> = (args) => <ButtonTag {...args} />;

export const Default = Template.bind({});
Default.args = { tag: tags.rice as TTag };
