import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};
