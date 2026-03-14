// widgets/header/ui/header.tsx
import { useState } from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { Button, IconUI, Input, Logo } from '@shared/ui';

export type THeaderUIProps = {
  userName?: string;
};

const cx = (isActive: boolean) => `${styles.navLink} ${isActive ? styles.navLink_active : ''}`;

export const HeaderUI: FC<THeaderUIProps> = ({ userName }) => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftSection}>
          <NavLink to="/" className={styles.logo}>
            <Logo />
          </NavLink>

          <div className={styles.navLinks}>
            <NavLink to="/about" className={({ isActive }) => cx(isActive)}>
              О проекте
            </NavLink>

            <div
              className={styles.navLinkWithDropdown}
              onClick={() => setIsSkillsOpen(!isSkillsOpen)}
            >
              <span className={styles.navLinkText}>Все навыки</span>
              <IconUI name="chevronDown" size={16} className={isSkillsOpen ? styles.rotated : ''} />

              {isSkillsOpen && (
                <div className={styles.dropdownMenu}>
                  <NavLink to="/skills/react" className={styles.dropdownItem}>
                    React
                  </NavLink>
                  <NavLink to="/skills/typescript" className={styles.dropdownItem}>
                    TypeScript
                  </NavLink>
                  <NavLink to="/skills/nodejs" className={styles.dropdownItem}>
                    Node.js
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        <Input
          leftIcon={<IconUI name="search" size={24} />}
          placeholder="Искать навык"
          className={styles.searchInput}
          variant="default"
        />

        <div className={styles.rightGroup}>
          <IconUI name={userName ? 'sun' : 'moon'} size={24} />

          <div className={styles.buttonsGroup}>
            {userName ? (
              <>
                <NavLink to="/profile" className={styles.profileLink}>
                  {({ isActive }) => (
                    <>
                      <IconUI
                        name="user"
                        size={20}
                        className={isActive ? styles.icon_active : ''}
                      />
                      <span className={styles.userName}>{userName}</span>
                    </>
                  )}
                </NavLink>
                <Button variant="tertiary">Выйти</Button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={styles.buttonLink}>
                  <Button variant="secondary">Войти</Button>
                </NavLink>
                <NavLink to="/register" className={styles.buttonLink}>
                  <Button variant="primary">Зарегистрироваться</Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
