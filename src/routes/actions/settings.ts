import { redirect } from 'react-router';

import { columnlyApi } from '@/api';

import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';

export const settingsAction: ActionFunction = async ({ request }) => {
  const data = await request.json();

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');

  try {
    const response = await columnlyApi.put('/users/current', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    const responseData = response.data;

    localStorage.setItem('user', JSON.stringify(responseData.user));

    return {
      ok: true,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data,
      };
    }
  }
};
