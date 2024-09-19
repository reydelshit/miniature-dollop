import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper';
import './index.css';
import Calendar from './pages/authenticated/Calendar';
import Dashboard from './pages/authenticated/Dashboard';
import DashboardAuth from './pages/authenticated/DashboardAuth';
import Merchant from './pages/authenticated/Merchant';
import Orders from './pages/authenticated/Orders';
import Profile from './pages/authenticated/Profile';
import Shop from './pages/authenticated/Shop';
import ErrorPage from './pages/ErrorPage';
import HeroPage from './pages/HeroPage';
import Root from './pages/Root';

axios.defaults.withCredentials = true;
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <HeroPage />,
      },
      {
        path: 'register',
        element: <HeroPage />,
      },
      {
        path: 'dashboard',
        element: (
          <AuthWrapper>
            <DashboardAuth />
          </AuthWrapper>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'shop',
            element: <Shop />,
          },
          {
            path: 'merchant-partners',
            element: <Merchant />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'calendars',
            element: <Calendar />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
