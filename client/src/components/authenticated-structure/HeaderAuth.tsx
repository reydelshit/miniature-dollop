import Logo from '@/assets/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import Healthy from '@/assets/healthy.jpg';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import ImageComponent from '../hero/ImageComponent';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { toast } from '@/hooks/use-toast';

type CartItem = {
  cart_id: number;
  quantity: number;
  price: number;
  user_id: number;
  date_created: Date;
  product_id: number;
  description: string;
  image: { type: string; data: number[] };
  StockCode: string;
};

const HeaderAuth = () => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [quantityIndex, setQuantityIndex] = useState(0);

  const handleFetchCarts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/cart`,
        {
          withCredentials: true,
        },
      );

      console.log(response.data, 'resp');

      if (response.data.length > 0) {
        setCarts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleQuantity = (
    index: number,
    qty: number,
    cart_id: number,
    type: string,
  ) => {
    setQuantityIndex(index);

    setQuantity(qty);

    if (type === 'substract') {
      setQuantity(qty - 1);
    } else {
      setQuantity(qty + 1);
    }

    console.log(index, qty);
    axios
      .put(`${import.meta.env.VITE_SERVER_LINK}/cart/update`, {
        cart_id: cart_id,
        quantity: type === 'add' ? qty + 1 : qty - 1,
      })
      .then((res) => {
        console.log(res);

        if (res.data.status === 'success' && res.status === 200) {
          if (type === 'add') {
            toast({
              title: 'Increase Cart Quantity',
              description: 'The cart has been successfully added.',
            });
          } else {
            toast({
              title: 'Decrease Cart Quantity',
              description: 'The cart has been successfully added.',
            });
          }

          handleFetchCarts();
        }
      });

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.cart_id === cart_id
          ? {
              ...cart,
              quantity: type === 'add' ? qty + 1 : Math.max(0, qty - 1),
            }
          : cart,
      ),
    );
  };

  return (
    <div className="h-fit w-full border-b-[1px] shadow-sm">
      <div className="flex h-[6] items-center justify-between px-10 py-4">
        <img className="w-20" src={Logo} alt="logo" />

        <div className="flex items-center gap-4">
          <span className="rounded-lg bg-orange-500 p-2 font-semibold text-white">
            ₱10000
          </span>
          <Sheet>
            <SheetTrigger>
              <ShoppingCart
                onClick={() => handleFetchCarts()}
                className="cursor-pointer text-orange-300"
              />
            </SheetTrigger>
            <SheetContent className="min-w-[40rem]">
              <SheetHeader>
                <SheetTitle>Cart</SheetTitle>
                <SheetDescription>
                  List of products added to cart
                </SheetDescription>
              </SheetHeader>

              {/* {error && <p>Error {error}</p>} */}

              <div className="mt-[2rem] flex flex-col gap-4">
                {carts?.map((cart) => (
                  <div key={cart.cart_id}>
                    <div className="flex items-center gap-8">
                      <div className="flex w-[150px] items-center gap-2">
                        <Checkbox />
                        {cart.image ? (
                          <ImageComponent
                            type="cart"
                            buffer={cart.image}
                            alt={cart.description}
                          />
                        ) : (
                          <span>There is a problem with the image</span>
                        )}
                      </div>
                      <div className="w-full">
                        <div className="my-2 flex w-full justify-between">
                          <div>
                            <h1 className="font-bold">{cart.description}</h1>
                            <p>Product Code: {cart.StockCode} </p>
                          </div>

                          <Button className="bg-red-500 text-white">
                            Remove
                          </Button>
                        </div>

                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() =>
                                handleQuantity(
                                  cart.cart_id,
                                  cart.quantity,
                                  cart.cart_id,
                                  'substract',
                                )
                              }
                            >
                              -
                            </Button>
                            <p>{cart.quantity} qty</p>
                            <Button
                              onClick={() =>
                                handleQuantity(
                                  cart.cart_id,
                                  cart.quantity,
                                  cart.cart_id,
                                  'add',
                                )
                              }
                            >
                              +
                            </Button>
                          </div>

                          <h2 className="font-bold">
                            ₱ {cart.price * cart.quantity}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-2 right-0 flex h-[4rem] w-full justify-end p-4">
                <h1 className="text-2xl">
                  Total Price: ₱{' '}
                  <span className="font-bold">
                    {carts.reduce(
                      (acc, cart) => acc + cart.price * cart.quantity,
                      0,
                    )}
                  </span>
                </h1>
              </div>
            </SheetContent>
          </Sheet>

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
