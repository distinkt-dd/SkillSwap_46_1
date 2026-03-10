export interface TUser {
  id: string;
  name: string;
  email: string;
  description: string;
  avatar: string;
  gender: 'male' | 'female';
  birthday: Date;
  cityId: number;
  subcategoriesIds: number[];
}

export interface TServerUser extends TUser {
  passwordHash: string;
}

export type TRegisterUser = Omit<TUser, 'id'> & {
  password: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUpdateUser = Omit<Partial<TUser>, 'id' | 'subcategoriesIds'>;
