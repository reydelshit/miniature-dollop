import Header from '@/components/structure/Header';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeroPage from './HeroPage';

const Root = () => {
  const params = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn_QR')) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full">
        {/* <Header /> */}
        <div className="h-full w-full">
          {/* This is where the child routes get rendered */}
          {params.pathname === '/' ? <HeroPage /> : <Outlet />}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Root;
