import type { Meta, StoryObj } from "@storybook/react";
import CardDataTable, { CardDataTableProps } from ".";
import { pumpsMock } from "./data-mock";

const meta: Meta<typeof CardDataTable> = {
  title: "CardDataTable",
  component: CardDataTable,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CardDataTable>;

const Template = (args: CardDataTableProps) => <CardDataTable {...args} />;

export const One: Story = {
  name: "CardDataTable",
  render: Template.bind({}),
  args: {
    columnTitle: "Pump",
    isSingleAnswer: true,
    items: pumpsMock,
  },
};
