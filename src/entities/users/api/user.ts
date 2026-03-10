import { Api } from '@shared/api';
import type { TServerUser, TRegisterUser, TUpdateUser, TLoginUser, TUser } from './types';
import {
  passwordUpdateSchema,
  userRegisterSchema,
  usersArraySchema,
  userUpdateSchema,
  type UserValidatedData,
  type UserValidatedUpdateData,
} from './userValidate';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';

const USER_ENDPOINT = 'users';

export class UserApi extends Api {
  private readonly saltRounds: number = 10;

  constructor() {
    super(USER_ENDPOINT);
  }

  private async hashPassword(data: string): Promise<string> {
    try {
      return await bcrypt.hash(data, this.saltRounds);
    } catch (error) {
      throw new Error(`Ошибка хеширования пароля: ${error}`);
    }
  }

  private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error(`Ошибка сравнения паролей: ${error}`);
    }
  }

  async getUsers(): Promise<TUser[]> {
    try {
      const response = await this.get<TUser[]>();
      return await usersArraySchema.validate(response, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error) {
      throw new Error(`Данные с сервера не валидны: ${error}`);
    }
  }

  async userLogin(data: TLoginUser): Promise<TUser> {
    try {
      const res = await fetch(`${this.baseUrl}/${this.uri}?email=${data.email}`, {
        method: 'GET',
      });
      const user = await this.checkResponse<TServerUser[]>(res);
      if (Array.isArray(user) && user.length === 0) {
        throw new Error('USER_NOT_FOUND');
      }
      const passIsEqual = await this.comparePasswords(data.password, user[0].passwordHash);
      if (!passIsEqual) throw new Error('INVALID_PASSWORD');

      const { passwordHash, ...userWithoutPassword } = user[0]; // eslint-disable-line @typescript-eslint/no-unused-vars
      return userWithoutPassword as TUser;
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'USER_NOT_FOUND':
            throw new Error('Пользователь с таким email не найден');
          case 'INVALID_PASSWORD':
            throw new Error('Неверный пароль');
          default:
            console.error('Login error:', error);
            throw new Error('Ошибка при входе в систему');
        }
      }
      throw new Error('Неизвестная ошибка');
    }
  }

  async userRegister(data: TRegisterUser): Promise<TUser> {
    try {
      const validatedData: UserValidatedData = await userRegisterSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });
      const res = await fetch(`${this.baseUrl}/${this.uri}?email=${data.email}`, {
        method: 'GET',
      });
      const isUserExist = await this.checkResponse<TServerUser | []>(res);

      if (Array.isArray(isUserExist) && isUserExist.length === 0) {
        console.log('Register in process...');
        const hashedPassword = await this.hashPassword(validatedData.password);

        const { password, ...restData } = validatedData; // eslint-disable-line @typescript-eslint/no-unused-vars
        const hashedUser = {
          ...restData,
          passwordHash: hashedPassword,
        };
        const res = await fetch(`${this.baseUrl}/${this.uri}`, {
          method: 'POST',
          body: JSON.stringify(hashedUser),
        });
        const { passwordHash, ...newUser } = await this.checkResponse<TServerUser>(res); // eslint-disable-line @typescript-eslint/no-unused-vars
        return newUser as TUser;
      }
      throw new Error('Пользователь уже существует');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc, err) => {
            if (err.path) {
              acc[err.path] = err.message;
            }
            return acc;
          },
          {} as Record<string, string>
        );
        throw new Error(`Ошибка валидации: ${JSON.stringify(errors)}`);
      }
      throw new Error(`Ошибка регистрации пользователя: ${error}`);
    }
  }

  async userPassUpdate(id: string, data: Pick<TRegisterUser, 'password'>): Promise<TServerUser> {
    try {
      const validatedData: Pick<TRegisterUser, 'password'> = await passwordUpdateSchema.validate(
        data,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      const hashedPassword = await this.hashPassword(validatedData.password);
      const res = await fetch(`${this.baseUrl}/${this.uri}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ passwordHash: hashedPassword }),
      });

      return this.checkResponse<TServerUser>(res);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc, err) => {
            if (err.path) {
              acc[err.path] = err.message;
            }
            return acc;
          },
          {} as Record<string, string>
        );
        throw new Error(`Ошибка валидации: ${JSON.stringify(errors)}`);
      }
      throw new Error(`Ошибка изменения пароля пользователя: ${error}`);
    }
  }

  async userDataUpdate(id: string, data: TUpdateUser): Promise<TUser> {
    try {
      const validatedData: UserValidatedUpdateData = await userUpdateSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      const res = await fetch(`${this.baseUrl}/${this.uri}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(validatedData),
      });

      const { passwordHash, ...updatedUser } = await this.checkResponse<TServerUser>(res); // eslint-disable-line @typescript-eslint/no-unused-vars
      return updatedUser as TUser;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc, err) => {
            if (err.path) {
              acc[err.path] = err.message;
            }
            return acc;
          },
          {} as Record<string, string>
        );
        throw new Error(`Ошибка валидации: ${JSON.stringify(errors)}`);
      }
      throw new Error(`Ошибка изменения данных пользователя: ${error}`);
    }
  }

  async userRemove(id: string): Promise<TServerUser> {
    try {
      const res = await fetch(`${this.baseUrl}/${this.uri}/${id}`, {
        method: 'DELETE',
      });
      return this.checkResponse<TServerUser>(res);
    } catch (error) {
      throw new Error(`Ошибка удаления пользователя ${id}: ${error}`);
    }
  }
}
