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
      params: { offset: 4, limit: 12 },
    });

    return {
      recentBlogs,
      allBlogs,
    } as HomeLoaderResponse;
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

export default homeLoader;
