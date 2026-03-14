// widgets/header/ui/header.tsx
import { useState } from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { Button, IconUI, Input, Logo, Avatar } from '@shared/ui';

export type THeaderUIProps = {
  userName?: string;
  userAvatar?: string;
};

const cx = (isActive: boolean) => `${styles.navLink} ${isActive ? styles.navLink_active : ''}`;

export const HeaderUI: FC<THeaderUIProps> = ({ userName, userAvatar }) => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const isAuth = !!userName;

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
              <IconUI name="chevronDown" className={isSkillsOpen ? styles.rotated : ''} />

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
          leftIcon={<IconUI name="search" />}
          placeholder="Искать навык"
          className={styles.searchInput}
          variant="default"
          fullWidth
        />

        <div className={`${styles.rightGroup} ${isAuth ? styles.auth : ''}`}>
          <IconUI name={isAuth ? 'sun' : 'moon'} className={styles.themeIcon} />

          <div className={`${styles.buttonsGroup} ${isAuth ? styles.auth : ''}`}>
            {isAuth ? (
              <>
                <IconUI name="notification" className={styles.notificationIcon} />
                <IconUI name="like" className={styles.likeIcon} />

                <NavLink to="/profile" className={styles.userBlock}>
                  <span className={styles.userName}>{userName}</span>
                  <Avatar src={userAvatar} size="small" />
                </NavLink>
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
