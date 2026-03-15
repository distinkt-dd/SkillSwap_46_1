import type { FC } from 'react';
import styles from './CategoriesDropdown.module.css';
import { IconUI, Subcategory } from '@shared/ui';
import type { IconsMap } from '@shared/ui/icons/types';
import type { CategoryWithSubcategories } from './types';
import type { TSubcategoryProps } from '@shared/ui/subcategory/Subcategory';

const categoryConfig: Record<
  string,
  {
    icon: keyof IconsMap;
    type: TSubcategoryProps['type'];
  }
> = {
  business: { icon: 'briefcase', type: 'business' },
  creative: { icon: 'pallete', type: 'creative' },
  languages: { icon: 'global', type: 'languages' },
  education: { icon: 'book', type: 'education' },
  home: { icon: 'home', type: 'home' },
  health: { icon: 'lifestyle', type: 'health' },
};

const getCategoryConfig = (categoryType: string) => {
  return categoryConfig[categoryType] || { icon: 'briefcase', type: 'other' };
};

type CategoriesProps = {
  categories: CategoryWithSubcategories[];
  onCategoryClick?: (categoryType: string) => void;
  onSubcategoryClick?: (subcategoryId: string) => void;
};

export const CategoriesDropdown: FC<CategoriesProps> = ({
  categories,
  onCategoryClick,
  onSubcategoryClick,
}) => {
  return (
    <>
      {categories.map((category) => {
        const config = getCategoryConfig(category.type);

        return (
          <div key={category.id}>
            <div className={styles.categoryTitle} onClick={() => onCategoryClick?.(category.type)}>
              <Subcategory
                type={config.type}
                title={category.name}
                icon={<IconUI name={config.icon} />}
              />
              <span className={styles.categoryTitleText}>{category.name}</span>
            </div>

            <div className={styles.subcategoriesList}>
              {category.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className={styles.dropdownItem}
                  onClick={() => onSubcategoryClick?.(sub.id)}
                >
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
