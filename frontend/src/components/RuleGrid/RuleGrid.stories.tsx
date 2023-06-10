import type { Meta, StoryObj } from "@storybook/react";
import RuleGrid from ".";

const meta: Meta<typeof RuleGrid> = {
  title: "RuleGrid",
  component: RuleGrid,
};

export default meta;

type Story = StoryObj<typeof RuleGrid>;

export const Primary: Story = {
  name: "RuleGrid",
  render: () => <RuleGrid />,
};
