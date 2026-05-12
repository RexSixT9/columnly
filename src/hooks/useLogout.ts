import { useLocation, useNavigate } from 'react-router';

import { AxiosError } from 'axios';
import { columnlyApi } from '@/api';

export const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/', { viewTransition: true });
      return;
    }

    try {
      const response = await columnlyApi.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      if (response.status >= 400) return;
    } catch (error) {
      if (!(error instanceof AxiosError) || error.response?.status !== 401) {
        throw error;
      }
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    if (location.pathname !== '/') {
      window.location.reload();
      return;
    }

    navigate('/', { viewTransition: true });
  };
};
