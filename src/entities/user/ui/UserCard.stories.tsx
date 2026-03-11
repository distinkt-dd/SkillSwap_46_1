import { UserCard } from './UserCard';

export default {
  title: 'Entities/UserCard',
  component: UserCard,
  args: {
    id: 'u1',
    name: 'Виктория',
    avatar: 'https://via.placeholder.com/100',
    location: 'Сочи',
    age: 31,
    canTeach: ['Игра на барабанах'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация', 'Йога', 'Рисование'],
  },
};

export const Catalog = {
  args: {
    isFavorite: false,
    detailed: false,
  },
};

export const Favorite = {
  args: {
    isFavorite: true,
    detailed: false,
  },
};

export const Detailed = {
  args: {
    isFavorite: true,
    detailed: true,
    description:
      'Подробное описание: индивидуальные занятия игрой на барабанах для начинающих. Материал подбирается индивидуально, есть домашние задания.',
  },
};