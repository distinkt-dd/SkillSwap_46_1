import type { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectedUser, selectedUserIsAuthChecked } from '@entities/user';
import { useSelector } from '@shared/store';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, onlyUnAuth = false }) => {
  const user = useSelector(selectedUser);
  const isAuthChecked = useSelector(selectedUserIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
