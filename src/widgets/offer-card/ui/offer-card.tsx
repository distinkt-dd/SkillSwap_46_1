import type { FC } from 'react';
import styles from './offer-card.module.css';

import { useDispatch, useSelector } from '@shared/store';
import { selectedSubcategories } from '@entities/subcategories/model/slice';
import { Button, IconUI } from '@shared/index';
import { selectedCategories } from '@entities/categories/model';
import { CarouselUI } from '@shared/ui';
import type { TOffer } from '@entities/offers/api/types';
import { selectedUser } from '@entities/user';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { updateOffer } from '@entities/offers';

type TOfferCardUI = {
  userId?: string | undefined;
  offer: TOffer;
  className?: string;
};

export const OfferCardUI: FC<TOfferCardUI> = ({ offer, userId, className }) => {
  //Memoizaieed
  const dispatch = useDispatch();
  const subCategories = useSelector(selectedSubcategories);
  const categories = useSelector(selectedCategories);
  const subCategory = subCategories?.find((item) => item.id === offer.subcategoryId);
  const category = categories?.find((item) => item.id === subCategory?.categoryId);
  const user = useSelector(selectedUser);
  const navigate = useNavigate();
  const handleOfferClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
  };
  const handleLikeOffer = () => {
    if (!offer || !user) return;

    const usrLikes = offer.userLikedIds || [];
    const userId = user.id;

    if (usrLikes.includes(userId)) {
      const temp = usrLikes.filter((item) => item !== userId);
      dispatch(updateOffer({ ...offer, userLikedIds: temp }));
    } else {
      const temp = [...usrLikes, userId];
      dispatch(updateOffer({ ...offer, userLikedIds: temp }));
    }
  };
  return (
    <div className={clsx(styles.offerCard, className)}>
      <div className={styles.offerCard__controls}>
        {!offer.userLikedIds.includes(userId) ? (
          <button onClick={() => handleLikeOffer()}>
            <IconUI name="like" />
          </button>
        ) : (
          <button onClick={() => handleLikeOffer()}>
            <IconUI name="likeFilled" />
          </button>
        )}

        <button>
          <IconUI name="share" />
        </button>
        <button>
          <IconUI name="moreSquare" />
        </button>
      </div>
      <div className={styles.offerCard__container}>
        <div className={styles.offerCard__content}>
          <h1>{offer.name}</h1>
          <span className={styles.offerCard__categories}>
            {category?.name} / {subCategory?.name}
          </span>
          <p className={styles.offerCard__description}>{offer.description}</p>
          <Button className={styles.offerCard__button} onClick={handleOfferClick}>
            Предложить обмен
          </Button>
        </div>
        <CarouselUI className={styles.offerCard__carousel} images={offer.images}></CarouselUI>
      </div>
    </div>
  );
};
