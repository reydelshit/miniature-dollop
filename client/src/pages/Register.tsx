import MainContainer from '@/components/structure/MainContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  password: string;
  address: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <MainContainer>
      <div className="flex h-[600px] w-full items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="block h-fit w-[400px] rounded-2xl border-[1px] p-8 text-center"
        >
          <h1 className="text-2xl font-bold">Register Account</h1>
          <p className="my-2">Enter your details to create an account</p>

          <div className="text-start">
            <Label>Name</Label>
            <Input {...register('name', { required: true })} type="text" />
          </div>

          <div className="text-start">
            <Label>Email</Label>
            <Input {...register('email', { required: true })} type="email" />
          </div>
          <div className="text-start">
            <Label>Password</Label>
            <Input
              {...register('password', { required: true })}
              type="password"
            />
          </div>

          <div className="text-start">
            <Label>Confirm Password</Label>
            <Input
              {...register('password', {
                required: true,
                validate: (value) => value === watch('password'),
              })}
              type="password"
            />
          </div>

          <div className="text-start">
            <Label>Address</Label>
            <Input
              {...register('address', { required: true })}
              type="address"
            />
          </div>

          <span className="my-4 block text-start text-sm font-semibold">
            Having trouble signing in?
          </span>

          <Button className="w-[8rem]" type="submit">
            Login
          </Button>

          <span className="my-4 block text-center text-sm font-semibold">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </MainContainer>
  );
};

export default Register;
