import type { FC, ReactNode } from 'react';
import { Footer, Header } from '@widgets/index';
import styles from './LayoutNauth.module.css';

interface LayoutNauthProps {
  children: ReactNode;
}

export const LayoutNauth: FC<LayoutNauthProps> = ({ children }) => {
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