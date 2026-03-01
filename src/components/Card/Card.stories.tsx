import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from './Card';
import { Button } from '../Button';
import { Stack } from '../Layout/Stack';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'ghost', 'brutalist', 'glow'],
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
        },
        radius: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>This is a description of the card content.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button size="sm">Action</Button>
                </CardFooter>
            </>
        ),
        style: { width: '400px' }
    },
};

export const Brutalist: Story = {
    args: {
        ...Default.args,
        variant: 'brutalist',
    },
};

export const Glow: Story = {
    args: {
        ...Default.args,
        variant: 'glow',
    },
};

export const AllVariants: Story = {
    render: () => (
        <Stack gap="md" style={{ width: '400px' }}>
            <Card variant="default">Default Variant</Card>
            <Card variant="outlined">Outlined Variant</Card>
            <Card variant="ghost">Ghost Variant</Card>
            <Card variant="brutalist">Brutalist Variant</Card>
            <Card variant="glow">Glow Variant</Card>
        </Stack>
    ),
};