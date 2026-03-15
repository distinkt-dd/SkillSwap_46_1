export interface TUser {
  id: string;
  name: string;
  email: string;
  description: string;
  avatar: string;
  gender: string;
  birthday: Date | '';
  cityId: string;
  subcategoriesIds: (string | undefined)[];
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

export type TUpdateUserPass = {
  id: string;
  password: string;
};

export type TUpdateUser = Omit<Partial<Omit<TUser, 'id'>>, 'subcategoriesIds'> & { id: string };
