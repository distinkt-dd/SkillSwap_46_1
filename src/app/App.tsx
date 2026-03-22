import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  DevelopmentPage,
  ErrorPage,
  LayoutAuth,
  LayoutNauth,
  LayoutPure,
  LoginPage,
  OfferPage,
} from '@pages/index';
import { selectedUser, selectedUserIsAuthChecked } from '@entities/index';
import { useSelector } from '@shared/store';

import { TempAbout, TempHome, TempRegister } from './test/temp-test-components';
import { ProtectedRoute } from './router/ProtectedRoute';
import { useDispatch } from '@shared/store';
import { useEffect } from 'react';
import { getSubcategories } from '@entities/index';
import { getCategories } from '@entities/categories/model';
import { LayoutProfile } from '@pages/layouts';
import { fetchCities } from '@entities/cities/model/actions';
import { ProfileForm } from '@widgets/profile/ui';
import { getOffers } from '@entities/offers/model';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
    dispatch(fetchCities());
    dispatch(getOffers());
  }, [dispatch]);

  const user = useSelector(selectedUser);
  const authChecked = useSelector(selectedUserIsAuthChecked);
  const ErrorLayout = user && authChecked ? LayoutAuth : LayoutNauth;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutNauth>
              <TempHome />
            </LayoutNauth>
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
              <LayoutPure>
                <TempRegister />
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
              <LayoutProfile>Мои Навыки</LayoutProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <LayoutProfile>Избранное</LayoutProfile>
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
    </>
  );
};
