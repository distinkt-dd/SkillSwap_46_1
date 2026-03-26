import { useState, type FC } from 'react';
import styles from './offer-card.module.css';

import { useSelector } from '@shared/store';
import { selectedSubcategories } from '@entities/subcategories/model/slice';
import { Button, IconUI } from '@shared/index';
import { selectedCategories } from '@entities/categories/model';
import { CarouselUI } from '@shared/ui';
import type { TOffer } from '@entities/offers/api/types';
import { selectedUser } from '@entities/user';
import ModalInfo from '@widgets/models/models.notifications';

type TOfferCardUI = {
  offer: TOffer;
};

export const OfferCardUI: FC<TOfferCardUI> = ({ offer }) => {
  const subCategories = useSelector(selectedSubcategories);
  const categories = useSelector(selectedCategories);
  const subCategory = subCategories?.find((item) => item.id === offer.subcategoryId);
  const category = categories?.find((item) => item.id === subCategory?.categoryId);
  const user = useSelector(selectedUser);
  const [modalOpen, setModelOpen] = useState<boolean>(false);

  const handleCloseModel = () => {
    setModelOpen(!modalOpen);
  };

  const handleOfferClick = () => {
    setModelOpen(!modalOpen);
  };

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCard__controls}>
        <button>
          <IconUI name="like" />
        </button>
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
      {user ? (
        <ModalInfo type="success" isOpen={modalOpen} onClose={handleCloseModel} />
      ) : (
        <ModalInfo type="registration" isOpen={modalOpen} onClose={handleCloseModel} />
      )}
    </div>
  );
};
