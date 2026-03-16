import { Api } from '@shared/api';
import type {
  TServerUser,
  TRegisterUser,
  TUpdateUser,
  TLoginUser,
  TUser,
  TUpdateUserPass,
} from './types';
import bcrypt from 'bcryptjs';

const USER_ENDPOINT = 'users';
const USER_STORAGE_KEY = 'user';

export class UserApi extends Api {
  private readonly saltRounds: number = 10;

  constructor() {
    super(USER_ENDPOINT);
  }

  private saveUserToStorage(user: TUser): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromStorage(): TUser | null {
    const rawUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!rawUser) {
      return null;
    }
    try {
      return JSON.parse(rawUser) as TUser;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
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
      return await this.get<TUser[]>();
    } catch (error) {
      throw new Error(`Ошибка получения пользователей: ${error}`);
    }
  }

  async getUserById(id: string): Promise<TUser> {
    try {
      return await fetch(`${this.baseUrl}/${this.uri}/${id}`).then((response) =>
        this.checkResponse<TServerUser>(response)
      );
    } catch (error) {
      throw new Error(`Ошибка получения пользователя: ${error}`);
    }
  }

  async userLogin(data: TLoginUser): Promise<TUser> {
    try {
      const user = await fetch(`${this.baseUrl}/${this.uri}?email=${data.email}`).then((res) =>
        this.checkResponse<TServerUser[]>(res)
      );
      if (Array.isArray(user) && user.length === 0) {
        throw new Error('USER_NOT_FOUND');
      }
      const passIsEqual = await this.comparePasswords(data.password, user[0].passwordHash);
      if (!passIsEqual) throw new Error('INVALID_PASSWORD');

      const { passwordHash, ...userWithoutPassword } = user[0]; // eslint-disable-line @typescript-eslint/no-unused-vars
      const preparedUser = userWithoutPassword as TUser;

      this.saveUserToStorage(preparedUser);

      return preparedUser;
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

  async userRegister(data: TRegisterUser): Promise<TServerUser | TUser> {
    try {
      const resGet = await fetch(`${this.baseUrl}/${this.uri}?email=${data.email}`).then((res) =>
        this.checkResponse<TServerUser | []>(res)
      );

      if (Array.isArray(resGet) && resGet.length === 0) {
        console.log('Register in process...');
        const hashedPassword = await this.hashPassword(data.password);
        const { password, ...restData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
        const hashedUser = {
          ...restData,
          passwordHash: hashedPassword,
        };
        const user = await fetch(`${this.baseUrl}/${this.uri}`, {
          method: 'POST',
          body: JSON.stringify(hashedUser),
        }).then((res) => this.checkResponse<TServerUser>(res));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...userWithOutPassword } = user;
        const preparedUser = userWithOutPassword as TUser;

        this.saveUserToStorage(preparedUser);

        return preparedUser;
      }
      throw new Error('Пользователь уже существует');
    } catch (error) {
      throw new Error(`Ошибка регистрации пользователя: ${error}`);
    }
  }

  async userPassUpdate(data: TUpdateUserPass): Promise<TServerUser> {
    try {
      const hashedPassword = await this.hashPassword(data.password);
      return await fetch(`${this.baseUrl}/${this.uri}/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ passwordHash: hashedPassword }),
      }).then((res) => this.checkResponse<TServerUser>(res));
    } catch (error) {
      throw new Error(`Ошибка изменения пароля пользователя: ${error}`);
    }
  }

  async userDataUpdate(data: TUpdateUser): Promise<TServerUser | TUser> {
    try {
      const user = await fetch(`${this.baseUrl}/${this.uri}/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }).then((res) => this.checkResponse<TServerUser>(res));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userWithOutPassword } = user;
      return userWithOutPassword as TUser;
    } catch (error) {
      throw new Error(`Ошибка изменения данных пользователя: ${error}`);
    }
  }

  async userRemove(id: string): Promise<TServerUser> {
    try {
      return await fetch(`${this.baseUrl}/${this.uri}/${id}`, {
        method: 'DELETE',
      }).then((res) => this.checkResponse<TServerUser>(res));
    } catch (error) {
      throw new Error(`Ошибка удаления пользователя ${id}: ${error}`);
    }
  }
}
