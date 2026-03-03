import { useState } from 'react';
import { Modal } from './components/Modal/Modal';
import { Button } from './components/Button';
import { Stack } from './components/Layout/Stack';
import { Input } from './components/Input';
import './styles/tokens.css';
import './styles/global.css';
import './components/Layout/Layout.css';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<'default' | 'brutalist' | 'glass'>('default');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-semantic-surface-default)',
      padding: 'var(--spacing-8)'
    }}>
      <Stack gap="lg" align="center">
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--color-semantic-text-primary)',
          margin: 0
        }}>
          Modal Component
        </h1>

        <Stack gap="md">
          <Button onClick={() => { setVariant('default'); setIsOpen(true); }}>
            Default Modal
          </Button>
          <Button variant="brutalist" onClick={() => { setVariant('brutalist'); setIsOpen(true); }}>
            Brutalist Modal
          </Button>
          <Button variant="neon" onClick={() => { setVariant('glass'); setIsOpen(true); }}>
            Glass Modal
          </Button>
        </Stack>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create Account"
          description="Fill in your details to get started with our platform."
          size="md"
          variant={variant}
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <Stack gap="md">
            <Input
              id="modal-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <Input
              id="modal-password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
          </Stack>
        </Modal>
      </Stack>
    </div>
  );
}

export default App;
