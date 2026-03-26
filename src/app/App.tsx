import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import {
  DevelopmentPage,
  ErrorPage,
  LayoutAuth,
  LayoutNauth,
  LayoutPure,
  LoginPage,
  OfferPage,
} from '@pages/index';
import {
  fetchUsers,
  selectedUser,
  selectedUserIsAuthChecked,
  setUser,
  type TUser,
} from '@entities/index';
import { useSelector } from '@shared/store';
import { Catalog } from '@pages/catalog/ui';
import { CatalogFiltersProvider } from '@features/filters';

import { TempAbout } from './test/temp-test-components';
import { RegisterForm } from '@widgets/register/ui';
import { ProtectedRoute } from './router/ProtectedRoute';
import { useDispatch } from '@shared/store';
import { useEffect } from 'react';
import { getSubcategories, fetchCities, getOffers } from '@entities/index';
import { getCategories } from '@entities/categories/model';
import { LayoutProfile } from '@pages/layouts';
import { ProfileForm } from '@widgets/profile/ui';
import { Favorites } from '@widgets/favorites';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      const userParse: TUser = JSON.parse(user);
      dispatch(setUser(userParse));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
    dispatch(fetchCities());
    dispatch(getOffers());
    dispatch(fetchUsers());
  }, [dispatch]);

  const user = useSelector(selectedUser);
  const authChecked = useSelector(selectedUserIsAuthChecked);
  const ErrorLayout = user && authChecked ? LayoutAuth : LayoutNauth;
  return (
    <CatalogFiltersProvider>
      <Routes>
        {/* Главная и каталог */}
        <Route
          path="/"
          element={
            <LayoutAuth>
              <Catalog />
            </LayoutAuth>
          }
        />
        <Route
          path="/catalog"
          element={
            <LayoutAuth>
              <Catalog />
            </LayoutAuth>
          }
        />

        {/* Оффер */}
        <Route
          path="/offers/:id"
          element={
            <LayoutNauth>
              <OfferPage />
            </LayoutNauth>
          }
        />

        {/* Тестовые страницы */}
        <Route
          path="/about"
          element={
            <LayoutNauth>
              <TempAbout />
            </LayoutNauth>
          }
        />

        {/* Авторизация */}
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <LayoutPure>
                <LoginPage />
              </LayoutPure>
            </ProtectedRoute>
          }
        />

        {/* === ТВОЯ РЕГИСТРАЦИЯ === */}
        <Route
          path="/registration"
          element={
            <ProtectedRoute onlyUnAuth>
              <Navigate to="/registration/1" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration/:step"
          element={
            <ProtectedRoute onlyUnAuth>
              <LayoutPure>
                <RegisterForm />
              </LayoutPure>
            </ProtectedRoute>
          }
        />

        {/* Профиль */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <LayoutProfile>
                <ProfileForm />
              </LayoutProfile>
            </ProtectedRoute>
          }
        />

        {/* Заглушки для других разделов */}
        <Route
          path="/my-skills"
          element={
            <ProtectedRoute>
              <LayoutProfile>Мои Навыки</LayoutProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <LayoutProfile>
                <Favorites />
              </LayoutProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-exchanges"
          element={
            <ProtectedRoute>
              <LayoutProfile>
                <DevelopmentPage />
              </LayoutProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <LayoutProfile>
                <DevelopmentPage />
              </LayoutProfile>
            </ProtectedRoute>
          }
        />

        {/* Ошибки */}
        <Route
          path="500"
          element={
            <ErrorLayout>
              <ErrorPage variant="500" />
            </ErrorLayout>
          }
        />
        <Route
          path="*"
          element={
            <ErrorLayout>
              <ErrorPage variant="404" />
            </ErrorLayout>
          }
        />
      </Routes>
    </CatalogFiltersProvider>
  );
};
