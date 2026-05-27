import { redirect } from 'react-router';
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

import { columnlyApi } from '@/api';

export const blogsAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as { blogId: string };
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');

  try {
    await columnlyApi.delete(`/blogs/${data.blogId}`, {
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
