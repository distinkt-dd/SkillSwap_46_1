import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

export const generateAvatar = (seed?: string): string => {
  const avatarSeed = seed || Math.random().toString(36).substring(7);

  const avatar = createAvatar(thumbs, {
    seed: avatarSeed,
  });

  return avatar.toDataUri();
};

export const generateRandomAvatar = (): string => {
  const randomSeed = Math.random().toString(36).substring(7);
  return generateAvatar(randomSeed);
};
