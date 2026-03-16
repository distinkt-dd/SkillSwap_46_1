import type { FC, ReactNode } from 'react';
import { Footer, Header } from '@widgets/index';
import styles from './LayoutAuth.module.css';

interface LayoutAuthProps {
  children: ReactNode;
}

export const LayoutAuth: FC<LayoutAuthProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header variant="default" />
      <main className={styles.content}>
        {children}
      </main>
      <Footer />
    </div>
  );
};