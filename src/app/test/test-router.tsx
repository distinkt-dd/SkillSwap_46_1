// src/app/providers/router/test-router.tsx
import { createBrowserRouter } from 'react-router-dom';
import {
  TempHome,
  TempAbout,
  TempDashboard,
  TempLogin,
  TempRegister,
  TempNotFound,
} from './temp-test-components';
import { LayoutAuth,  LayoutPure } from '@pages/index';

export const testRouter = createBrowserRouter([
  {
    path: '/',
    // Для главной страницы используем LayoutAuth (с категориями)
    element: <LayoutAuth><TempHome /></LayoutAuth>,
  },
  {
    path: '/about',
    // Для страницы "О проекте" тоже LayoutAuth
    element: <LayoutAuth><TempAbout /></LayoutAuth>,
  },
  {
    path: '/dashboard',
    // Для защищенных страниц используем LayoutAuth
    element: <LayoutAuth><TempDashboard /></LayoutAuth>,
  },
  {
    path: '/profile',
    // Для профиля тоже LayoutAuth
    element: <LayoutAuth><TempDashboard /></LayoutAuth>,
  },
  {
    path: '/login',
    // Для логина используем LayoutPure (чистый хедер)
    element: <LayoutPure><TempLogin /></LayoutPure>,
  },
  {
    path: '/register',
    // Для регистрации тоже LayoutPure
    element: <LayoutPure><TempRegister /></LayoutPure>,
  },
  {
    path: '*',
    // Для 404 используем LayoutAuth (с категориями)
    element: <LayoutAuth><TempNotFound /></LayoutAuth>,
  },
]);