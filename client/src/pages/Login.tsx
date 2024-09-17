import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSwitchPanel } from '@/store/store';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const { status, toggle } = useSwitchPanel();

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

      if (response.data.token && response.data.message === 'Login successful') {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <div className="mt-[-8rem] flex h-full w-full items-start justify-center">
      <form
        onSubmit={handleSubmitLogin}
        className="block w-[80%] p-8 text-center"
      >
        <div className="text-start">
          <Label>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} type="email" />
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
          <span className="cursor-pointer" onClick={toggle}>
            {status === 'login' ? 'Register' : 'Login'}
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
