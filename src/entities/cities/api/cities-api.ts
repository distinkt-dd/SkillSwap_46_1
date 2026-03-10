import { Api } from '@shared/api';
import type { TCitiesResponse } from './types';

const CITIES_ENDPOINT = 'cities';

export class CitiesApi extends Api {
  constructor() {
    super(CITIES_ENDPOINT);
  }

  async getCities(): Promise<TCitiesResponse> {
    return this.get<TCitiesResponse>();
  }
}
