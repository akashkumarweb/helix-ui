import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToastProvider, useToast } from '../../context/ToastContext';
import { ToastContainer } from './ToastContainer';
import { Button } from '../Button';
import { Stack } from '../Layout/Stack';

const meta: Meta = {
    title: 'Components/Toast',
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
                <ToastContainer position="top-right" />
            </ToastProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;

// Demo component for interactive stories
const ToastDemo = () => {
    const { addToast } = useToast();

    return (
        <Stack gap="md">
            <Button
                variant="primary"
                onClick={() =>
                    addToast({
                        type: 'success',
                        title: 'Success!',
                        message: 'Your changes have been saved successfully.',
                        duration: 5000,
                    })
                }
            >
                Show Success Toast
            </Button>

            <Button
                variant="brutalist"
                onClick={() =>
                    addToast({
                        type: 'error',
                        title: 'Error!',
                        message: 'Something went wrong. Please try again.',
                        duration: 5000,
                    })
                }
            >
                Show Error Toast
            </Button>

            <Button
                variant="neon"
                onClick={() =>
                    addToast({
                        type: 'warning',
                        title: 'Warning',
                        message: 'Your session expires in 5 minutes.',
                        duration: 5000,
                    })
                }
            >
                Show Warning Toast
            </Button>

            <Button
                variant="ghost"
                onClick={() =>
                    addToast({
                        type: 'info',
                        title: 'New Update',
                        message: 'Check out the latest features in v2.0.',
                        duration: 5000,
                    })
                }
            >
                Show Info Toast
            </Button>
        </Stack>
    );
};

export const Default: StoryObj = {
    render: () => <ToastDemo />,
};

export const AllTypes: StoryObj = {
    render: () => {
        const { addToast } = useToast();

        return (
            <Stack gap="sm">
                <Button
                    variant="primary"
                    onClick={() =>
                        addToast({
                            type: 'success',
                            title: 'Saved!',
                            message: 'Your work has been saved.',
                        })
                    }
                >
                    Success
                </Button>
                <Button
                    variant="brutalist"
                    onClick={() =>
                        addToast({
                            type: 'error',
                            title: 'Failed!',
                            message: 'Unable to save changes.',
                        })
                    }
                >
                    Error
                </Button>
                <Button
                    variant="neon"
                    onClick={() =>
                        addToast({
                            type: 'warning',
                            title: 'Attention!',
                            message: 'Low disk space remaining.',
                        })
                    }
                >
                    Warning
                </Button>
                <Button
                    variant="ghost"
                    onClick={() =>
                        addToast({
                            type: 'info',
                            title: 'Did you know?',
                            message: 'You can customize toast duration.',
                        })
                    }
                >
                    Info
                </Button>
            </Stack>
        );
    },
};

export const Stacked: StoryObj = {
    render: () => {
        const { addToast } = useToast();

        return (
            <Stack gap="md">
                <Button
                    variant="primary"
                    onClick={() => {
                        ['First', 'Second', 'Third'].forEach((num, i) => {
                            setTimeout(() => {
                                addToast({
                                    type: 'info',
                                    title: `${num} Toast`,
                                    message: `This is toast number ${i + 1}`,
                                    duration: 8000,
                                });
                            }, i * 300);
                        });
                    }}
                >
                    Stack 3 Toasts
                </Button>
            </Stack>
        );
    },
};

export const Persistent: StoryObj = {
    render: () => {
        const { addToast } = useToast();

        return (
            <Stack gap="md">
                <Button
                    variant="brutalist"
                    onClick={() =>
                        addToast({
                            type: 'error',
                            title: 'Critical Error!',
                            message: 'This toast stays until you close it (duration: 0).',
                            duration: 0, // Won't auto-dismiss
                        })
                    }
                >
                    Show Persistent Toast (Manual Close)
                </Button>
            </Stack>
        );
    },
};

export const Positions: StoryObj = {
    render: () => {
        const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');
        const { addToast } = useToast();

        return (
            <div style={{ padding: '40px' }}>
                <Stack gap="lg">
                    <Stack gap="sm">
                        {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((pos) => (
                            <Button
                                key={pos}
                                variant={position === pos ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setPosition(pos)}
                            >
                                {pos}
                            </Button>
                        ))}
                    </Stack>

                    <Button
                        variant="primary"
                        onClick={() =>
                            addToast({
                                type: 'info',
                                title: 'Position Test',
                                message: `This toast appears in the ${position} corner.`,
                            })
                        }
                    >
                        Test Position: {position}
                    </Button>
                </Stack>

                {/* Render container with selected position */}
                <ToastContainer position={position} />
            </div>
        );
    },
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        ),
    ],
};