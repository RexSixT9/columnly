import type { User } from '@/types';
export type UserResponse = Pick<User, 'username' | 'email' | 'role'>;

import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    const userJson = localStorage.getItem('user');

    if (!userJson || userJson === 'undefined' || userJson === 'null') {
      return;
    }

    try {
      const user = JSON.parse(userJson) as UserResponse;
      setUser(user);
    } catch {
      localStorage.removeItem('user');
    }
  }, []);
  return user;
};
