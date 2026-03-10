import { Api } from '@shared/api';
import type { TSubCategoriesResponse } from './types';

const SUBCATEGORIES_ENDPOINT = 'subcategories';

export class SubCategoriesApi extends Api {
  constructor() {
    super(SUBCATEGORIES_ENDPOINT);
  }

  async getSubCategories(): Promise<TSubCategoriesResponse> {
    return this.get<TSubCategoriesResponse>();
  }
}
