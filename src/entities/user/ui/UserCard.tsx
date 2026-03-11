import * as React from 'react';
import styles from './UserCard.module.css';

export type UserCardProps = {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  age?: number;
  canTeach?: string[];
  wantsToLearn?: string[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  detailed?: boolean;
  description?: string;
};

const MAX_VISIBLE_TAGS = 2;

const HeartIcon = ({ active }: { active: boolean }) => active ? (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="none" viewBox="0 0 22 20">
    <path fill="#abd27a" stroke="#abd27a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.5 1A5.5 5.5 0 0 0 1 6.5C1 12 7.5 17 11 18.163 14.5 17 21 12 21 6.5a5.5 5.5 0 0 0-10-3.163A5.5 5.5 0 0 0 6.5 1"/>
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path fill="#253017" d="M10 17.954c-.288 0-.567-.038-.8-.121C5.647 16.614 0 12.288 0 5.898 0 2.642 2.633 0 5.87 0A5.78 5.78 0 0 1 10 1.712 5.78 5.78 0 0 1 14.13 0C17.367 0 20 2.651 20 5.898c0 6.4-5.646 10.716-9.2 11.935-.233.083-.512.12-.8.12M5.87 1.394c-2.465 0-4.475 2.019-4.475 4.503 0 6.353 6.112 9.888 8.26 10.623.168.056.531.056.699 0 2.139-.735 8.26-4.26 8.26-10.623 0-2.484-2.01-4.503-4.475-4.503A4.42 4.42 0 0 0 10.567 3.2c-.26.353-.855.353-1.116 0A4.44 4.44 0 0 0 5.87 1.395"/>
  </svg>
);

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  avatar,
  location,
  age,
  canTeach = [],
  wantsToLearn = [],
  isFavorite = false,
  onToggleFavorite,
  detailed = false,
  description,
}) => {
  const handleToggle = () => {
    if (onToggleFavorite) onToggleFavorite(id);
  };

  const visibleLearn = wantsToLearn.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = wantsToLearn.length - MAX_VISIBLE_TAGS;

  return (
    <div className={styles.userCard} data-feature="user-card">

      {/* Лайк в правом верхнем углу */}
      <div className={styles.favoriteWrapper}>
        <div className={styles.featurePlaceholder}>
          <button
            aria-pressed={isFavorite}
            onClick={handleToggle}
            className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ''}`}
            title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <HeartIcon active={isFavorite} />
          </button>
        </div>
      </div>

      {/* User row: аватар + имя + локация/возраст */}
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
              <span key={t} className={`${styles.tag} ${styles.tagTeach}`}>{t}</span>
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
              <span key={t} className={`${styles.tag} ${styles.tagLearn}`}>{t}</span>
            ))}
            {hiddenCount > 0 && (
              <span className={`${styles.tag} ${styles.tagMore}`}>+{hiddenCount}</span>
            )}
          </div>
        </div>
      )}

      {!detailed && (
        <button className={styles.detailsButton} type="button">
          Подробнее
        </button>
      )}

      {detailed && description && (
        <div className={styles.description}>{description}</div>
      )}
    </div>
  );
};

export default UserCard;