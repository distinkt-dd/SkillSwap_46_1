import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  args: {
    size: 'medium',
  },
  argTypes: {
    seed: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    avatar: {
      control: 'text',
    },
  },
};

export const Default = {
  args: {
    size: 'medium',
  },
};
