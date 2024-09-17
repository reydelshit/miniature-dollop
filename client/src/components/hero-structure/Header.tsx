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
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Header = () => {
  const navigate = useNavigate();
  const status = useSwitchPanel((state) => state.status);
  return (
    <div className="flex h-[8rem] w-full items-center justify-center p-4">
      <div className="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-10">
          {/* <img className="w-20" src={Logo} alt="logo" /> */}
          <h1
            className="cursor-pointer text-center text-2xl text-white"
            onClick={() => navigate('/')}
          >
            LiveWell
          </h1>
        </div>

        {/* <div className="ml-[-1.5rem] flex gap-8">
          <a
            className="w-[8rem] rounded-2xl bg-white p-2 text-center text-sm uppercase text-black hover:text-black"
            href="#about"
          >
            About
          </a>

          <a
            className="w-[8rem] rounded-2xl bg-white p-2 text-center text-sm uppercase text-black hover:text-black"
            href="#services"
          >
            Services
          </a>

          <a
            className="w-[8rem] rounded-2xl bg-white p-2 text-center text-sm uppercase text-black hover:text-black"
            href="#contact"
          >
            Contact
          </a>
        </div> */}

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
            <DialogContent className="h-[650px] w-[700px]">
              <DialogHeader className="grid h-[80px] w-full place-content-center place-items-center text-center">
                <DialogTitle className="text-2xl font-semibold">
                  {' '}
                  {status === 'login' ? 'Login' : 'Register'}
                </DialogTitle>
                <DialogDescription>
                  {' '}
                  {status === 'login'
                    ? 'Enter your credentials to login'
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
