import * as yup from 'yup';

export class Api {
  readonly baseUrl: string = import.meta.env.VITE_SKILLSWAP_API_URL;
  readonly uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  protected checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

  protected async get<TResponse>(): Promise<TResponse> {
    return await fetch(`${this.baseUrl}/${this.uri}`).then((res) =>
      this.checkResponse<TResponse>(res)
    );
  }

  async validateData<T>(data: T, schema: yup.Schema<T>): Promise<T> {
    try {
      return await schema.validate(data, {
        stripUnknown: true,
        abortEarly: false,
      });
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
      throw new Error(`Неизвестная ошибка:`);
    }
  }
}
