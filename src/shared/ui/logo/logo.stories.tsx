import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';
import { Logo } from './logo';
import * as Icons from '@shared/assets';

const iconNames = Object.keys(Icons).map((key) => key.replace('Icon', '').toLowerCase());

const withCustomBackground: Decorator = (Story) => (
  <div
    style={{
      background: 'var( --color-background)',
      padding: '50px',
      borderRadius: '8px',
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof Logo> = {
  title: 'UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  decorators: [withCustomBackground],
  argTypes: {
    caption: {
      control: 'text',
      description: 'Подпись рядом с логотипом',
    },
    href: {
      control: 'text',
      description: 'Ссылка, куда ведет логотип',
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS класс',
    },
    iconName: {
      control: 'select',
      description: 'Имя иконки из библиотеки',
      options: iconNames,
      mapping: iconNames.reduce(
        (acc, name) => ({
          ...acc,
          [name]: name,
        }),
        {}
      ),
    },
    iconSize: {
      control: { type: 'range', min: 16, max: 120, step: 4 },
      description: 'Размер иконки логотипа',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    caption: 'SkillSwap',
    href: '/',
    iconName: 'logo',
    iconSize: 50,
  },
};
