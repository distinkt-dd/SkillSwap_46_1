import type { FilterMode, FiltersState } from './types';
import { initialFiltersState } from './types';

const STORAGE_KEY = 'skillswap_catalog_filters';

const FILTER_MODES: FilterMode[] = ['all', 'wantToLearn', 'canTeach'];

const isFilterMode = (value: unknown): value is FilterMode =>
  typeof value === 'string' && (FILTER_MODES as string[]).includes(value);

const isGender = (value: unknown): value is 'male' | 'female' | null =>
  value === null || value === 'male' || value === 'female';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const readFiltersFromStorage = (): FiltersState | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null || raw === '') {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object') {
      return null;
    }

    const data = parsed as Record<string, unknown>;

    if (!isFilterMode(data.mode)) return null;
    if (!isGender(data.gender)) return null;
    if (!isStringArray(data.cityIds)) return null;
    if (!isStringArray(data.skillIds)) return null;
    if (!isStringArray(data.expandedCategories)) return null;
    if (!isBoolean(data.showAllCategories)) return null;
    if (!isBoolean(data.showAllCities)) return null;

    return {
      mode: data.mode,
      gender: data.gender,
      cityIds: data.cityIds,
      skillIds: data.skillIds,
      expandedCategories: data.expandedCategories,
      showAllCategories: data.showAllCategories,
      showAllCities: data.showAllCities,
    };
  } catch {
    return null;
  }
};

export const writeFiltersToStorage = (state: FiltersState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    return
  }
};

export const getInitialFiltersState = (): FiltersState =>
  readFiltersFromStorage() ?? initialFiltersState;
