import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function checkAuthStatus() {
  return axios
    .get(`${import.meta.env.VITE_SERVER_LINK}/login/check`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      console.log(response.data.isAuthenticated, 'isAuthenticated');
      return response.data.isAuthenticated;
    })
    .catch(() => {
      return false;
    });
}

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus().then((status) => {
      setIsAuthenticated(status);
    });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // if (isAuthenticated === false) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};

export default AuthWrapper;
