import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { Button, IconUI, Input, Logo, Avatar } from '@shared/ui';
import { CategoriesDropdown } from './categories';
import type { THeaderUIProps } from './type';

export const Header: FC<THeaderUIProps> = ({
  userName,
  userAvatar,
  isSkillsOpen = false,
  onSkillsToggle,
  categories = [],
  isLoading = false,
  error = null,
  onCategoryClick,
  onSubcategoryClick,
  variant = 'default',
  onClose,
}) => {
  const isAuth = !!userName;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onSkillsToggle?.();
      }
    };

    if (isSkillsOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSkillsOpen, onSkillsToggle]);

  useEffect(() => {
    if (isSkillsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSkillsOpen]);

  if (variant === 'pure') {
    return (
      <header className={styles.header}>
        <nav className={styles.pureNav}>
          <NavLink to="/" className={styles.logo}>
            <Logo />
          </NavLink>
          <Button
            variant="tertiary"
            onClick={onClose}
            iconPosition="right"
            icon={<IconUI name="cross" />}
            width={147}
          >
            Закрыть
          </Button>
        </nav>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftSection}>
          <NavLink to="/" className={styles.logo}>
            <Logo />
          </NavLink>

          <div className={styles.navLinks}>
            <NavLink to="/about">О проекте</NavLink>

            <div ref={triggerRef} className={styles.navLinkWithDropdown} onClick={onSkillsToggle}>
              <span>Все навыки</span>
              <IconUI name="chevronDown" />

              {isSkillsOpen && (
                <div ref={dropdownRef} className={styles.dropdownMenu}>
                  {isLoading && <div className={styles.loadingMessage}>Загрузка...</div>}

                  {error && <div className={styles.errorMessage}>{error}</div>}

                  {!isLoading && !error && (
                    <CategoriesDropdown
                      categories={categories}
                      onCategoryClick={onCategoryClick}
                      onSubcategoryClick={onSubcategoryClick}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Input
          leftIcon={<IconUI name="search" />}
          placeholder="Искать навык"
          className={styles.searchInput}
          variant="search"
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
                  <Button variant="secondary" width={98}>
                    Войти
                  </Button>
                </NavLink>
                <NavLink to="/register" className={styles.buttonLink}>
                  <Button variant="primary" width={208}>
                    Зарегистрироваться
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
