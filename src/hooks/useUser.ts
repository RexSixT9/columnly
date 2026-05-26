import type { User } from '@/types';
export type UserResponse = Pick<User, 'username' | 'email' | 'role'>;

import { useState } from 'react';

export const useUser = () => {
  const [user] = useState<UserResponse | undefined>(() => {
    const userJson = localStorage.getItem('user');

    if (!userJson || userJson === 'undefined' || userJson === 'null') {
      return undefined;
    }

    try {
      return JSON.parse(userJson) as UserResponse;
    } catch {
      localStorage.removeItem('user');
      return undefined;
    }
  });
  return user;
};
