import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#0a0a0f' },
                { name: 'light', value: '#f8f9fa' },
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Primary Action',
        variant: 'primary',
        size: 'md',
    },
};

export const Neon: Story = {
    args: {
        children: 'Cyberpunk',
        variant: 'neon',
        size: 'lg',
    },
};

export const Brutalist: Story = {
    args: {
        children: 'Neo-Brutalism',
        variant: 'brutalist',
        size: 'md',
    },
};

export const Loading: Story = {
    args: {
        children: 'Loading...',
        variant: 'primary',
        loading: true,
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="neon">Neon</Button>
            <Button variant="brutalist">Brutalist</Button>
        </div>
    ),
};