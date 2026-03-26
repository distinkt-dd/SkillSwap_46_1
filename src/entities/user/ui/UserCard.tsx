import * as React from 'react';
import { Button, Avatar, Subcategory, IconUI } from '@shared/ui';
import styles from './UserCard.module.css';
import type { TCategory } from '@entities/categories';
import { NavLink } from 'react-router-dom';
import { useSelector } from '@shared/store';
import { selectedOffers, updateOffer } from '@entities/offers/model';
import clsx from 'clsx';
import { selectedUser } from '../model';
import { useDispatch } from '@shared/store';

export type CategoryType = TCategory['type'];

// Тип для навыка с категорией
export type SkillItem = {
  name: string;
  type: CategoryType | 'other';
};

export type UserCardProps = {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  age?: number;
  canTeach?: SkillItem[];
  wantsToLearn?: SkillItem[];
  detailed?: boolean;
  description?: string;
  favoriteSlot?: React.ReactNode;
  likesCount?: number;
  className?: string;
};

const MAX_VISIBLE_TAGS = 2;

// Функция для склонения слова "год"
const getYearWord = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'лет';
  }

  if (lastDigit === 1) {
    return 'год';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года';
  }

  return 'лет';
};

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  avatar,
  location,
  age,
  canTeach = [],
  wantsToLearn = [],
  detailed = false,
  description,
  favoriteSlot,
  likesCount = 0,
  className,
}) => {
  const visibleLearn = wantsToLearn.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = wantsToLearn.length - MAX_VISIBLE_TAGS;
  const offers = useSelector(selectedOffers);
  const currentUser = useSelector(selectedUser);
  const currentOffer = offers.find((item) => item.userId === id);
  const dispatch = useDispatch();

  return (
    <div className={clsx(styles.userCard, className)}>
      <div
        className={styles.likesWrapper}
        onClick={() => {
          if (!currentOffer || !currentUser) return;

          const usrLikes = currentOffer.userLikedIds || [];
          const userId = currentUser.id;

          if (usrLikes.includes(userId)) {
            const temp = usrLikes.filter((item) => item !== userId);
            dispatch(updateOffer({ ...currentOffer, userLikedIds: temp }));
          } else {
            const temp = [...usrLikes, userId];
            dispatch(updateOffer({ ...currentOffer, userLikedIds: temp }));
          }
        }}
      >
        {!currentOffer?.userLikedIds.includes(currentUser?.id) ? (
          <IconUI name="like" className={styles.likesIcon} />
        ) : (
          <IconUI name="likeFilled" className={styles.likesIcon} />
        )}

        <span className={styles.likesCount}>{likesCount}</span>
      </div>

      {/* Слот для фичи избранного */}
      {favoriteSlot && <div className={styles.favoriteWrapper}>{favoriteSlot}</div>}

      {/* Аватар + имя + локация/возраст */}
      <div className={styles.header}>
        <Avatar src={avatar} size="medium" />
        <div className={styles.body}>
          <h3 className={styles.title}>{name}</h3>
          {(location || age) && (
            <div className={styles.meta}>
              {[location, age ? `${age} ${getYearWord(age)}` : null].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      </div>

      {description && <div className={styles.description}>{description}</div>}

      {/* Может научить */}
      {canTeach.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Может научить:</div>
          <div className={styles.tags}>
            {canTeach.map((skill) => (
              <div key={skill.name} className={styles.tagWrapper}>
                <Subcategory title={skill.name} type={skill.type} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Хочет научиться */}
      {wantsToLearn.length > 0 && (
        <div className={clsx(styles.section, styles.wantsTeach)}>
          <div className={styles.sectionLabel}>Хочет научиться:</div>
          <div className={styles.tags}>
            {visibleLearn.map((skill) => (
              <div key={skill.name} className={styles.tagWrapper}>
                <Subcategory title={skill.name} type={skill.type} />
              </div>
            ))}
            {hiddenCount > 0 && (
              <div className={`${styles.tag} ${styles.tagMore}`}>+{hiddenCount}</div>
            )}
          </div>
        </div>
      )}

      {detailed ? (
        <NavLink to={`/offers/${currentOffer?.id}`}>
          <Button variant="primary" width="100%">
            Подробнее
          </Button>
        </NavLink>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserCard;
