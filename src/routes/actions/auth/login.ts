import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse, AuthResponse } from '@/types';

import { columnlyApi } from '@/api';

export const loginAction: ActionFunction = async ({ request }) => {
  const data = await request.json();
  try {
    const response = await columnlyApi.post('/auth/login', data, {
      withCredentials: true,
    });
    const responseData = response.data as {
      accessToken: string;
      data: AuthResponse['user'];
    };
    const authResponse: AuthResponse = {
      accessToken: responseData.accessToken,
      user: responseData.data,
    };

    localStorage.setItem('accessToken', authResponse.accessToken);
    localStorage.setItem('user', JSON.stringify(authResponse.user));

    return {
      ok: true,
      data: authResponse,
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
};
