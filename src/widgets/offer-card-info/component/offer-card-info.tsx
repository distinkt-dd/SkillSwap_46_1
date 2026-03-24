import type { FC } from 'react';
import { useMemo } from 'react';
import styles from './offer-card-info.module.css';
import { selectedUser, selectedUsers, UserCard } from '@entities/user';
import type { SkillItem } from '@entities/user/ui/UserCard';
import { useSelector } from '@shared/store';
import { selectedSubcategories } from '@entities/subcategories/model/slice';
import { selectCities } from '@entities/cities/model/slice';
import { selectedCategories } from '@entities/categories/model/slice';

import { OfferCardUI } from '@widgets/offer-card/ui';
import type { TOffer } from '@entities/offers/api/types';

type TOfferCardInfo = {
  offer: TOffer;
};

export const OfferCardInfo: FC<TOfferCardInfo> = ({ offer }) => {
  const sessionUser = useSelector(selectedUser);
  const users = useSelector(selectedUsers);
  const subCategories = useSelector(selectedSubcategories);
  const categories = useSelector(selectedCategories);
  const cities = useSelector(selectCities);

  const offerAuthor = useMemo(() => {
    const uid = String(offer.userId);
    const fromList = users.find((u) => String(u.id) === uid);
    if (fromList) return fromList;
    if (sessionUser && String(sessionUser.id) === uid) return sessionUser;
    return null;
  }, [users, sessionUser, offer.userId]);

  const { canTeach, wantsToLearn } = useMemo(() => {
    const teachSub = subCategories.find((sub) => sub.id === offer.subcategoryId);
    const teachCategory = teachSub
      ? categories.find((c) => c.id === teachSub.categoryId)
      : undefined;
    const can: SkillItem[] = teachSub
      ? [{ name: teachSub.name, type: teachCategory?.type ?? 'other' }]
      : [];

    const wants: SkillItem[] = (offerAuthor?.subcategoriesIds ?? [])
      .map((subId) => {
        const sub = subCategories.find((s) => s.id === subId);
        if (!sub) return null;
        const cat = categories.find((c) => c.id === sub.categoryId);
        return { name: sub.name, type: cat?.type ?? 'other' } satisfies SkillItem;
      })
      .filter((item): item is SkillItem => item !== null);

    return { canTeach: can, wantsToLearn: wants };
  }, [offer.subcategoryId, offerAuthor?.subcategoriesIds, subCategories, categories]);

  const city = cities?.find((c) => c.id === offerAuthor?.cityId);

  if (!offerAuthor) {
    return <p className={styles.offerCardInfo__loading}>Загрузка данных пользователя…</p>;
  }

  return (
    <div className={styles.offerCardInfo__container}>
      <UserCard
        id={offerAuthor.id}
        name={offerAuthor.name}
        avatar={offerAuthor.avatar}
        location={city?.name}
        canTeach={canTeach}
        wantsToLearn={wantsToLearn}
        description={offerAuthor.description}
      />
      <OfferCardUI offer={offer} />
    </div>
  );
};
