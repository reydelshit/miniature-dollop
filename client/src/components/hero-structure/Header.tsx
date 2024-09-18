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
import { Button } from '../ui/button';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const status = useSwitchPanel((state) => state.status);

  const path = useLocation().pathname;

  return (
    <div className="flex h-[8rem] w-full items-center justify-center p-4">
      <div className="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-10">
          <img className="w-20" src={Logo} alt="logo" />
          {/* <h1
            className="cursor-pointer text-center text-2xl text-white"
            onClick={() => navigate('/')}
          >
            LiveWell
          </h1> */}
        </div>

        <div className="ml-[5rem] flex gap-4">
          <a
            className={`${path === '/#shop' ? 'bg-white' : 'bg-black bg-opacity-40'} w-[8rem] rounded-3xl pt-2.5 text-center text-sm font-semibold uppercase text-white hover:bg-white hover:text-black`}
            href="#shop"
          >
            Shop
          </a>
          <a
            className="h-[2.5rem] w-[8rem] rounded-3xl bg-black bg-opacity-40 pt-2.5 text-center text-sm font-semibold uppercase text-white hover:bg-white hover:text-black"
            href="#about"
          >
            About
          </a>

          <a
            className="h-[2.5rem] w-[8rem] rounded-3xl bg-black bg-opacity-40 pt-2.5 text-center text-sm font-semibold uppercase text-white hover:bg-white hover:text-black"
            href="#services"
          >
            Services
          </a>

          <a
            className="bbg-black w-[8rem] rounded-3xl bg-black bg-opacity-40 pt-2.5 text-center text-sm font-semibold uppercase text-white hover:bg-white hover:text-black"
            href="#contact"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ShoppingCart className="text-white" />
          <Dialog>
            <DialogTrigger>
              <Button
                className="w-[8rem] rounded-full border-2 border-white bg-transparent text-white"
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
