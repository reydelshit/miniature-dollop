import Logo from '@/assets/logo.png';
import { ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  // const status = useSwitchPanel((state) => state.status);

  const { hash } = useLocation();
  const path = useLocation().pathname;

  return (
    <div className="bg-mainColor text-lightText sticky top-0 z-30 flex h-[4rem] w-full items-center justify-center p-4">
      <div className="mx-auto flex w-[100%] max-w-[1200px] items-center justify-between">
        <div className="flex w-[100%] items-center justify-between">
          <div>
            <img className="w-10" src={Logo} alt="logo" />
          </div>

          <div className="mr-[-1rem] flex gap-6">
            <a
              href={
                path === '/register' || path === '/login'
                  ? '/#products'
                  : '/#products'
              }
              className={`${hash === '#products' ? 'border-b-2 border-orange-300' : ''} text-sm`}
            >
              Products
            </a>
            <a
              href={
                path === '/register' || path === '/login'
                  ? '/#about'
                  : '/#about'
              }
              className={`${hash === '#about' ? 'border-b-2 border-orange-300' : ''} text-sm`}
            >
              About us
            </a>
            <a
              href={
                path === '/register' || path === '/login'
                  ? '/#services'
                  : '/#services'
              }
              className={`${hash === '#services' ? 'border-b-2 border-orange-300' : ''} text-sm`}
            >
              Services
            </a>
            <a
              href={
                path === '/register' || path === '/login'
                  ? '/#contact'
                  : '/#contact'
              }
              className={`${hash === '#contact' ? 'border-b-2 border-orange-300' : ''} text-sm`}
            >
              Contact us
            </a>
          </div>
          <div className="flex items-center gap-4">
            <ShoppingCart className="cursor-pointer text-orange-300" />

            <Link to="/login" className="text-sm">
              Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
