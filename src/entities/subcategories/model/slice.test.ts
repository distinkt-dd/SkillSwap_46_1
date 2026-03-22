import { describe, expect, it } from 'vitest';
import type { TSubCategory } from '../api/types';
import { getSubcategories } from './actions';
import {
  clearSubcategoriesError,
  selectSubcategoriesByCategoryId,
  selectSubcategoryById,
  selectedSubcategories,
  selectedSubcategoriesError,
  selectedSubcategoriesIsResponse,
  subcategoriesSlice,
} from './slice';

const subcategories: TSubCategory[] = [
  { id: '1', name: 'Маркетинг', categoryId: '1' },
  { id: '2', name: 'Продажи', categoryId: '1' },
  { id: '3', name: 'Дизайн', categoryId: '2' },
];

const createRootState = (state = subcategoriesSlice.getInitialState()) =>
  ({ subcategories: state }) as RootState;

describe('subcategoriesSlice', () => {
  it('возвращает начальное состояние', () => {
    const state = subcategoriesSlice.reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      subcategories: [],
      error: '',
      isResponse: false,
    });
  });

  it('обрабатывает getSubcategories pending, fulfilled и rejected', () => {
    let state = subcategoriesSlice.reducer(undefined, {
      type: getSubcategories.pending.type,
    });

    expect(state.isResponse).toBe(true);
    expect(state.error).toBe('');

    state = subcategoriesSlice.reducer(state, {
      type: getSubcategories.fulfilled.type,
      payload: subcategories,
    });

    expect(state.subcategories).toEqual(subcategories);
    expect(state.isResponse).toBe(false);
    expect(selectedSubcategories(createRootState(state))).toEqual(subcategories);
    expect(selectedSubcategoriesIsResponse(createRootState(state))).toBe(false);
    expect(selectSubcategoriesByCategoryId('1')(createRootState(state))).toEqual([
      subcategories[0],
      subcategories[1],
    ]);
    expect(selectSubcategoryById('2')(createRootState(state))).toEqual(subcategories[1]);

    state = subcategoriesSlice.reducer(state, {
      type: getSubcategories.rejected.type,
      error: { message: 'Ошибка загрузки' },
    });

    expect(state.error).toBe('Ошибка загрузки');
    expect(state.isResponse).toBe(false);
    expect(selectedSubcategoriesError(createRootState(state))).toBe('Ошибка загрузки');
  });

  it('очищает ошибку', () => {
    let state = subcategoriesSlice.reducer(undefined, {
      type: getSubcategories.rejected.type,
      error: { message: 'Ошибка загрузки' },
    });

    state = subcategoriesSlice.reducer(state, clearSubcategoriesError());

    expect(state.error).toBe('');
  });
});
