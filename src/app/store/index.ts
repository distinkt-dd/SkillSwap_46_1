import { citiesSlice } from '@entities/cities';
import { userSlice } from '@entities/user';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(userSlice, citiesSlice);

export const store = configureStore({
  reducer: rootReducer,
});

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch;
}
