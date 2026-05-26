import { data, redirect } from 'react-router';
import { columnlyApi } from '@/api';

import type { LoaderFunction } from 'react-router';
import type { PaginatedResponse, Blog, User, Comment } from '@/types';

import { AxiosError } from 'axios';

export type DashboardData = {
  blogsCount: number;
  usersCount: number;
  commentsCount: number;
  blogs: Blog[];
  comments: Comment[];
  users: User[];
};

const dashboardLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');

  try {
    const blogsResponse = await columnlyApi.get('/blogs', {
      params: {
        limit: 5,
      },
    });

    const usersResponse = await columnlyApi.get('/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 5,
      },
    });

    const commentsResponse = await columnlyApi.get('/comments', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 1,
      },
    });

    const paginationBlogs = blogsResponse.data as PaginatedResponse<
      Blog,
      'blogs'
    >;
    const paginationUsers = usersResponse.data as PaginatedResponse<
      User,
      'users'
    >;
    const paginationComments = commentsResponse.data as PaginatedResponse<
      Comment,
      'comments'
    >;

    return {
      blogsCount: paginationBlogs.total,
      usersCount: paginationUsers.total,
      commentsCount: paginationComments.total,
      blogs: paginationBlogs.blogs,
      comments: paginationComments.comments,
      users: paginationUsers.users,
    } as DashboardData;
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

export default dashboardLoader;
