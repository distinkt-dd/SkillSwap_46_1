import type { FC } from 'react';
// import React, { useMemo, useRef, useState } from 'react';
// import styles from './closest-offers.module.css';
// import { UserCard } from '@entities/user';
import type { TOffer } from '@entities/offers';
import styles from './closest-offers.module.css';

type TClosestOffers = {
  offer: TOffer;
};

export const ClosestOffers: FC<TClosestOffers> = ({ offer }) => {
  console.log(offer);
  return (
    <div className={styles.closestOffers__container}>
      {/* <UserCard
        id={user.id}
        name={user.name}
        avatar={user.avatar}
        location={city?.name}
        // age={user.birthday}
        canTeach={canSubCategories}
        wantsToLearn={wantsSubCategories}
        description={user.description}
      // favoriteSlot
      /> */}
      <p>CLOSEST OFFERS</p>
    </div>
  );
};
