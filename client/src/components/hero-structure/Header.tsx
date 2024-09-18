import Logo from '@/assets/logo.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { useSwitchPanel } from '@/store/store';
import { ShoppingCart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

const Header = () => {
  const status = useSwitchPanel((state) => state.status);

  const { hash } = useLocation();

  return (
    <div className="flex h-[8rem] w-full items-center justify-center p-4">
      <div className="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-10">
          <img className="w-12" src={Logo} alt="logo" />
          {/* <h1
            className="cursor-pointer text-center text-2xl text-white"
            onClick={() => navigate('/')}
          >
            LiveWell
          </h1> */}
        </div>

        <div className="ml-[8rem] flex gap-4">
          <a
            href="#products"
            className={`${hash === '#products' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            Products
          </a>
          <a
            href="#about"
            className={`${hash === '#about' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            About us
          </a>
          <a
            href="#services"
            className={`${hash === '#services' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            Services
          </a>
          <a
            href="#contact"
            className={`${hash === '#contact' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            Contact us
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ShoppingCart className="cursor-pointer text-yellow-300" />
          <Dialog>
            <DialogTrigger>
              <Button
                className="h-[2rem] w-[7rem] rounded-full bg-yellow-300 text-black"
                onClick={() => useSwitchPanel.getState().setStatus('login')}
              >
                Login
              </Button>
            </DialogTrigger>
            <DialogContent
              className={`"w-[700px]" ${status === 'register' ? 'h-fit' : 'h-[650px]'}`}
            >
              <DialogHeader className="grid h-[50px] w-full place-content-center place-items-center text-center">
                <DialogTitle className="text-2xl font-semibold">
                  {' '}
                  {status === 'login' ? '' : 'Register'}
                </DialogTitle>
                <DialogDescription>
                  {' '}
                  {status === 'login'
                    ? ''
                    : 'Enter the required information to register'}
                </DialogDescription>
              </DialogHeader>
              {status === 'login' ? <Login /> : <Register />}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
