import { subcategoriesSlice } from '@entities/subcategories';
import { userSlice } from '@entities/user';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(userSlice, subcategoriesSlice);

export const store = configureStore({
  reducer: rootReducer,
});

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch;
}
