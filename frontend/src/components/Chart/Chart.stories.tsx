import type { Meta, StoryObj } from '@storybook/react';
import Chart from '.';

const meta: Meta<typeof Chart> = {
  title: 'Chart',
  component: Chart,
};

export default meta;

type Story = StoryObj<typeof Chart>;

const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
];

export const Primary: Story = {
    name: 'Chart',
    render: () => <Chart color='#d6e3fd' data={data} height={60} />,
};
