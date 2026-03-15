import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '../api/user';
import type { TLoginUser, TUser } from '../api/types';

const userApi = new UserApi();

export const login = createAsyncThunk<TUser, TLoginUser>(
  'user/login',
  async (payload: TLoginUser) => {
    return await userApi.userLogin(payload);
  }
);
