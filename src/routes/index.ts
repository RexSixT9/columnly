import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { createBrowserRouter } from 'react-router';
import { signupAction } from './actions/auth/signup';
import { loginAction } from './actions/auth/login';
import { refreshTokenLoader } from './loaders/refreshToken';
import { RootLayout } from '@/components/layouts/Root';
import { settingsAction } from './actions/user/settings';
import { Home } from '@/pages/user/Home';

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
      },
      {
        path: 'blogs',
      },
      {
        path: 'blogs/:slug',
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'blogs',
      },
      {
        path: 'dashboard',
      },
      {
        path: 'blogs/create',
      },
      {
        path: 'blogs/:slug/edit',
      },
      {
        path: 'comments',
      },
      {
        path: 'users',
      },
    ],
  },
  {
    path: '/settings',
    action: settingsAction,
  },
]);

export default router;
