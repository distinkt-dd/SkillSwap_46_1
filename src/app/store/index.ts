import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices();

export const store = configureStore({
  reducer: rootReducer,
});

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch;
}
