import { selectedUser, selectedUserIsAuthChecked } from '@entities/user';
import { useSelector } from '@shared/store';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutAuth, LayoutNauth, LayoutPure } from '@pages/index';
import { ProtectedRoute } from './router/ProtectedRoute';
import { UserCardWidget } from '@widgets/user-card';

export const App = () => {
  const user = useSelector(selectedUser);
  const authChecked = useSelector(selectedUserIsAuthChecked);

  return (
    <>
      {user && authChecked ? (
        <LayoutAuth>
          <Routes>
            <Route path="/" /> // element не готов
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserCardWidget name="asd" id="asd" />
                </ProtectedRoute> // Элемент не готов
              }
            />
            <Route path="offer:id" />
          </Routes>
        </LayoutAuth>
      ) : (
        <LayoutNauth>
          <Routes>
            <Route path="/" />
            <Route path="offer:id" />
          </Routes>
        </LayoutNauth>
      )}
      <LayoutPure>
        <Routes>
          <Route
            path="login"
            element={
              <ProtectedRoute>
                <UserCardWidget name="asd" id="asd" />
              </ProtectedRoute> // Элемент не готов
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute>
                <UserCardWidget name="asd" id="asd" />
              </ProtectedRoute> // Элемент не готов
            }
          />
          <Route path="*" />
        </Routes>
      </LayoutPure>
    </>
  );
};
