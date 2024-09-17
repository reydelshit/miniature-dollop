import HeaderAuth from '@/components/authenticated-structure/HeaderAuth';
import {
  CalendarRange,
  Handshake,
  LayoutDashboard,
  ShoppingBag,
  User,
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const DashboardAuth = () => {
  const path = useLocation().pathname;

  return (
    <div className="h-screen w-full">
      <HeaderAuth />

      <div className="flex h-full w-full gap-2">
        <div className="mt-[2rem] flex h-screen w-full max-w-[13rem] flex-col gap-2 border-r-[1px] px-2">
          <Link
            className={`flex h-9 w-full items-center gap-2 rounded-md pl-2 text-start text-sm ${
              path === '/dashboard' ? 'bg-black p-1 text-white' : ''
            }`}
            to="/dashboard"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link
            className={`flex h-9 w-full items-center gap-2 rounded-md pl-2 text-start text-sm ${
              path === '/dashboard/shop' ? 'bg-black p-1 text-white' : ''
            }`}
            to="/dashboard/shop"
          >
            <ShoppingBag size={20} /> Shop
          </Link>

          <Link
            className={`flex h-9 w-full items-center gap-2 rounded-md pl-2 text-start text-sm ${
              path === '/dashboard/merchant-partners'
                ? 'bg-black p-1 text-white'
                : ''
            }`}
            to="/dashboard/merchant-partners"
          >
            <Handshake size={20} /> Merchant Partners
          </Link>

          <Link
            className={`flex h-9 w-full items-center gap-2 rounded-md pl-2 text-start text-sm ${
              path === '/dashboard/profile' ? 'bg-black p-1 text-white' : ''
            }`}
            to="/dashboard/profile"
          >
            <User size={20} /> Profile
          </Link>

          <Link
            className={`flex h-9 w-full items-center gap-2 rounded-md pl-2 text-start text-sm ${
              path === '/dashboard/calendars' ? 'bg-black p-1 text-white' : ''
            }`}
            to="/dashboard/calendars"
          >
            <CalendarRange size={20} /> Calendars
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardAuth;
