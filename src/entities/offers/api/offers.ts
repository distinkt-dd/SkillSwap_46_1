import { Api } from '@shared/api';
import * as yup from 'yup';
import type { TOffer, TOfferCreate, TOfferUpdate } from './types';

const OFFERS_ENDPOINT = 'offers';

export class OffersApi extends Api {
  constructor() {
    super(OFFERS_ENDPOINT);
  }

  async validateData<T>(data: T, schema: yup.Schema<T>): Promise<T> {
    try {
      return schema.validate(data, {
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

  async getOffers(): Promise<TOffer[]> {
    try {
      return await this.get<TOffer[]>();
    } catch (error) {
      throw new Error(`Ошибка получения данных: ${error}`);
    }
  }

  async getOfferById(id: string): Promise<TOffer> {
    try {
      return await fetch(`${this.baseUrl}/${this.uri}/${id}`).then((response) =>
        this.checkResponse<TOffer>(response)
      );
    } catch (error) {
      throw new Error(`Ошибка получения данных: ${error}`);
    }
  }

  async createOffer(userId: string, data: TOfferCreate): Promise<TOffer> {
    try {
      const newOffer = { userId, ...data };
      return await fetch(`${this.baseUrl}/${this.uri}`, {
        method: 'POST',
        body: JSON.stringify(newOffer),
      }).then((response) => this.checkResponse<TOffer>(response));
    } catch (error) {
      throw new Error(`Ошибка добавления предложения: ${error}`);
    }
  }

  async offerDataUpdate(data: TOfferUpdate): Promise<TOffer> {
    try {
      return await fetch(`${this.baseUrl}/${this.uri}/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }).then((response) => this.checkResponse<TOffer>(response));
    } catch (error) {
      throw new Error(`Ошибка изменения данных предложения: ${error}`);
    }
  }

  async offerRemove(id: string): Promise<TOffer> {
    try {
      return await fetch(`${this.baseUrl}/${this.uri}/${id}`, {
        method: 'DELETE',
      }).then((response) => this.checkResponse<TOffer>(response));
    } catch (error) {
      throw new Error(`Ошибка удаления предложения ${id}: ${error}`);
    }
  }
}
