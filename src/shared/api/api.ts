export class Api {
  readonly baseUrl: string = import.meta.env.VITE_SKILLSWAP_API_URL;
  readonly uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  protected checkResponse = async <T>(res: Response): Promise<T> => {
    if (res.ok) {
      return res.json();
    }

    // При ошибке пытаемся получить текст ответа
    const text = await res.text();
    let errorMessage = `Ошибка ${res.status}: ${res.statusText}`;

    try {
      // Пробуем распарсить как JSON
      const errorJson = JSON.parse(text);
      errorMessage = errorJson.message || errorJson.error || errorMessage;
    } catch {
      // Если не JSON, используем текст как есть
      if (text) {
        errorMessage = `${errorMessage} - ${text}`;
      }
    }

    throw new Error(errorMessage);
  };

  protected async get<TResponse>(): Promise<TResponse> {
    return await fetch(`${this.baseUrl}/${this.uri}`).then((res) =>
      this.checkResponse<TResponse>(res)
    );
  }
}
