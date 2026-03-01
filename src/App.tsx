import { useForm } from 'react-hook-form';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Stack } from './components/Layout/Stack';
import { Center } from './components/Layout/Center';

import './styles/tokens.css';
import './styles/global.css';
import './components/Layout/Layout.css';

type FormData = {
  email: string;
  password: string;
};

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-semantic-surface-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-4)'
    }}>
      {/* Glass Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: 'var(--spacing-8)',
        backgroundColor: 'var(--color-semantic-surface-elevated)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        <Stack gap="lg" align="stretch">
          {/* Header */}
          <Stack gap="xs" align="center">
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--color-semantic-text-primary)',
              margin: 0
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-semantic-text-muted)',
              margin: 0
            }}>
              Sign in to your account
            </p>
          </Stack>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                helperText="We'll never share your email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                helperText="Must be at least 8 characters"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />

              <div style={{ marginTop: 'var(--spacing-2)' }}>
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Sign In
                </Button>
              </div>
            </Stack>
          </form>

          {/* Footer */}
          <Center textCenter>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-semantic-text-muted)',
              margin: 0
            }}>
              Don't have an account?{' '}
              <a href="#" style={{
                color: 'var(--color-semantic-accent-primary)',
                textDecoration: 'none',
                fontWeight: 500
              }}>
                Create one
              </a>
            </p>
          </Center>
        </Stack>
      </div>
    </div>
  );
}

export default App;