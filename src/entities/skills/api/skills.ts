import { Api } from '@shared/api';
import type { TSkillResponse } from './types';

const baseURL = import.meta.env.VITE_SKILLSWAP_API_URL;
const USER_ENDPOINT = 'skills';

export class SkillsApi extends Api {
  constructor() {
    super(baseURL, USER_ENDPOINT);
  }

  async getSkills(): Promise<TSkillResponse> {
    return this.get<TSkillResponse>();
  }
}
