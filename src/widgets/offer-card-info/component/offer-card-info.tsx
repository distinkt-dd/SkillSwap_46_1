import type { FC } from 'react';
// import React, { useMemo, useRef, useState } from 'react';
import styles from './offer-card-info.module.css';
import { selectedUser, UserCard } from '@entities/user';
import { useSelector } from '@shared/store';
import { selectedSubcategories } from '@entities/subcategories/model/slice';
import { selectCities } from '@entities/cities/model/slice';

import { OfferCardUI } from '@widgets/offer-card/ui';
import type { TOffer } from '@entities/offers/api/types';

type TOfferCardInfo = {
  offer: TOffer;
};

export const OfferCardInfo: FC<TOfferCardInfo> = ({ offer }) => {
  const user = useSelector(selectedUser);
  //Перенести логику в компонент USERCARD
  const subCategories = useSelector(selectedSubcategories);
  const cities = useSelector(selectCities);

  //Перенести логику в компонент USERCARD
  const wantsSubCategories = subCategories
    .filter((sub) => user?.subcategoriesIds.includes(sub.id))
    .map((item) => item.name);
  const canSubCategories = subCategories
    .filter((sub) => offer.subcategoryId.includes(sub.id))
    .map((item) => item.name);
  const city = cities?.find((sub) => sub.id === user?.cityId);

  if (!user || !offer) {
    return;
  }

  return (
    <div className={styles.offerCardInfo__container}>
      <UserCard
        id={user.id}
        name={user.name}
        avatar={user.avatar}
        location={city?.name}
        // age={user.birthday}
        canTeach={canSubCategories}
        wantsToLearn={wantsSubCategories}
        description={user.description}
        // favoriteSlot
      />
      <OfferCardUI offer={offer} />
    </div>
  );
};
