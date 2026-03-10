type TSkill = {
  id: string;
  userId: number;
  name: string;
  subcategoryId: number;
  description: string;
  images: string[];
  userLikedIds: number[];
};

export type TSkillResponse = TSkill[];
