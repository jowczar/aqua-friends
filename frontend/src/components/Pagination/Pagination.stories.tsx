import type { Meta, StoryObj } from "@storybook/react";

import Pagination, { PaginationProps } from ".";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Pagination",
  component: Pagination,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const ParentalComponentMock = (args: PaginationProps) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);

  return (
    <Pagination
      {...args}
      currentPage={internalCurrentPage}
      setCurrentPage={setInternalCurrentPage}
    />
  );
};

const Template = (args: PaginationProps) => ParentalComponentMock(args);

export const One: Story = {
  name: "Pagination",
  render: Template.bind({}),
  args: {
    totalPages: 5,
    currentPage: 1,
    setCurrentPage: () => {},
  },
};
