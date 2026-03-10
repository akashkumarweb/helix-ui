import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import { Stack } from '../Layout/Stack';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular', disabled: true },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
];

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <Select
                id="story-select"
                label="Framework"
                options={options}
                value={value}
                onChange={setValue}
                placeholder="Select framework..."
            />
        );
    },
};

export const WithError: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <Select
                id="story-error"
                label="Framework"
                options={options}
                value={value}
                onChange={setValue}
                error="Please select a valid option"
            />
        );
    },
};

export const Sizes: Story = {
    render: () => {
        const [val1, setVal1] = useState('');
        const [val2, setVal2] = useState('');
        const [val3, setVal3] = useState('');

        return (
            <Stack gap="md">
                <Select id="sm" label="Small" size="sm" options={options} value={val1} onChange={setVal1} />
                <Select id="md" label="Medium" size="md" options={options} value={val2} onChange={setVal2} />
                <Select id="lg" label="Large" size="lg" options={options} value={val3} onChange={setVal3} />
            </Stack>
        );
    },
};