import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';
import { useState } from 'react';
import '../../../app/App.css';
import type { CategoryWithSubcategories } from './categories/types';
import dbData from '../../../shared/api/data/db.json';
import { Button } from '@shared/index';

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

const transformCategories = (): CategoryWithSubcategories[] => {
  return dbData.categories.map((cat) => ({
    id: cat.id,
    type: cat.type,
    name: cat.name,
    subcategories: dbData.subcategories
      .filter((sub) => sub.categoryId === cat.id)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        categoryId: sub.categoryId,
      })),
  }));
};

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Widgets/Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withBackground],
};

export default meta;
type Story = StoryObj<typeof Header>;

const firstUser = dbData.users[0];
const allCategories = transformCategories();

export const LoggedOut: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Header
        userName={undefined}
        userAvatar={undefined}
        isSkillsOpen={isOpen}
        onSkillsToggle={() => setIsOpen(!isOpen)}
        categories={allCategories}
        isLoading={false}
        error={null}
      />
    );
  },
};

export const LoggedIn: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Header
        userName={firstUser.name}
        userAvatar={firstUser.avatar}
        isSkillsOpen={isOpen}
        onSkillsToggle={() => setIsOpen(!isOpen)}
        categories={allCategories}
        isLoading={false}
        error={null}
      />
    );
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [user, setUser] = useState<typeof firstUser | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = () => {
      setUser(firstUser);
    };

    const handleLogout = () => {
      setUser(null);
    };

    return (
      <div>
        <Header
          userName={user?.name}
          userAvatar={user?.avatar}
          isSkillsOpen={isOpen}
          onSkillsToggle={() => setIsOpen(!isOpen)}
          categories={allCategories}
          isLoading={false}
          error={null}
        />
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
          <Button
            variant="tertiary"
            onClick={handleLogout}
            style={{
              border: '1px solid #ccc',
            }}
          >
            Выйти
          </Button>
          <Button onClick={handleLogin}>Войти как {firstUser.name}</Button>
        </div>
      </div>
    );
  },
};

export const LoggedInAsDifferentUser: Story = {
  render: function Render() {
    const [user, setUser] = useState<typeof firstUser | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const users = [dbData.users[0], dbData.users[1], dbData.users[2]];

    return (
      <div>
        <Header
          userName={user?.name}
          userAvatar={user?.avatar}
          isSkillsOpen={isOpen}
          onSkillsToggle={() => setIsOpen(!isOpen)}
          categories={allCategories}
          isLoading={false}
          error={null}
        />
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
          <Button onClick={() => setUser(null)} variant="tertiary">
            Выйти
          </Button>
          {users.map((u) => (
            <Button key={u.id} onClick={() => setUser(u)}>
              Войти как {u.name}
            </Button>
          ))}
        </div>
      </div>
    );
  },
};

export const MenuOpen: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <Header
        userName={firstUser.name}
        userAvatar={firstUser.avatar}
        isSkillsOpen={isOpen}
        onSkillsToggle={() => setIsOpen(!isOpen)}
        categories={allCategories}
        isLoading={false}
        error={null}
      />
    );
  },
};

export const Loading: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Header
        userName={firstUser.name}
        userAvatar={firstUser.avatar}
        isSkillsOpen={isOpen}
        onSkillsToggle={() => setIsOpen(!isOpen)}
        categories={[]}
        isLoading={true}
        error={null}
      />
    );
  },
};

export const Error: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Header
        userName={firstUser.name}
        userAvatar={firstUser.avatar}
        isSkillsOpen={isOpen}
        onSkillsToggle={() => setIsOpen(!isOpen)}
        categories={[]}
        isLoading={false}
        error="Ошибка загрузки категорий"
      />
    );
  },
};

export const Pure: Story = {
  args: {
    variant: 'pure',
    onClose: () => console.log('Close clicked'),
  },
};

export const PureInteractive: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <Button onClick={() => setIsOpen(true)}>Открыть хедер в Pure-режиме</Button>
        </div>
      );
    }

    return (
      <div>
        <Header variant="pure" onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};
