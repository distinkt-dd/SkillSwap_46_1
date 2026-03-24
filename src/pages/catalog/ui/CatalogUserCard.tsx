import { forwardRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCard } from '@entities/user/ui';
import type { TUser } from '@entities/user/api/types';
import type { SkillItem } from '@entities/user/ui/UserCard';
import { selectedOffers } from '@entities/offers/model';
import { useSelector } from '@shared/store';
import { calculateAge } from '@shared/index';
import styles from './Catalog.module.css';

export type CatalogUserCardProps = {
  user: TUser;
  buildSkillItem: (subcategoryId: string | undefined) => SkillItem | null;
  getCanTeachData: (userId: string) => SkillItem[];
  getCityName: (cityId: string) => string;
  getLikesCount: (userId: string) => number;
};

export const CatalogUserCard = forwardRef<HTMLDivElement, CatalogUserCardProps>(
  ({ user, buildSkillItem, getCanTeachData, getCityName, getLikesCount }, ref) => {
    const navigate = useNavigate();
    const offers = useSelector(selectedOffers);

    const wantsToLearn: SkillItem[] = (user.subcategoriesIds || [])
      .filter((id): id is string => typeof id === 'string')
      .map((id) => buildSkillItem(id))
      .filter((item): item is SkillItem => item !== null);

    const canTeach = getCanTeachData(user.id);
    const likesCount = getLikesCount(user.id);

    const firstOfferId = useMemo(() => {
      const uid = String(user.id);
      return offers.find((offer) => String(offer.userId) === uid)?.id;
    }, [offers, user.id]);

    return (
      <div ref={ref} className={styles.cardWrapper}>
        <UserCard
          id={user.id}
          name={user.name}
          avatar={user.avatar}
          location={getCityName(user.cityId)}
          age={calculateAge(user.birthday)}
          wantsToLearn={wantsToLearn}
          canTeach={canTeach}
          likesCount={likesCount}
          detailed={true}
          onDetailsClick={
            firstOfferId ? () => navigate(`/offers/${firstOfferId}`) : undefined
          }
        />
      </div>
    );
  }
);

CatalogUserCard.displayName = 'CatalogUserCard';
