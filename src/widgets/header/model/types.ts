// src/widgets/header/model/types.ts

export type Category = {
  id: string;
  name: string;
  type: string;
};

export type Subcategory = {
  id: string;
  name: string;
  categoryId: string; // Оставляем string, но будем преобразовывать данные
};

export type Skill = {
  id: string;
  userId: number;
  name: string;
  subcategoryId: string; // Тоже приводим к string
  description: string;
  images: string[];
  userLikedIds: number[];
};

export type CategoryWithSubcategories = Category & {
  subcategories: Subcategory[];
};
