import { data } from 'react-router';
import { columnlyApi } from '@/api';
import type { LoaderFunction } from 'react-router';
import type { PaginatedResponse, Blog } from '@/types';
import { AxiosError } from 'axios';

const allBlogsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') || '10';
  const offset = url.searchParams.get('offset') || '0';

  try {
    const response = await columnlyApi.get('/blogs', {
      params: { limit, offset },
    });
    const data = response.data as PaginatedResponse<Blog, 'blogs'>;
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

export default allBlogsLoader;
