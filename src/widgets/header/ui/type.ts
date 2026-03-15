import type { CategoryWithSubcategories } from './categories/types';

export type THeaderUIProps = {
  userName?: string;
  userAvatar?: string;
  isSkillsOpen?: boolean;
  onSkillsToggle?: () => void;
  categories?: CategoryWithSubcategories[];
  isLoading?: boolean;
  error?: string | null;
  onCategoryClick?: (categoryType: string) => void;
  onSubcategoryClick?: (subcategoryId: string) => void;
  variant?: 'default' | 'pure';
  onClose?: () => void;
};
