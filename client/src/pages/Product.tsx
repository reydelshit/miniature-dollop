import ProductDummy from '@/assets/healthy.jpg';
import ImageComponent from '@/components/hero/ImageComponent';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MTR_Stock } from '@/types';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';

const Product = () => {
  const { toast } = useToast();

  const fetcher = async (url: string): Promise<MTR_Stock[]> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR(`${import.meta.env.VITE_SERVER_LINK}/product`, fetcher);

  console.log(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddToCart = async (product_id: number, product_price: number) => {
    console.log(product_id, product_price);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/cart/post`,
        {
          quantity: 1,
          product_id,
          price: product_price,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data, 'resp');

      if (response.data.status === 'success') {
        toast({
          title: 'Added Cart Successfully',
          description: 'The cart has been successfully added.',
        });

        mutate();
        // reset();

        // setSelectedSponsors('');
      }
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        console.error('Error during login:', error);

        console.log(error.response?.status, 'status');
        console.log(error.response?.statusText, 'statusText');

        if (
          error.response?.status === 401 &&
          error.response?.statusText === 'Unauthorized'
        ) {
          // navigate to login

          window.location.href = '/login';
        }
      } else {
        // Handle non-Axios errors or rethrow
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div
      id="products"
      className="relative mb-4 mt-[5rem] h-full w-[90%] max-w-[1200px]"
    >
      <h1 className="my-4 w-fit p-2 text-4xl font-bold italic text-[#2C1B11]">
        Products.
      </h1>
      <div className="grid h-[850px] grid-cols-4 gap-5">
        {products
          ?.map((prod, index) => (
            <div
              key={index}
              className="h-[400px] w-full overflow-hidden rounded-md bg-cardColor shadow-md"
            >
              {prod.Image ? (
                <ImageComponent buffer={prod.Image} alt={prod.Description} />
              ) : (
                <span>There is a problem with the image</span>
              )}
              <div className="relative flex h-[40%] flex-col justify-between border-2 bg-cardColor p-4">
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-md w-[60%] break-words font-semibold">
                      {prod.Description}
                    </h1>
                    <p className="w-[60%] break-words">
                      {prod.CategoriesCode}, {prod.SubCategoriesCode}
                    </p>
                  </div>
                  <h1 className="w-[50%] text-end text-xl font-bold">
                    ₱ {prod.SRP}
                  </h1>
                </div>

                <Button
                  onClick={() => handleAddToCart(prod.RecNo, prod.SRP)}
                  className="absolute bottom-2 my-2 h-[2rem] w-fit self-end bg-secondaryColor"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ))
          .slice(0, 8)}
      </div>

      <div className="mt-4 flex justify-center">
        <Button className="rounded-full bg-secondaryColor px-4 py-2 text-black">
          View all products
        </Button>
      </div>
    </div>
  );
};

export default Product;
