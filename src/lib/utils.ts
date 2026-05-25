import type { User } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUsername = (user: User): string => {
  const { firstName, lastName, username } = user;

  return firstName || lastName ? [firstName, lastName].join(' ') : username;
};

export const getReadingTime = (text: string): number => {
  const wordsPerMinute = 150;

  return Math.ceil(text.split(' ').length / wordsPerMinute);
};
