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
            className={`${hash === '#shop' ? 'bg-white text-black' : 'bg-black bg-opacity-40 text-white'} h-fit w-[6rem] rounded-3xl p-2 text-center text-xs font-semibold uppercase hover:bg-white hover:text-black`}
            href="#shop"
          >
            Shop
          </a>
          <a
            className={`${hash === '#about' ? 'bg-white text-black' : 'bg-black bg-opacity-40 text-white'} h-fit w-[6rem] rounded-3xl p-2 text-center text-xs font-semibold uppercase hover:bg-white hover:text-black`}
            href="#about"
          >
            About
          </a>

          <a
            className={`${hash === '#services' ? 'bg-white text-black' : 'bg-black bg-opacity-40 text-white'} h-fit w-[6rem] rounded-3xl p-2 text-center text-xs font-semibold uppercase hover:bg-white hover:text-black`}
            href="#services"
          >
            Services
          </a>

          <a
            className={`${hash === '#contact' ? 'bg-white text-black' : 'bg-black bg-opacity-40 text-white'} h-fit w-[6rem] rounded-3xl p-2 text-center text-xs font-semibold uppercase hover:bg-white hover:text-black`}
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
                className="h-[2rem] w-[7rem] rounded-full border-2 border-white bg-transparent text-white"
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
