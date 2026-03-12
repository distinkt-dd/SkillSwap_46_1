import React from 'react';
import { IconUI } from '@shared/ui';
import styles from './FavoriteButton.module.css';

export type FavoriteButtonProps = {
  id: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, isFavorite, onToggle }) => (
  <button
    type="button"
    aria-pressed={isFavorite}
    onClick={() => onToggle(id)}
    className={`${styles.btn} ${isFavorite ? styles.active : ''}`}
    title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
  >
    <IconUI name="like" size={24} />
  </button>
);
