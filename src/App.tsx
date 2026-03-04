import { useToast } from './context/ToastContext';
import { ToastContainer } from './components/Toast/ToastContainer';
import { Button } from './components/Button';
import { Stack } from './components/Layout/Stack';
import { Grid } from './components/Layout/Grid';

function App() {
  const { addToast } = useToast();

  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const configs = {
      success: { title: 'Success!', message: 'Your changes have been saved.' },
      error: { title: 'Error!', message: 'Something went wrong. Try again.' },
      warning: { title: 'Warning', message: 'Your session expires in 5 minutes.' },
      info: { title: 'New Update', message: 'Check out the latest features.' }
    };

    addToast({
      type,
      ...configs[type],
      duration: 5000
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-semantic-surface-default)',
      padding: 'var(--spacing-8)'
    }}>
      <Stack gap="xl" align="center">
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--color-semantic-text-primary)',
          margin: 0
        }}>
          Toast Notifications
        </h1>

        <Grid columns={2} gap="md">
          <Button variant="primary" onClick={() => showToast('success')}>
            Success Toast
          </Button>
          <Button variant="brutalist" onClick={() => showToast('error')}>
            Error Toast
          </Button>
          <Button variant="neon" onClick={() => showToast('warning')}>
            Warning Toast
          </Button>
          <Button variant="ghost" onClick={() => showToast('info')}>
            Info Toast
          </Button>
        </Grid>

        <Stack gap="sm">
          <Button size="sm" onClick={() => showToast('success')}>Stack 1</Button>
          <Button size="sm" onClick={() => showToast('success')}>Stack 2</Button>
          <Button size="sm" onClick={() => showToast('success')}>Stack 3</Button>
        </Stack>
      </Stack>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;