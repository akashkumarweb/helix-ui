import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Stack } from '../Layout/Stack';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                footer={
                    <Stack gap="sm">
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
                            Confirm
                        </Button>
                    </Stack>
                }
            />
        </>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        title: 'Modal Title',
        description: 'This is a description of the modal content.',
        children: <p>Modal content goes here...</p>,
        size: 'md',
        variant: 'default',
    },
};

export const Brutalist: Story = {
    render: Template,
    args: {
        ...Default.args,
        variant: 'brutalist',
    },
};

export const Glass: Story = {
    render: Template,
    args: {
        ...Default.args,
        variant: 'glass',
    },
};