import type { Preview } from '@storybook/react';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'void',
      values: [
        { name: 'void', value: '#0a0a0f' },
        { name: 'smoke', value: '#1a1a2e' },
      ],
    },
  },
};

export default preview;