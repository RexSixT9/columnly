import { data } from 'react-router';

import { columnlyApi } from '@/api';

import type { LoaderFunction } from 'react-router';
import type { Blog, PaginatedResponse } from '@/types';

import { AxiosError } from 'axios';

const userBlogLoader: LoaderFunction = async ({ request }) => {

  try {
    const url = new URL(request.url);
    const response = await columnlyApi.get('/blogs', {
      params: Object.fromEntries(url.searchParams),
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

export default userBlogLoader;