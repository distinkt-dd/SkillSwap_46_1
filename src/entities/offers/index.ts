export { OffersApi } from './api/offers';

export {
  offersSchema,
  offersCreateSchema,
  offersUpdateSchema,
  offersArraySchema,
  type TOfferFromSchema,
  type OfferCreateValidData,
  type OfferUpdateValidData,
} from './api/offersValidate';

export type { TOffer, TOfferCreate, TOfferUpdate } from './api/types';
