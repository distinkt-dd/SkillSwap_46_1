import { describe, expect, it } from 'vitest';
import type { TCategory } from '../api/types';
import { getCategories } from './actions';
import {
  categoriesSlice,
  clearCategoriesError,
  selectCategoryById,
  selectedCategories,
  selectedCategoriesError,
  selectedCategoriesIsResponse,
} from './slice';

const categories: TCategory[] = [
  { id: '1', name: 'Бизнес и карьера', type: 'business' },
  { id: '2', name: 'Творчество и искусство', type: 'creative' },
];

const createRootState = (state = categoriesSlice.getInitialState()) =>
  ({ categories: state }) as RootState;

describe('categoriesSlice', () => {
  it('возвращает начальное состояние', () => {
    const state = categoriesSlice.reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      categories: [],
      error: '',
      isResponse: false,
    });
  });

  it('обрабатывает getCategories pending, fulfilled и rejected', () => {
    let state = categoriesSlice.reducer(undefined, { type: getCategories.pending.type });

    expect(state.isResponse).toBe(true);
    expect(state.error).toBe('');

    state = categoriesSlice.reducer(state, {
      type: getCategories.fulfilled.type,
      payload: categories,
    });

    expect(state.categories).toEqual(categories);
    expect(state.isResponse).toBe(false);
    expect(selectedCategories(createRootState(state))).toEqual(categories);
    expect(selectedCategoriesIsResponse(createRootState(state))).toBe(false);
    expect(selectCategoryById('2')(createRootState(state))).toEqual(categories[1]);

    state = categoriesSlice.reducer(state, {
      type: getCategories.rejected.type,
      error: { message: 'Ошибка загрузки' },
    });

    expect(state.error).toBe('Ошибка загрузки');
    expect(state.isResponse).toBe(false);
    expect(selectedCategoriesError(createRootState(state))).toBe('Ошибка загрузки');
  });

  it('очищает ошибку', () => {
    let state = categoriesSlice.reducer(undefined, {
      type: getCategories.rejected.type,
      error: { message: 'Ошибка загрузки' },
    });

    state = categoriesSlice.reducer(state, clearCategoriesError());

    expect(state.error).toBe('');
  });
});
