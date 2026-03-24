import { useState, useCallback, useMemo, useEffect } from 'react';
import type { FilterMode, FiltersState, FiltersActions } from './types';
import { initialFiltersState } from './types';
import { getInitialFiltersState, writeFiltersToStorage } from './filtersStorage';

export const useFilters = (): [FiltersState, FiltersActions] => {
  const [filters, setFilters] = useState<FiltersState>(getInitialFiltersState);

  useEffect(() => {
    writeFiltersToStorage(filters);
  }, [filters]);

  const setMode = useCallback((mode: FilterMode) => {
    setFilters((prev) => ({ ...prev, mode }));
  }, []);

  const setGender = useCallback((gender: 'male' | 'female' | null) => {
    setFilters((prev) => ({ ...prev, gender }));
  }, []);

  const toggleCity = useCallback((cityId: string) => {
    setFilters((prev) => ({
      ...prev,
      cityIds: prev.cityIds.includes(cityId)
        ? prev.cityIds.filter((id) => id !== cityId)
        : [...prev.cityIds, cityId],
    }));
  }, []);

  const toggleSkill = useCallback((skillId: string) => {
    setFilters((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter((id) => id !== skillId)
        : [...prev.skillIds, skillId],
    }));
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      expandedCategories: prev.expandedCategories.includes(categoryId)
        ? prev.expandedCategories.filter((id) => id !== categoryId)
        : [...prev.expandedCategories, categoryId],
    }));
  }, []);

  // Обновляем метод для кнопки "Все категории"
  const toggleShowAllCategories = useCallback(() => {
    setFilters((prev) => {
      const newShowAllCategories = !prev.showAllCategories;

      return {
        ...prev,
        showAllCategories: newShowAllCategories,
      };
    });
  }, []);

  const toggleShowAllCities = useCallback(() => {
    setFilters((prev) => ({ ...prev, showAllCities: !prev.showAllCities }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFiltersState);
  }, []);

  const actions = useMemo<FiltersActions>(
    () => ({
      setMode,
      setGender,
      toggleCity,
      toggleSkill,
      toggleCategory,
      toggleShowAllCategories,
      toggleShowAllCities,
      resetFilters,
    }),
    [
      setMode,
      setGender,
      toggleCity,
      toggleSkill,
      toggleCategory,
      toggleShowAllCategories,
      toggleShowAllCities,
      resetFilters,
    ]
  );

  return [filters, actions];
};
