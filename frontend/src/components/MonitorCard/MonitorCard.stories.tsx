import type { Meta, StoryObj } from '@storybook/react';
import MonitorCard from '.';

const meta: Meta<typeof MonitorCard> = {
  title: 'Monitor Card',
  component: MonitorCard,
};

export default meta;

type Story = StoryObj<typeof MonitorCard>;

const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
];

export const Positive: Story = {
    name: 'Monitor Card – positive change',
    render: () => <MonitorCard color={'#D4F5EC'} parameter='NO2 – Nitrogen dioxide' currentValue={1.368} changePercentage={+0.43} currentValueDate='Now' history={data} />,
};

export const Negative: Story = {
    name: 'Monitor Card – negative change',
    render: () => <MonitorCard color={'#D4F5EC'} parameter='NO2 – Nitrogen dioxide' currentValue={1.368} changePercentage={-0.43} currentValueDate='Now' history={data} />,
};

export const Zero: Story = {
    name: 'Monitor Card – zero change',
    render: () => <MonitorCard color={'#D4F5EC'} parameter='NO2 – Nitrogen dioxide' currentValue={1.368} changePercentage={0} currentValueDate='Now' history={data} />,
};

export const NoData: Story = {
    name: 'Monitor Card – no data',
    render: () => <MonitorCard color={'#D4F5EC'} parameter='NO2 – Nitrogen dioxide' currentValue={null} changePercentage={null} currentValueDate={null} history={[]} />,
};