import { data } from 'react-router';

import { columnlyApi } from '@/api';

import type { LoaderFunction } from 'react-router';
import type { Blog, PaginatedResponse } from '@/types';

import { AxiosError } from 'axios';

export interface HomeLoaderResponse {
  recentBlogs: PaginatedResponse<Blog, 'blogs'>;
  allBlogs: PaginatedResponse<Blog, 'blogs'>;
}

const homeLoader: LoaderFunction = async () => {
  try {
    const { data: recentBlogs } = await columnlyApi.get('/blogs', {
      params: { limit: 4 },
    });

    const { data: allBlogs } = await columnlyApi.get('/blogs', {
      params: { offset: 4, limit: 10 },
    });

    return {
      recentBlogs: recentBlogs.data,
      allBlogs: allBlogs.data,
    } as HomeLoaderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error.response?.data.message || error.message, {
        statusText: error.response?.data.code || 'Error',
        status: error.response?.status || 500,
      });
    }
    throw new Response('An unexpected error occurred', { status: 500 });
  }
};

export default homeLoader;
