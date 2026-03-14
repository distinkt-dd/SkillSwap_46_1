// src/widgets/header/lib/useSkillsMenu.ts
import { useState, useEffect, useCallback } from 'react';
import { skillsApi } from '../api/skillsApi';
import type { CategoryWithSubcategories } from '../model/types';

export const useSkillsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для загрузки данных - оборачиваем в useCallback
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [categoriesData, subcategoriesData] = await Promise.all([
        skillsApi.getCategories(),
        skillsApi.getSubcategories(),
      ]);

      const categoriesWithSub = categoriesData.map((cat) => ({
        ...cat,
        subcategories: subcategoriesData.filter((sub) => sub.categoryId === cat.id),
      }));

      setCategories(categoriesWithSub);
    } catch (err) {
      setError('Не удалось загрузить навыки');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []); // У fetchData нет внешних зависимостей

  // Загружаем данные при первом открытии меню
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchData();
    }
  }, [isOpen, categories.length, fetchData]); // Добавляем все зависимости

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    toggleOpen,
    close,
    open,
    categories,
    isLoading,
    error,
  };
};
