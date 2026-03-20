import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ErrorPage, LayoutAuth, LayoutNauth, LayoutPure } from '@pages/index';
import { selectedUser, selectedUserIsAuthChecked } from '@entities/index';
import { useSelector } from '@shared/store';

import { TempAbout, TempHome, TempLogin, TempRegister } from './test/temp-test-components';
import { ProtectedRoute } from './router/ProtectedRoute';
import { useDispatch } from '@shared/store';
import { useEffect } from 'react';
import { getSubcategories } from '@entities/index';
import { getCategories } from '@entities/categories/model';
import { LayoutProfile } from '@pages/layouts';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
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
                <TempLogin />
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
              <LayoutProfile>Профиль</LayoutProfile>
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
              <LayoutProfile>Мои обмены</LayoutProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <LayoutProfile>Заявки</LayoutProfile>
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
