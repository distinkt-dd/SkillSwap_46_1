import type { FC } from 'react';
import styles from './favorites.module.css';
import { useSelector } from '@shared/store';
import { selectedOffers } from '@entities/offers';
import { selectedUser } from '@entities/user';
import { OfferCardUI } from '@widgets/offer-card/ui';

export const Favorites: FC = () => {
  const user = useSelector(selectedUser);
  const offers = useSelector(selectedOffers).filter((item) => item.userLikedIds.includes(user?.id));

  return (
    <div className={styles.favorites}>
      {offers.map((item) => {
        return <OfferCardUI offer={item} userId={user?.id} className={styles.favoritesCard} />;
      })}
    </div>
  );
};
