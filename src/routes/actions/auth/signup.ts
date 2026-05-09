import { columnlyApi } from '../../../api';

import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse, AuthResponse } from '@/types';

export const signupAction: ActionFunction = async ({ request }) => {
  const data = await request.json();

  try {
    const response = await columnlyApi.post('/auth/register', data, {
      withCredentials: true,
    });
    const responseData = response.data as AuthResponse;

    console.log('Signup successful:', responseData);

    localStorage.setItem('accessToken', responseData.accessToken);
    localStorage.setItem('user', JSON.stringify(responseData.user));

    return {
      ok: true,
      data: responseData,
    } as ActionResponse<AuthResponse>;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data,
      } as ActionResponse<AuthResponse>;
    }
    throw error;
  }
  return null;
};
