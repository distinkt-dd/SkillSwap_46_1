import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { Button, IconUI, Input, Logo, Avatar } from '@shared/ui';
import { CategoriesDropdown } from './categories';
import type { THeaderUIProps } from './type';
import { selectedUser } from '@entities/user';
import { useSelector } from '@shared/store';

export const Header: FC<Partial<THeaderUIProps>> = ({
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
  const user = useSelector(selectedUser);
  const isAuth = !!user;
  const [isDropdownMounted, setIsDropdownMounted] = useState(isSkillsOpen);
  const [isDropdownVisible, setIsDropdownVisible] = useState(isSkillsOpen);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let closeTimer: number | undefined;
    let openRaf: number | undefined;
    let closeRaf: number | undefined;

    if (isSkillsOpen) {
      // Переводим setState в RAF, чтобы избежать синхронного setState внутри эффекта.
      openRaf = window.requestAnimationFrame(() => {
        setIsDropdownMounted(true);
        setIsDropdownVisible(true);
      });
    } else if (isDropdownMounted) {
      closeRaf = window.requestAnimationFrame(() => {
        setIsDropdownVisible(false);
      });
      closeTimer = window.setTimeout(() => {
        setIsDropdownMounted(false);
      }, 220);
    }

    return () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
      }
      if (openRaf) {
        window.cancelAnimationFrame(openRaf);
      }
      if (closeRaf) {
        window.cancelAnimationFrame(closeRaf);
      }
    };
  }, [isSkillsOpen, isDropdownMounted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onSkillsToggle?.();
      }
    };

    if (!isSkillsOpen) return;
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSkillsOpen, onSkillsToggle]);

  // Для дропдауна "Все навыки" не блокируем скролл страницы:
  // иначе меняется доступная ширина контента и карточки "поджимаются".

  if (variant === 'pure') {
    return (
      <header className={styles.header}>
        <div className="container">
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
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.leftSection}>
            <NavLink to="/" className={styles.logo}>
              <Logo />
            </NavLink>

            <div className={styles.navLinks}>
              <NavLink to="/about">О проекте</NavLink>

            <button
              ref={triggerRef}
              type="button"
              className={styles.navLinkWithDropdown}
              onClick={onSkillsToggle}
              aria-expanded={isSkillsOpen}
              aria-controls="skills-dropdown"
            >
              <span>Все навыки</span>
              <IconUI name="chevronDown" />
            </button>
          </div>

          {isDropdownMounted && (
            <div
              id="skills-dropdown"
              ref={dropdownRef}
              className={`${styles.dropdownWrapper} ${
                isDropdownVisible ? styles.dropdownOpen : styles.dropdownClosing
              }`}
            >
              {isLoading && <div>Загрузка...</div>}
              {error && <div>{error}</div>}
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
                  <span className={styles.userName}>{user?.name}</span>
                  <Avatar src={user?.avatar} size="small" />
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
      </div>
    </header>
  );
};
