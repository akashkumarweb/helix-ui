import { useState } from 'react';
import { Select } from './components/Select/Select';
import { Stack } from './components/Layout/Stack';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

function App() {
  const [value, setValue] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-semantic-surface-default)',
      padding: 'var(--spacing-8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Stack gap="lg">
          <h1 style={{
            color: 'var(--color-semantic-text-primary)',
            margin: 0
          }}>
            Select Component
          </h1>

          <Select
            id="framework-select"
            label="Favorite Framework"
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Choose a framework..."
          />

          {value && (
            <p style={{ color: 'var(--color-base-neon)' }}>
              Selected: {value}
            </p>
          )}
        </Stack>
      </div>
    </div>
  );
}

export default App;