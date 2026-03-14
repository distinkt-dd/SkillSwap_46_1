// widgets/header/ui/header.stories.tsx
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { HeaderUI } from './header';
import { useState } from 'react';

// Декоратор для правильного фона и центрирования
const withBackground: Decorator = (Story) => (
  <MemoryRouter>
    <div
      style={{
        backgroundColor: '#F9FAF7',
        minHeight: '200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  </MemoryRouter>
);

const meta: Meta<typeof HeaderUI> = {
  component: HeaderUI,
  title: 'Widgets/Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withBackground],
};

export default meta;
type Story = StoryObj<typeof HeaderUI>;

export const LoggedOut: Story = {
  args: {
    userName: undefined,
  },
};

export const LoggedIn: Story = {
  args: {
    userName: 'Иван Петров',
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [userName, setUserName] = useState<string | undefined>(undefined);

    return (
      <div style={{ width: '100%' }}>
        <HeaderUI userName={userName} />
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <button
            onClick={() => setUserName(undefined)}
            style={{
              padding: '8px 16px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Выйти
          </button>
          <button
            onClick={() => setUserName('Иван Петров')}
            style={{
              padding: '8px 16px',
              background: '#2A5F2E',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Войти
          </button>
        </div>
      </div>
    );
  },
};
