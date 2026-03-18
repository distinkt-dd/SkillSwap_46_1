// src/app/layouts/LayoutAuth/LayoutAuth.tsx
import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Footer, Header } from '@widgets/index';
import { useDispatch, useSelector } from '@shared/store';
import { getCategories } from '@entities/categories/model/actions';
import { getSubcategories } from '@entities/subcategories/model/actions';
import styles from './LayoutAuth.module.css';

interface LayoutAuthProps {
  children: ReactNode;
}

export const LayoutAuth: FC<LayoutAuthProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const categories = useSelector((state) => state.categories?.categories || []);
  const subcategories = useSelector((state) => state.subcategories?.subcategories || []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, [dispatch]);

  const categoriesWithSubcategories = categories.map((category) => ({
    ...category,
    subcategories: subcategories.filter((sub) => sub.categoryId === category.id),
  }));

  const handleSkillsToggle = () => {
    setIsSkillsOpen((prev) => !prev);
  };

  const handleCategoryClick = () => {
    setIsSkillsOpen(false);
  };

  const handleSubcategoryClick = () => {
    setIsSkillsOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Header
        variant="default"
        isSkillsOpen={isSkillsOpen}
        onSkillsToggle={handleSkillsToggle}
        categories={categoriesWithSubcategories}
        onCategoryClick={handleCategoryClick}
        onSubcategoryClick={handleSubcategoryClick}
      />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};
