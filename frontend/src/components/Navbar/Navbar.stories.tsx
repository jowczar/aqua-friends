import type { Meta, StoryObj } from '@storybook/react';

import { INITIAL_ROUTES } from '.';
import Navbar from './Navbar.component';

const meta: Meta<typeof Navbar> = {
  title: 'Navbar',
  component: Navbar,
};

export default meta;

const firebaseUser = {
    accessToken: "firebase access token",
    displayName: "Sławomir Kowalski",
    email: "slawomir.kowalski@gmail.com",
    emailVerified: true,
    isAnonymous: false,
    phoneNumber: null,
    photoURL: "https://storage.prompt-hunt.workers.dev/cleunqatw001il2085k0gyajf_1",
};

type Story = StoryObj<typeof Navbar>;

export const Authenticated: Story = {
    name: 'Authenticated user',
    render: () => <Navbar signOut={() => {}} user={firebaseUser} navigation={INITIAL_ROUTES} />,
};