import { data } from 'react-router';

import { columnlyApi } from '@/api';

import type { LoaderFunction } from 'react-router';
import { AxiosError } from 'axios';

export const blogDetailLoader: LoaderFunction = async ({ params }) => {
  try {
    const slug = params.slug;
    if (!slug) {
      throw new Error('Blog slug is required');
    }
    const { data } = await columnlyApi.get(`/blogs/${slug}`);

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
