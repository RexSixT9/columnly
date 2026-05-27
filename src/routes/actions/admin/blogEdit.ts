import { redirect } from 'react-router';
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

import { columnlyApi } from '@/api';

export const blogEditAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const slug = params.slug;

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');
  try {
    const response = await columnlyApi.put(`/blogs/${slug}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Encoding': 'multipart/form-data',
      },
    });
    const responseData = response.data;
    return {
      ok: true,
      data: responseData,
    } as ActionResponse;
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
