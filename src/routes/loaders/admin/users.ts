import { data, redirect } from 'react-router';
import { columnlyApi } from '@/api';
import type { LoaderFunction } from 'react-router';
import { AxiosError } from 'axios';

const allUsersLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');

  try {
    const { data } = await columnlyApi.get('/users', {
      params: Object.fromEntries(url.searchParams.entries()),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error.response?.data.message || error.message, {
        status: error.response?.status || error.status,
        statusText: error.response?.data.code || error.code,
      });
    }
    throw error;
  }
};

export default allUsersLoader;
