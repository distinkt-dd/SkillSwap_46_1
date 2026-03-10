import { Api } from '@shared/api';
import type { TCategoriesResponse } from './types';

const CATEGORIES_ENDPOINT = 'categories';

export class CategoriesApi extends Api {
  constructor() {
    super(CATEGORIES_ENDPOINT);
  }

  async getCategories(): Promise<TCategoriesResponse> {
    return this.get<TCategoriesResponse>();
  }
}
