import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { createBrowserRouter } from 'react-router';
import { signupAction } from './actions/auth/signup';
import { loginAction } from './actions/auth/login';
import { refreshTokenLoader } from './loaders/refreshToken';
import { RootLayout } from '@/components/layouts/Root';
import { settingsAction } from './actions/user/settings';
import Home from '@/pages/user/Home';
import Blogs from '@/pages/user/Blogs';
import { BlogDetail } from '@/pages/user/BlogDetail';
import homeLoader from './loaders/user/home';
import userBlogLoader from './loaders/user/blogs';
import blogDetailLoader from './loaders/user/blogDetail';
import AdminLayout from '@/components/layouts/AdminLayout';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    action: loginAction,
  },
  {
    path: '/signup',
    Component: Signup,
    action: signupAction,
  },
  {
    path: 'refresh-token',
    loader: refreshTokenLoader,
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
      {
        path: 'blogs',
        Component: Blogs,
        loader: userBlogLoader,
      },
      {
        path: 'blogs/:slug',
        Component: BlogDetail,
        loader: blogDetailLoader,
      },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        handle: {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'blogs',
        handle: {
          breadcrumb: 'Blogs',
        },
      },
      {
        path: 'blogs/create',
        handle: {
          breadcrumb: 'Create Blog',
        },
      },
      {
        path: 'blogs/:slug/edit',
        handle: {
          breadcrumb: 'Edit Blog',
        },
      },
      {
        path: 'comments',
        handle: {
          breadcrumb: 'Comments',
        },
      },
      {
        path: 'users',
        handle: {
          breadcrumb: 'Users',
        },
      },
    ],
  },
  {
    path: '/settings',
    action: settingsAction,
  },
]);

export default router;
