import type { FC } from 'react';
import styles from './footer.module.css';

//TODO: Временная заглушка для футера
export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>Футер в разработке</div>
      </div>
    </footer>
  );
};