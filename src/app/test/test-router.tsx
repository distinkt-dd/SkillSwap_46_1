import { createBrowserRouter } from 'react-router-dom';
import {
  TempHome,
  TempAbout,
  TempDashboard,
  TempLogin,
  TempRegister,
  TempNotFound,
} from './temp-test-components';
import { LayoutAuth, LayoutNauth, LayoutPure } from '@pages/index';

export const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <LayoutNauth><TempHome /></LayoutNauth>,
  },
  {
    path: '/about',
    element: <LayoutNauth><TempAbout /></LayoutNauth>,
  },
  {
    path: '/dashboard',
    element: <LayoutAuth><TempDashboard /></LayoutAuth>,
  },
  {
    path: '/profile',
    element: <LayoutAuth><TempDashboard /></LayoutAuth>,
  },
  {
    path: '/login',
    element: <LayoutPure><TempLogin /></LayoutPure>,
  },
  {
    path: '/register',
    element: <LayoutPure><TempRegister /></LayoutPure>,
  },
  {
    path: '*',
    element: <LayoutNauth><TempNotFound /></LayoutNauth>,
  },
]);