// widgets/header/ui/header.stories.tsx
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { HeaderUI } from './header';
import { useState } from 'react';

// Импортируем данные из db.json
import dbData from '../../../shared/api/data/db.json';

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

// Берем первого пользователя из db.json для примера
const firstUser = dbData.users[0]; // Иван

export const LoggedOut: Story = {
  args: {
    userName: undefined,
    userAvatar: undefined,
  },
};

export const LoggedIn: Story = {
  args: {
    userName: firstUser.name,
    userAvatar: firstUser.avatar,
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [user, setUser] = useState<typeof firstUser | null>(null);

    const handleLogin = () => {
      setUser(firstUser);
    };

    const handleLogout = () => {
      setUser(null);
    };

    return (
      <div>
        <HeaderUI userName={user?.name} userAvatar={user?.avatar} />
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
            onClick={handleLogout}
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
            onClick={handleLogin}
            style={{
              padding: '8px 16px',
              background: '#2A5F2E',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Войти как {firstUser.name}
          </button>
        </div>
      </div>
    );
  },
};

// Дополнительная история для демонстрации другого пользователя
export const LoggedInAsDifferentUser: Story = {
  render: function Render() {
    const [user, setUser] = useState<typeof firstUser | null>(null);

    // Берем разных пользователей
    const users = [dbData.users[0], dbData.users[1], dbData.users[2]]; // Иван, Анна, Дмитрий

    return (
      <div>
        <HeaderUI userName={user?.name} userAvatar={user?.avatar} />
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
            flexDirection: 'column',
          }}
        >
          <button
            onClick={() => setUser(null)}
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
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => setUser(u)}
              style={{
                padding: '8px 16px',
                background: u === user ? '#2A5F2E' : '#e0e0e0',
                color: u === user ? 'white' : '#1A1F16',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Войти как {u.name}
            </button>
          ))}
        </div>
      </div>
    );
  },
};
