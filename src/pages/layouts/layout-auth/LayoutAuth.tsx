// src/app/layouts/LayoutAuth/LayoutAuth.tsx
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Footer, Header } from '@widgets/index';
import { useSelector } from '@shared/store';
import styles from './LayoutAuth.module.css';
import { selectedCategories } from '@entities/categories/model';
import { selectedSubcategories } from '@entities/subcategories';

interface LayoutAuthProps {
  children: ReactNode;
}

export const LayoutAuth: FC<LayoutAuthProps> = ({ children }) => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const categories = useSelector(selectedCategories);
  const subcategories = useSelector(selectedSubcategories);

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
