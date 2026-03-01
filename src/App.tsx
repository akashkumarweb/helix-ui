import { Button } from './components/Button';
import { Stack } from './components/Layout/Stack';
import { Grid } from './components/Layout/Grid';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from './components/Card';

import './styles/tokens.css';
import './styles/global.css';
import './components/Layout/Layout.css';


function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-semantic-surface-default)',
      padding: 'var(--spacing-8)'
    }}>
      <Stack gap="xl">
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--color-semantic-text-primary)',
          textAlign: 'center',
          margin: 0
        }}>
          Card Components
        </h1>

        <Grid columns={2} gap="lg">
          {/* Default Card */}
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>
                Standard elevated card with shadow. Used for primary content containers.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="primary" size="sm">Action</Button>
            </CardFooter>
          </Card>

          {/* Brutalist Card */}
          <Card variant="brutalist">
            <CardHeader>
              <CardTitle>Neo-Brutalist</CardTitle>
              <CardDescription>
                Hard shadows, bold borders. Trending in 2026 design aesthetics.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="brutalist" size="sm">Action</Button>
            </CardFooter>
          </Card>

          {/* Glow Card */}
          <Card variant="glow">
            <CardHeader>
              <CardTitle>Glow Effect</CardTitle>
              <CardDescription>
                Neon cyan border with subtle glow. Perfect for premium features.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="neon" size="sm">Upgrade</Button>
            </CardFooter>
          </Card>

          {/* Ghost Card */}
          <Card variant="ghost">
            <CardHeader>
              <CardTitle>Glassmorphism</CardTitle>
              <CardDescription>
                Translucent background with backdrop blur. Modern and subtle.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" size="sm">Learn More</Button>
            </CardFooter>
          </Card>
        </Grid>

        {/* Clickable Card Example */}
        <Card variant="default" padding="lg" onClick={() => alert('Card clicked!')}>
          <CardTitle as="h2">Clickable Card</CardTitle>
          <CardDescription>
            This entire card is clickable. Hover to see elevation change. Used for navigation cards, product listings, or dashboard widgets.
          </CardDescription>
        </Card>
      </Stack>
    </div>
  );
}

export default App;
