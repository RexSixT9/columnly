import { data } from 'react-router';
import { AxiosError } from 'axios';
import { columnlyApi } from '@/api';
import type { LoaderFunction } from 'react-router';

const blogDetailLoader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;
  try {
    const { data } = await columnlyApi.get(`/blogs/${slug}`);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error.response?.data?.message || error.message, {
        status: error.response?.status ?? 500,
        statusText: error.response?.data?.code || 'BLOG_FETCH_FAILED',
      });
    }
    throw error;
  }
};

export default blogDetailLoader;
