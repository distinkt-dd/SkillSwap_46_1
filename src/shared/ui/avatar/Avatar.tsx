import type React from 'react';
import styles from './Avatar.module.css';
import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  size: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size, onClick, className }) => {
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
      className={clsx(getSizeClass(size), styles.avatar, className)}
      onClick={onClick}
      style={{ borderRadius: '50%' }}
    />
  );
};
