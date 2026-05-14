import { useLocation, useNavigate } from 'react-router';
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

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    if (location.pathname !== '/') {
      window.location.reload();
      return;
    }

    navigate('/', { viewTransition: true });
  };
};
