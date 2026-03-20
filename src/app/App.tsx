import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutAuth, LayoutNauth, LayoutPure } from '@pages/index';

import {
  TempAbout,
  TempDashboard,
  TempHome,
  TempLogin,
  TempRegister,
} from './test/temp-test-components';
import { ProtectedRoute } from './router/ProtectedRoute';
import { useDispatch } from '@shared/store';
import { useEffect } from 'react';
import { getSubcategories } from '@entities/index';
import { getCategories } from '@entities/categories/model';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, [dispatch]);
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
              <LayoutAuth>
                <TempDashboard />
              </LayoutAuth>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
