import { redirect } from 'react-router';
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

import { columnlyApi } from '@/api';

export const allUsersAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as { userId: string };
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');

  try {
    await columnlyApi.delete(`/users/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data,
      } as ActionResponse;
    }
    throw error;
  }
};
