import { useMemo } from 'react';
import type { TUser } from '@entities/user';
import type { TOffer } from '@entities/offers';
import type { TSubCategory } from '@entities/subcategories';
import type { FiltersState } from './types';

interface UseFilteredUsersProps {
  users: TUser[];
  offers: TOffer[];
  subcategories: TSubCategory[];
  filters: FiltersState;
}

export const useFilteredUsers = ({
  users = [],
  offers = [],
  subcategories = [],
  filters,
}: UseFilteredUsersProps) => {
  
  const filteredUsers = useMemo(() => {
    if (!users.length || !offers.length) {
      return [];
    }

    return users.filter(user => {
      // Фильтр по полу
      if (filters.gender && user.gender !== filters.gender) {
        return false;
      }

      // Фильтр по городам
      if (filters.cityIds?.length && !filters.cityIds.includes(user.cityId)) {
        return false;
      }

      // Если нет фильтра по навыкам
      if (!filters.skillIds?.length) {
        return true;
      }

      // Получаем все подкатегории для выбранных навыков
      const selectedSubcategoryIds = filters.skillIds.filter(id => 
        subcategories.some(sub => sub.id === id)
      );

      // Фильтр по режиму
      switch (filters.mode) {
        case 'wantToLearn':
          return user.subcategoriesIds?.some((subId): subId is string => 
            subId !== undefined && selectedSubcategoryIds.includes(subId)
          ) ?? false;

        case 'canTeach':
          const userOffers = offers.filter(offer => offer?.userId === user.id);
          return userOffers.some(offer => 
            offer && selectedSubcategoryIds.includes(offer.subcategoryId)
          );

        case 'all':
        default:
          const wantsToLearn = user.subcategoriesIds?.some((subId): subId is string => 
            subId !== undefined && selectedSubcategoryIds.includes(subId)
          ) ?? false;
          
          const canTeach = offers
            .filter(offer => offer?.userId === user.id)
            .some(offer => offer && selectedSubcategoryIds.includes(offer.subcategoryId));
          
          return wantsToLearn || canTeach;
      }
    });
  }, [users, offers, subcategories, filters]);

  return { 
    filteredUsers, 
    filteredCount: filteredUsers.length 
  };
};