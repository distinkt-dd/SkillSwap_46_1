// src/widgets/header/ui/type.ts

import type { CategoryWithSubcategories } from '../model/types';

export type THeaderUIProps = {
  userName?: string;
  userAvatar?: string;
  // Новые пропсы для навыков
  isSkillsOpen?: boolean;
  onSkillsToggle?: () => void;
  categories?: CategoryWithSubcategories[];
  isLoading?: boolean;
  error?: string | null;
  onCategoryClick?: (categoryType: string) => void;
  onSubcategoryClick?: (subcategoryId: string) => void;
};
