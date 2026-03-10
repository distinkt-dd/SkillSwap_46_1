import { IconUI } from '@shared/index';
import styles from './logo.module.css';
import type { IconName } from '../icons/types';

export interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  caption?: string;
  iconName?: IconName;
  iconSize?: number;
}

export const Logo: React.FC<LogoProps> = ({
  caption = 'SkillSwap',
  href = '/',
  className = '',
  iconName = 'logo',
  iconSize = 40,
  ...rest
}) => {
  return (
    <a href={href} className={`${styles.logo} ${className}`} {...rest}>
      <span className={styles.image}>
        <IconUI name={iconName} size={iconSize} />
      </span>
      {caption && <span className={styles.caption}>{caption}</span>}
    </a>
  );
};
