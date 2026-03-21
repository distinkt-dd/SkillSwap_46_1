export type FilterMode = 'all' | 'wantToLearn' | 'canTeach';

export type FiltersState = {
  mode: FilterMode;
  gender: 'male' | 'female' | null;
  cityIds: string[];
  skillIds: string[];
  expandedCategories: string[];
  showAllCategories: boolean; // Должно быть
  showAllCities: boolean;
};

export type FiltersActions = {
  setMode: (mode: FilterMode) => void;
  setGender: (gender: 'male' | 'female' | null) => void;
  toggleCity: (cityId: string) => void;
  toggleSkill: (skillId: string) => void;
  toggleCategory: (categoryId: string) => void;
  toggleShowAllCategories: () => void; // Должно быть
  toggleShowAllCities: () => void;
  resetFilters: () => void;
};

export const initialFiltersState: FiltersState = {
  mode: 'all',
  gender: null,
  cityIds: [],
  skillIds: [],
  expandedCategories: [],
  showAllCategories: false, // Должно быть
  showAllCities: false,
};
