import type { Meta, StoryObj } from "@storybook/react";

import Pagination, { PaginationProps } from ".";

const meta: Meta<typeof Pagination> = {
  title: "Pagination",
  component: Pagination,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const Template = (args: PaginationProps) => <Pagination {...args} />;

export const One: Story = {
  name: "Pagination",
  render: Template.bind({}),
  args: {
    totalPages: 5,
    currentPage: 2,
  },
};
