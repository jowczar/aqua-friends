import type { Meta, StoryObj } from '@storybook/react';
import DashboardCard from '.';

const meta: Meta<typeof DashboardCard> = {
  title: 'Dashboard Card',
  component: DashboardCard,
};

export default meta;

type Story = StoryObj<typeof DashboardCard>;

export const Primary: Story = {
    name: 'Dashboard Card',
    render: () => <DashboardCard link="/history" title="Aqua History" text="Aquarium creator where You can customize Your desired aquarium size, set up decorations and add some fishes." icon="reload.svg"  />,
};
