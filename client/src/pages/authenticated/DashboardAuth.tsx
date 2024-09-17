import HeaderAuth from '@/components/authenticated-structure/HeaderAuth';
import { Link, Outlet } from 'react-router-dom';

const DashboardAuth = () => {
  return (
    <div className="h-screen w-full">
      <HeaderAuth />

      <div className="flex h-full w-full gap-2">
        <div className="mt-[2rem] flex h-screen w-[10rem] flex-col gap-4 border-r-[1px] px-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/shop">Shop</Link>
          <Link to="/dashboard/merchant-partners">Merchant Partners</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/calendars">Calendars</Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardAuth;
