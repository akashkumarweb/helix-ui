import { useForm } from 'react-hook-form';
import { Input } from './components/Input';
import { Button } from './components/Button';
import './styles/global.css';
import './styles/tokens.css';

type FormData = {
  email: string;
  password: string;
};

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px', color: 'var(--color-semantic-text-primary)' }}>
        Login Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
          id='password'
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

        <Button type="submit" variant="primary" size="lg">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default App;