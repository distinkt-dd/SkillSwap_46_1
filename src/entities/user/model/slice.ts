import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '../api/types';
import { login } from './actions';

type TUserInitialState = {
  user: TUser | null;
  error: string | '';
  isResponse: boolean;
  isAuthChecked: boolean;
};

const userInitialState: TUserInitialState = {
  user: null,
  error: '',
  isResponse: false,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    selectedUser: (state) => state.user,
    selectedUserIsAuthChecked: (state) => state.isAuthChecked,
    selectedUserIsResponse: (state) => state.isResponse,
    selectedUserError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isResponse = false;
        state.error = '';
      })
      .addCase(login.pending, (state) => {
        state.isResponse = true;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isResponse = false;
        state.isAuthChecked = true;
      });
  },
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const {
  selectedUser,
  selectedUserIsAuthChecked,
  selectedUserIsResponse,
  selectedUserError,
} = userSlice.selectors;
