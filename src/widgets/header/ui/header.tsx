// src/widgets/header/ui/header.tsx

import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { Button, IconUI, Input, Logo, Avatar } from '@shared/ui';
import type { THeaderUIProps } from './type';

const cx = (isActive: boolean) => `${styles.navLink} ${isActive ? styles.navLink_active : ''}`;

export const HeaderUI: FC<THeaderUIProps> = ({
  userName,
  userAvatar,
  // Новые пропсы
  isSkillsOpen = false,
  onSkillsToggle,
  categories = [],
  isLoading = false,
  error = null,
  onCategoryClick,
  onSubcategoryClick,
}) => {
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

            <div className={styles.navLinkWithDropdown} onClick={onSkillsToggle}>
              <span className={styles.navLinkText}>Все навыки</span>
              <IconUI name="chevronDown" className={isSkillsOpen ? styles.rotated : ''} />

              {isSkillsOpen && (
                <div className={styles.dropdownMenu}>
                  {isLoading && <div className={styles.loadingMessage}>Загрузка...</div>}

                  {error && <div className={styles.errorMessage}>{error}</div>}

                  {!isLoading &&
                    !error &&
                    categories.map((category) => (
                      <div key={category.id} className={styles.categoryGroup}>
                        <NavLink
                          to={`/category/${category.type}`}
                          className={styles.categoryTitle}
                          onClick={() => onCategoryClick?.(category.type)}
                        >
                          {category.name}
                        </NavLink>

                        {category.subcategories.length > 0 && (
                          <div className={styles.subcategoriesList}>
                            {category.subcategories.slice(0, 5).map((sub) => (
                              <NavLink
                                key={sub.id}
                                to={`/skills/${sub.id}`}
                                className={styles.dropdownItem}
                                onClick={() => onSubcategoryClick?.(sub.id)}
                              >
                                {sub.name}
                              </NavLink>
                            ))}

                            {category.subcategories.length > 5 && (
                              <NavLink
                                to={`/category/${category.type}`}
                                className={styles.moreLink}
                                onClick={() => onCategoryClick?.(category.type)}
                              >
                                Еще {category.subcategories.length - 5}...
                              </NavLink>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
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
