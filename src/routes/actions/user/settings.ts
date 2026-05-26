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

    // Store only non-sensitive user fields in localStorage
    const respUser = responseData.user || {};
    const safeUser = {
      username: respUser.username,
      email: respUser.email,
      role: respUser.role,
      firstName: respUser.firstName,
      lastName: respUser.lastName,
    };

    localStorage.setItem('user', JSON.stringify(safeUser));

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

    throw error;
  }
};
