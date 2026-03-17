import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '../api/user';
import type {
  TLoginUser,
  TRegisterUser,
  TServerUser,
  TUpdateUser,
  TUpdateUserPass,
  TUser,
} from '../api/types';

const userApi = new UserApi();

export const login = createAsyncThunk<TUser, TLoginUser>(
  'user/login',
  async (payload: TLoginUser) => {
    return await userApi.userLogin(payload);
  }
);

export const register = createAsyncThunk<TUser, TRegisterUser>(
  'user/register',
  async (payload: TRegisterUser) => {
    return await userApi.userRegister(payload);
  }
);

export const checkUserAuth = createAsyncThunk<TUser | null>('user/checkUserAuth', async () => {
  return userApi.getUserFromStorage();
});

export const updatePassword = createAsyncThunk<TServerUser, TUpdateUserPass>(
  'user/updatePass',
  async (payload: TUpdateUserPass) => {
    return await userApi.userPassUpdate(payload);
  }
);

export const updateDateUser = createAsyncThunk<TUser, TUpdateUser>(
  'user/updateDataUser',
  async (payload: TUpdateUser) => {
    return await userApi.userDataUpdate(payload);
  }
);
