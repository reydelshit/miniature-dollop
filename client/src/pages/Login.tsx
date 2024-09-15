import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSwitchPanel } from '@/store/store';
import { Link } from 'react-router-dom';

const Login = () => {
  const { status, toggle } = useSwitchPanel();

  return (
    <div className="mt-[-8rem] flex h-full w-full items-start justify-center">
      <form className="block w-[80%] p-8 text-center">
        <div className="text-start">
          <Label>Email or Username</Label>
          <Input type="text" />
        </div>
        <div className="mt-4 text-start">
          <Label>Password</Label>
          <Input type="password" />
        </div>

        <span className="my-4 block text-start text-sm font-semibold">
          Having trouble signing in?
        </span>

        <Button className="w-[8rem]" type="submit">
          Login
        </Button>

        <span className="my-4 block text-center text-sm font-semibold">
          Don't have an account?{' '}
          <span className="cursor-pointer" onClick={toggle}>
            {status === 'login' ? 'Register' : 'Login'}
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
