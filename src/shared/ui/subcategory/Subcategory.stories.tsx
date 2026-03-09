import { Subcategory } from './Subcategory';

export default {
  title: 'Subcategory',
  component: Subcategory,
  args: {
    title: 'Игра на гитаре',
    type: 'business',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['business', 'languages', 'creative', 'education', 'home', 'health', 'other'],
    },
    title: {
      control: 'text',
    },
  },
};

export const Default = {
  args: {
    title: 'Игра на гитаре',
    type: 'creative',
  },
};
