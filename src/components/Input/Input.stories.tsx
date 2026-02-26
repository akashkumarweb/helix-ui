import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost', 'brutalist'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number'],
        },
        error: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'email',
        label: 'Email Address',
        placeholder: 'you@example.com',
        helperText: "We'll never share your email",
        type: 'email',
    },
};

export const WithError: Story = {
    args: {
        id: 'password',
        label: 'Password',
        type: 'password',
        error: 'Password must be at least 8 characters',
        value: 'short',
    },
};

export const Required: Story = {
    args: {
        id: 'username',
        label: 'Username',
        required: true,
        placeholder: 'johndoe',
    },
};

export const Ghost: Story = {
    args: {
        id: 'ghost-input',
        label: 'Search',
        variant: 'ghost',
        placeholder: 'Search...',
    },
};

export const Brutalist: Story = {
    args: {
        id: 'brutal-input',
        label: 'Neo-Brutalist Input',
        variant: 'brutalist',
        placeholder: 'Enter text...',
    },
};

export const Disabled: Story = {
    args: {
        id: 'disabled',
        label: 'Disabled Input',
        disabled: true,
        value: 'Cannot edit this',
        helperText: 'This field is locked',
    },
};

// Interactive Form Example
export const WithReactHookForm: Story = {
    render: () => {
        const { register, formState: { errors } } = useForm();

        return (
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
                <Input
                    label="Email"
                    id="story-email"
                    error={errors.email?.message as string}
                    {...register('email', { required: 'Email is required' })}
                />
                <Input
                    label="Password"
                    id="story-password"
                    type="password"
                    error={errors.password?.message as string}
                    {...register('password', { required: 'Password is required' })}
                />
            </form>
        );
    },
};