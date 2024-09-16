import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useSwitchPanel } from '@/store/store';
import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';

type Inputs = {
  lastName: string;
  firstName: string;
  middleInitial: string;
  address: string;

  contactNumber: string;
  emailAddress: string;
  status: string;
  userPassword: string;
  confirmPassword: string;
};

type SponsorsData = {
  ControlNo: number;
  SponsorID: string;
  Code: string;
  LastName: string;
  FirstName: string;
  MiddleInitial: string;
  Address: string;
  ContactNumber: string;
  EmailAddress: string;
  DateRegister: string;
  Status: string;
  isOnline: string;
  ACCOUNTNO: string;
};

const Register = () => {
  const [selectedSponsors, setSelectedSponsors] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const { toast } = useToast();

  const { status, toggle } = useSwitchPanel();

  const fetcher = async (url: string): Promise<SponsorsData[]> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const {
    data: sponsors,
    error,
    mutate,
  } = useSWR(`${import.meta.env.VITE_SERVER_LINK}/sponsors`, fetcher);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    formData.append('lastName', data.lastName);
    formData.append('firstName', data.firstName);
    formData.append('middleInitial', data.middleInitial);
    formData.append('address', data.address);
    formData.append('contactNumber', data.contactNumber);
    formData.append('emailAddress', data.emailAddress);
    formData.append('status', 'NEW');
    formData.append('isCreatedOnline', 'Y');
    formData.append('SponsorID', selectedSponsors);
    formData.append('userPassword', data.userPassword);

    console.log({ ...data, sponsorID: selectedSponsors });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/register`,
        formData,
      );

      console.log(response.data, 'resp');

      if (response.data.status === 'success') {
        toast({
          title: 'Student Added Successfully',
          description: 'The student has been added to the system.',
        });

        mutate();
        reset();

        setSelectedSponsors('');
      }
    } catch (error) {
      console.error(error);

      toast({
        title: 'Error',
        description: 'An error occurred while adding the student.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSponsors = (value: string) => {
    setSelectedSponsors(value);
  };

  return (
    <div className="mt-[-1.5rem] flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="block h-fit w-[550px] rounded-2xl text-center"
      >
        {/* <h1 className="text-2xl font-bold">Register Account</h1>
        <p className="my-2">Enter your details to create an account</p> */}

        <div className="my-2 text-start">
          <Label>Sponsors </Label>

          <Select onValueChange={handleChangeSponsors}>
            <SelectTrigger>
              <SelectValue placeholder="Sponsors" />
            </SelectTrigger>
            <SelectContent>
              {error ? (
                sponsors?.map((sponsor, index) => (
                  <SelectItem key={index} value={sponsor.ACCOUNTNO}>
                    {sponsor.LastName}, {sponsor.FirstName}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="1">ERROR...</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <div className="w-full text-start">
            <Label>First Name</Label>
            <Input {...register('firstName', { required: true })} type="text" />
            {errors.firstName && (
              <span>
                <span className="text-red-500">This field is required</span>
              </span>
            )}
          </div>

          <div className="w-full text-start">
            <Label>Lastname</Label>
            <Input {...register('lastName', { required: true })} type="text" />
            {errors.lastName && (
              <span>
                <span className="text-red-500">This field is required</span>
              </span>
            )}
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
          <Input {...register('address', { required: true })} type="address" />

          {errors.address && (
            <span>
              <span className="text-red-500">This field is required</span>
            </span>
          )}
        </div>

        <div className="text-start">
          <Label>Phone Number</Label>
          <Input
            {...register('contactNumber', { required: true })}
            type="text"
          />

          {errors.contactNumber && (
            <span>
              <span className="text-red-500">This field is required</span>
            </span>
          )}
        </div>

        <div className="text-start">
          <Label>Email</Label>
          <Input
            {...register('emailAddress', { required: true })}
            type="email"
          />
          {errors.emailAddress && (
            <span>
              <span className="text-red-500">This field is required</span>
            </span>
          )}
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
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watch('userPassword'),
              })}
              type="password"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">Passwords do not match</span>
            )}
          </div>
        </div>

        <Button className="mt-[2rem] w-[10rem]" type="submit">
          {isLoading ? 'Registering...' : 'Register'}
        </Button>

        <span className="my-4 block text-center text-sm font-semibold">
          Already have an account?{' '}
          <span className="cursor-pointer" onClick={toggle}>
            {status === 'login' ? 'Register' : 'Login'}
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
