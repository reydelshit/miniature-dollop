import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';

const HeaderAuth = () => {
  const handleLogout = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER_LINK}/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = '/';

        console.log(res.data);
      });
  };

  return (
    <div className="h-[5rem] w-full border-b-[1px]">
      <div className="flex h-[6] items-center justify-between p-4">
        <div className="text-2xl font-bold">Logo</div>

        <div className="flex items-center gap-4">
          <span className="rounded-lg bg-orange-500 p-2 font-semibold text-white">
            ₱10000
          </span>
          <ShoppingCart size={20} />

          <DropdownMenu>
            <DropdownMenuTrigger>
              {' '}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button onClick={handleLogout}>Logout</Button> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderAuth;
