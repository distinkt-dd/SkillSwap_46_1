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
}
