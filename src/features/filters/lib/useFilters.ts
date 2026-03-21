import { useState, useCallback } from 'react';
import type { FilterMode, FiltersState, FiltersActions } from './types';
import { initialFiltersState } from './types';

export const useFilters = (): [FiltersState, FiltersActions] => {
  const [filters, setFilters] = useState<FiltersState>(initialFiltersState);

  const setMode = useCallback((mode: FilterMode) => {
    setFilters(prev => ({ ...prev, mode }));
  }, []);

  const setGender = useCallback((gender: 'male' | 'female' | null) => {
    setFilters(prev => ({ ...prev, gender }));
  }, []);

  const toggleCity = useCallback((cityId: string) => {
    setFilters(prev => ({
      ...prev,
      cityIds: prev.cityIds.includes(cityId)
        ? prev.cityIds.filter(id => id !== cityId)
        : [...prev.cityIds, cityId]
    }));
  }, []);

  const toggleSkill = useCallback((skillId: string) => {
    setFilters(prev => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter(id => id !== skillId)
        : [...prev.skillIds, skillId]
    }));
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      expandedCategories: prev.expandedCategories.includes(categoryId)
        ? prev.expandedCategories.filter(id => id !== categoryId)
        : [...prev.expandedCategories, categoryId]
    }));
  }, []);

  // Обновляем метод для кнопки "Все категории"
  const toggleShowAllCategories = useCallback(() => {
    setFilters(prev => {
      const newShowAllCategories = !prev.showAllCategories;
      
      // Здесь мы не можем получить categories, поэтому просто меняем флаг
      // А сам компонент CategoryFilter будет решать, что показывать
      return {
        ...prev,
        showAllCategories: newShowAllCategories,
        // Не меняем expandedCategories здесь, это сделает компонент
      };
    });
  }, []);

  const toggleShowAllCities = useCallback(() => {
    setFilters(prev => ({ ...prev, showAllCities: !prev.showAllCities }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFiltersState);
  }, []);

  return [
    filters,
    {
      setMode,
      setGender,
      toggleCity,
      toggleSkill,
      toggleCategory,
      toggleShowAllCategories,
      toggleShowAllCities,
      resetFilters,
    }
  ];
};