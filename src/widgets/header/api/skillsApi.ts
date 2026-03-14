import dbData from '@shared/api/data/db.json';
import type { Category, Subcategory } from '../model/types';

// Преобразуем данные: приводим числовые id к строкам
const transformSubcategories = (data: typeof dbData.subcategories): Subcategory[] => {
  return data.map((sub) => ({
    ...sub,
    categoryId: String(sub.categoryId), // Преобразуем number в string
  }));
};

export const skillsApi = {
  // Получить все категории
  getCategories: async (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dbData.categories);
      }, 300);
    });
  },

  // Получить все подкатегории (с преобразованием)
  getSubcategories: async (): Promise<Subcategory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transformed = transformSubcategories(dbData.subcategories);
        resolve(transformed);
      }, 300);
    });
  },

  // Получить категорию по type
  getCategoryByType: async (type: string): Promise<Category | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = dbData.categories.find((cat) => cat.type === type);
        resolve(category);
      }, 300);
    });
  },

  // Получить подкатегории по categoryId (с преобразованием)
  getSubcategoriesByCategoryId: async (categoryId: string): Promise<Subcategory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subcategories = dbData.subcategories.filter(
          (sub) => sub.categoryId === Number(categoryId) // Сравниваем как числа
        );
        const transformed = transformSubcategories(subcategories);
        resolve(transformed);
      }, 300);
    });
  },
};
