import { generateAvatar, generateRandomAvatar } from '@shared/utils/avatarGenerator';
import type React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  seed?: string;
  avatar?: string;
  size: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ seed, size, onClick, avatar }) => {
  const avatarSrc = seed ? generateAvatar(seed) : generateRandomAvatar();
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return styles.smallSize;
      case 'medium':
        return styles.mediumSize;
      case 'large':
        return styles.largeSize;
    }
  };

  return (
    <>
      {avatar ? (
        <img
          src={avatar}
          alt="Avatar"
          className={`${getSizeClass(size)} ${styles.avatar}`}
          onClick={onClick}
          style={{ borderRadius: '50%' }}
        />
      ) : (
        <img
          src={avatarSrc}
          alt="Avatar"
          className={`${getSizeClass(size)} ${styles.avatar}`}
          onClick={onClick}
          style={{ borderRadius: '50%' }}
        />
      )}
    </>
  );
};
