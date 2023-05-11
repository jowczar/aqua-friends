import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '.';

const meta: Meta<typeof Navbar> = {
  title: 'Navbar',
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Authenticated: Story = {
    name: 'Authenticated user',
    render: () => <Navbar />,
};