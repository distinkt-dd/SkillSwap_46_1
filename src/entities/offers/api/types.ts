export interface TOffer {
  id: string;
  userId: string;
  name: string;
  subcategoryId: string;
  description: string;
  images: (string | undefined)[];
  userLikedIds: (string | undefined)[];
}

export type TOfferCreate = Omit<TOffer, 'id' | 'userId' | 'userLikedIds'>;
export type TOfferUpdate = Omit<Partial<Omit<TOffer, 'id'>>, 'userId' | 'userLikedIds'> & {
  id: string;
};
