import { subcategoriesSlice } from '@entities/subcategories';
import { userSlice } from '@entities/user';
import { categoriesSlice } from '@entities/categories/model';
import { citiesSlice } from '@entities/cities';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(userSlice, citiesSlice, subcategoriesSlice, categoriesSlice);

export const store = configureStore({
  reducer: rootReducer,
});

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch;
}
