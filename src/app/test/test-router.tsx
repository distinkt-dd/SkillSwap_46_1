import { createBrowserRouter } from 'react-router-dom';
import {
  TempAbout,
  TempDashboard,
  TempLogin,
  TempRegister,
  TempNotFound,
} from './temp-test-components';
import { LayoutAuth, LayoutPure } from '@pages/index';
import { ProtectedRoute } from '../router/ProtectedRoute'; // ← импортируем защиту
import { Catalog } from '@pages/catalog/ui'; // ← импортируем каталог

export const testRouter = createBrowserRouter([
  {
    path: '/',
    // Главная страница с каталогом
    element: (
      <LayoutAuth>
        <Catalog />
      </LayoutAuth>
    ),
  },
  {
    path: '/about',
    element: (
      <LayoutAuth>
        <TempAbout />
      </LayoutAuth>
    ),
  },
  {
    path: '/dashboard',
    // Защищенный маршрут
    element: (
      <ProtectedRoute>
        <LayoutAuth>
          <TempDashboard />
        </LayoutAuth>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    // Защищенный маршрут
    element: (
      <ProtectedRoute>
        <LayoutAuth>
          <TempDashboard />
        </LayoutAuth>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    // Только для неавторизованных
    element: (
      <ProtectedRoute onlyUnAuth>
        <LayoutPure>
          <TempLogin />
        </LayoutPure>
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    // Только для неавторизованных
    element: (
      <ProtectedRoute onlyUnAuth>
        <LayoutPure>
          <TempRegister />
        </LayoutPure>
      </ProtectedRoute>
    ),
  },
  {
    path: '/catalog',
    element: (
      <LayoutAuth>
        <Catalog />
      </LayoutAuth>
    ),
  },
  {
    path: '*',
    element: (
      <LayoutAuth>
        <TempNotFound />
      </LayoutAuth>
    ),
  },
]);
