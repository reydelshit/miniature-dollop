import Header from '@/components/hero/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  // const { status, toggle } = useSwitchPanel();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/login`,
        {
          username: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);

      const { message, token } = response.data;

      if (message === 'Login successful' && token) {
        console.log('Login successful');

        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof AxiosError) {
        console.error('Error during login:', error);

        if (
          error.response?.status === 401 &&
          error.response?.data?.message === 'Invalid credentials'
        ) {
          toast({
            title: 'Invalid credentials',
            description: 'Please check your email and password and try again.',
            variant: 'destructive',
          });
        }
      } else {
        // Handle non-Axios errors or rethrow
        console.error('Unexpected error:', error);
      }
    }
  };
  return (
    <div className="bg-mainColor text-lightText relative h-screen w-full">
      <Header />

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="bg-cardColor h-[70%] w-[40%] rounded-lg p-4">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="w-full text-center">
              <h1 className="text-2xl font-semibold">Login</h1>
              <p>Enter your email and password to login</p>
            </div>
            <form
              onSubmit={handleSubmitLogin}
              className="block w-[80%] p-8 text-center"
            >
              <div className="text-start">
                <Label>Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div className="mt-4 text-start">
                <Label>Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>

              <span className="my-4 block text-start text-sm font-semibold">
                Having trouble signing in?
              </span>

              <Button className="w-[8rem]" type="submit">
                Login
              </Button>

              <span className="my-4 block text-center text-sm font-semibold">
                Don't have an account?{' '}
                <Link to="/register" className="cursor-pointer">
                  Register
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
