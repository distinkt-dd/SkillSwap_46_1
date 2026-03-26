import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import {
  DevelopmentPage,
  ErrorPage,
  LayoutAuth,
  LayoutNauth,
  LayoutPure,
  LoginPage,
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

const ProfileForm = lazy(() =>
  import('@widgets/profile/ui').then((module) => ({ default: module.ProfileForm }))
);
const Favorites = lazy(() =>
  import('@widgets/favorites').then((module) => ({ default: module.Favorites }))
);
const MyOffers = lazy(() =>
  import('@widgets/my-offers').then((module) => ({ default: module.MyOffers }))
);
const Exchanges = lazy(() =>
  import('@widgets/exchanges').then((module) => ({ default: module.Exchanges }))
);
const OfferPage = lazy(() =>
  import('@pages/index').then((module) => ({ default: module.OfferPage }))
);

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    Loading...
  </div>
);

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
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
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
          <Route
            path="/offers/:id"
            element={
              <LayoutNauth>
                <OfferPage />
              </LayoutNauth>
            }
          />
          <Route
            path="/about"
            element={
              <LayoutNauth>
                <TempAbout />
              </LayoutNauth>
            }
          />

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

          <Route
            path="/my-skills"
            element={
              <ProtectedRoute>
                <LayoutProfile>
                  <MyOffers />
                </LayoutProfile>
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
                  <Exchanges />
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
      </Suspense>
    </CatalogFiltersProvider>
  );
};
