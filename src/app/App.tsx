import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutAuth, LayoutNauth, LayoutPure } from '@pages/index';
import { useDispatch } from '@shared/store';
import { fetchCities } from '@entities/cities/model/actions';

import {
  TempAbout,
  TempDashboard,
  TempHome,
  TempLogin,
  TempRegister,
} from './test/temp-test-components';
import { ProtectedRoute } from './router/ProtectedRoute';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());
  });
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
