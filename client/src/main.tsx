import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper';
import './index.css';
import Dashboard from './pages/Dashboard';
import HeroPage from './pages/HeroPage';
import Root from './pages/Root';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/dashboard',
        element: (
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        ),
      },
      {
        path: '/login',
        element: <HeroPage />,
      },
      {
        path: '/register',
        element: <HeroPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
