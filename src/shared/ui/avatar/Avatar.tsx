import type React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  size: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size, onClick }) => {
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
    <img
      src={src}
      alt="Avatar"
      className={`${getSizeClass(size)} ${styles.avatar}`}
      onClick={onClick}
      style={{ borderRadius: '50%' }}
    />
  );
};
