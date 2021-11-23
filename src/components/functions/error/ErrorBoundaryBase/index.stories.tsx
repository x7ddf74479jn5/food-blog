import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { withRouterContext } from "../../../../../.storybook/mocks/context";
import { ErrorBoundaryBase } from ".";

export default {
  title: "Atoms/error/ErrorBoundaryBase",
  component: ErrorBoundaryBase,
  decorators: [
    (storyFn) => {
      return withRouterContext(storyFn);
    },
  ],
} as ComponentMeta<typeof ErrorBoundaryBase>;

const Bomb = () => {
  throw Error("Error message");
};

const Template: ComponentStory<typeof ErrorBoundaryBase> = (args) => (
  <ErrorBoundaryBase {...args}>
    <Bomb />
  </ErrorBoundaryBase>
);

export const Default = Template.bind({});
