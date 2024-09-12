import MainContainer from '@/components/structure/MainContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <MainContainer>
      <div className="flex h-[600px] w-full items-center justify-center">
        <form className="block h-[500px] w-[400px] rounded-2xl border-[1px] p-8 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="my-4">Enter your details to access your account</p>

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
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </MainContainer>
  );
};

export default Login;
