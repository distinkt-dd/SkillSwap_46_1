import * as React from 'react';
import { Button } from '@shared/ui';
import styles from './UserCard.module.css';

export type UserCardProps = {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  age?: number;
  canTeach?: string[];
  wantsToLearn?: string[];
  detailed?: boolean;
  description?: string;
  favoriteSlot?: React.ReactNode;
};

const MAX_VISIBLE_TAGS = 2;

export const UserCard: React.FC<UserCardProps> = ({
  name,
  avatar,
  location,
  age,
  canTeach = [],
  wantsToLearn = [],
  detailed = false,
  description,
  favoriteSlot,
}) => {
  const visibleLearn = wantsToLearn.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = wantsToLearn.length - MAX_VISIBLE_TAGS;

  return (
    <div className={styles.userCard}>
      {/* Слот для фичи избранного */}
      {favoriteSlot && <div className={styles.favoriteWrapper}>{favoriteSlot}</div>}

      {/* Аватар + имя + локация/возраст */}
      <div className={styles.header}>
        <img src={avatar} alt={`${name} avatar`} className={styles.avatar} />
        <div className={styles.body}>
          <h3 className={styles.title}>{name}</h3>
          {(location || age) && (
            <div className={styles.meta}>
              {[location, age ? `${age} год` : null].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Может научить */}
      {canTeach.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Может научить:</div>
          <div className={styles.tags}>
            {canTeach.map((t) => (
              <span key={t} className={`${styles.tag} ${styles.tagTeach}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Хочет научиться */}
      {wantsToLearn.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Хочет научиться:</div>
          <div className={styles.tags}>
            {visibleLearn.map((t) => (
              <span key={t} className={`${styles.tag} ${styles.tagLearn}`}>
                {t}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className={`${styles.tag} ${styles.tagMore}`}>+{hiddenCount}</span>
            )}
          </div>
        </div>
      )}

      {!detailed && (
        <Button variant="primary" width="100%">
          Подробнее
        </Button>
      )}

      {detailed && description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default UserCard;
