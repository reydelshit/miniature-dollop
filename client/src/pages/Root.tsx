import { Toaster } from '@/components/ui/toaster';
import { Outlet, useLocation } from 'react-router-dom';
import HeroPage from './HeroPage';
import useScrollToHash from '@/hooks/useScroll';

const Root = () => {
  const params = useLocation();
  useScrollToHash();

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
