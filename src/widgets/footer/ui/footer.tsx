import styles from './footer.module.css';
import React from 'react';
import { Logo } from '@shared/index';
// import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <ul className={styles.linksList}>
        {/*<li className={styles.link}>
            <NavLink to="/about">О проекте</NavLink>
          </li>*/}
        <li className={styles.link}>
          <a href="#null">О проекте</a>
        </li>
        <li className={styles.link}>
          <a href="#null">Контакты</a>
        </li>
        <li className={styles.link}>
          <a href="#null">Политика конфиденциальности</a>
        </li>
        {/*li className={styles.link}>
            <NavLink to="/skills/all">Все навыки</NavLink>
          </li> */}
        <li className={styles.link}>
          <a href="#null">Все навыки</a>
        </li>
        <li className={styles.link}>
          <a href="#null">Блог</a>
        </li>
        <li className={styles.link}>
          <a href="#null">Пользовательское соглашение</a>
        </li>
      </ul>
      <span className={styles.copiright}>SkillSwap - 2025</span>
    </footer>
  );
};
