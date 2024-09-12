import MainContainer from '@/components/structure/MainContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Inputs = {
  lastName: string;
  firstName: string;
  middleInitial: string;
  address: string;

  contactNumber: string;
  emailAddress: string;
  status: string;
  userPassword: string;
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
          className="block h-fit w-[600px] rounded-2xl border-[1px] p-8 text-center"
        >
          <h1 className="text-2xl font-bold">Register Account</h1>
          <p className="my-2">Enter your details to create an account</p>

          <div className="my-2 text-start">
            <Label>Sponsors</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sponsors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reydel">Reydel</SelectItem>
                <SelectItem value="Reydel">Reydel</SelectItem>
                <SelectItem value="Reydel">Reydel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <div className="w-full text-start">
              <Label>First Name</Label>
              <Input
                {...register('firstName', { required: true })}
                type="text"
              />
            </div>

            <div className="w-full text-start">
              <Label>Lastname</Label>
              <Input
                {...register('lastName', { required: true })}
                type="text"
              />
            </div>
            <div className="text-start">
              <Label>Middle Initial</Label>
              <Input
                className="w-[6rem]"
                {...register('middleInitial', { required: true })}
                type="text"
              />
            </div>
          </div>

          <div className="text-start">
            <Label>Address</Label>
            <Input
              {...register('address', { required: true })}
              type="address"
            />
          </div>

          <div className="text-start">
            <Label>Phone Number</Label>
            <Input
              {...register('contactNumber', { required: true })}
              type="text"
            />
          </div>

          <div className="text-start">
            <Label>Email</Label>
            <Input
              {...register('emailAddress', { required: true })}
              type="email"
            />
          </div>

          <div className="my-2 flex w-full gap-2">
            <div className="w-full text-start">
              <Label>Password</Label>
              <Input
                {...register('userPassword', { required: true })}
                type="password"
              />
            </div>

            <div className="w-full text-start">
              <Label>Confirm Password</Label>
              <Input
                {...register('userPassword', {
                  required: true,
                  validate: (value) => value === watch('userPassword'),
                })}
                type="password"
              />
            </div>
          </div>

          <Button className="mt-[2rem] w-[10rem]" type="submit">
            Register
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
